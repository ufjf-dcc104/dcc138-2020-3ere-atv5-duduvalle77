import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Sprite from "./Sprite.js";

const assets = new AssetManager();

assets.carregaImagem("garota", "assets/garota.png");
assets.carregaImagem("esqueleto", "assets/skelly.png");
assets.carregaImagem("orc", "assets/orc.png");
assets.carregaAudio("moeda", "assets/coin.wav");

const canvas = document.querySelector("canvas");
const cena1 = new Cena(canvas,assets);

const pc = new Sprite({vx: 10});
const en1 = new Sprite({x: 200, color:"red"});
cena1.adicionar(pc);
cena1.adicionar(en1);
cena1.adicionar(new Sprite({y: 10, color:"blue"}));

cena1.iniciar();

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "s":
            cena1.iniciar();
            break;
        case "S":
            cena1.parar();
            break;
    }
});