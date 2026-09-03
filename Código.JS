/* =============================================================
   dados.js  —  FONTE ÚNICA DE DADOS DO SITE
   -------------------------------------------------------------
   Tudo que aparece no catálogo, na matriz de compatibilidade e
   nos textos técnicos vem daqui. Para atualizar o site, edite
   este arquivo — não é necessário mexer no HTML.

   ORIGEM DOS DADOS: extraídos de www.rodopar.net (páginas
   inicial, Produtos e Serviços) em 03/09/2026.

   ATENÇÃO: campos marcados com  verificar: true  contêm
   informação incompleta ou divergente no site atual e precisam
   de confirmação da Engenharia / Comercial antes de publicar.
   ============================================================= */

const EMPRESA = {
  nome: 'Rodopar',
  fundacao: 1991,
  cidade: 'Lauro de Freitas',
  uf: 'BA',
  endereco: 'Loteamento Varandas Tropicais, Rua Araponga, 544, Qd 01 - Lote 31, Pitangueiras',
  cep: '42701-330',
  telefone: '(71) 3379-1330',
  telefoneLink: 'tel:+557133791330',
  whatsapp: '(71) 99380-3830',
  whatsappNumero: '5571993803830',
  email: 'rodopar@rodopar.ind.br',
  atendimento: 'Segunda a sexta, das 7h às 17h',
  site: 'https://www.rodopar.net',
  instagram: 'https://www.instagram.com/rodopar_mineracao/',
  linkedin: 'https://www.linkedin.com/company/26267521/',
  facebook: 'https://www.facebook.com/rodoparmineracao/',
  catalogoGeral: 'https://www.rodopar.net/_files/ugd/9ebff8_ff04716c8c5d4511b81246e437a8393e.pdf',
  catalogoProdutos: 'https://www.rodopar.net/_files/ugd/9ebff8_000efa4218034fa5868d34678dc86e66.pdf'
};

/* Roscas usadas como filtro. A ordem aqui é a ordem dos chips. */
const ROSCAS = ['R25', 'R28', 'R32', 'R38', 'T38', 'T45', 'T51', 'ST58'];

/* Métodos de perfuração — usados no diagrama da coluna e no filtro */
const METODOS = {
  tophammer: 'Top hammer',
  conica: 'Perfuração cônica',
  dth: 'Fundo de furo (DTH)'
};

/* =============================================================
   FAMÍLIAS DE PRODUTO
   -------------------------------------------------------------
   id          -> usado nos links e filtros (não repetir)
   nome        -> título do cartão
   alias       -> nome comercial alternativo, entra na busca
   metodo      -> um ou mais de METODOS
   posicao     -> onde fica na coluna de perfuração
   roscas      -> lista de roscas confirmadas no site
   modelos     -> modelos/conicidades confirmados no site
   funcao      -> o que a peça faz, em linguagem de campo
   escolha     -> o que pesar na hora de especificar
   verificar   -> true quando falta dado ou há divergência
   pendencia   -> descreve o que precisa ser confirmado
   ============================================================= */
const FAMILIAS = [
  {
    id: 'bits-roscados',
    nome: 'Bits roscados',
    alias: 'button bit bits de botão',
    icone: 'bit',
    metodo: ['tophammer'],
    posicao: 'Ponta da coluna',
    roscas: ['R25', 'R28', 'R32', 'R38', 'T38', 'T45', 'T51', 'ST58'],
    modelos: [],
    funcao: 'Recebe o impacto transmitido pela haste e fragmenta a rocha pelos insertos de metal duro na face. É o item que define avanço, consumo e custo por metro perfurado.',
    escolha: 'Diâmetro do furo, dureza e abrasividade da rocha, formato dos insertos e capacidade de sopro do equipamento.',
    verificar: true,
    pendencia: 'O site lista R38 no texto da página inicial, mas o cartão da página de produtos traz apenas R25, R28, R32, T38, T45, T51 e ST58. Confirmar a lista real de roscas e a faixa de diâmetros ofertada.'
  },
  {
    id: 'bits-retracs',
    nome: 'Bits retrac',
    alias: 'retrac saia estriada',
    icone: 'retrac',
    metodo: ['tophammer'],
    posicao: 'Ponta da coluna',
    roscas: ['R32', 'R38', 'T38', 'T45', 'T51', 'ST58'],
    modelos: [],
    funcao: 'Bit com saia estriada, projetada para recuar a coluna em furo instável ou com desmoronamento. Reduz risco de prisão da ferramenta.',
    escolha: 'Indicado em rocha fraturada, furo longo ou onde já houve histórico de coluna presa.',
    verificar: false,
    pendencia: ''
  },
  {
    id: 'bits-alargadores',
    nome: 'Bits alargadores',
    alias: 'reaming bit alargador',
    icone: 'alargador',
    metodo: ['tophammer'],
    posicao: 'Ponta da coluna',
    roscas: ['R32', 'R38', 'T38', 'T45', 'T51', 'ST58'],
    modelos: [],
    funcao: 'Abre o furo já executado para um diâmetro maior, geralmente para alojar tubulação, ancoragem ou boca de furo de desmonte.',
    escolha: 'Diâmetro final desejado e diâmetro do furo piloto existente.',
    verificar: false,
    pendencia: ''
  },
  {
    id: 'cone-bits',
    nome: 'Cone bits (taper bits)',
    alias: 'bit cônico taperbit',
    icone: 'conebit',
    metodo: ['conica'],
    posicao: 'Ponta da coluna',
    roscas: [],
    modelos: ['3 graus', '5,5 graus'],
    funcao: 'Bit de encaixe cônico, sem rosca, usado com haste cônica sextavada em perfuratriz manual e serviços de pequeno diâmetro.',
    escolha: 'A conicidade tem de ser a mesma da haste. Misturar 3° com 5,5° causa perda de energia e trava a montagem.',
    verificar: false,
    pendencia: ''
  },
  {
    id: 'pilotos-coroas',
    nome: 'Pilotos e coroas alargadoras',
    alias: 'pilot adapter coroa',
    icone: 'piloto',
    metodo: ['tophammer'],
    posicao: 'Ponta da coluna',
    roscas: [],
    modelos: [],
    funcao: 'Conjunto piloto + coroa que guia o alargamento a partir do furo já perfurado, mantendo o alinhamento.',
    escolha: 'Precisa casar com o diâmetro do furo piloto e com o alargador escolhido.',
    verificar: true,
    pendencia: 'O site apresenta a família sem especificar roscas, diâmetros ou modelos. Levantar a linha efetivamente produzida.'
  },
  {
    id: 'bits-dth',
    nome: 'Bits fundo de furo (DTH)',
    alias: 'down the hole martelo de fundo',
    icone: 'dth',
    metodo: ['dth'],
    posicao: 'Ponta da coluna',
    roscas: [],
    modelos: ['BR33', 'CIR90', 'MISSION', 'COP DHD'],
    funcao: 'Trabalha acoplado ao martelo que desce dentro do furo. O impacto acontece junto à rocha, o que mantém a energia e a retilineidade em furo profundo.',
    escolha: 'O modelo é definido pelo martelo em uso. O encaixe é específico de cada fabricante de martelo.',
    verificar: true,
    pendencia: 'O site grafa "Dow The Hole"; o termo correto é "Down The Hole". Confirmar também a lista completa de encaixes e diâmetros por modelo.'
  },
  {
    id: 'punhos',
    nome: 'Punhos (shanks)',
    alias: 'shank adapter punho adaptador',
    icone: 'punho',
    metodo: ['tophammer', 'conica'],
    posicao: 'Topo da coluna',
    roscas: [],
    modelos: ['COP131', 'COP1838', 'VL140', 'YH80', 'HLX1', 'HLX5', 'HL500', 'HL600', 'HL700'],
    funcao: 'Primeira peça da coluna. Recebe a percussão e a rotação da perfuratriz e transmite para a haste. Item de desgaste crítico: falha de punho para a frente de serviço.',
    escolha: 'Definido pelo modelo do martelo hidráulico da perfuratriz, não pela rocha.',
    verificar: true,
    pendencia: 'A página inicial e a página de produtos listam conjuntos diferentes de modelos (YH80 aparece só na página de produtos). Consolidar a lista.'
  },
  {
    id: 'luvas',
    nome: 'Luvas e adaptadores',
    alias: 'coupling luva adaptador de rosca',
    icone: 'luva',
    metodo: ['tophammer'],
    posicao: 'Emenda da coluna',
    roscas: ['R25', 'R28', 'R32', 'R38', 'T38', 'T45', 'T51'],
    modelos: ['Macho/Fêmea'],
    funcao: 'Emenda hastes entre si e liga a haste ao punho. Adaptadores permitem unir roscas diferentes na mesma coluna.',
    escolha: 'Rosca das duas pontas e comprimento. Luva alongada ou trincada compromete a transmissão de energia de toda a coluna.',
    verificar: true,
    pendencia: 'O site afirma "todas as roscas" na página inicial e lista roscas específicas na página de produtos. Definir a lista oficial.'
  },
  {
    id: 'hastes',
    nome: 'Hastes para perfuração',
    alias: 'drill rod haste tubo',
    icone: 'haste',
    metodo: ['tophammer'],
    posicao: 'Corpo da coluna',
    roscas: ['R32', 'R38', 'T38', 'T45', 'T51'],
    modelos: ['Macho/Macho', 'Macho/Fêmea'],
    funcao: 'Conduz a onda de choque do punho até o bit e leva o ar ou a água de limpeza até o fundo do furo.',
    escolha: 'Rosca, comprimento e configuração de ponta (M/M ou M/F) conforme o carrossel e o curso da perfuratriz.',
    verificar: true,
    pendencia: 'Comprimentos disponíveis não constam no site. Levantar a grade padrão de fabricação.'
  },
  {
    id: 'hastes-conicas',
    nome: 'Hastes cônicas sextavadas',
    alias: 'haste sextavada taper rod',
    icone: 'hasteconica',
    metodo: ['conica'],
    posicao: 'Corpo da coluna',
    roscas: [],
    modelos: ['3 graus', '5,5 graus'],
    funcao: 'Haste de corpo sextavado com ponta cônica, para trabalhar com cone bit em perfuratriz manual.',
    escolha: 'Conicidade igual à do bit e comprimento conforme a profundidade de trabalho.',
    verificar: true,
    pendencia: 'Comprimentos e bitolas do sextavado não constam no site.'
  }
];

/* =============================================================
   SERVIÇOS  (página Serviços do site)
   ============================================================= */
const SERVICOS = [
  {
    nome: 'Usinagem de alta precisão',
    detalhe: 'Especialidade em peças de HP (alta pressão) e SHP (super alta pressão).',
    itens: []
  },
  {
    nome: 'Peças especiais sob medida',
    detalhe: 'Fabricação a partir de desenho, amostra ou croqui, com apoio no desenvolvimento do projeto.',
    itens: []
  },
  {
    nome: 'Tratamento térmico',
    detalhe: 'Fornos de atmosfera controlada com capacidade para peças de até 3,5 metros.',
    itens: ['Têmpera e revenimento', 'Cementação', 'Normalização', 'Alívio de tensões']
  }
];

/* =============================================================
   CHECKLIST DE INSPEÇÃO DE FERRAMENTA
   -------------------------------------------------------------
   Critérios QUALITATIVOS de propósito. Limites numéricos de
   desgaste, torque e número de reafiações dependem do
   equipamento e do procedimento interno — devem ser preenchidos
   pela Engenharia antes de o checklist virar padrão de campo.
   ============================================================= */
const CHECKLIST = [
  { grupo: 'Bit', item: 'Insertos de metal duro sem quebra, lasca ou perda' },
  { grupo: 'Bit', item: 'Face sem achatamento excessivo dos insertos (bit "cego")' },
  { grupo: 'Bit', item: 'Orifícios de sopro e canais de limpeza desobstruídos' },
  { grupo: 'Bit', item: 'Sem coloração de superaquecimento na região dos insertos' },
  { grupo: 'Bit', item: 'Desgaste de diâmetro e de saia dentro do limite do procedimento' },
  { grupo: 'Haste', item: 'Corpo sem empenamento visível e sem redução de seção' },
  { grupo: 'Haste', item: 'Roscas limpas, sem rebarba, amassamento ou início de trinca' },
  { grupo: 'Haste', item: 'Rosca lubrificada com graxa específica antes da montagem' },
  { grupo: 'Luva', item: 'Sem trinca longitudinal e sem alongamento das roscas' },
  { grupo: 'Punho', item: 'Estriado sem desgaste que gere folga no mandril' },
  { grupo: 'Punho', item: 'Face de impacto sem escoamento de material nem trinca' },
  { grupo: 'Coluna', item: 'Torque de aperto conforme o manual da perfuratriz' },
  { grupo: 'Registro', item: 'Metragem e número de reafiações lançados no controle da ferramenta' }
];

/* =============================================================
   SINAIS DE CAMPO
   -------------------------------------------------------------
   Modos de falha típicos de perfuração rotopercussiva. Serve
   como ponto de partida para investigação — não substitui
   análise de causa raiz nem o manual do equipamento.
   ============================================================= */
const SINAIS = [
  {
    sintoma: 'Queda de taxa de penetração com bit aparentemente inteiro',
    causa: 'Insertos achatados, pressão de percussão baixa ou limpeza de furo insuficiente',
    acao: 'Avaliar reafiação, conferir parâmetros da perfuratriz e a vazão de ar'
  },
  {
    sintoma: 'Insertos quebrados ou arrancados',
    causa: 'Rocha fraturada, rotação alta demais para a percussão ou bit já cego forçado em serviço',
    acao: 'Retirar de operação, revisar parâmetros e a política de troca por metragem'
  },
  {
    sintoma: 'Rosca do bit ou da haste com escoamento de material',
    causa: 'Aperto fora do torque, falta de graxa de rosca ou luva desgastada',
    acao: 'Revisar procedimento de montagem e substituir a luva do conjunto'
  },
  {
    sintoma: 'Desgaste acentuado do diâmetro do bit em poucos metros',
    causa: 'Rocha muito abrasiva ou limpeza deficiente devolvendo cascalho para a face',
    acao: 'Reavaliar a linha de bit especificada e a capacidade de sopro'
  },
  {
    sintoma: 'Trinca ou ruptura de haste no primeiro terço do corpo',
    causa: 'Coluna desalinhada, furo tortuoso ou percussão sem contato firme com a rocha',
    acao: 'Verificar alinhamento da lança e a técnica de início de furo (emboque)'
  },
  {
    sintoma: 'Coluna presa no furo',
    causa: 'Desmoronamento da parede, limpeza insuficiente ou acúmulo de finos',
    acao: 'Avaliar migração para bit retrac e revisar a limpeza durante o avanço'
  },
  {
    sintoma: 'Punho com vida muito abaixo da média',
    causa: 'Folga no mandril, lubrificação do martelo deficiente ou modelo incorreto',
    acao: 'Inspecionar o martelo hidráulico antes de trocar o fornecedor da peça'
  }
];

/* =============================================================
   GLOSSÁRIO
   ============================================================= */
const GLOSSARIO = [
  {
    termo: 'Perfuração rotopercussiva',
    texto: 'Método que combina impacto e rotação: a energia de percussão quebra a rocha e a rotação reposiciona os insertos para o golpe seguinte. É a base tanto do top hammer quanto do fundo de furo.'
  },
  {
    termo: 'Top hammer',
    texto: 'O martelo fica fora do furo, na perfuratriz, e a energia viaja pela coluna de hastes até o bit. Montagem mais simples e produtiva em furos curtos e médios.'
  },
  {
    termo: 'Fundo de furo (DTH)',
    texto: 'O martelo desce dentro do furo, imediatamente acima do bit. Como a energia não percorre a coluna, mantém desempenho e retilineidade em furos profundos.'
  },
  {
    termo: 'Inserto (botão) de metal duro',
    texto: 'Pastilha de carbeto de tungstênio prensada na face do bit. É o que realmente corta a rocha; o aço do bit apenas sustenta e posiciona os insertos.'
  },
  {
    termo: 'Rosca R e T',
    texto: 'Padrões de rosca de conexão da coluna. R (rope thread) e T (trapezoidal) diferem em passo e perfil; o número indica a bitola nominal, como R32 ou T45. Roscas de padrões diferentes não se conectam sem adaptador.'
  },
  {
    termo: 'Retrac',
    texto: 'Bit com saia estriada que facilita o recuo da coluna em furo instável, reduzindo o risco de prisão da ferramenta.'
  },
  {
    termo: 'Reafiação',
    texto: 'Reperfilamento dos insertos com rebolo diamantado quando o bit perde eficiência. Recupera taxa de penetração e estende a vida útil, dentro de um número limitado de ciclos.'
  },
  {
    termo: 'Sobrefuro e alargamento',
    texto: 'Abertura do furo para um diâmetro maior que o original, feita com alargador e conjunto piloto, normalmente para alojar tubulação ou ancoragem.'
  },
  {
    termo: 'Limpeza do furo',
    texto: 'Ar ou água bombeados pela coluna para retirar o cascalho. Limpeza insuficiente faz o material triturar novamente na face do bit, derrubando a produtividade e acelerando o desgaste.'
  }
];
