-- Dashboard Turbo — schema D1 multi-tenant
-- Rodar no Console do D1 antes do primeiro deploy do Worker.

CREATE TABLE IF NOT EXISTS lancamentos (
  id TEXT PRIMARY KEY,
  cliente_id TEXT NOT NULL,
  nome TEXT,
  produto_principal TEXT,
  meta_inscritos INTEGER,
  data_inicio TEXT,
  data_fim TEXT,
  config_json TEXT
);

CREATE TABLE IF NOT EXISTS vendas (
  id TEXT PRIMARY KEY,
  lancamento_id TEXT NOT NULL,
  cliente_id TEXT NOT NULL,
  produto TEXT,
  tipo TEXT,
  valor REAL,
  pagamento TEXT,
  status TEXT,
  contact_id TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  first_utm_source TEXT,
  first_utm_medium TEXT,
  first_utm_campaign TEXT,
  lote TEXT,
  etapa TEXT,                -- checkout_iniciado | pix_gerado | boleto_gerado | aprovada | recusada | reembolsada
  dia TEXT,
  criado_em TEXT,
  FOREIGN KEY (lancamento_id) REFERENCES lancamentos(id)
);
CREATE INDEX IF NOT EXISTS idx_vendas_lanc   ON vendas(lancamento_id, status);
CREATE INDEX IF NOT EXISTS idx_vendas_criado ON vendas(criado_em);

CREATE TABLE IF NOT EXISTS snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lancamento_id TEXT NOT NULL,
  tirado_em TEXT,
  kpis_json TEXT
);

CREATE TABLE IF NOT EXISTS alertas_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lancamento_id TEXT,
  tipo TEXT,
  payload_json TEXT,
  disparado_em TEXT
);
CREATE INDEX IF NOT EXISTS idx_alertas_tipo ON alertas_log(lancamento_id, tipo, disparado_em);
