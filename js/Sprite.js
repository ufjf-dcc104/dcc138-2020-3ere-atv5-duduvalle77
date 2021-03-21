export default class Sprite {
    constructor({x=100, y=100, w=32, h=32, color="white", vx=0, vy=0, controlar=()=>{}, tags = []}={}){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.controlar = controlar;
        this.w = w;
        this.h = h;
        this.color = color;
        this.cena = null;
        this.mx = 0;
        this.my = 0;
        this.tags = new Set();
        this.quadro = 0;
        this.pose = 0;
        tags.forEach((tag)=>{
            this.tags.add(tag);
        });
    }
    desenhar(ctx, dt){
        if(this.tags.has("pc")){
            if(this.vx > 0){
                this.pose = 11;
                this.quadro = (this.quadro > 8) ? 0 : this.quadro + 9*dt;
            }else if(this.vx < 0){
                this.pose = 9;
                this.quadro = (this.quadro > 8) ? 0 : this.quadro + 9*dt;
            } 
            if(this.vy > 0){
                this.pose = 10;
                this.quadro = (this.quadro > 8) ? 0 : this.quadro + 9*dt;
            } else if (this.vy < 0){
                this.pose = 8;
                this.quadro = (this.quadro > 8) ? 0 : this.quadro + 9*dt;
            } 
            if(this.vx == 0 && this.vy == 0) {
                this.pose = 10;
                this.quadro = 0;
            }
            ctx.drawImage(this.cena.assets.img("garota"), 
                //sx,sy,sh,sw
                Math.floor(this.quadro)*64 , Math.floor(this.pose)*64, 64, 64,
                //dx,dy,dh,dw
                this.x - 32, this.y - 32 - 5, 64, 64
            ); 
        } else if(this.tags.has("enemy")){
            if(this.vx > 0){
                this.pose = 11;
                this.quadro = (this.quadro > 8) ? 0 : this.quadro + 9*dt;
            }else if(this.vx < 0){
                this.pose = 9;
                this.quadro = (this.quadro > 8) ? 0 : this.quadro + 9*dt;
            } 
            if(this.vy > 0){
                this.pose = 10;
                this.quadro = (this.quadro > 8) ? 0 : this.quadro + 9*dt;
            } else if (this.vy < 0){
                this.pose = 8;
                this.quadro = (this.quadro > 8) ? 0 : this.quadro + 9*dt;
            } 
            if(this.vx == 0 && this.vy == 0) {
                this.pose = 10;
                this.quadro = 0;
            }
            ctx.drawImage(this.cena.assets.img("esqueleto"), 
                //sx,sy,sh,sw
                Math.floor(this.quadro)*64 , Math.floor(this.pose)*64, 64, 64,
                //dx,dy,dh,dw
                this.x - 32, this.y - 32 - 5, 64, 64
            );  
        } else if(this.tags.has("moeda")){
            this.quadro = (this.quadro > 5) ? 0 : this.quadro + 9*dt;
            ctx.drawImage(this.cena.assets.img("coin"), 
                //sx,sy,sh,sw
                Math.floor(this.quadro)*200 , 23, 200, 200,
                //dx,dy,dh,dw
                this.x - 16, this.y - 16, 32, 32
            ); 
        } else if(this.tags.has("portal")){
            
            this.quadro = (this.quadro > 3) ? 0 : this.quadro + 9*dt;
            ctx.drawImage(this.cena.assets.img("portal"), 
                //sx,sy,sh,sw
                Math.floor(this.quadro)*251, 0, 251, 590,
                //dx,dy,dh,dw
                this.x - 23, this.y - 23, 46, 46
            ); 
        } else {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
        ctx.strokeStyle = "blue";
        ctx.strokeRect(
            this.mx*this.cena.mapa.SIZE,
            this.my*this.cena.mapa.SIZE,
            this.cena.mapa.SIZE,
            this.cena.mapa.SIZE
        );
        }
    }
    controlar(dt){

    }
    mover(dt){
        this.x = this.x + this.vx*dt
        this.y = this.y + this.vy*dt
        this.mx = Math.floor(this.x / this.cena.mapa.SIZE);
        this.my = Math.floor(this.y / this.cena.mapa.SIZE);
    }
    passo(dt){
        this.controlar(dt);
        this.mover(dt);
    }
    colidiuCom(outro)
    {
        return !(
            this.x - this.w/2 > outro.x + outro.w/2 ||
            this.x + this.w/2 < outro.x - outro.w/2 ||
            this.y - this.h/2 > outro.y + outro.h/2 ||
            this.y + this.h/2 < outro.y - outro.h/2
        );
    }
    aplicaRestricoes(dt){
        this.aplicaRestricoesDireita(this.mx + 1, this.my);
        this.aplicaRestricoesDireita(this.mx + 1, this.my + 1);
        this.aplicaRestricoesDireita(this.mx + 1, this.my - 1);
        this.aplicaRestricoesEsquerda(this.mx - 1, this.my);
        this.aplicaRestricoesEsquerda(this.mx - 1, this.my + 1);
        this.aplicaRestricoesEsquerda(this.mx - 1, this.my - 1);
        this.aplicaRestricoesBaixo(this.mx, this.my + 1);
        this.aplicaRestricoesBaixo(this.mx + 1, this.my + 1);
        this.aplicaRestricoesBaixo(this.mx - 1, this.my + 1);
        this.aplicaRestricoesCima(this.mx, this.my - 1);
        this.aplicaRestricoesCima(this.mx + 1, this.my - 1);
        this.aplicaRestricoesCima(this.mx - 1, this.my - 1);
    }
    aplicaRestricoesDireita(pmx, pmy){
        const SIZE = this.cena.mapa.SIZE;
        if(this.vx > 0){
            if(this.cena.mapa.tiles[pmy][pmx] !=0){
                const tile = {
                    x: pmx*SIZE+SIZE/2,
                    y: pmy*SIZE+SIZE/2,
                    w: SIZE,
                    h: SIZE
                };
                if(this.colidiuCom(tile)){
                    this.vx = 0;
                    this.x = tile.x - tile.w/2 - this.w/2 - 1;
                }
            }
        }
    }
    aplicaRestricoesEsquerda(pmx, pmy){
        const SIZE = this.cena.mapa.SIZE;
        if(this.vx < 0){
            if(this.cena.mapa.tiles[pmy][pmx] !=0){
                const tile = {
                    x: pmx*SIZE+SIZE/2,
                    y: pmy*SIZE+SIZE/2,
                    w: SIZE,
                    h: SIZE
                };
                if(this.colidiuCom(tile)){
                    this.vx = 0;
                    this.x = tile.x + tile.w/2 + this.w/2 + 1;
                }
            }
        }
    }
    aplicaRestricoesBaixo(pmx, pmy){
        const SIZE = this.cena.mapa.SIZE;
        if(this.vy > 0){
            if(this.cena.mapa.tiles[pmy][pmx] !=0){
                const tile = {
                    x: pmx*SIZE+SIZE/2,
                    y: pmy*SIZE+SIZE/2,
                    w: SIZE,
                    h: SIZE
                };
                if(this.colidiuCom(tile)){
                    this.vy = 0;
                    this.y = tile.y - tile.h/2 - this.h/2 - 1;
                }
            }
        }
    }
    aplicaRestricoesCima(pmx, pmy){
        const SIZE = this.cena.mapa.SIZE;
        if(this.vy < 0){
            if(this.cena.mapa.tiles[pmy][pmx] !=0){
                const tile = {
                    x: pmx*SIZE+SIZE/2,
                    y: pmy*SIZE+SIZE/2,
                    w: SIZE,
                    h: SIZE
                };
                if(this.colidiuCom(tile)){
                    this.vy = 0;
                    this.y = tile.y + tile.h/2 + this.h/2 + 1;
                }
            }
        }
    }
}