// Cria o textos que farão parte do questionário, como o contexto, as perguntas, as opções e os feedbacks de explicação.
export const listaDePerguntas = [
  {
    contextualizacao:
      "Durante uma aula de biologia sobre as camadas da \npele e os diferentes tipos de queimaduras, \nGiulia aprendeu que as queimaduras de 1° grau \ndanificam a epiderme (camada superficial), as de \n2° grau atingem até a derme (camamda intermediária) \ne as de 3° grau afetam até a hipoderme (camada interna).",
    pergunta:
      "De acordo com o que Giulia aprendeu, qual opção \nsobre os graus das queimaduras é correta?",
    opcoes: [
      "1° afeta apenas a epiderme, a camada interna da pele",
      "1° afeta apenas a epiderme, a camada superficial da pele.",
      "2° atinge apenas a hipoderme, a camada mais profunda da pele.",
      "3° danifica apenas a derme, a camada intermediária da pele",
    ],
    feedbacks: [
      "RESPOSTA ERRADA!",
      "RESPOSTA CERTA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
    ],
    justificativa: [
      "O correto é que queimaduras de primeiro \ngrau afetam apenas a epiderme (camada mais externa). \n1° grau: atinge somente a epiderme (externa). \n2° grau: atinge a epiderme e a derme (intermediária). \n3° grau: atinge a epiderme, a derme e a hipoderme (interna).",
    ],
  },
  {
    contextualizacao:
      "Jonathan se queimou há alguns dias enquanto \nacendia a churrasqueira. \nPorém, não foi ao médico. \nHoje, sua ferida está com um aspecto horrível, \nvermelha, com pus e dolorida.",
    pergunta: "Qual o diagnóstico mais provável? \nO que ele deve fazer?",
    opcoes: [
      "É comum, Jonathan deve apenas esperar a cicatrização.",
      "Infecção, Jonathan deve apenas lavar o ferimento.",
      "O pus indica sujeira, Jonathan deve esfregar com sabão.",
      "Infecção, Jonathan deve procurar um médico.",
    ],
    feedbacks: [
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA CERTA!",
    ],
    justificativa: [
      "Jonathan deve procurar um médico. \nA vermelhidão, presença de pus e dor intensa \nindica uma infecção na queimadura. \nUma análise médica é essencial para tratar \na infecção adequadamente e evitar complicações",
    ],
  },
  {
    contextualizacao:
      "Lucas estava fritando um ovo para comer em seu café da\nmanhã. Ao transferir o ovo da frigideira para o \nseu pão, ele encostou sem querer na superfície, o que lhe \ncausou uma pequena queimadura. Para aliviar sua dor, \npassou um cubo de gelo na ferida.",
    pergunta: "Essa atitude foi correta?",
    opcoes: [
      "Sim, diminiu a dor", 
      "Depende do tamanho da queimadura", 
      "Não, é errado passar gelo em queimaduras", 
      "Não, o ideal é passar gelo seco"
    ],
    feedbacks: [
      "RESPOSTA ERRADA!", 
      "RESPOSTA ERRADA!", 
      "RESPOSTA CERTA!", 
      "RESPOSTA ERRADA!"
    ],
    justificativa: [
      "A atitude de passar um cubo de gelo na queimadura não \nfoi apropriada. O correto seria lavar a área com \nágua fria e, em seguida, aplicar um curativo limpo.",
    ],
  },
  {
    contextualizacao:
      "Leonardo foi atingido por uma água-viva enquanto\n surfava no mar, causando uma queimadura química. \nSua avó que estava com ele, observou e disse: “Basta\n um xixizinho, meu filho, e vai curar rapidinho!”.",
    pergunta:
      "É mito ou verdade que há benefícios em urinar\nna queimadura de água-viva?",
    opcoes: ["Verdade", "Mito", "", ""],
    feedbacks: ["RESPOSTA ERRADA!", "RESPOSTA CERTA!", "", ""],
    justificativa: [
      "Urinar na queimadura não ajuda na cicatrização e \npode piorar a situação, introduzindo germes na ferida. \nÉ melhor lavar a área afetada com água \ndo mar limpa e procurar atendimento médico.",
    ],
  },
  {
    contextualizacao:
      "Em um dia de muito calor, Ana gostaria muito de ir à praia \npara se refrescar, mas seu receio de se queimar com o sol \nintenso a deixava com medo. Determinada a \naproveitar o dia, ela passou protetor solar e reservou \nalguns horários para não se expor ao sol.",
    pergunta:
      "Pensando nisso, qual horário ela deveria evitar a \nexposição solar?",
    opcoes: ["10 às 16h", "9 às 11h", "12 às 15h", "13 às 18h"],
    feedbacks: [
      "RESPOSTA CERTA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
    ],
    justificativa: [
      "Ana deve evitar a exposição solar entre as 10h e as \n16h. Nesse período, a radiação UVB é mais intensa, \naumentando o risco de queimaduras e danos à pele.",
    ],
  },
  {
    contextualizacao:
      "Maria estava cozinhando um jantar especial e, \nao retirar uma assadeira do forno, sem perceber, \nencostou sua mão na borda quente, \ncausando uma queimadura leve. \nImediatamente ela abriu sua caixa de primeiros socorros,\nencontrando uma pomada e uma compressa morna.",
    pergunta: "Qual seria a atitude mais adequada para tratar a\n queimadura?",
    opcoes: [
      "Aplicar pomada imediatamente",
      "Colocar a mão sob água fria corrente por alguns minutos",
      "Utilizar uma compressa quente na área afetada.",
      "Deixar a queimadura sem nenhum tratamento específico.",
    ],
    feedbacks: [
      "RESPOSTA ERRADA!",
      "RESPOSTA CERTA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
    ],
    justificativa: [
      "O ideal para uma queimadura leve é não passar nada, \napenas lavar com água corrente fria por \ncerca de 10 minutos.",
    ],
  },

  //FASE 2

  {
    contextualizacao:
      "Seu Zé está cozinhando macarrão à bolonhesa, \npois sua netinha está em sua casa para o almoço \nem família anual.",
    pergunta:
      "Para evitar queimaduras, quais são os cuidados que \nSeu Zé deve tomar?",
    opcoes: [
      "Alimentar sua neta",
      "Virar o cabo das panelas para dentro do fogão",
      "Não usar colheres de madeira",
      "Usar vinagre no lugar de azeite no preparo dos alimentos.",
    ],
    feedbacks: [
      "RESPOSTA ERRADA!",
      "RESPOSTA CERTA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
    ],
    justificativa: [
      "Virar o cabo das panelas para dentro do fogão é essencial \npara prevenir queimaduras, pois reduz o risco de alguém \nesbarrar nas alças quentes. Esta medida simples ajuda a \ngarantir a segurança durante o manuseio das panelas, \nespecialmente em ambientes com crianças ou animais \nde estimação",
    ],
  },
  {
    contextualizacao:
      "Seu Zé, no momento de passar seu café, ligou a chaleira \nem sua casa quando, acidentalmente, sofreu uma \nqueimadura elétrica ao tocar em um fio desencapado.",
    pergunta: "Qual das seguintes medidas ele deveria tomar?",
    opcoes: [
      "Aplicar manteiga ou óleo na queimadura.",
      "Cobrir a queimadura com algodão e fita adesiva",
      "Ligar imediatamente para o serviço de emergência médica.",
      "Colocar uma compressa quente sobre a queimadura elétrica.",
    ],
    feedbacks: [
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA CERTA!",
      "RESPOSTA ERRADA!",
    ],
    justificativa: [
      "O certo é ligar imediatamente para o \nserviço de emergência médica. \nQueimaduras elétricas podem ser graves, exigindo \natenção médica especializada para evitar complicações. \nBuscar ajuda profissional rapidamente é crucial para o \ntratamento adequado e prevenção de danos adicionais.",
    ],
  },
  {
    contextualizacao:
      "Cristina chamou seus colegas de trabalho para uma festa. \nA refeição principal seria, é claro, o famoso churrasco. \nPorém, Cristina não sabe um método seguro e \neficaz para acender a churrasqueira. \nQue tal usar álcool líquido e fósforo?",
    pergunta: "Esse é o método mais seguro para fazer isso?",
    opcoes: ["Não", "Sim", "", ""],
    feedbacks: ["RESPOSTA CERTA!", "RESPOSTA ERRADA!", "", ""],
    justificativa: [
      "Usar álcool em gel e fósforo não é um método \n seguro para acender a churrasqueira. \nExistem métodos mais seguros, como acendedores \nespecíficos ou acender o carvão \ncom papel e pequenos pedaços de madeira.",
    ],
  },
  {
    contextualizacao:
      "Realmente, usar palito de fósforo e \nálcool não é uma boa ideia, pois há risco de \nexplosão devido à sua rápida combustão. \nMuitos acidentes domésticos são causados dessa forma.",
    pergunta: "Mas, então, qual seria o melhor método?",
    opcoes: [
      "Ateando fogo em cone de papel com óleo de cozinha \nno meio do carvão",
      "Usando um lança-chamas diretamente no carvão",
      "Ateando fogo em cone de papel com gasolina \nno meio do carvão",
      "Usando o fósforo diretamente no carvão.",
    ],
    feedbacks: [
      "RESPOSTA CERTA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
    ],
    justificativa: [
      "A melhor opção seria atear fogo em um cone \nde papel com óleo de cozinha no meio do carvão. \nIsso proporciona uma queima lenta e controlada, \nevitando riscos de explosão ou queimaduras. \nO uso de gasolina ou lança-chamas pode ser \nextremamente perigoso devido ao \nalto risco de incêndio ou explosão.",
    ],
  },
  {
    contextualizacao:
      "Luan é um chef e estava experimentando receitas em sua \ncasa. Ele pensou em aprimorar sua receita de omelete \nfrancesa. Entretanto, como estava despreocupado em relação \naos equipamentos de segurança, como luvas, queimou sua \nmão na chapa quente",
    pergunta:
      "O que Luan deve fazer para evitar maiores \nestragos em sua mão?",
    opcoes: [
      "Retirar anel apenas",
      "Por um pano de prato para proteger a ferida.",
      "Por uma faca cruzada em cima da ferida.",
      "Aplicar hidratante no local.",
    ],
    feedbacks: [
      "RESPOSTA CERTA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
    ],
    justificativa: [
      "É essencial remover qualquer objeto que \npossa restringir o fluxo sanguíneo ou causar \nmais danos à área afetada",
    ],
  },
  {
    contextualizacao:
      "Luan tirou seu anel, mas a queimadura está inchando \ne ficando bastante dolorida.",
    pergunta: "Que itens caseiros ele pode passar na ferida?",
    opcoes: [
      "Borra de café.",
      "Pasta de dente.",
      "Gelo.",
      "Nenhum dos anteriores",
    ],
    feedbacks: [
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA CERTA!",
    ],
    justificativa: [
      "Luan não deve aplicar nenhum item caseiro na queimadura. \nBorra de café, pasta de dente e gelo podem causar mais \ndanos à pele. O tratamento adequado envolve resfriamento \ncom água fria e procurar atendimento médico se \nnecessário.",
    ],
  },
  {
    contextualizacao:
      "Cláudio estava brincando na rua e sua pipa ficou \npresa na fiação elétrica da rua.",
    pergunta: "O que ele deve fazer?",
    opcoes: [
      "Não deve pegar a pipa.",
      "Calçar chinelos de borracha e pegar a pipa com a mão.",
      "Utilizar um cabo de borracha para pegar a pipa.",
      "Utilizar uma escada para subir e pegar a pipa com a mão.",
    ],
    feedbacks: [
      "RESPOSTA CERTA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
    ],
    justificativa: [
      "Cláudio não deve pegar a pipa. Ele deve evitar o contato \ncom a fiação elétrica, pois isso pode resultar em choque \nelétrico e lesões graves. A melhor opção seria utilizar \numa escada para subir e tentar remover a pipa com um \nobjeto não condutor, como um cabo de borracha.",
    ],
  },
  {
    contextualizacao:
      "Cláudio não te ouviu e recebeu um choque elétrico. \nEm pouco tempo apareceu um ponto escuro \nnas suas mãos e nos seus pés.",
    pergunta: "O que ele deve fazer? O que isso significa?",
    opcoes: [
      "Ir ao posto de saúde, há risco de arritmia.",
      "Ir ao médico, há risco de alucinações.",
      "Dormir um pouco, há risco de arritmia.",
      "Dormir um pouco, há risco de alucinações.",
    ],
    feedbacks: [
      "RESPOSTA CERTA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
    ],
    justificativa: [
      "Cláudio deve ir ao posto de saúde, pois há risco de arritmia. \nO aparecimento de pontos escuros nas mãos e nos pés após \num choque sugere lesões elétricas graves que \npodem afetar o coração. Procurar rápidamente uma \najuda médica é crucial para o tratamento adequados.",
    ],
  },
  {
    contextualizacao:
      "Hoje é dia de faxina na casa do Yanomã! Para desinfetar \nsua residência, ele costuma usar o álcool 70% como \nprincipal produto de limpeza.",
    pergunta:
      "Onde ele não deve utilizar, de forma alguma, \nesse produto de limpeza?",
    opcoes: [
      "Prateleiras altas", 
      "Vaso sanitário", 
      "Fogão", 
      "Espelho do banheiro"
    ],
    feedbacks: [
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA CERTA!",
      "RESPOSTA ERRADA!",
    ],
    justificativa: [
      "Yanomã não deve utilizar álcool 70% na cozinha. \nO álcool é altamente inflamável e \no fogão, sendo uma área de calor, \nrepresenta um risco de incêndio em caso de \ncontato com alguma fonte de ignição.",
    ],
  },
  {
    contextualizacao:
      "Yanomã estava manuseando produtos \nde limpeza para a mesma faxina em sua \ncasa quando derramou cloro em sua mão, \ncausando uma queimadura química.",
    pergunta: "O que Yanomã deve fazer nesse caso?",
    opcoes: [
      "Lavar a mão com água corrente e aplicar uma vinagre.",
      "Cobrir a queimadura com açúcar para neutralizar o \ncloro.",
      "Enxaguar a mão com água corrente e tirar sua roupa \númida de cloro",
      "Aplicar uma solução de bicarbonato de sódio.",
    ],
    feedbacks: [
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA CERTA!",
      "RESPOSTA ERRADA!",
    ],
    justificativa: [
      "Yanomã deve lavar a mão sob água corrente por \n20 minutos para diluir e remover o cloro. \nO vinagre e o bicarbonato, pode irritar a pele e \nnão é recomendado para queimaduras químicas.",
    ],
  },
  {
    contextualizacao:
      "Em uma festa, Paulo e seus amigos resolveram \nsoltar fogos para celebrar. Os fogos foram \nposicionados para cima e, então, eles foram para \nlonge dos fogos. Quando um dos fogos falhou, \nos amigos voltaram e os reacenderam, indo \nnovamente para longe.",
    pergunta: "O que Paulo e seus amigos fizeram de errado?",
    opcoes: [
      "Foram para longe, assim não puderam \ngarantir que os fogos funcionassem.",
      "Foram para longe, impedindo que observassem \no show de fogos.",
      "Tentaram reacender os fogos apesar do risco \nde explodirem durante seu manuseio.",
      "Não houve nenhuma ação errada.",
    ],
    feedbacks: [
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA CERTA!",
      "RESPOSTA ERRADA!",
    ],
    justificativa: [
      "Os amigos erraram ao tentarem reacender os \nfogos, apesar do risco de explodirem durante o manuseio. \nMexer em fogos de artifício que falharam é extremamente \nperigoso e pode resultar em ferimentos graves. \nDeviam ter deixado os fogos falhados em repouso \ne procurado ajuda de um profissional \npara lidar com a situação",
    ],
  },
  {
    contextualizacao:
      "Nessa mesma festa Paulo e seus amigos \nquerem ligar o ventilador, a caixa de som, a \nchurrasqueira elétrica, o frigobar e o carregador de \ncelular na mesma tomada por meio da junção de vários \nadaptadores “T” ou Benjamim.",
    pergunta: "É seguro conectar todos na mesma tomada?",
    opcoes: [
      "Sim, pois utilizar muitas tomadas dividirá a energia\n para vários aparelhos.",
      "Sim, pois utilizar muitas tomadas fará com que os\n aparelhos funcionem melhor.",
      "Não, muitos fios conectados podem sobrecarregar \na tomada, com risco de acidente elétrico",
      "Não, pois os aparelhos conectados quebrariam.",
    ],
    feedbacks: [
      "RESPOSTA ERRADA!",
      "RESPOSTA ERRADA!",
      "RESPOSTA CERTA!",
      "RESPOSTA ERRADA!",
    ],
    justificativa: [
      "Paulo não pode conectar todos os aparelhos na mesma tomada, \npois muitos fios conectados podem sobrecarregar a \ntomada, aumentando o risco de incêndio ou choque elétrico. \nO uso de várias tomadas, distribuindo a carga elétrica \nde forma adequada, é a opção mais segura.",
    ],
  },
];
