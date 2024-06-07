import Pergunta from "./pergunta.js";
import Tutorial from "./tutorialJogo.js";
import { listaDePerguntas } from "./listaPerguntas.js";
import Fim from "./fim.js";
import Vitoria from "./vitoria.js";
import Menuu from "./menu.js";

export default class Mapa extends Phaser.Scene {
  // Criando variáveis necessárias
  map;
  tileset;
  button;
  roadCollision;
  roadBlocks;
  base;
  perguntando = false;
  tela_perguntas;
  primeiraPergunta;
  x;
  y;
  lastRotation = 0;
  cronometro;
  funcaoTempo;
  casasConcluidas;
  exclamacaoConcluida;
  contador = 0; 
  posicaoExclamacao;
  temQuePerguntarDeNovo = false;
  mudando = false;
  aparecerVitoria = false;
  telaVitoria;
  musicaReproduzindo = true;
  somClique;
  contando = true;
  powerUpRelogio;
  somPowerUp;
  powerUp;
  pontuacaoMax;
  carroLiga;
  colisaoAudio;
  vitoriaAudio;
  perdaAudio;
  bloopSom;
  bloopSomInvertido;
  colisaoAudioTocando = false;
  somZonaAtiva;
  somZonaDesativa;
  tutorialDoMenu = false;
  perguntaAberta

  // Construtor da cena
  constructor() {
    super({ key: "Mapa" });
    this.emissor = new Phaser.Events.EventEmitter();
    this.emissor.addListener("apertar", this.apertarBotao, this);
  }

  // Função para carregar os recursos do jogo
  preload() {
    //carrega as imagens presentes no mapa
    this.load.image("tiles", "./src/assets/mapa/TileSet1.png");
    this.load.image("tutorial", "./src/assets/mapa/tutorial1.png");
    this.load.image("tutorial2", "./src/assets/mapa/tutorial2.png");
    this.load.image("sair", "./src/assets/mapa/botao.png");
    this.load.image("next", "./src/assets/pergunta/next.png");
    this.load.image("pergunta", "./src/assets/pergunta/pergunta.png");
    this.load.image("relogio", "./src/assets/mapa/relogio.png");
    this.load.image("menu", "./src/assets/mapa/menu.png");
    this.load.image("menu1", "./src/assets/Menu/menu1.png");
    this.load.image("estrela1", "./src/assets/mapa/umaEstrela.png");
    this.load.image("estrela2", "./src/assets/mapa/duasEstrelas.png");
    this.load.image("estrela3", "./src/assets/mapa/tresEstrelas.png");
    this.load.image("home", "./src/assets/mapa/home.png");
    this.load.image("retornar", "./src/assets/mapa/botaoRetornar.png");

    if (!this.musicaReproduzindo) {
      // Adiciona a trilha sonora em loop
      this.musica = this.sound.add('musica', { loop: true });
      this.musica.play();
      // Marca a música como reproduzindo
      this.musicaReproduzindo = true;
  }

    
    //carrega o spritesheet da unidade de resgate
    this.load.spritesheet("brilho", "./src/assets/mapa/brilho1.png", {
      frameWidth: 254,
      frameHeight: 254,
    });
    this.load.spritesheet("bombeiro", "./src/assets/mapa/ambulancia.png", {
      frameWidth: 1192,
      frameHeight: 1192,
    });

    //carrega a spritesheet da exclamação
    this.load.spritesheet("exclamacao", "./src/assets/mapa/exclamacao.png", {
      frameWidth: 2048,
      frameHeight: 2048,
    });

    //carrega a spritesheet do botão de interrogação
    this.load.spritesheet(
      "botaoInterrogacao",
      "./src/assets/pergunta/interrogacao.png",
      {
        frameWidth: 512,
        frameHeight: 512,
      }
    );

    //adicionar o plugin do joystick
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js",
      true
    );

    //adiciona o arquivo json do tilemap
    this.load.tilemapTiledJSON("city", "./src/assets/mapa/Map1.json");
  }

  // Função para criar os elementos no jogo
  create() {
    this.perguntaAberta = false
    this.mudouDeFase = false
    this.contando = true;
    this.aparecerVitoria = false;
    this.somClique = this.sound.add('som_clique');
    this.somClique.setVolume(0.3);
    this.somPowerUp = this.sound.add('powerUp');

    //transição do mapa
    this.cameras.main.fadeIn(100);

    // adicionar o tilemap
    this.map = this.make.tilemap({ key: "city" });
    this.tileset = this.map.addTilesetImage("TileSet1", "tiles");

    //adiciona as layers basicas do tilemap
    this.base = this.map.createLayer("Base", this.tileset);
    this.roadCollision = this.map.createLayer("Roads2", this.tileset);
    this.map.createLayer("Roads", this.tileset);
    this.map.createLayer("RoadBlocks", this.tileset);

    //adiciona o veiculo e guardar em uma variável
    this.player = this.physics.add
      .sprite(
        this.map.widthInPixels / 1.9,
        this.map.heightInPixels / 4.9,
        "bombeiro"
      )
      .setScale(0.12)
      .setSize(240, 240);
    
      // Criar animação para o veiculo
    this.anims.create({
      key: "sirene",
      frames: this.anims.generateFrameNumbers("bombeiro", { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    });
    // Inicia a animação da sirene
    this.player.anims.play("sirene", true);

    // Configuração da câmera pra seguir o jogdor
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.startFollow(this.player, true, 1, 1);
    this.cameras.main.setZoom(1.2);

    //define a colisão do player com a base do mapa e as calçadas
    this.physics.add.collider(this.roadCollision, this.player, () => {
      // Verifique se o som já está sendo reproduzido
      if (!this.colisaoAudioTocando) {
          // Toca o som apenas se não estiver sendo reproduzido
          this.sound.play('colisaoAudio', { volume: 0.1 });
          // Define a variável de controle como verdadeira
          this.colisaoAudioTocando = true;
  
          // Reseta a variável de controle após um tempo determinado (por exemplo, 0.5 segundo)
          this.time.delayedCall(500, () => {
            this.colisaoAudioTocando = false;
          });
      }
    });
    this.physics.add.collider(this.base, this.player, () => {
      // Verifique se o som já está sendo reproduzido
      if (!this.colisaoAudioTocando) {
          // Toca o som apenas se não estiver sendo reproduzido
          this.sound.play('colisaoAudio', { volume: 0.1 });
          // Define a variável de controle como verdadeira
          this.colisaoAudioTocando = true;
  
          // Reseta a variável de controle após um tempo determinado (por exemplo, 0.5 segundo)
          this.time.delayedCall(500, () => {
            this.colisaoAudioTocando = false;
          });
      }
    });
    this.roadCollision.setCollisionBetween(0, 3599);
    this.base.setCollisionBetween(0, 3599);

    //Adiciona as layers que sobrepõem o player
    this.map.createLayer("HousesInteract", this.tileset);
    this.map.createLayer("BuildingsNonInteract", this.tileset);
    this.map.createLayer("Deco1", this.tileset);
    this.map.createLayer("Nature", this.tileset);


    //adiciona o joystick presente no plugin
    this.joyStick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
      x: this.game.renderer.width / 5,
      y: (this.game.renderer.height / 2) * 1.35,
      radius: this.game.renderer.height / 8,
      base: this.add
        .circle(0, 0, this.game.renderer.height / 8, 0x888888)
        .setAlpha(0.7)
        .setDepth(50), // Base do joystick
      thumb: this.add.circle(0, 0, this.game.renderer.height / 16, 0xcccccc).setDepth(99), // Polegar do joystick
    });
    //relaciona as atualizações do joystick com a função update
    this.joyStick.on("update", this.update, this);



    // Adiciona um sprite de exclamação à cena
    this.exclamacaoConcluida = this.add.sprite(
      this.game.renderer.width / 2 - 500, // Posição horizontal
      this.game.renderer.height / 5 - 40, // Posição vertical
      "exclamacao"                               
    )
    // Define a escala do sprite
    .setScale(0.035)
    // Torna o sprite visível
    .setVisible(false)
    // Define o fator de rolagem do sprite como zero para mantê-lo fixo na tela
    .setScrollFactor(0);

    // Adiciona um evento de tempo
    this.time.addEvent({
      delay: 10,  // Atraso de 100 milissegundos
      callback: () => {  // Função de retorno de chamada
        // Adiciona um texto indicando o progresso de casas concluídas à cena
        this.casasConcluidas = this.add.text(
          this.game.renderer.width / 2 - 430,  // Posição horizontal
          this.game.renderer.height / 5 - 40,  // Posição vertical
          "0/6",                                  
          {                                       
            fontFamily: "Determination",// Família da fonte
            fontSize: "50px",// Tamanho da fonte
            fill: "#ffffff"  // Cor do texto
          }
        )
        // Define o fator de rolagem do texto como zero para mantê-lo fixo na tela
        .setScrollFactor(0)
        // Define o contorno do texto
        .setStroke('#000000', 3)
        // Define o ponto de origem do texto como o centro
        .setOrigin(0.5, 0.5)
        .setVisible(false);
      }
    });

    // Adiciona a posição da exclamação e as guarda em uma lista
    this.posicaoExclamacao = [
      {
        x: this.map.widthInPixels / 2 + 530,
        y: this.map.heightInPixels / 2 - 350,
      },
      {
        x: this.map.widthInPixels / 2 - 950,
        y: this.map.heightInPixels / 2 + 310,
      },
      {
        x: this.map.widthInPixels / 2 - 1225,
        y: this.map.heightInPixels / 2 - 890,
      },
      {
        x: this.map.widthInPixels / 2 + 1450,
        y: this.map.heightInPixels / 2 + 1120,
      },
      {
        x: this.map.widthInPixels / 2 + 1500,
        y: this.map.heightInPixels / 2 - 950,
      },
      {
        x: this.map.widthInPixels / 2 + 130,
        y: this.map.heightInPixels / 2 + 30,
      },
      {
        x: this.map.widthInPixels / 2 - 1470,
        y: this.map.heightInPixels / 2 - 70,
      },
      {
        x: this.map.widthInPixels / 2 + 1645,
        y: this.map.heightInPixels / 2 + 145,
      },
      {
        x: this.map.widthInPixels / 2 - 840,
        y: this.map.heightInPixels / 2 - 420,
      },
      {
        x: this.map.widthInPixels / 2 - 2060,
        y: this.map.heightInPixels / 2 + 200,
      },
      {
        x: this.map.widthInPixels / 2 - 940,
        y: this.map.heightInPixels / 2 + 760,
      },
      {
        x: this.map.widthInPixels / 2 + 2200,
        y: this.map.heightInPixels / 2 + 800,
      },
    ];

    //adiciona a animação das exclamações
    this.anims.create({
      // Cria a exclamação no jogo
      key: "exclamar",
      frames: this.anims.generateFrameNumbers("exclamacao", {
        start: 0,
        end: 1,
      }),
      frameRate: 4,
      repeat: -1,
    });

    //Para cada posição de exclamação definida adicione um sprite pontosDeExclamacao
    this.pontosDeExclamacao = [];
    for (let i = 0; i < this.posicaoExclamacao.length / 2; i++) {
      this.pontosDeExclamacao[i] = this.add
        .sprite(
          this.posicaoExclamacao[i].x,
          this.posicaoExclamacao[i].y,
          "exclamacao"
        )
        .setScale(0.075)
        .setVisible(true)

      //anima cada um dos pontos de exclamacao
      this.pontosDeExclamacao[i].anims.play("exclamar", true);
    }

    // Loop começando em 6 até o final da lista de posições de exclamação
    for (let i = 6; i < this.posicaoExclamacao.length; i++) {
      // Cria um sprite para o ponto de exclamação na posição atual da lista
      this.pontosDeExclamacao[i] = this.add
        .sprite(
          this.posicaoExclamacao[i].x,
          this.posicaoExclamacao[i].y,
          "exclamacao"
        )
        // Define a escala do sprite para 0.075
        .setScale(0.075)
        // Define o sprite como invisível
        .setVisible(false);

      // Inicia a animação "exclamar" para o ponto de exclamação atual
      this.pontosDeExclamacao[i].anims.play("exclamar", true);
    }

    

    // Definindo as posições das zonas de interação
    const posicaoArea = [
      {
        x: this.map.widthInPixels / 2 + 460,
        y: this.map.heightInPixels / 2 - 110,
      },
      {
        x: this.map.widthInPixels / 2 - 1000,
        y: this.map.heightInPixels / 2 + 550,
      },
      {
        x: this.map.widthInPixels / 2 - 1265,
        y: this.map.heightInPixels / 2 - 545,
      },
      {
        x: this.map.widthInPixels / 2 + 1450,
        y: this.map.heightInPixels / 2 + 1080,
      },
      {
        x: this.map.widthInPixels / 2 + 1420,
        y: this.map.heightInPixels / 2 - 610,
      },
      {
        x: this.map.widthInPixels / 2 + 70,
        y: this.map.heightInPixels / 2 + 350,
      },
      {
        x: this.map.widthInPixels / 2 - 1533,
        y: this.map.heightInPixels / 2 + 220,
      },
      {
        x: this.map.widthInPixels / 2 + 1605,
        y: this.map.heightInPixels / 2 + 420,
      },
      {
        x: this.map.widthInPixels / 2 - 900,
        y: this.map.heightInPixels / 2 - 100,
      },
      {
        x: this.map.widthInPixels / 2 - 2090,
        y: this.map.heightInPixels / 2 + 542,
      },
      {
        x: this.map.widthInPixels / 2 - 1020,
        y: this.map.heightInPixels / 2 + 1054,
      },
      {
        x: this.map.widthInPixels / 2 + 2140,
        y: this.map.heightInPixels / 2 + 1050,
      },
    ];

    //adiciona a animação das zonas
    this.anims.create({
      // Cria a exclamação no jogo
      key: "rodar",
      frames: this.anims.generateFrameNumbers("brilho", {
        start: 0,
        end: 29,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Para cada posição de zona definida, adicione um sprite de zona
    this.zonas = []; // Array para armazenar os sprites de zona
    for (let i = 0; i < posicaoArea.length / 2; i++) { // Loop através das posições de área
      // Adiciona um sprite de zona na posição atual da lista de posições
      this.zonas[i] = this.physics.add
        .sprite(posicaoArea[i].x, posicaoArea[i].y, "brilho") // Cria um sprite com imagem "brilho"
        .setOrigin(0.5) // Define a origem do sprite para o centro
        .setAlpha(0.8) // Define a transparência do sprite para 0.8 (80% de opacidade)
        .setScale(0.7); // Define a escala do sprite para 0.7
      // Define uma sobreposição entre o jogador e a zona atual, chamando a função fazerPergunta quando ocorrer
      this.physics.add.overlap(
        this.player, // Primeiro objeto para sobreposição (o jogador)
        this.zonas[i], // Segundo objeto para sobreposição (a zona atual)
        () => this.fazerPergunta(i), // Função a ser chamada quando houver sobreposição, passando o índice atual como argumento
        null, // Callback de processo, neste caso, não utilizado, então definido como null
        this // Contexto no qual a função será chamada
      );
      // Inicia a animação "rodar" para o sprite de zona atual
      this.zonas[i].anims.play("rodar", true);
    }


    // Loop começando em 6 até o comprimento da lista de posicaoArea
    for (let i = 6; i < posicaoArea.length; i++) {
      // Cria um sprite de zona na posição atual da lista de posicaoArea
      this.zonas[i] = this.physics.add
        .sprite(posicaoArea[i].x, posicaoArea[i].y, "brilho") // Cria um sprite com a imagem "brilho"
        .setOrigin(0.5) // Define a origem do sprite para o centro
        .setAlpha(0.6) // Define a transparência do sprite para 0.6 (60% de opacidade)
        .setScale(0.7) // Define a escala do sprite para 0.7
        .setVisible(false); // Define o sprite como invisível inicialmente
      // Inicia a animação "rodar" para o sprite de zona atual
      this.zonas[i].anims.play("rodar", true);
    }

    // Adiciona a animação "interrogar"
    this.anims.create({
      key: "interrogar", // Nome da animação
      frames: this.anims.generateFrameNumbers("botaoInterrogacao", { // Gera os frames da animação
        start: 0, // Primeiro frame
        end: 1, // Último frame
      }),
      frameRate: 5, // Taxa de quadros por segundo
      repeat: -1, // -1 para repetição infinita
    });

    // Cria um objeto de texto para ser usado posteriormente
    this.text = this.add.text(0, 0);

    // Inicializa o estado do joystick e define a rotação do alvo como a rotação atual do jogador
    this.dumpJoyStickState();
    this.targetRotation = this.player.rotation;
    this.player.angle = 0;
    this.pontuacaoMax = this.add.image(
      this.game.renderer.width / 2,
      this.game.renderer.height / 5 + 10,
      'estrela3'
    )
    .setScrollFactor(0)
    .setOrigin(0.5,0.5)
    .setScale(0.3);

    const posicaoPowerUp = [
      {
        x: this.map.widthInPixels/4 - 305,
        y: this.map.widthInPixels/8 + 345,
      },
      {
        x: this.map.widthInPixels/1.2 - 23,
        y: this.map.widthInPixels/3 + 415,
      },
      {
        x: this.map.widthInPixels / 2 - 2370,
        y: this.map.heightInPixels / 2 + 200,
      },
      {
        x: this.map.widthInPixels / 2 + 1855,
        y: this.map.heightInPixels / 2 + 305,
      },
    ]
    this.powerUp = [];

    for(let i = 0; i < 2; i++) {
      this.powerUp[i] = this.physics.add.sprite(posicaoPowerUp[i].x, posicaoPowerUp[i].y, "relogio");
      this.powerUp[i].setScale(0.12);
      this.physics.add.overlap(this.powerUp[i], this.player, () => this.poderPowerUp(i));
    }
    for(let i = 2; i < 4; i++) {
      this.powerUp[i] = this.physics.add.sprite(posicaoPowerUp[i].x, posicaoPowerUp[i].y, "relogio");
      this.powerUp[i].setScale(0.12).setVisible(false);
    }
    

    // Cria uma instância da classe Tutorial e chama o método sairTutorial
    let tutorial = new Tutorial(this);
    tutorial.sairTutorial(this);
    //Adiciona o menu e suas características
    this.add
      .image(this.cameras.main.centerX * 2.4, -50, "menu")
      .setScrollFactor(0)
      .setScale(0.3);


    
    // Define o tempo inicial em segundos (720 segundos = 12 minutos)
    this.tempoInicial = 720;

    this.cronometro = this.add
    .text(
      this.game.renderer.width / 2,
      this.game.renderer.height / 5 - 40,
      formatoTempo(this.tempoInicial),
      { fontFamily: "Determination", fontSize: "60px", fill: "#ffffff" }
    )
    .setScrollFactor(0)
    .setOrigin(0.5,0.5)
    .setStroke('#000000', 3);

    this.cronometro.setDepth(100); // Define a profundidade do texto

    // Cria um evento de tempo para realizar uma contagem regressiva a cada segundo
    this.funcaoTempo = this.time.addEvent({
      delay: 1000, // A cada 1000 milissegundos (1 segundo)
      callback: contagemRegressiva, // Chama a função contagemRegressiva
      callbackScope: this, // Define o escopo de execução da função
      loop: true, // O evento continuará em um loop
    });

    // Pausa o evento de tempo
    this.funcaoTempo.paused = true;

    // Adiciona um botão de menu na tela
    this.botaoMenu = this.add.sprite(
      (this.game.renderer.width / 2) * 1.6, // Posição x do botão (deslocado para a direita)
      this.game.renderer.height / 5 - 40, // Posição y do botão
      "menu" // Chave da imagem do botão
    )
    .setScrollFactor(0) // O botão não se move com a câmera
    .setScale(0.25) // Escala o botão para 30% do tamanho original
    .setVisible(false)
    .setInteractive({ cursor: "pointer" }); // Torna o botão interativo e muda o cursor ao passar sobre ele

    let menu = null; // Inicializa uma variável de menu como nula

  this.botaoMenu.on('pointerdown', () => {
    // Verifique se o menu já está visível
    if (menu) {
        // Se estiver visível, destrua o menu
        menu.destroy();
        menu = null; // Defina a variável do menu como nula
        this.botaoMenu.setVisible(true); // Mostra novamente o botão de menu
    } else {
        // Se não estiver visível, crie o menu novamente
        menu = new Menuu(this); // Crie uma nova instância de Menuu
        this.botaoMenu.setVisible(false); // Oculta o botão de menu
        // Adicione um evento para destruir o menu quando um item dentro dele for clicado
        menu.on('destroy', () => {
            menu = null; // Defina a variável do menu como nula quando o menu for destruído
            this.botaoMenu.setVisible(true); // Mostra novamente o botão de menu
            this.joyStick.setVisible(true);
        });
    }
  });


  }

  update() {
    // Definir a velocidade máxima permitida
    const maxSpeed = 330;

    // Definir a velocidade baseada na posição do polegar do joystick
    const speed = (this.joyStick.force / 100) * maxSpeed; // Reduzindo a velocidade máxima

    // Definir o ângulo do joystick
    let angle = this.joyStick.angle;

    // Ajustar o ângulo para valores mais intuitivos
    if (angle < 0) {
      angle += 360;
    }

    // Se houver movimento
    if (speed > 0) {
      //this.somAcelerando.play();
      // Armazenar a rotação atual
      this.lastRotation = Math.atan2(
        Math.sin(Phaser.Math.DegToRad(angle)),
        Math.cos(Phaser.Math.DegToRad(angle))
      );
    }


    // Resetar a velocidade
    this.player.setVelocity(0);

    // Calcular a velocidade nos eixos X e Y com base no ângulo do joystick
    const velX = Math.cos(Phaser.Math.DegToRad(angle)) * speed;
    const velY = Math.sin(Phaser.Math.DegToRad(angle)) * speed;

    // Verificar se a magnitude do vetor de velocidade excede a velocidade máxima permitida
    const magnitude = Math.sqrt(velX * velX + velY * velY);
    if (magnitude > maxSpeed) {
      // Reduzir a velocidade proporcionalmente para que a magnitude seja igual à velocidade máxima
      const ratio = maxSpeed / magnitude;
      this.player.setVelocityX(velX * ratio);
      this.player.setVelocityY(velY * ratio);
    } else {
      // Definir a velocidade do carro nos eixos X e Y
      this.player.setVelocityX(velX);
      this.player.setVelocityY(velY);
    }

   // Restaura a rotação do jogador para a última rotação registrada
    this.player.rotation = this.lastRotation;

    // Verifica se o jogador está no estado de "perguntando" e não está tocando em nenhum objeto e está se movendo horizontalmente (a velocidade x não é zero)
    if (
      this.perguntando && // Verifica se está no estado de "perguntando"
      this.player.body.touching.none && // Verifica se o jogador não está tocando em nenhum objeto
      this.player.body.velocity.x !== 0 // Verifica se o jogador está se movendo horizontalmente
    ) {
      // Se todas as condições acima forem verdadeiras:
      // Define o estado de "perguntando" como falso para indicar que não está mais perguntando
      this.perguntando = false;     
      // Destroi o botão de interrogação, presumivelmente um elemento na tela usado para interagir
      this.botaoInterrogacao.destroy();
    }    
    
    // Verifica se o contador atingiu 12 e se a tela de vitória ainda não apareceu
    if (this.aparecerVitoria == false && this.contador == 12 && this.tempoInicial > 0 && !this.perguntando && this.perguntaAberta == false) {
      // Cria uma instância da classe Vitoria para lidar com a exibição da tela de vitória
      let estrela = new Vitoria(this);

      // Adiciona estrelas com base no tempo restante
      if (this.tempoInicial >= 480 && !this.perguntando) {
        estrela.adicionarEstrela3(this);
      } else if (this.tempoInicial >= 240 && !this.perguntando) {
        estrela.adicionarEstrela2(this);
      } else if (this.tempoInicial < 240 && !this.perguntando) {
        estrela.adicionarEstrela1(this);
      }

      // Define a variável para indicar que a tela de vitória apareceu
      this.aparecerVitoria = true;

      // Oculta o cronômetro e o joystick
      this.cronometro.setVisible(false);
      this.joyStick.setVisible(false);
    }

    // Verifica se o tempo chegou a zero e se o contador está contando
    if (this.tempoInicial <= 0 && this.contando == true && !this.perguntando) {
      console.log('aaaaa');
      // Define a variável para indicar que o contador não está mais contando
      this.contando = false;
      // Cria uma instância da classe Fim para lidar com o fim do jogo
      new Fim(this);

      // Oculta o cronômetro e o joystick
      this.cronometro.setVisible(false);
      this.joyStick.setVisible(false);
    }

    // Restaura a rotação do jogador para a última rotação registrada
    this.player.rotation = this.lastRotation;

    // Verifica se o contador atingiu 6 e se a fase não mudou ainda
    if (this.contador == 6 && !this.mudouDeFase && !this.perguntando) {
      // Define a variável para indicar que a fase mudou
      this.mudouDeFase = true;
      this.joyStick.setVisible(false)
      // Chama a função para mudar de fase
      this.mudarFase();


    }
    
    if (this.tempoInicial > 480 && this.pontuacaoMax.texture != 'estrela3' ) {
      this.pontuacaoMax.setTexture('estrela3').setScale(0.3);
    }
    else if(this.tempoInicial <= 480 && this.tempoInicial > 240 && this.pontuacaoMax.texture != 'estrela2') {
      this.pontuacaoMax.setTexture('estrela2').setScale(0.3);
    }
    else if(this.tempoInicial <= 240 && this.pontuacaoMax.texture != 'estrela1') {
      this.pontuacaoMax.setTexture('estrela1').setScale(0.15);
    }
  
  }


  // Ativa o joystick
  dumpJoyStickState() {
    var cursorKeys = this.joyStick.createCursorKeys();
    var s = "Key down: ";
    for (var name in cursorKeys) {
      if (cursorKeys[name].isDown) {
        s += `${name} `;
      }
    }
    s += `
    Force: ${Math.floor(this.joyStick.force * 100) / 100}
    Angle: ${Math.floor(this.joyStick.angle * 100) / 100}`;

    s += "\nTimestamp:\n";

    for (var name in cursorKeys) {
      var key = cursorKeys[name];
      s += `${name}: duration=${key.duration / 1000}\n`;
    }
    this.text.setText(s);
  }

  // Introduz o sistema de perguntas
  fazerPergunta(i) {
    if (this.perguntando === false) {
      this.perguntando = true;
      console.log("entrou em pergunta");

      // Som da Zona
      this.sound.play('somZonaAtiva', { volume: 0.2 });

      // Adiciona o botão de interrogação para entrar na pergunta
      const buttonX = (this.game.renderer.width / 2) * 1.62;
      const buttonY = (this.game.renderer.height / 2) * 1.35;
      this.botaoInterrogacao = this.add
        .sprite(buttonX, buttonY, "botaoInterrogacao")
        .setScrollFactor(0)
        .setScale(0.3)
        .setVisible(true);
      if (this.botaoInterrogacao) {
        console.log("existe um botao");
      }
      // Adiciona a animação do botão de interrogação
      this.botaoInterrogacao.anims.play("interrogar");

      // Adiciona a interação com o botão de interrogação
      this.botaoInterrogacao.setInteractive({ cursor: "pointer  " });

      this.botaoInterrogacao.on("pointerup", () => this.somClique.play());

        // Se o botão de interrogação for apertado, emita 'apertar'
        if (i <= 6) {
          this.botaoInterrogacao.on("pointerup", () =>
              this.emissor.emit("apertar", i)
          );
        }
        else if (i == 7) {
          this.botaoInterrogacao.on("pointerup", () =>
              this.emissor.emit("apertar", i+1)
          );
        }
        else if (i == 8) {
          this.botaoInterrogacao.on("pointerup", () =>
              this.emissor.emit("apertar", i+2)
          );
        }
        else if (i == 9) {
          this.botaoInterrogacao.on("pointerup", () =>
              this.emissor.emit("apertar", i+3)
          );
        }
        else if (i == 10) {
          this.botaoInterrogacao.on("pointerup", () =>
              this.emissor.emit("apertar", i+4)
          );
        }
        else if (i == 11) {
          this.botaoInterrogacao.on("pointerup", () =>
              this.emissor.emit("apertar", i+5)
          );
        }
        else if (i == 12) {
          this.botaoInterrogacao.on("pointerup", () =>
              this.emissor.emit("apertar", i+6)
          );
        }
      }
  }

  // Apertar botão tem como parâmetro o número da casa
    apertarBotao(i) {
      // Esconde o joystick

      this.joyStick.setVisible(false);
      console.log(`Número da pergunta é: ${i}`)
      console.log(this.temQuePerguntarDeNovo);
      // // Destroi o botão de interrogação, o ponto de exclamação e a zona de interação
      if (this.botaoInterrogacao) {
        this.botaoInterrogacao.destroy();
      }

      if (this.temQuePerguntarDeNovo && i == 6) {
        this.pontosDeExclamacao[i].destroy();
        this.zonas[i].destroy();
      }
      else if (this.temQuePerguntarDeNovo && i == 8) {
        this.pontosDeExclamacao[i-1].destroy();
        this.zonas[i-1].destroy();
      }
      else if (this.temQuePerguntarDeNovo && i == 10) {
        this.pontosDeExclamacao[i-2].destroy();
        this.zonas[i-2].destroy();
      }
      else if (this.temQuePerguntarDeNovo && i == 12) {
        this.pontosDeExclamacao[i-3].destroy();
        this.zonas[i-3].destroy();
      }
      else if (this.temQuePerguntarDeNovo && i == 14) {
        this.pontosDeExclamacao[i-4].destroy();
        this.zonas[i-4].destroy();
      }
      else if (this.temQuePerguntarDeNovo && i == 16) {
        this.pontosDeExclamacao[i-5].destroy();
        this.zonas[i-5].destroy();
      }
      else if (this.temQuePerguntarDeNovo && i == 18) {
        this.pontosDeExclamacao[i-6].destroy();
        this.zonas[i-6].destroy();
      }
      else if (!this.temQuePerguntarDeNovo && i < 6) {
        this.pontosDeExclamacao[i].destroy();
        this.zonas[i].destroy();
      }
      // Abrevia um item da lista de perguntas para simplesmente perguntaAtual
      const perguntaAtual = listaDePerguntas[i];
      // Pega a contextualização, opções, feedbacks, justificativa e pergunta da casa atual
      const contextualizacao = perguntaAtual.contextualizacao;
      const opcoes = perguntaAtual.opcoes;
      const feedbacks = perguntaAtual.feedbacks;
      const justificativa = perguntaAtual.justificativa;
      const pergunta = perguntaAtual.pergunta;
      // Ordena a aparição dos elementos na tela
      const respostas = opcoes.concat(feedbacks, justificativa);
      // Cria o novo quadro de questionário com as perguntas
      const novaPergunta = new Pergunta(this, i);
      novaPergunta.criarRespostas(this, contextualizacao, pergunta, ...respostas);
  }

mudarFase() {

    console.log("Entrou na fase 2")
    this.texto2fase = this.add.text(this.game.renderer.width/2, this.game.renderer.height/2, "FASE 2",{ fontFamily: "Determination", fontSize: '300px', fill: '#ffffff' }).setScrollFactor(0).setOrigin(0.5,0.5);
    // Define o contorno do texto "texto2fase" como preto com largura de 8 pixels
    this.texto2fase.setStroke('#000000',8);

    // Após 1500 milissegundos (1.5 segundos), remove o texto "texto2fase" da tela
    setTimeout(() => { 
      this.texto2fase.destroy();
    }, 3500);

    // Atualiza o texto "casasConcluidas" para exibir "6/12"
    this.casasConcluidas.setText("6/12");

    // Loop sobre as posições de exclamação restantes a partir da posição 6
    for (let i = 6; i < this.posicaoExclamacao.length; i++) {
      // Torna as exclamações finais e suas zonas visíveis
      this.pontosDeExclamacao[i].setVisible(true);
      this.zonas[i].setVisible(true);
      
      // Adiciona uma verificação de colisão entre o jogador e a zona atual
      this.physics.add.overlap(
        this.player,
        this.zonas[i],
        () => {
          // Define que uma nova pergunta precisa ser feita quando ocorrer uma colisão
          this.temQuePerguntarDeNovo = true;
          // Faz uma pergunta com base no índice atual do loop
          this.fazerPergunta(i);
        },
        null,
        this
      );
    }
    for(let i = 2; i < 4; i++) {
      this.powerUp[i].setVisible(true);
      this.physics.add.overlap(this.powerUp[i], this.player, () => this.poderPowerUp(i));
    }
  }

poderPowerUp (i) {
  console.log("passou no powerup");
  this.powerUp[i].destroy();
  this.somPowerUp.play();
  setTimeout(() => { 
    this.tempoInicial += 60;
    this.cronometro.setScale(2);
    this.cronometro.setTint(0x00ff00);
  }, 100);
  setTimeout(() => {
    this.cronometro.setScale(1)
    this.cronometro.setTint(0xffffff);
  }, 2000);
}
}

// Função para formatar o tempo em minutos e segundos
function formatoTempo(segundos) {
  // Calcula os minutos
  var minutos = Math.floor(segundos / 60);
  // Calcula a parte restante em segundos
  var parteEmSegundos = segundos % 60;
  // Garante que a parte dos segundos tenha sempre dois dígitos
  parteEmSegundos = parteEmSegundos.toString().padStart(2, "0");
  // Retorna o tempo formatado como "minutos:segundos"
  return `${minutos}:${parteEmSegundos}`;
}

// Função para realizar a contagem regressiva do tempo
function contagemRegressiva() {
  // Decrementa o tempo inicial em 1 segundo
  this.tempoInicial -= 1;
  // Atualiza o texto do cronômetro com o novo tempo formatado
  this.cronometro.setText(formatoTempo(this.tempoInicial));
}

// Função para determinar a tela de vitória com base no tempo
function telaVitoria() {
  // Cria uma instância da classe Vitoria para lidar com a exibição da tela de vitória
  let estrela = new Vitoria(this);

  // Determina quantas estrelas devem ser exibidas com base no tempo restante
  if (this.tempoInicial >= 300) {
    console.log("cade a estrela?");
    estrela.adicionarEstrela1(this);
  } else if (this.tempoInicial >= 240) {
    console.log("chegou no elseif");
    estrela.adicionarEstrela2(this);
  } else {
    console.log("e chegou no else tb");
    estrela.adicionarEstrela3(this);
  }
}

