export default class Tutorial extends Phaser.GameObjects.Image {
 
  // Variáveis que serão utilizadas
  botaoSairTutorial;
  
  // Construtor da cena
  constructor(cena) {
    super(
      cena,
      cena.cameras.main.centerX,
      cena.cameras.main.centerY,
      "tutorial"
    ) 
      .setScrollFactor(0);
    cena.add.existing(this);
    this.setScale(0.55).setDepth(2);
    cena.joyStick.setVisible(false)
  }
  
  // Cria o botão de sair do tutorial
  sairTutorial(cena) {
    this.seguirParaProxima = cena.add.image(this.x+420, this.y+210,'next').setScrollFactor(0).setScale(0.5).setDepth(20)
    this.seguirParaProxima.setInteractive({cursor: 'pointer'})
    this.seguirParaProxima.on('pointerup', ()=>{
      cena.somClique.play();
      this.setTexture('tutorial2');
      this.botaoSairTutorial = cena.add.image(
        this.x+440 ,
        this.y-195,
        "sair"
      )
      .setScrollFactor(0).setDepth(20).setScale(0.5)
      this.seguirParaProxima.destroy()
    
      this.botaoSairTutorial.setInteractive({
        cursor: "pointer"

      });

    
     // Define um temporizador para executar uma função após 10 segundos


      // Define um evento de clique para o botão de sair tutorial
      this.botaoSairTutorial.on("pointerup", () => {
        // Toca um som chamado "som_clique" na cena
        cena.sound.play("som_clique");

        // Destroi este objeto (provavelmente um componente ou elemento)
        this.destroy();

        // Destroi o botão de sair tutorial (provavelmente um elemento gráfico)
        this.botaoSairTutorial.destroy()

        // Torna o joystick (provavelmente um controle virtual) visível novamente
        if (!cena.tutorialDoMenu) {
          cena.joyStick.setVisible(true);
          cena.botaoMenu.setVisible(true);
          cena.casasConcluidas.setVisible(true);
          cena.exclamacaoConcluida.setVisible(true);

          // Retoma a contagem do tempo ou função de temporização (caso esteja pausada)
          cena.funcaoTempo.paused = false;
        }
    });

    



    // Habilita interatividade do botão de saída
    this.botaoSairTutorial.setInteractive({ cursor: "pointer" });

    // Reinicia joystick, tempo e destroi a cena e o botão após 10 segundos
  

    // Define ação ao clicar no botão de saída
    this.botaoSairTutorial.on("pointerup", () => {
      // Toca som de clique
      cena.sound.play("som_clique");
      if (!cena.tutorialDoMenu){cena.funcaoTempo.paused = false;}
      cena.tutorialDoMenu = false;
      // Destroi a cena e o botão
      this.destroy();
      this.botaoSairTutorial.destroy();
      // Reinicia joystick e tempo
      cena.joyStick.setVisible(true);
    });
  })
}}
