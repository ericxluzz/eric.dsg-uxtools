import {
  formatContagem,
  formatData,
  formatDataExtenso,
  formatDataHora,
  formatDuracao,
  formatMoeda,
  formatPorcentagem,
  formatPrazo,
  formatProtocolo,
  formatRelativo,
  MENSAGENS,
  mascararCPF,
  mascararTelefone,
} from "@eric/format";

const AGORA = new Date(2026, 9, 29, 14, 30);

const EXEMPLOS: Array<{ codigo: string; resultado: string }> = [
  { codigo: 'formatData(new Date(2026, 9, 29))', resultado: formatData(new Date(2026, 9, 29)) },
  { codigo: "formatDataExtenso(new Date(2026, 9, 29))", resultado: formatDataExtenso(new Date(2026, 9, 29)) },
  { codigo: "formatDataHora(agora)", resultado: formatDataHora(AGORA) },
  { codigo: "formatRelativo(hámuito, agora)", resultado: formatRelativo(new Date(2026, 9, 29, 12, 20), AGORA) },
  { codigo: 'formatPrazo(new Date(2026, 9, 27), agora)', resultado: formatPrazo(new Date(2026, 9, 27), AGORA) },
  { codigo: "formatDuracao(57.6)", resultado: formatDuracao(57.6) },
  { codigo: "formatMoeda(1250)", resultado: formatMoeda(1250) },
  { codigo: "formatPorcentagem(94)", resultado: formatPorcentagem(94) },
  { codigo: 'mascararCPF("22233344422")', resultado: mascararCPF("22233344422") },
  { codigo: 'mascararTelefone("95999993380")', resultado: mascararTelefone("95999993380") },
  {
    codigo: 'formatProtocolo({ sigla: "ama", ano: 2026, numero: 105 })',
    resultado: formatProtocolo({ sigla: "ama", ano: 2026, numero: 105 }),
  },
  { codigo: 'formatContagem(3, "frente")', resultado: formatContagem(3, "frente") },
];

function Linha({ codigo, resultado }: { codigo: string; resultado: string }) {
  return (
    <tr>
      <td style={{ padding: "8px 10px", fontFamily: "var(--e-font-mono)", fontSize: 12, borderTop: "1px solid var(--c-border)" }}>
        {codigo}
      </td>
      <td style={{ padding: "8px 10px", fontSize: 13, fontWeight: 600, borderTop: "1px solid var(--c-border)" }}>
        {resultado}
      </td>
    </tr>
  );
}

export function FormatosPage() {
  return (
    <>
      <p style={{ fontSize: 12, color: "var(--c-text-2)", margin: "0 0 4px" }}>Fase 6</p>
      <h1 style={{ fontSize: 22, lineHeight: "28px", fontWeight: 600, margin: "0 0 8px" }}>
        Formatos e mensagens
      </h1>
      <p style={{ fontSize: 13, color: "var(--c-text-2)", margin: "0 0 16px", maxWidth: 560 }}>
        Helpers de <code>@eric/format</code>, gerados a partir de referencia/guidelines/FORMATOS.md e
        MENSAGENS.md.
      </p>

      <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 10px" }}>@eric/format</h2>
      <table style={{ width: "100%", maxWidth: 640, borderCollapse: "collapse", marginBottom: 24 }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "6px 10px", fontSize: 11, textTransform: "uppercase", color: "var(--c-text-3)", background: "var(--c-surface-2)" }}>
              Chamada
            </th>
            <th style={{ textAlign: "left", padding: "6px 10px", fontSize: 11, textTransform: "uppercase", color: "var(--c-text-3)", background: "var(--c-surface-2)" }}>
              Resultado
            </th>
          </tr>
        </thead>
        <tbody>
          {EXEMPLOS.map((e) => (
            <Linha key={e.codigo} {...e} />
          ))}
        </tbody>
      </table>

      <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 10px" }}>MENSAGENS (i18n pt-BR)</h2>
      <ul style={{ maxWidth: 640, fontSize: 13, lineHeight: "22px", color: "var(--c-text-2)" }}>
        <li>
          <code>MENSAGENS.campoObrigatorio("Escolha", "o setor responsável")</code> →{" "}
          {MENSAGENS.campoObrigatorio("Escolha", "o setor responsável")}
        </li>
        <li>
          <code>MENSAGENS.sucesso("Frente", "enviada ao setor Iluminação Pública")</code> →{" "}
          {MENSAGENS.sucesso("Frente", "enviada ao setor Iluminação Pública")}
        </li>
        <li>
          <code>MENSAGENS.semPermissao</code> → {MENSAGENS.semPermissao}
        </li>
        <li>
          <code>MENSAGENS.semConexao</code> → {MENSAGENS.semConexao}
        </li>
      </ul>
    </>
  );
}
