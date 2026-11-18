// ERIC · mensagens padrão pt-BR. Ver referencia/guidelines/MENSAGENS.md.
// Regras: frase normal, sem "Atenção:", sem "por favor" repetido, sem exclamação, sem culpar a
// pessoa ("você errou"). Botões nunca "Sim/Não/OK": sempre o verbo da ação. Cancelar à esquerda.

export const MENSAGENS = {
  /** "Informe um e-mail válido, como nome@amajari.rr.gov.br" */
  erroCampo: (oQueEsperar: string, exemplo?: string) =>
    exemplo ? `Informe ${oQueEsperar}, como ${exemplo}` : `Informe ${oQueEsperar}`,

  /** "Escolha o setor responsável" / "Informe o endereço" */
  campoObrigatorio: (verbo: "Informe" | "Escolha", campo: string) => `${verbo} ${campo}`,

  /** "Não foi possível salvar. Verifique a conexão e tente de novo." */
  erroSistema: (oQueAconteceu: string, oQueFazer = "Verifique a conexão e tente de novo.") =>
    `${oQueAconteceu} ${oQueFazer}`,

  /** { titulo: "Remover a etapa Vistoria?", consequencia: "...", confirmar: "Remover etapa" } */
  confirmacaoDestrutiva: (objeto: string, consequencia: string, verboConfirmar: string) => ({
    titulo: `${objeto}?`,
    consequencia,
    cancelar: "Cancelar",
    confirmar: verboConfirmar,
  }),

  /** "Frente enviada ao setor Iluminação Pública" */
  sucesso: (objeto: string, resultado: string) => `${objeto} ${resultado}`,

  /** "Nada aqui agora. Quando chegar algo nesta aba, aparece aqui." */
  vazio: (contexto = "nesta aba") => `Nada aqui agora. Quando chegar algo ${contexto}, aparece aqui.`,

  /** "Você não tem acesso a esta área. Peça à administração do sistema." */
  semPermissao: "Você não tem acesso a esta área. Peça à administração do sistema.",

  /** "Sem internet. O que você preencher fica salvo e é enviado quando voltar." */
  semConexao: "Sem internet. O que você preencher fica salvo e é enviado quando voltar.",

  /** "Já existe 1 solicitação parecida a 40 m. Se for o mesmo problema, a Central junta as duas." */
  duplicidade: (quantidade: number, distancia: string) =>
    `Já existe ${quantidade} solicitação${quantidade === 1 ? "" : "s"} parecida a ${distancia}. ` +
    "Se for o mesmo problema, a Central junta as duas.",

  /** Sessão encerrada com segurança (mensagem exibida no login após Sair). */
  sessaoEncerrada: "Sessão encerrada com segurança.",
} as const;
