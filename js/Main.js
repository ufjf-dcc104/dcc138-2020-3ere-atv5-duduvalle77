import Cena from "./Cena.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector("canvas");
const cena1 = new Cena(canvas);

const pc = new Sprite();
cena1.adicionar(pc);

cena1.quadro(0);