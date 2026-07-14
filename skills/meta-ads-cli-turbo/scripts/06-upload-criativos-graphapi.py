#!/usr/bin/env python3
"""
06-upload-criativos-graphapi.py · Squad Turbo / meta-ads-cli-turbo

Sobe batelada de criativos (estáticos + vídeos + carrosséis) via Graph API direto,
cobrindo o que a CLI `meta` NÃO faz: instagram_user_id, carrosséis, vídeo resumável.

Validado 2026-06-11. Ver references/05-runbook-campanha-roas-incremental-graphapi.md.

USO:
  1. source ~/.zshrc                      # carrega $ACCESS_TOKEN
  2. Preencher o bloco CONFIG abaixo (ou via env vars)
  3. Preencher BODY (primary text) em /tmp/body.txt
  4. Listar os criativos em STATICS / VIDEOS / CAROUSELS
  5. python3 06-upload-criativos-graphapi.py [--statics] [--videos] [--carousels]
     (sem flag = roda os três; IDs salvos em results_*.json)

Requisitos: python3 + requests. App Meta em modo LIVE. Tudo nasce PAUSED.
"""
import os, sys, time, json, requests

# ============================ CONFIG (preencher) ============================
API     = "https://graph.facebook.com/" + os.environ.get("API_VERSION", "v23.0")
TOKEN   = os.environ["ACCESS_TOKEN"]
ACCT    = os.environ.get("AD_ACCOUNT", "act_XXXXXXXXXXXX")
ADSET   = os.environ.get("ADSET_ID", "XXXXXXXXXXXXX")
PAGE    = os.environ.get("PAGE_ID", "XXXXXXXXXXXXX")
IG      = os.environ.get("INSTAGRAM_USER_ID", "17841XXXXXXXXXXX")  # NÃO o id da UI
URL     = os.environ.get("URL_DESTINO", "https://exemplo.com/cadastro")
CTA_TYPE = os.environ.get("CTA_TYPE", "LEARN_MORE")
HEADLINE = os.environ.get("HEADLINE", "Headline aqui")
DESC     = os.environ.get("DESCRIPTION", "Descrição aqui")
ROOT     = os.environ.get("CREATIVES_ROOT", ".")   # raiz dos paths abaixo
PREFIX   = os.environ.get("AD_PREFIX", "XX_001")   # nomenclatura dos ads

CTA = {"type": CTA_TYPE, "value": {"link": URL}}
with open(os.environ.get("BODY_FILE", "/tmp/body.txt"), encoding="utf-8") as f:
    BODY = f.read().strip()

# lista de criativos: (nome_do_ad, path_relativo_a_ROOT)
STATICS = [
    # ("XX_001_EST_01", "Estatico/AD1.png"),
]
VIDEOS = [
    # ("XX_001_VID_01", "Video/AD1.mp4"),
]
# carrossel: (nome, pasta, [cards na ordem]); último .mp4 vira card de vídeo
CAROUSELS = [
    # ("XX_001_CAR_01", "Carrossel/AD1", ["card_01.png","card_02.png","card_03.mp4"]),
]
# ===========================================================================


def upload_image(path):
    with open(os.path.join(ROOT, path), "rb") as fh:
        j = requests.post(f"{API}/{ACCT}/adimages",
                          data={"access_token": TOKEN}, files={"file": fh}).json()
    if "images" not in j:
        raise RuntimeError(f"upload_image {path}: {json.dumps(j)}")
    return j["images"][list(j["images"])[0]]["hash"]


def _poll_video(vid, timeout):
    start = time.time()
    while time.time() - start < timeout:
        s = requests.get(f"{API}/{vid}", params={"fields": "status", "access_token": TOKEN}).json()
        st = s.get("status", {}).get("video_status", "unknown")
        if st == "ready":
            return vid
        if st == "error":
            raise RuntimeError(f"vídeo {vid} erro: {json.dumps(s)}")
        time.sleep(8)
    raise RuntimeError(f"vídeo {vid} timeout (status={st})")


def upload_video(path, timeout=900):
    """Multipart simples — ok pra vídeos pequenos (< ~100MB)."""
    with open(os.path.join(ROOT, path), "rb") as fh:
        j = requests.post(f"{API}/{ACCT}/advideos",
                          data={"access_token": TOKEN}, files={"source": fh}).json()
    if "id" not in j:
        raise RuntimeError(f"upload_video {path}: {json.dumps(j)}")
    return _poll_video(j["id"], timeout)


def upload_video_resumable(path, timeout=1800):
    """Chunked — obrigatório pra vídeos grandes (> ~100MB)."""
    full = os.path.join(ROOT, path)
    size = os.path.getsize(full)
    r = requests.post(f"{API}/{ACCT}/advideos",
                     data={"upload_phase": "start", "file_size": size, "access_token": TOKEN}).json()
    if "upload_session_id" not in r:
        raise RuntimeError(f"start {path}: {json.dumps(r)}")
    sess, vid = r["upload_session_id"], r["video_id"]
    start_off, end_off = int(r["start_offset"]), int(r["end_offset"])
    with open(full, "rb") as fh:
        while start_off < end_off:
            fh.seek(start_off)
            chunk = fh.read(end_off - start_off)
            tr = requests.post(f"{API}/{ACCT}/advideos",
                              data={"upload_phase": "transfer", "upload_session_id": sess,
                                    "start_offset": start_off, "access_token": TOKEN},
                              files={"video_file_chunk": ("chunk", chunk)}).json()
            if "start_offset" not in tr:
                raise RuntimeError(f"transfer {path}: {json.dumps(tr)}")
            start_off, end_off = int(tr["start_offset"]), int(tr["end_offset"])
    fin = requests.post(f"{API}/{ACCT}/advideos",
                       data={"upload_phase": "finish", "upload_session_id": sess,
                             "access_token": TOKEN}).json()
    if not fin.get("success"):
        raise RuntimeError(f"finish {path}: {json.dumps(fin)}")
    return _poll_video(vid, timeout)


def smart_upload_video(path):
    """Escolhe multipart vs resumável pelo tamanho (>90MB = resumável)."""
    size_mb = os.path.getsize(os.path.join(ROOT, path)) / 1e6
    return upload_video_resumable(path) if size_mb > 90 else upload_video(path)


def video_thumb(vid):
    t = requests.get(f"{API}/{vid}/thumbnails", params={"access_token": TOKEN}).json()
    thumbs = t.get("data", [])
    if not thumbs:
        return None
    return next((x for x in thumbs if x.get("is_preferred")), thumbs[0])["uri"]


def create_creative(name, story_spec):
    # NÃO incluir degrees_of_freedom_spec (standard_enhancements opt-out depreciado)
    j = requests.post(f"{API}/{ACCT}/adcreatives",
                     data={"name": name, "object_story_spec": json.dumps(story_spec),
                           "access_token": TOKEN}).json()
    if "id" not in j:
        raise RuntimeError(f"create_creative {name}: {json.dumps(j)}")
    return j["id"]


def create_ad(name, creative_id):
    j = requests.post(f"{API}/{ACCT}/ads",
                     data={"name": name, "adset_id": ADSET,
                           "creative": json.dumps({"creative_id": creative_id}),
                           "status": "PAUSED", "access_token": TOKEN}).json()
    if "id" not in j:
        raise RuntimeError(f"create_ad {name}: {json.dumps(j)}")
    return j["id"]


def run_statics():
    out = []
    for name, path in STATICS:
        try:
            h = upload_image(path)
            spec = {"page_id": PAGE, "instagram_user_id": IG,
                    "link_data": {"image_hash": h, "message": BODY, "name": HEADLINE,
                                  "description": DESC, "link": URL, "call_to_action": CTA}}
            aid = create_ad(name, create_creative(f"{name}_creative", spec))
            out.append({"name": name, "ad_id": aid, "ok": True}); print(f"OK  {name}  {aid}", flush=True)
        except Exception as e:
            out.append({"name": name, "ok": False, "error": str(e)}); print(f"ERR {name}: {e}", flush=True)
    json.dump(out, open("results_statics.json", "w"), indent=2, ensure_ascii=False)
    return out


def run_videos():
    out = []
    for name, path in VIDEOS:
        try:
            vid = smart_upload_video(path)
            spec = {"page_id": PAGE, "instagram_user_id": IG,
                    "video_data": {"video_id": vid, "image_url": video_thumb(vid),
                                   "message": BODY, "title": HEADLINE, "link_description": DESC,
                                   "call_to_action": CTA}}
            aid = create_ad(name, create_creative(f"{name}_creative", spec))
            out.append({"name": name, "ad_id": aid, "ok": True}); print(f"OK  {name}  {aid}", flush=True)
        except Exception as e:
            out.append({"name": name, "ok": False, "error": str(e)}); print(f"ERR {name}: {e}", flush=True)
    json.dump(out, open("results_videos.json", "w"), indent=2, ensure_ascii=False)
    return out


def run_carousels():
    out = []
    for name, folder, cards in CAROUSELS:
        try:
            child = []
            for c in cards:
                rel = f"{folder}/{c}"
                if c.lower().endswith((".mp4", ".mov")):
                    vid = smart_upload_video(rel); thumb = video_thumb(vid)
                    att = {"video_id": vid, "link": URL, "call_to_action": CTA}
                    if thumb: att["picture"] = thumb
                    child.append(att)
                else:
                    child.append({"image_hash": upload_image(rel), "link": URL, "call_to_action": CTA})
            spec = {"page_id": PAGE, "instagram_user_id": IG,
                    "link_data": {"message": BODY, "link": URL, "name": HEADLINE, "description": DESC,
                                  "child_attachments": child, "multi_share_optimized": True,
                                  "multi_share_end_card": False, "call_to_action": CTA}}
            aid = create_ad(name, create_creative(f"{name}_creative", spec))
            out.append({"name": name, "ad_id": aid, "ok": True}); print(f"OK  {name}  {aid}", flush=True)
        except Exception as e:
            out.append({"name": name, "ok": False, "error": str(e)}); print(f"ERR {name}: {e}", flush=True)
    json.dump(out, open("results_carousels.json", "w"), indent=2, ensure_ascii=False)
    return out


if __name__ == "__main__":
    flags = set(sys.argv[1:])
    do_all = not flags
    if do_all or "--statics" in flags:   run_statics()
    if do_all or "--videos" in flags:    run_videos()
    if do_all or "--carousels" in flags: run_carousels()
    print("done")
