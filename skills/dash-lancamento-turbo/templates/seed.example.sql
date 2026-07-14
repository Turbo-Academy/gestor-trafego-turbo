-- Registrar o lançamento primeiro
INSERT OR IGNORE INTO lancamentos (id, cliente_id, nome, produto_principal, meta_inscritos, data_inicio, data_fim, config_json)
VALUES (
  'funil-8-2026-04',
  'leo-turbo',
  'Funil 8 — Turma Abril',
  'Imersão Funil 8',
  300,
  '2026-04-10T00:00:00Z',
  '2026-04-17T23:59:00Z',
  '{"plataforma":"guru","produtos":[{"match":["imersão","imersao"],"tipo":"principal","id":"imersao"},{"match":["gravação","gravacao"],"tipo":"orderbump","id":"gravacao"}],"gatilhos":[{"data":"2026-04-14","minimo":120,"acao":"Ativar lista morna"}]}'
);

-- Seed de vendas históricas (exemplo)
INSERT OR IGNORE INTO vendas (id, lancamento_id, cliente_id, produto, tipo, valor, pagamento, status, contact_id, utm_source, dia, criado_em)
VALUES
  ('v001','funil-8-2026-04','leo-turbo','Imersão Funil 8','principal',497,'pix','aprovada','c001','instagram','10/04','2026-04-10T14:20:00Z'),
  ('v002','funil-8-2026-04','leo-turbo','Gravação','orderbump',97,'pix','aprovada','c001','instagram','10/04','2026-04-10T14:20:05Z');
