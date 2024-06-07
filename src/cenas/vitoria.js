// Classe para exibir a tela de vitória
export default class Vitoria extends Phaser.GameObjects.Image {
  estrela1;
  estrela2;
  estrela3;

  // Construtor: inicializa a cena e posiciona a imagem
  constructor(cena) {
    super(
      cena,
      cena.game.renderer.width / 2,
      cena.game.renderer.height / 2,
      "pergunta"
    ).setScrollFactor(0);
    cena.add.existing(this);
    this.setScale(0.5, 0.8);

    
    // Som de Vitoria
    cena.sound.play('vitoriaAudio', { volume: 0.5 });
  
    
    // Adiciona texto informando o tempo total do jogo
    cena.add.text(
      cena.game.renderer.width / 2,  // Posição horizontal no centro da tela
      cena.game.renderer.height / 2 - 90,// Posição vertical acima do centro da tela
      `Jogo completo faltando \n${(formatoTempo(cena.tempoInicial))}`,  // Texto a ser exibido
      {                                                  
        fontFamily: "Determination", // Família da fonte
        fontSize: "36px", // Tamanho da fonte
        fill: "#000000"      // Cor do texto
      }
    )

// Define o fator de rolagem do texto como zero para mantê-lo fixo na tela
.setScrollFactor(0)

// Define o ponto de origem do texto como o centro
.setOrigin(0.5, 0.5)

// Aumenta a escala do texto em 30%
.setScale(1.3);

setTimeout(function() {
  cena.joyStick.setVisible(false);
}, 200);
    // Adiciona texto de parabéns
    cena.add
      .text(
        cena.game.renderer.width / 2,
        cena.game.renderer.height / 2 - 170,
        "PARABÉNS!",
        { fontFamily: "Determination", fontSize: "36px", fill: "#000000" }
      )
      .setScrollFactor(0)
      .setOrigin(0.5, 0.5)
      .setScale(2.0);

      
    // Adiciona uma imagem como botão de reinício à cena do jogo
    this.botaoReiniciar = cena.add.image(
      cena.game.renderer.width / 2,                      
      cena.game.renderer.height / 2 + 150,               
      "home"                                             
    )

    // Define o fator de rolagem da imagem como zero para mantê-la fixa na tela
    .setScrollFactor(0)

    // Reduz o tamanho da imagem em 20%
    .setScale(0.8)

    // Define a imagem como interativa para responder a eventos de mouse
    .setInteractive({ cursor: "pointer" });

    // Define um evento de clique para o botão de reinício
    this.botaoReiniciar.on("pointerup", () => {
      // Reinicia um contador na cena do jogo
      cena.contador = 0;

      // Imprime o valor da variável tempoInicial no console
      console.log(cena.tempoInicial);

      // Faz a câmera principal da cena desaparecer gradualmente em 250 milissegundos
      cena.cameras.main.fadeOut(250);

      // Define um temporizador para iniciar uma nova cena após um breve atraso de 500 milissegundos
      setTimeout(() => {
        cena.scene.start("Inicio");  // Inicia a cena "Inicio"
      }, 500);
    });
  }
  //Cena de pontuação, ao final do jogo
  adicionarEstrela1(cena) {
    cena.estrela1 = cena.add
      .image(
        cena.game.renderer.width / 2,
        cena.game.renderer.height / 2,
        "estrela1"
      )
      .setScrollFactor(0)
      .setVisible(true).setScale(0.4)
  }
  adicionarEstrela2(cena) {
    cena.estrela2 = cena.add
      .image(
        cena.game.renderer.width / 2,
        cena.game.renderer.height / 2,
        "estrela2"
      )
      .setScrollFactor(0)
      .setVisible(true).setScale(0.4);
  }
  adicionarEstrela3(cena) {
    cena.estrela3 = cena.add
      .image(
        cena.game.renderer.width / 2,
        cena.game.renderer.height / 2 + 20,
        "estrela3"
      )
      .setScrollFactor(0)
      .setVisible(true).setScale(0.4);
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