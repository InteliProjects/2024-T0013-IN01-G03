import Tutorial from "./tutorialJogo.js";

export default class Menuu extends Phaser.GameObjects.Container {
    // Construtor da cena
   
    constructor(cena) {
        super(cena, cena.cameras.main.centerX, cena.cameras.main.centerY);

        cena.sound.play('bloopSom', { volume: 0.4 });
        cena.funcaoTempo.paused = true
        // Adiciona a primeira imagem
        this.imagem1 = cena.add.image(0, 0, "menu1")
            .setScrollFactor(0)
            .setScale(0.6);
            
        // Adiciona o botão sair
        this.botaoSair = cena.add.image(250, -155, "sair")
            .setScrollFactor(0)
            .setScale(0.5)
            .setInteractive({ cursor: "pointer" });

        // Adiciona um evento de clique ao botão sair
        this.botaoSair.on('pointerdown', () => {
            // Destrói o menu quando o botão sair for clicado
            this.destroy();
            cena.sound.play('bloopSomInvertido', { volume: 0.4 });
            this.text1.destroy();
            this.text2.destroy();
            cena.funcaoTempo.paused = false
            // this.botaoMenu.setVisible(true)
        });

        // Inicializa o botão de som
        this.botaosom = cena.add.image(10, 120, cena.musicaReproduzindo ? "musicaLigada" : "MusicaDesligada")
            .setScrollFactor(0)
            .setScale(0.4)
            .setInteractive({ cursor: "pointer" });

        // Adiciona as imagens ao container
        this.add(this.imagem1);
        this.add(this.botaoSair);
        this.add(this.botaosom);

        cena.add.existing(this);

        cena.joyStick.setVisible(false);//A visibilidade do joystick, é declarada como falsa

        // Adiciona o botão "Reiniciar Jogo" para tela de Mapa
        const centerX = cena.game.renderer.width / 2 + 5;
        const centerY = cena.game.renderer.height / 2 - 100;

        this.text1 = cena.add.image(centerX, centerY, 'botaoTutorial')
        .setScrollFactor(0)
        .setOrigin(0.5, 0.5)
        .setScale(0.6)
        .setInteractive({ cursor: "pointer" });

        // Adiciona um evento de clique ao botão "Tutorial"
        this.text1.on('pointerdown', () => {
            cena.sound.play("som_clique");
            // Destrói o menu quando o botão sair for clicado
            this.destroy();
            this.text1.destroy();
            this.text2.destroy();
            cena.funcaoTempo.paused = false
            // this.botaoMenu.setVisible(true)
            cena.tutorialDoMenu = true;
            let tutorial = new Tutorial(cena);
            tutorial.sairTutorial(cena);
        });
        
        // Adiciona o botão "voltar para tela de Inicio"
        const centerX1 = cena.game.renderer.width / 2 + 5;
        const centerY2 = cena.game.renderer.height / 2 + 12;

        this.text2 = cena.add.image(
            centerX1,
            centerY2,
           'botaoInicio'
        )
        .setScrollFactor(0)
        .setOrigin(0.5, 0.5)
        .setScale(0.6)
        .setInteractive({ cursor: "pointer" });

        // Adiciona um evento de clique ao botão "voltar para tela de Inicio"
        this.text2.on('pointerdown', () => {
            cena.sound.play("som_clique");
            cena.cameras.main.fadeOut(250);
            setTimeout(() => {
                cena.contador = 0;
                cena.scene.start('Inicio'); // Inicia a cena de Início
              }, 500);
        });

        // Adiciona um evento de clique ao botão de som
        this.botaosom.on('pointerup', () => {
            // Alterna o estado do áudio e atualiza a imagem do botão
            cena.musicaReproduzindo = !cena.musicaReproduzindo;
            if (cena.musicaReproduzindo) {
                this.botaosom.setTexture('musicaLigada');
                // Retoma a música
                cena.sound.resumeAll();
            } else {
                this.botaosom.setTexture('MusicaDesligada');
                // Pausa a música
                cena.sound.pauseAll();
            }
        });
    }
}