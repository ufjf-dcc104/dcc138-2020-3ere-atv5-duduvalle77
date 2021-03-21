import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import CenaFase1 from "./CenaFase1.js";
import CenaFase2 from "./CenaFase2.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaFim from "./CenaFim.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("garota", "assets/garota.png");
assets.carregaImagem("esqueleto", "assets/skelly.png");
assets.carregaImagem("coin", "assets/coin.png");
assets.carregaImagem("portal", "assets/portal.png");
assets.carregaImagem("mapa", "assets/base_out_atlas.png");
assets.carregaAudio("moeda", "assets/coin.wav");
assets.carregaAudio("boom", "assets/boom.wav");
assets.carregaAudio("portal", "assets/portal.wav");


const canvas = document.querySelector("canvas");
canvas.width = 14*64;
canvas.height = 10*64;

input.configurarTeclado({
    "ArrowLeft": "MOVE_ESQUERDA",
    "ArrowRight": "MOVE_DIREITA",
    "ArrowUp": "MOVE_CIMA",
    "ArrowDown": "MOVE_BAIXO",
    " ": "PROXIMA_CENA"
});

const game  = new Game(canvas, assets, input);

const cena0 = new CenaCarregando();
const cena1 = new CenaFase1();
const cena2 = new CenaFase2();
const cena3 = new CenaFim();
game.adicionarCena("carregando", cena0);
game.adicionarCena("fase1", cena1);
game.adicionarCena("fase2", cena2);
game.adicionarCena("fim", cena3);

game.iniciar();

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "s":
            game.iniciar();
            break;
        case "p":
            game.parar();
            break;
        case "m":
            assets.play("moeda");
            break;
        case "b":
            assets.play("boom");
            break;
    }
});