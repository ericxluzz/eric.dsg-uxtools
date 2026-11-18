// ERIC · máscaras de dados pessoais (pt-BR). Ver referencia/guidelines/FORMATOS.md.
function somenteDigitos(valor: string): string {
  return valor.replace(/\D/g, "");
}

/** 222.•••.•••-22 — mantém os 3 primeiros dígitos e os 2 últimos (dígitos verificadores). */
export function mascararCPF(cpf: string): string {
  const d = somenteDigitos(cpf).padStart(11, "0").slice(0, 11);
  return `${d.slice(0, 3)}.•••.•••-${d.slice(9, 11)}`;
}

/** 222.333.444-55 — sem máscara, para quando a pessoa tem permissão de ver o CPF completo. */
export function formatCPF(cpf: string): string {
  const d = somenteDigitos(cpf).padStart(11, "0").slice(0, 11);
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9, 11)}`;
}

/** (95) •••••-3380 — mantém DDD e os 4 últimos dígitos; mascara o restante. */
export function mascararTelefone(telefone: string): string {
  const d = somenteDigitos(telefone);
  const ddd = d.slice(0, 2);
  const resto = d.slice(2);
  const ultimos4 = resto.slice(-4);
  const mascarados = "•".repeat(Math.max(resto.length - 4, 4));
  return `(${ddd}) ${mascarados}-${ultimos4}`;
}

/** (95) 99999-3380 — sem máscara. */
export function formatTelefone(telefone: string): string {
  const d = somenteDigitos(telefone);
  const ddd = d.slice(0, 2);
  const resto = d.slice(2);
  if (resto.length === 9) return `(${ddd}) ${resto.slice(0, 5)}-${resto.slice(5)}`;
  return `(${ddd}) ${resto.slice(0, 4)}-${resto.slice(4)}`;
}

/** NNNNN-NNN */
export function formatCEP(cep: string): string {
  const d = somenteDigitos(cep).padStart(8, "0").slice(0, 8);
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}
