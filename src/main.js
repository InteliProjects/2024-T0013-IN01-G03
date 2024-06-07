import Inicio from "./cenas/inicio.js";
import Mapa from "./cenas/mapa.js";
import Orientacao from "./cenas/telaDeOrientacao.js";

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;
const MAX_WIDTH = DEFAULT_WIDTH * 1.5;
const MAX_HEIGHT = DEFAULT_HEIGHT * 1.5;

// Tipo de formatacao de phaser e tamanho de tela

    var config = {
        type: Phaser.AUTO,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 }, // Jogo não precisará de gravidade
            }
        },
        
    // definindo a ordem das cenas
    scene: [Orientacao, Inicio, Mapa],
    scale:{
        mode: Phaser.Scale.SMOOTH,
 
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
 
    
  
};

// Cria oassets/TeleVitoria.jpg jogo com as configurações definidas
export const game = new Phaser.Game(config);

const resize = () => {
    // Pegando as novas medidas da janela de largura e altura
    const w = window.innerWidth;
    const h = window.innerHeight;

    let width = DEFAULT_WIDTH;
    let height = DEFAULT_HEIGHT;

    // Calculando novos valores de largura e altura
    let scale = Math.min(w / width, h / height);
    let newWidth = Math.min(w / scale, MAX_WIDTH);
    let newHeight = Math.min(h / scale, MAX_HEIGHT);

    // Calculando razão entre largura e altura
    let defaultRatio = DEFAULT_WIDTH / DEFAULT_HEIGHT;
    let maxRatioWidth = MAX_WIDTH / DEFAULT_HEIGHT;
    let maxRatioHeight = DEFAULT_WIDTH / MAX_HEIGHT;

    // Fator de suavização do scaling
    let smooth = 1;
    const maxSmoothScale = 1.15;

    // Matemática complicada para calcular o fator de suavização para a função de scaling
    const normalize = (value, min, max) => {
        return (value - min) / (max - min);
    }
    if (width / height < w / h) {
        smooth = -normalize(newWidth / newHeight, defaultRatio, maxRatioWidth) / (1 / (maxSmoothScale - 1)) + maxSmoothScale;
    } 
    else {
        smooth = -normalize(newWidth / newHeight, defaultRatio, maxRatioHeight) / (1 / (maxSmoothScale - 1)) + maxSmoothScale;
    }

    // Aplicando o scaling
    game.scale.resize(newWidth * smooth, newHeight * smooth);

    // Aplicando o scaling no CSS da página
    game.canvas.style.width = newWidth * scale + 'px';
    game.canvas.style.height = newHeight * scale + 'px';

    // Centralizando o jogo na tela com margem no CSS
    game.canvas.style.marginTop = `${(h - newHeight * scale) / 2}px`;
    game.canvas.style.marginLeft = `${(w - newWidth * scale) / 2}px`;


    // Chamando a função "onResize" para cada elemento nas cenas que a possuir
    game.scene.scenes.forEach((scene) => {
        scene.children.list.forEach((child) => {
            if (typeof child.onResize === 'function') {
                child.onResize();
            }
        });
    });
}


window.addEventListener('resize', event => {
    resize();
})

resize();