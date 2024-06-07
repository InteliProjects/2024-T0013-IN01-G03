export default class Pergunta extends Phaser.GameObjects.Image {
  // Criando as variáveis necessárias
  opcaoA;
  opcaoB;
  opcaoC;
  opcaoD;
  feedback;
  texto;
  emissor;
  questao;
  i;
  // Construtor da cena
  constructor(cena, i) {
    super(
      cena,
      cena.cameras.main.centerX,
      cena.cameras.main.centerY,
      "pergunta",
      cena.contador,
      cena.casasConcluidas,
      cena.emissor
    )
      .setScrollFactor(0)
      .setScale(0.9);
    // Adiciona esta instância (referenciada por 'this') à cena do jogo
    cena.add.existing(this);
    // Define a propriedade 'i' desta instância com o valor fornecido como argumento
    this.i = i;
    // Define a escala desta instância como 0.86
    this.setScale(0.82);
    // Cria um novo emissor de eventos para esta instância
    this.emissor = new Phaser.Events.EventEmitter();
    // Adiciona um ouvinte de eventos para o evento 'clicar' ao emissor de eventos, chamando a função 'clicar' com 'this' como contexto quando o evento é acionado
    cena.botaoMenu.setVisible(false);
    cena.casasConcluidas.setVisible(false);
    cena.exclamacaoConcluida.setVisible(false);
    this.emissor.addListener("clicar", this.clicar, this);
  }
  // Função para criar as respostas
  criarRespostas(cena, ct, r0, r1, r2, r3, r4, f1, f2, f3, f4, jtfq) {
    const centerX = cena.game.renderer.width / 2;
    const centerY = cena.game.renderer.height / 2;
    const posPergunta = centerY * 0.55;
    this.contextualizacao = cena.add
      .image(centerX, centerY, "pergunta")
      .setScrollFactor(0)
      .setScale(0.82); //.setScale(Math.min(cena.cameras.main.width*2.2 / this.width, cena.cameras.main.height*2.2 / this.height));
    this.contexto = cena.add
      .text(centerX, centerY, ct, {
        fontFamily: "Determination",
        fontSize: "36px",
        fill: "#000000",
      })
      .setScale(1.1)
      .setScrollFactor(0)
      .setOrigin(0.5, 0.5); //.setScale(Math.min(cena.cameras.main.width*2.5 / this.width, cena.cameras.main.height*2.5 / this.height)).
    this.seguirParaPergunta = cena.add
      .image(this.x + 400, this.y + 200, "next")
      .setScrollFactor(0)
      .setScale(0.5); //.setScale(Math.min(cena.cameras.main.width*0.7 / this.width, cena.cameras.main.height*0.7 / this.height))
    this.seguirParaPergunta.setInteractive({ cursor: "pointer" });
    this.seguirParaPergunta.on("pointerup", () => {
      cena.joyStick.setVisible(false);
      cena.botaoMenu.setVisible(false);
      cena.casasConcluidas.setVisible(false);
      cena.exclamacaoConcluida.setVisible(false);
      cena.somClique.play();
      this.contextualizacao.destroy();
      this.contexto.destroy();
      this.seguirParaPergunta.destroy();
      // Posicionando as perguntas no cenário e as ativando após o clique
      this.enunciado = cena.add
        .text(centerX * 0.45, posPergunta, r0, {
          fontFamily: "Determination",
          fontSize: "42px",
          fill: "#ac0c04",
        })
        .setScrollFactor(0)
        .setOrigin(0, 0.55)
        .setScale(1.05); //setScale(Math.min(cena.cameras.main.width*2.5 / this.width, cena.cameras.main.height*2.5 / this.height)).
      this.opcaoA = cena.add
        .text(centerX * 0.45, posPergunta * 1.3, r1, {
          fontFamily: "Determination",
          fontSize: "36px",
          fill: "#000000",
        })
        .setScrollFactor(0)
        .setInteractive({ cursor: "pointer" })
        .setScale(1.05); //.setScale(Math.min(cena.cameras.main.width*2.5 / this.width, cena.cameras.main.height*2.5 / this.height));
      this.opcaoA.on("pointerup", () =>
        this.emissor.emit("clicar", cena, f1, jtfq)
      );
      this.opcaoB = cena.add
        .text(centerX * 0.45, posPergunta * 1.75, r2, {
          fontFamily: "Determination",
          fontSize: "36px",
          fill: "#000000",
        })
        .setScrollFactor(0)
        .setInteractive({ cursor: "pointer" })
        .setScale(1.05); //.setScale(Math.min(cena.cameras.main.width*2.5 / this.width, cena.cameras.main.height*2.5 / this.height));
      this.opcaoB.on("pointerup", () =>
        this.emissor.emit("clicar", cena, f2, jtfq)
      );
      this.opcaoC = cena.add
        .text(centerX * 0.45, posPergunta * 2.2, r3, {
          fontFamily: "Determination",
          fontSize: "36px",
          fill: "#000000",
        })
        .setScrollFactor(0)
        .setInteractive({ cursor: "pointer" })
        .setScale(1.05); //.setScale(Math.min(cena.cameras.main.width*2.5 / this.width, cena.cameras.main.height*2.5 / this.height));
      this.opcaoC.on("pointerup", () =>
        this.emissor.emit("clicar", cena, f3, jtfq)
      );
      this.opcaoD = cena.add
        .text(centerX * 0.45, posPergunta * 2.65, r4, {
          fontFamily: "Determination",
          fontSize: "36px",
          fill: "#000000",
        })
        .setScrollFactor(0)
        .setInteractive({ cursor: "pointer" })
        .setScale(1.05); //.setScale(Math.min(cena.cameras.main.width*2.5 / this.width, cena.cameras.main.height*2.5 / this.height));
      this.opcaoD.on("pointerup", () =>
        this.emissor.emit("clicar", cena, f4, jtfq)
      );
    });
  }
  // Adiciona a função de clicar
  clicar(cena, feedback, justificativa) {
    const centerX = cena.game.renderer.width / 2;
    const centerY = cena.game.renderer.height / 2;
    const posFB = centerY * 0.7;
    cena.funcaoTempo.paused = true;
    this.feedback = cena.add
      .image(centerX, centerY, "pergunta")
      .setScrollFactor(0)
      .setScale(0.82); //.setScale(Math.min(cena.cameras.main.width*2.2 / this.width, cena.cameras.main.height*2.2 / this.height));
    if (feedback == "RESPOSTA ERRADA!") {
      setTimeout(() => {
        cena.sound.play("errouPergunta");
      }, 200);
      this.texto = cena.add
        .text(centerX, posFB, feedback, {
          fontFamily: "Determination",
          fontSize: "85px",
          fill: "red",
        })
        .setScrollFactor(0)
        .setOrigin(0.5, 0.5)
        .setScale(1);
    } else {
      {
        setTimeout(() => {
          cena.sound.play("acertouPergunta", { volume: 0.5 });
        }, 200);
        this.texto = cena.add
          .text(centerX, posFB, feedback, {
            fontFamily: "Determination",
            fontSize: "85px",
            fill: "green",
          })
          .setScrollFactor(0)
          .setOrigin(0.5, 0.5)
          .setScale(1);
      }
    }
    this.feedbackTexto = cena.add
      .text(centerX, posFB * 1.6, justificativa, {
        fontFamily: "Determination",
        fontSize: "36px",
        fill: "#000000",
      })
      .setScrollFactor(0)
      .setOrigin(0.5, 0.5)
      .setScale(1.1); //.setScale(Math.min(cena.cameras.main.width*2.5 / this.width, cena.cameras.main.height*2.5 / this.height))
    // Define um atraso de 5000 milissegundos (5 segundos) antes de chamar a função sairDaTela com o contexto cena e passando cena como argumento
    cena.time.delayedCall(5000, this.sairDaTela, [cena], this);
    // Destroi os elementos opcaoA, opcaoB, opcaoC e opcaoD (provavelmente botões de opção)
    this.opcaoA.destroy();
    this.opcaoB.destroy();
    this.opcaoC.destroy();
    this.opcaoD.destroy();
    // Define um temporizador para executar uma função após 4500 milissegundos (4.5 segundos)
    setTimeout(() => {
      // Verifica se o texto exibido é "RESPOSTA ERRADA!"
      if (this.texto.text == "RESPOSTA ERRADA!") {
        // Reduz 180 unidades do tempo inicial do jogo
        if (cena.tempoInicial > 180) {
          cena.tempoInicial -= 180;
        } else {
          cena.tempoInicial = 0;
        }
        // Ajusta a escala e a cor do cronômetro para indicar uma resposta errada
        cena.cronometro.setScale(2);
        cena.cronometro.setTint(0xff0000);
        cena.cronometro.setText(this.formatoTempo(cena.tempoInicial));
        // Define um temporizador para restaurar a escala e a cor do cronômetro após 2 segundos
        setTimeout(() => {
          cena.cronometro.setScale(1);
          cena.cronometro.setTint(0xffffff);
        }, 2000);
      } else {
        // Adiciona 30 unidades ao tempo inicial do jogo
        cena.tempoInicial += 30;
        // Ajusta a escala e a cor do cronômetro para indicar uma resposta correta
        cena.cronometro.setScale(2);
        cena.cronometro.setTint(0x00ff00);
        cena.cronometro.setText(this.formatoTempo(cena.tempoInicial));
        // Define um temporizador para restaurar a escala e a cor do cronômetro após 2 segundos
        setTimeout(() => {
          cena.cronometro.setScale(1);
          cena.cronometro.setTint(0xffffff);
          cena.cronometro.setText(this.formatoTempo(cena.tempoInicial));
        }, 2000);
      }
    }, 1300);
  }
  formatoTempo(segundos) {
    // Calcula os minutos
    var minutos = Math.floor(segundos / 60);
    // Calcula a parte restante em segundos
    var parteEmSegundos = segundos % 60;
    // Garante que a parte dos segundos tenha sempre dois dígitos
    parteEmSegundos = parteEmSegundos.toString().padStart(2, "0");
    // Retorna o tempo formatado como "minutos:segundos"
    return `${minutos}:${parteEmSegundos}`;
  }
  // Adiciona a função de sair da tela de perguntas para retomar ao jogo
  sairDaTela(cena) {
    cena.perguntaAberta = true;
    this.emissor1 = new Phaser.Events.EventEmitter();
    // Adiciona um ouvinte de eventos para o evento 'clicar' ao emissor de eventos, chamando a função 'clicar' com 'this' como contexto quando o evento é acionado
    this.emissor1.addListener("responder", this.sairDoFeedback, this);
    // Verifica se o contador é menor que 6
    if (cena.contador < 6) {
      this.botaoSair = cena.add
        .image(this.x + 460, this.y - 210, "sair")
        .setScrollFactor(0)
        .setScale(0.5);
      this.botaoSair.setInteractive({ cursor: "pointer" });
      this.botaoSair.on("pointerup", () =>
        this.emissor1.emit("responder", cena)
      );
      cena.contador += 1;
      // Atualiza o texto indicando quantas casas foram concluídas
      cena.casasConcluidas.setText(`${cena.contador}/6`);
    } else if (cena.contador >= 6) {
      // Verifica se é necessário fazer as perguntas novamente
      if (cena.temQuePerguntarDeNovo) {
        cena.temQuePerguntarDeNovo = false;
        // Emite um evento "apertar" com o valor (this.i + 1)
        this.seguirParaPergunta = cena.add
        .image(this.x + 400, this.y + 200, "next")
        .setScrollFactor(0)
        .setScale(0.5); //.setScale(Math.min(cena.cameras.main.width*0.7 / this.width, cena.cameras.main.height*0.7 / this.height))
        this.seguirParaPergunta.setInteractive({ cursor: "pointer" });
        this.seguirParaPergunta.on("pointerup", () => {
          setTimeout(() => {
            cena.joyStick.setVisible(false);
            cena.botaoMenu.setVisible(false);
            cena.casasConcluidas.setVisible(false);
            cena.exclamacaoConcluida.setVisible(false);
          }, 20);
          this.emissor1.emit("responder", cena);
          this.seguirParaPergunta.destroy()
          cena.somClique.play();
          cena.emissor.emit("apertar", this.i + 1);
        });
      } else {
        this.botaoSair = cena.add
          .image(this.x + 460, this.y - 210, "sair")
          .setScrollFactor(0)
          .setScale(0.5);
        this.botaoSair.setInteractive({ cursor: "pointer" });
        this.botaoSair.on("pointerup", () =>
          this.emissor1.emit("responder", cena)
        );
        cena.contador += 1;
        cena.casasConcluidas.setText(`${cena.contador}/12`);
      }
    }
  }
  sairDoFeedback(cena) {
    cena.perguntaAberta = false;
    this.feedback.destroy();
    this.texto.destroy();
    this.enunciado.destroy();
    this.feedbackTexto.destroy();
    // Destroi esta instância
    this.destroy();
    cena.funcaoTempo.paused = false;
    // Define que não há mais perguntas sendo feitas
    cena.perguntando = false;
    if (this.botaoSair) {
      this.botaoSair.destroy();
    }
    // Define um temporizador para tornar o joystick visível novamente após 1 segundo
    if(!cena.temQuePerguntarDeNovo) {
    setTimeout(() => {
      cena.joyStick.setVisible(true);
      cena.botaoMenu.setVisible(true);
      cena.casasConcluidas.setVisible(true);
      cena.exclamacaoConcluida.setVisible(true);
    }, 10);
  }
  }
}