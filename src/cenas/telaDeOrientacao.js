
// Classe para cena de orientação
export default class Orientacao extends Phaser.Scene {
    constructor(){
        super({ key: "Orientacao" });
    }
    
    // Pré-carrega imagens necessárias
    preload(){
        this.load.image("fundocena1", "./src/assets/mapa/fundoEscuro.png");
        this.load.image("girarcelular", "./src/assets/mapa/girarTela.png");
    }
    
    // Cria elementos visuais da cena
    create(){
        setTimeout(() => {
        // Adiciona imagem de fundo
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2,'fundocena1').setDisplaySize(this.game.renderer.width+100, this.game.renderer.height+100);
        // Adiciona imagem de instrução para girar o celular
        this.girarTela = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 4,'girarcelular').setScale(0.45);
        
        // Adiciona texto de orientação com atraso
        this.time.addEvent({
            delay: 100,
            callback: () => {
                this.texto1 = this.add.text(this.cameras.main.width/2, this.cameras.main.height /2,'GIRE A TELA PARA JOGAR', { fontFamily: "Determination", fontSize: '36px', fill: '#ffffff' }).setScale(1.1).setScrollFactor(0).setOrigin(0.5,0.5);
                this.texto2 = this.add.text(this.cameras.main.width/2, this.cameras.main.height /2*1.2,'CLIQUE DUAS VEZES PARA SEGUIR', { fontFamily: "Determination", fontSize: '36px', fill: '#ffffff' }).setScale(1.1).setScrollFactor(0).setOrigin(0.5,0.5);
            }
        });
        }, 5)
        
    }

    // Atualiza a cena
    update(){
        let lastTime = 0;
        if(this.sys.game.device.os.iPhone || this.sys.game.device.os.iPhone){
            this.scene.start('Inicio')
        }
        // Detecta cliques na tela
        this.input.on("pointerup", () => {
            let clickDelay = this.time.now - lastTime;
            lastTime = this.time.now;
            if (clickDelay < 350){
                // Se o usuário clicar duas vezes, destrói elementos e inicia cena 'Inicio'
                this.girarTela.destroy();
                this.texto1.destroy();
                this.texto2.destroy();
                this.cameras.main.fadeOut(250);
                setTimeout(() => {
                    this.scene.start('Inicio'); // Inicia a cena do mapa
                }, 500);
            }
                
            // Se o dispositivo suportar fullscreen, alternar tela cheia ao clicar duas vezes
            if(clickDelay < 350 && this.scale.game.device.fullscreen.available) {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            }
        }, this);
    }
}