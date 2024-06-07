
export default class Fim extends Phaser.GameObjects.Image {

    // Construtor: Inicializar com cena e parâmetros
    constructor(cena){
        // Chamar super() com posição e imagem
        super(cena, cena.game.renderer.width/2, cena.game.renderer.height/2, "pergunta").setScrollFactor(0);
        // Adicionar à cena atual
        cena.add.existing(this);
        // Ajustar escala da imagem
        this.setScale(0.5, 0.8);

        // Som de Falhas
        cena.sound.play('perdaAudio', { volume: 0.5 });

        cena.aparecerVitoria = true
        cena.joyStick.setVisible(false);
        // Adicionar texto de "TEMPO ESGOTADO!"
        cena.add.text(cena.game.renderer.width/2, cena.game.renderer.height/2-100, "TEMPO ESGOTADO!", { fontFamily: "Determination", fontSize: '36px', fill: '#000000' }).setScrollFactor(0).setOrigin(0.5, 0.5).setScale(2);
        
        // Adicionar texto "Tente novamente"
        cena.add.text(cena.game.renderer.width/2, cena.game.renderer.height/2, "Tente novamente", { fontFamily: "Determination", fontSize: '36px', fill: '#000000' }).setScrollFactor(0).setOrigin(0.5, 0.5).setScale(1.5);
        
        // Adicionar botão reiniciar com imagem e configurar interatividade
        this.botaoReiniciar = cena.add.image(cena.game.renderer.width/2, cena.game.renderer.height/2 + 120, "retornar").setScrollFactor(0).setScale(0.8).setInteractive({ cursor: "pointer" });
        this.botaoReiniciar.on("pointerup", () => {   
            // Ao clicar, reiniciar contador e cena, com efeito de fadeout
            cena.contador = 0;
            cena.cameras.main.fadeOut(250);
            setTimeout(() => {
                cena.scene.start('Inicio');
            }, 500);
        });
    }
}
