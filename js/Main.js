import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js";

const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("garota", "assets/garota.png");
assets.carregaImagem("esqueleto", "assets/skelly.png");
assets.carregaImagem("orc", "assets/orc.png");
assets.carregaImagem("mapa", "assets/base_out_atlas.png");
assets.carregaAudio("moeda", "assets/coin.wav");
assets.carregaAudio("boom", "assets/boom.wav");


const canvas = document.querySelector("canvas");
canvas.width = 14*32;
canvas.height = 10*32;
const cena1 = new Cena(canvas,assets);

const mapa1 = new Mapa(10,14,32);
mapa1.carregaMapa(modeloMapa1);
cena1.configuraMapa(mapa1);

const pc = new Sprite({x: 50, vx: 10});
cena1.adicionar(pc);

window.setInterval(adicionaSprite, 4000);
function adicionaSprite() 
{
  let y = Math.floor(Math.random() * (mapa1.LINHAS - 2)) + 1;
  let x = Math.floor(Math.random() * (mapa1.COLUNAS - 2)) + 1;

  if (mapa1.tiles[y][x] == 0) 
  {
    y = mapa1.SIZE * y + mapa1.SIZE / 2;
    x = mapa1.SIZE * x + mapa1.SIZE / 2;
    if (x > 416 || x < 32 || y > 288 || y < 32) 
    {
        adicionaSprite();
    }
    else
    {
        let randomSpeed = Math.floor(Math.random() * 4);
        let vx1 = 0;
        let vy1 = 0;
        switch (randomSpeed) {
            case 0:
                vx1 = 10;
                break;
            case 1:
                vx1 = -10;
                break;
            case 2:
                vy1 = 10;
                break;
            default:
                vy1 = -10;
                break;
        }

        cena1.adicionar(new Sprite({ x: x, y: y, vx: vx1, vy: vy1, color: "blue" }));
    }
  } else {
    adicionaSprite();
  }
}

cena1.iniciar();

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "s":
            cena1.iniciar();
            break;
        case "S":
            cena1.parar();
            break;
        case "c":
            assets.play("moeda");
            break;
        case "b":
            assets.play("boom");
            break;
    }
});