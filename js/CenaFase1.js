import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js";

export default class CenaFase1 extends Cena{
    quandoColidir(a, b){
        
        if(a.tags.has("pc") && b.tags.has("enemy")){
            this.assets.play("boom");
            if(!this.aRemover.includes(a)){
                this.aRemover.push(a);
            }
            if(!this.aRemover.includes(b)){
                this.aRemover.push(b);
            }
            this.rodando = false;
            this.game.selecionaCena("fim")
        }
        if(a.tags.has("enemy") && b.tags.has("enemy")){
            this.assets.play("boom");
            if(!this.aRemover.includes(a)){
                this.aRemover.push(a);
            }
            if(!this.aRemover.includes(b)){
                this.aRemover.push(b);
            }
        }
        if(a.tags.has("pc") && b.tags.has("moeda")){
            this.assets.play("moeda");
            this.game.pontuacao+=1;
            if(!this.aRemover.includes(b)){
                this.aRemover.push(b);
            }
        }
        if(a.tags.has("pc") && b.tags.has("portal")){
            this.assets.play("portal");
            this.rodando = false;
            this.game.selecionaCena("fase2")
        }
    }
    preparar(){
        super.preparar();
        const mapa1 = new Mapa(10,14,64);
        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);

        const pc = new Sprite({x: 64*2, y: 64*5, w:28, h:49, tags:["pc"]});
        const cena = this;
        pc.controlar = function (dt) {
            if(cena.input.comandos.get("MOVE_ESQUERDA")){
                this.vx = -50;
            } else if(cena.input.comandos.get("MOVE_DIREITA")){
                this.vx = +50;
            } else {
                this.vx = 0;
            }
            if(cena.input.comandos.get("MOVE_CIMA")){
                this.vy = -50;
            } else if(cena.input.comandos.get("MOVE_BAIXO")){
                this.vy = +50;
            } else {
                this.vy = 0;
            }
        };
        this.adicionar(pc);

        function perseguePC(dt) {
            this.vx = 25*Math.sign(pc.x - this.x);
            this.vy = 25*Math.sign(pc.y - this.y);
        }

        const en1 = new Sprite({x: 8*64, y: 64*5, w:28, h:49, vx: -10, color: "red", controlar: perseguePC, tags:["enemy"]});
        const en2 = new Sprite({x: 11*64, y: 64*5, w:28, h:49, vx: -10, color: "red", controlar: perseguePC, tags:["enemy"]});
        this.adicionar(en1);
        this.adicionar(en2);
        const por = new Sprite({x: 12*64, y: 64*5, color: "blue", tags:["portal"]});
        this.adicionar(por);
        const moeda1 = new Sprite({x: 8*64, y: 7*64, color: "yellow", tags:["moeda"]});
        const moeda2 = new Sprite({x: 8*64, y: 3*64, color: "yellow", tags:["moeda"]});
        const moeda3 = new Sprite({x: 2*64, y: 8*64, color: "yellow", tags:["moeda"]});
        const moeda4 = new Sprite({x: 2*64, y: 2*64, color: "yellow", tags:["moeda"]});
        this.adicionar(moeda1);
        this.adicionar(moeda2);
        this.adicionar(moeda3);
        this.adicionar(moeda4);
    }
}