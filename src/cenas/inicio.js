export default class Inicio extends Phaser.Scene {

    // Criando as variáveis necessárias
    
    fundo;
    logo;
    botaoIniciar;
    somDesligado;
    somLigado;
    tutorial;
    somClique;
    musica;
    musicaReproduzindo;
    contando = true;

    // Construtor da cena
    constructor() {
        super({ key: "Inicio" });
    };

    // Função para carregar os recursos do jogo
    preload() {
        // Carrega os assets do início
        this.load.image('tela_fundo', 'src/assets/inicio/tela.png')
        this.load.image('iniciar', 'src/assets/inicio/botaoJogarD.png');
        this.load.image('MusicaDesligada', 'src/assets/inicio/somDesligado.png');
        this.load.image('nome_jogo','src/assets/inicio/nome.png');
        this.load.image('musicaLigada', 'src/assets/inicio/somLigado.png');
        this.load.image('logo', 'src/assets/inicio/logo.png');
        this.load.image('EscurecerFundo', 'src/assets/inicio/fundo.png');
        this.load.image('botaoTutorial', 'src/assets/Menu/TutorialBotao.png');
        this.load.image('botaoInicio', 'src/assets/Menu/telaInicialBotao.png')


        // Carrega os áudios do jogo
        this.load.audio('musica', 'src/assets/sons/trilha_sonora_1.mp3');
        this.load.audio('som_clique', 'src/assets/sons/clickSom.mp3');
        this.load.audio('acertouPergunta', 'src/assets/sons/perguntaAcerto.mp3')
        this.load.audio('errouPergunta', 'src/assets/sons/perguntaErro.mp3')
        this.load.audio('powerUp', 'src/assets/sons/powerUpRelogio.mp3')
        this.load.audio('carroLiga', 'src/assets/sons/carroMotor.mp3')
        this.load.audio('colisaoAudio', 'src/assets/sons/colisao.mp3')
        this.load.audio('vitoriaAudio', 'src/assets/sons/vitoriaFinal.mp3')
        this.load.audio('perdaAudio', 'src/assets/sons/perdaFinal.mp3')
        this.load.audio('bloopSom', 'src/assets/sons/bloop.mp3')
        this.load.audio('bloopSomInvertido', 'src/assets/sons/bloopInvertido.mp3')
        this.load.audio('somZonaAtiva', 'src/assets/sons/zonaAtiva.mp3')
        this.load.audio('somZonaDesativa', 'src/assets/sons/zonaDesativa.mp3')
    }

    // Função para criar e configurar os elementos do jogo
    create() {
        // Adiciona a tela do fundo
        this.fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'tela_fundo').setDisplaySize(this.game.renderer.width, this.game.renderer.height);
        
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'EscurecerFundo').setScale(2)

        // Adiciona o nome do jogo
        const nomeJogo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height * 0.33, 'nome_jogo').setScale(0.28);
        //nomeJogo.setScale(Math.min(this.cameras.main.width * 0.65 / nomeJogo.width, this.cameras.main.height * 0.65 / nomeJogo.height));

        // Adiciona a trilha sonora em loop
        if (!this.musicaReproduzindo) {
            // Adiciona a trilha sonora em loop
            this.musica = this.sound.add('musica', { loop: true });
            this.musica.setVolume(0.1);
            this.musica.play();
            // Marca a música como reproduzindo
            this.musicaReproduzindo = true;
        }
        // Adiciona o botão de controle de som
        this.somLigado = this.add.image(this.cameras.main.width * 0.90, this.cameras.main.height * 0.2, 'musicaLigada');
        this.somLigado.setScale(0.4);
        this.somLigado.setInteractive({ cursor: 'pointer'});
        var musicaAudio = true; // Inicia com a música ligada
        // Configuração do som
        this.somLigado.on('pointerup', () => {
            // Alterna entre pausar e retomar a música
            if (musicaAudio) {
                this.musica.pause(); // Pausa a música
                this.somLigado.setTexture('MusicaDesligada'); // Altera a imagem do botão para desligado
                musicaAudio = false;
            } else {
                this.musica.resume(); // Retoma a música
                this.somLigado.setTexture('musicaLigada'); // Altera a imagem do botão para ligado
                musicaAudio = true;
            }
        });
        this.somClique = this.sound.add('powerUp');
        this.somClique.setVolume(0.3)

        // Define a imagem inicial do botão de acordo com o estado da música
        if (!this.musica.isPlaying) {
            this.somLigado.setTexture('MusicaDesligada');
        }
        else {
            this.somLigado.setTexture('musicaLigada');
        }
        
        // Adiciona o botão iniciar
        this.botaoIniciar = this.add.image(this.cameras.main.width / 2, this.cameras.main.height * 0.65, 'iniciar').setScale(0.51);
        //this.botaoIniciar.setScale();
        this.botaoIniciar.setInteractive({ cursor: 'pointer'});
        
        // Define a interação com o botão de início 
        this.botaoIniciar.on('pointerup', () => {
            // Toca o som de clique
            this.sound.play('som_clique');
            setTimeout(() => {
                this.sound.play('carroLiga');
            }, 100);
            this.botaoIniciar.setScale(0.5);

            // Transição de cena
            this.cameras.main.fadeOut(250);
            setTimeout(() => {
                this.scene.start('Mapa'); // Inicia a cena do mapa
              }, 500);
            });    
    }  
}