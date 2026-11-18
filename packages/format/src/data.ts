// ERIC · formatos de data/hora (pt-BR). Ver referencia/guidelines/FORMATOS.md.
const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** dd/mm/aaaa */
export function formatData(d: Date): string {
  return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;
}

/** dd/mm — usa quando a data é do ano corrente (passe `referencia` para outro ano-base). */
export function formatDataCurta(d: Date): string {
  return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}`;
}

/** d de mês de aaaa */
export function formatDataExtenso(d: Date): string {
  return `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;
}

/** HH:mm (24h) */
export function formatHora(d: Date): string {
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

/** dd/mm · HH:mm */
export function formatDataHora(d: Date): string {
  return `${formatDataCurta(d)} · ${formatHora(d)}`;
}

function mesmoDia(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function ontem(a: Date, agora: Date): boolean {
  const d = new Date(agora);
  d.setDate(d.getDate() - 1);
  return mesmoDia(a, d);
}

/** agora · há 12 min · há 2 h · ontem · dd/mm */
export function formatRelativo(d: Date, agora: Date = new Date()): string {
  const diffMs = agora.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "agora";
  if (diffMin < 60) return `há ${diffMin} min`;
  if (mesmoDia(d, agora)) return `há ${Math.floor(diffMin / 60)} h`;
  if (ontem(d, agora)) return "ontem";
  return formatDataCurta(d);
}

/** vence hoje · vence em N dias · venceu dd/mm (prefixado "Atrasada · " quando já passou) */
export function formatPrazo(venceEm: Date, agora: Date = new Date()): string {
  const diffDias = Math.ceil((venceEm.getTime() - agora.getTime()) / 86_400_000);

  if (mesmoDia(venceEm, agora)) return "vence hoje";
  if (diffDias > 0) return `vence em ${diffDias} dias`;
  return `Atrasada · venceu ${formatDataCurta(venceEm)}`;
}

/** n,n dias / n h — recebe a duração em horas. */
export function formatDuracao(horas: number): string {
  if (horas < 24) return `${Math.round(horas)} h`;
  const dias = horas / 24;
  return `${dias.toFixed(1).replace(".", ",")} dias`;
}
