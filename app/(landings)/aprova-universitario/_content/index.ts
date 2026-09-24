/**
 * Conteúdo da LP /aprova-universitario ("Anatomia, Bioquímica e Fisiologia",
 * Aprova Universitário). Copy extraída do export Webflow em
 * `_design/aprova-universitario/`. Texto em negrito no design é marcado
 * com **asteriscos** e renderizado pelo helper <Rich>.
 *
 * Assinatura R$ 79,00 por mês (de R$ 699). Todos os CTAs "Assine agora" e
 * "Assinar" levam ao checkout; "Sou aluno" leva ao login da plataforma.
 */

// URLs do design (Webflow). Confirmar `oferta` e `productCode` com o Rodrigo.
export const CHECKOUT_HREF =
  "https://checkout.aprovauniversitario.com.br/lead?oferta=a2mN40000001z1RIAQ&productCode=aprovauniversitario-aprova-universitario";
export const LOGIN_HREF = "https://app.aprovauniversitario.com.br/login";
export const SITE_HREF = "https://www.aprovauniversitario.com.br/";
export const TERMOS_HREF = "https://www.aprovauniversitario.com.br/termos-de-uso";
export const EMAIL_CONTATO = "contato@aprovauniversitario.com.br";
export const WHATSAPP_VENDAS = "(48) 98823-3020";

/**
 * Formulário "Planos de Ensino": no design é o embed do ActiveCampaign
 * (form 281), que envia por JSONP para proc.php. Endpoint e campos ocultos
 * abaixo vêm do embed. Vazio = modo preview (valida, dispara o evento e
 * avança sem enviar).
 */
export const FORM_ENDPOINT = "https://aprovatotal.activehosted.com/proc.php";
export const FORM_CAMPOS_OCULTOS = {
  u: "281",
  f: "281",
  s: "",
  c: "0",
  m: "0",
  act: "sub",
  v: "2",
  or: "155eccb9dc63c7ad5b0905aaf28fd9b4",
} as const;
/** Nomes dos campos de UTM no ActiveCampaign (field[id]). */
export const FORM_CAMPOS_UTM = { utm_medium: "field[176]", utm_source: "field[190]", utm_content: "field[175]" } as const;
export const CAMPANHA = "aprova-universitario";

export const IMG = "/images/aprova-universitario";
export const VIDEO = "/videos/aprova-universitario";

export const PRECO = {
  valor: "R$ 79,00",
  periodo: "/mês",
  de: "699",
  garantia: "🛡 7 dias de garantia. Não gostou, devolvemos 100% do valor. Sem burocracia",
} as const;

export const conteudo = {
  nav: { logoAlt: "Aprova Universitário", aluno: "Sou aluno", assinar: "Assinar", menu: "Abrir menu" },

  hero: {
    h1: "Você não precisa surtar no ciclo inicial da área da saúde",
    p: "Anatomia, Bioquímica, Fisiologia e mais 8 disciplinas explicadas com aulas curtas e visuais, pra quem precisa entender rápido e mandar bem nas provas",
    cta: "Assine agora",
    nota: "Milhares de estudantes já estudam pelo único curso do Brasil feito pro ciclo básico de Biológicas",
    videoAlt: "Professora em um laboratório apresentando as aulas do Aprova Universitário",
  },

  praQuem: {
    h2: "Esse reforço foi criado para quem:",
    itens: [
      "Está no início de Medicina, Odonto, Biomedicina, Enfermagem, Fisioterapia, Psicologia, Educação Física, Farmácia e Nutrição",
      "Sente que a faculdade não ensina, só joga conteúdo",
      "Precisa revisar com foco e entender de verdade, não decorar",
      "Trabalha, tem FIES ou vive com tempo contado",
    ],
    p: "Você não precisa decorar um livro de 400 páginas, **precisa lembrar o que realmente importa e aplicar.**",
    imagemAlt: "Plataforma do Aprova Universitário aberta em três celulares",
  },

  dificil: {
    h2: "Você achou que o difícil era entrar…",
    sub: "Mas ninguém te contou como seria enfrentar tudo isso de uma vez:",
    itens: [
      "Professores que explicam como se você já tivesse feito o curso",
      "Livros técnicos que mais confundem do que ensinam",
      "Zero suporte, pouco tempo e muita cobrança",
    ],
    p: "**Esse problema tem nome: o ensino do ciclo básico foi montado pra quem já sabe, não pra quem está chegando agora.** Por isso parece que todo mundo acompanha, menos você.",
    imagemAlt: "Plataforma do Aprova Universitário no notebook e no celular",
  },

  antesDepois: {
    h2: "O que muda quando a matéria finalmente faz sentido?",
    cards: [
      {
        foto: "antes",
        alt: "Estudante cansado, cercado de livros, antes do Aprova Universitário",
        titulo: "Antes do Aprova Universitário",
        p: "Você saía da aula sem entender o que tinha sido dado.",
        itens: [
          "Lia a mesma página três vezes e ela continuava sem sentido",
          "Estudava horas, mas sem saber se era o que ia cair",
          "Chegava na prova torcendo pra dar sorte",
          "Passava raspando, com medo de não conseguir de novo",
        ],
      },
      {
        foto: "depois",
        alt: "Estudante tranquilo estudando pela plataforma, depois do Aprova Universitário",
        titulo: "Depois do Aprova Universitário",
        p: "Você abre o conteúdo e, em poucos minutos, a matéria faz sentido.",
        itens: [
          "Assiste a uma aula curta e entende o que antes travava",
          "Sabe o que revisar primeiro",
          "Chega na prova reconhecendo a matéria, não torcendo",
          "Estuda no seu ritmo e sente que está no controle",
        ],
      },
    ],
    cta: "Assine agora",
  },

  solucao: {
    h2: "É aqui que entra a solução que faltava pra você respirar",
    p1: "Um reforço inteligente para **entender de verdade** Anatomia, Bioquímica, Fisiologia e todas as matérias mais temidas do ciclo inicial, sem surtar no processo.",
    p2: "Você não precisa de mais conteúdo, **você precisa de clareza e é isso que a gente entrega.**",
    cards: [
      { icone: "video", t: "**Aulas com produção visual cinematográfica e explicações diretas ao ponto**" },
      { icone: "livro", t: "**Mapas mentais prontos para fixar o conteúdo**" },
      { icone: "cerebro", t: "**Quizzes com feedback imediato** em cada aula" },
      { icone: "grade", t: "**+2.100 questões** separadas por disciplina" },
    ],
  },

  disciplinas: {
    h2: "As disciplinas que você vai dominar",
    itens: [
      { foto: "anatomia", alt: "Ilustração de Anatomia: corpo humano com o sistema circulatório em destaque", nome: "Anatomia", p: "Estude a estrutura do corpo humano de forma integrada e visual. Ideal para quem precisa visualizar para entender." },
      { foto: "bioquimica", alt: "Ilustração de Bioquímica: estrutura molecular em azul", nome: "Bioquímica", p: "Aprenda como as reações bioquímicas transformam os nutrientes em energia e compreenda os principais ciclos, enzimas e processos metabólicos do organismo." },
      { foto: "fisiologia", alt: "Ilustração de Fisiologia: cérebro e sistema nervoso iluminados", nome: "Fisiologia", p: "Veja como o corpo funciona de verdade. Entenda os principais mecanismos dos sistemas (nervoso, cardiovascular, respiratório etc.) com esquemas e explicações claras." },
      { foto: "histologia", alt: "Ilustração de Histologia: microscópio sobre uma lâmina de tecido", nome: "Histologia", p: "Aprenda a identificar os tecidos do corpo em nível microscópico. Entenda como as células se organizam para formar os tecidos que compõem os órgãos e como essa organização se relaciona com as funções fisiológicas." },
      { foto: "patologia", alt: "Ilustração de Patologia: células alteradas vistas em microscopia", nome: "Patologia", p: "Veja o que pode acontecer quando algo dá errado no corpo. Foco em inflamações, lesões, necroses e adaptações celulares, sempre com relação à prática clínica." },
      { foto: "microbiologia", alt: "Ilustração de Microbiologia: bactérias e micro-organismos", nome: "Microbiologia", p: "Entenda as principais características de vírus, bactérias e fungos e compreenda como esses agentes infecciosos atuam no organismo e impactam sua saúde." },
      { foto: "imunologia", alt: "Ilustração de Imunologia: anticorpos atacando um vírus", nome: "Imunologia", p: "Aprenda como funciona o sistema imunológico e saiba identificar os diferentes tipos de imunidade que protegem o nosso corpo." },
      { foto: "genetica", alt: "Ilustração de Genética: fita de DNA em azul", nome: "Genética", p: "Genética vai muito além do DNA. Entenda como variações no nosso genótipo podem impactar o funcionamento do organismo." },
      { foto: "parasitologia", alt: "Ilustração de Parasitologia: parasita visto ao microscópio", nome: "Parasitologia", p: "Estude os principais parasitas que afetam os seres humanos e as doenças que eles causam. Aprenda a reconhecer, prevenir e compreender as infecções parasitárias mais comuns." },
      { foto: "farmacologia", alt: "Ilustração de Farmacologia: cápsula de medicamento com partículas", nome: "Farmacologia", p: "Entenda como os medicamentos agem no corpo, explorando os princípios de farmacocinética, farmacodinâmica e os possíveis efeitos adversos das diferentes classes farmacológicas." },
      { foto: "embriologia", alt: "Ilustração de Embriologia: embrião humano em desenvolvimento", nome: "Embriologia", p: "Entenda o desenvolvimento humano desde a gametogênese até a formação dos sistemas orgânicos." },
    ],
  },

  comparativo: {
    h2: "Entenda como o Aprova Universitário pode auxiliar na sua graduação",
    dica: "← Deslize pra comparar →",
    colunas: ["Aprova Universitário", "Monitoria particular", "Livro técnico", "Estudar sozinho"],
    linhas: [
      { criterio: "Explica de forma clara e visual", valores: ["sim", "parcial", "nao", "nao"] },
      { criterio: "Disponível na hora que você trava", valores: ["sim", "nao", "sim", "sim"] },
      { criterio: "Mostra o que priorizar pra prova", valores: ["sim", "parcial", "nao", "nao"] },
      { criterio: "Aulas curtas que cabem na rotina", valores: ["sim", "nao", "nao", "parcial"] },
      { criterio: "Você estuda no seu ritmo", valores: ["sim", "nao", "sim", "sim"] },
    ],
    investimento: {
      criterio: "Investimento",
      valores: [
        { valor: "R$ 79,00", unidade: "/mês", nota: "todas as disciplinas" },
        { valor: "R$ 100", unidade: "/hora" },
        { valor: "R$ 50 a 150", nota: "por livro" },
        { valor: "Grátis" },
      ],
    },
    rotulos: { sim: "Sim", nao: "Não", parcial: "Parcial" },
  },

  oferta: {
    bonusTitulo: "Bônus exclusivos:",
    bonus: ["Mapas mentais prontos para fixar o conteúdo", "Quizzes com feedback imediato em cada aula"],
    resumo: "11 matérias, mais de 2100 questões separadas por disciplina, mapas mentais, videoaulas curtas e objetivas e muito mais por apenas",
    de: "de R$",
    por: "por",
    cta: "Assine agora",
  },

  jubilut: {
    h2: "Criado por Paulo Jubilut, o maior professor de Biologia do Brasil",
    p1: "O Aprova Universitário nasceu de uma constatação simples: pra muito calouro, o sufoco recomeça na primeira semana de aula.",
    p2: "Por isso ele tem a direção de Paulo Jubilut, criador do maior canal de Biologia do Brasil no YouTube, com mais de 6 milhões de estudantes acompanhados, que conduziu a maior aula de Biologia do mundo, reconhecida pelo Guinness World Records. Ele traz esse mesmo método para dentro da sua faculdade.",
    fotoAlt: "Prof. Paulo Jubilut",
    selos: [
      { icone: "selo", t: "**+6 milhões** de alunos impactados" },
      { icone: "globo", t: "**Guinness World Records**" },
      { icone: "foguete", t: "**Pioneiro no ensino online no Brasil**" },
    ],
  },

  depoimentos: {
    h2: "Antes de ajudar você a enfrentar o ciclo inicial, a gente já ajudou milhares a conquistar a vaga",
    itens: [
      {
        texto: "“Muita coisa a gente precisa estudar em casa, e o Aprova Universitário virou meu aliado nisso. Quando fico com dúvida na aula, abro a plataforma e reviso o que estudei no dia. Na prova, uso pra revisar os pontos mais importantes, e nas atividades dá pra fazer as questões e ver se realmente entendi. Os resumos são maravilhosos.”",
        foto: "herica",
        fotoAlt: "Foto de Hérica, estudante de Medicina da UFSC",
        nome: "Hérica",
        curso: "Estudante de Medicina da UFSC",
      },
      {
        texto: "“O primeiro semestre de Medicina tem muitos desafios: cidade nova, método de ensino diferente, muitas provas e muito conteúdo. O Aprova Universitário tem me ajudado a fazer revisões antes das aulas. As aulas são incríveis, quem conhece o Aprova já entende a qualidade. Tô amando a experiência.”",
        foto: "ana-julia",
        fotoAlt: "Foto de Ana Júlia, estudante de Medicina da Unifamec",
        nome: "Ana Júlia",
        curso: "Estudante de Medicina da Unifamec",
      },
      {
        texto: "“O Aprova Total tem sido essencial nesse início, pois o universo de estudos para a faculdade foge de como se estuda para o vestibular. Até eu me adaptar aos livros fiz uso exclusivo das aulas para me situar nesse universo novo.”",
        foto: "emanuel",
        fotoAlt: "Foto de Emanuel Pereira, estudante de Medicina da UFRN",
        nome: "Emanuel Pereira",
        curso: "Estudante de Medicina da UFRN",
      },
    ],
  },

  banner: {
    h2: "A faculdade não precisa travar você",
    p: "Aprenda as matérias mais difíceis com um método leve e direto. Cabe na sua rotina, sem pesar na cabeça.",
    cta: "Assine agora",
  },

  planos: {
    h2: "Baixe os Planos de Ensino do Aprova Universitário",
    p1: "Quer entender exatamente como cada disciplina é organizada?",
    p2: "Acesse os **planos de ensino de todas as matérias**, incluindo carga horária, módulos, conteúdos abordados e diferenciais da nossa metodologia.",
    form: {
      titulo: "Preencha o formulário abaixo para acessar o Guia com os planos de ensino",
      nome: "Nome completo",
      nomePlaceholder: "Digite seu nome",
      email: "Email",
      emailPlaceholder: "Digite seu email",
      whatsapp: "WhatsApp",
      ddi: "+55",
      whatsappPlaceholder: "11 96123-4567",
      obrigatorio: "*",
      enviar: "Acessar agora",
      enviando: "Enviando...",
      erroNome: "Digite seu nome completo.",
      erroEmail: "Digite um e-mail válido.",
      erroWhatsapp: "Digite um WhatsApp com DDD.",
      erroEnvio: "Não foi possível enviar agora. Tente de novo em instantes.",
      // A mensagem de agradecimento vem do ActiveCampaign na resposta do
      // envio. Este texto só aparece no modo preview (FORM_ENDPOINT vazio).
      obrigado: "Recebemos seus dados. Em instantes você recebe o Guia com os planos de ensino no seu e-mail.",
    },
  },

  faq: {
    h2: "FAQ",
    itens: [
      {
        q: "Esse conteúdo vai realmente me ajudar nas provas da faculdade?",
        a: "Sim! O Aprova Universitário foi criado especialmente para o ciclo inicial da área da saúde, com videoaulas no formato microlearning, quizzes e resumos visuais focados em **aprendizado real e retenção**. Nada de teoria solta ou excesso de complexidade, aqui você aprende o que realmente precisa saber para passar.",
      },
      {
        q: "Vale mais a pena que uma monitoria ou professor particular?",
        a: "A monitoria de Medicina custa mais de R$ 100/hora e você precisa encaixar na agenda de outra pessoa. Professor particular sai R$ 150-250/hora. Aqui você paga R$ 499 pelo ano inteiro, estuda quando quiser e tem acesso a **TODAS as disciplinas**.",
      },
      {
        q: "Como as aulas funcionam? Consigo usar mesmo com pouco tempo?",
        a: "As videoaulas seguem o formato de **microlearning**: são curtas, diretas e eficazes. Cada aula inclui materiais de apoio e quiz para reforçar o conteúdo. Você pode estudar pelo celular no ônibus, na pausa do almoço ou à noite. Formato **on-demand**: você escolhe o que estudar quando sentir necessidade.",
      },
      {
        q: "Funciona para quem já está atrasado nas matérias ou em períodos avançados?",
        a: "Funciona ainda melhor! O conteúdo é focado nas disciplinas do ciclo inicial, mas é útil para estudantes de **todos os períodos,** especialmente para revisitar conceitos fundamentais ou reforçar a base teórica ao longo da graduação.",
      },
      {
        q: "Posso acompanhar meu progresso? Como funciona a plataforma?",
        a: "Sim! A seção \"Minhas métricas\" permite visualizar seu progresso, com detalhes sobre conteúdos acessados e tempo de estudo. As disciplinas estão disponíveis em cards e cada uma é dividida em módulos por assuntos. Você também pode favoritar conteúdos para acesso posterior.",
      },
      {
        q: "E se eu não gostar ou não der certo pra mim?",
        a: "Você tem 7 dias para testar sem compromisso. Se não funcionar ou não gostar, é só cancelar e receber 100% do dinheiro de volta. Sem perguntas, sem burocracia.",
      },
      {
        q: "Por quanto tempo tenho acesso depois que pagar?",
        a: "Um ano completo. Não tem essa de \"só 6 meses\" ou acesso limitado. Você paga uma vez e usa o ano inteiro, quantas vezes quiser, de qualquer lugar.",
      },
      {
        q: "Quem está por trás disso?",
        a: "Somos criados pelos mesmos fundadores do **Aprova Total**, uma das maiores referências no ensino pré-vestibular do Brasil, com mais de 1 milhão de alunos impactados e milhares de aprovações em Medicina. Agora, estamos ao seu lado também na faculdade.",
      },
      {
        q: "Posso usar junto com o conteúdo da minha faculdade?",
        a: "Sim. O Aprova Universitário é o reforço que entra junto com o conteúdo da sua faculdade: você usa pra entender o que ficou confuso na aula, revisar antes das provas e fixar as matérias do ciclo básico.",
      },
    ],
    ajuda: "Precisa de ajuda?",
  },

  rodape: {
    logoAlt: "Aprova Universitário",
    termos: "Termos de uso",
    vendasRotulo: "Número Oficial de Vendas",
    empresa: ["Aprova Total Educação S.A.", "18.311.735/0001-00", "Florianópolis/SC"],
    emailExibido: "Contato@aprovauniversitario.com.br",
    copyright: "Aprova Universitário, 2026.",
  },
} as const;

/** FAQ sem a marcação de negrito, para o JSON-LD. */
export const faqTextoPuro = conteudo.faq.itens.map((it) => ({ q: it.q, a: it.a.replace(/\*\*/g, "") }));
