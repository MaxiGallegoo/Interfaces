let limpiarfondo = false;
var size = "10";
let posX;
let posY;
let arrastrando=false; 
var lapiz = document.getElementById('lapiz');
     goma = document.getElementById('goma'),
     atributos = document.getElementById('atributos'),
     color = document.getElementById("color"),
     cursor = document.getElementById("cursor"),
     comenzar = false;

    cursor.addEventListener('click',function(){
        comenzar=false;
        atributos.style.display = 'none';
    });

function Puntero(e){
	console.log(e.layerX,e.layerY);
    this.arrastrando=true;  
}
function arrancar(e){
    if(comenzar){
        console.log(e.layerX,e.layerY);
        this.arrastrando=true;
        dibujar(e.layerX,e.layerY);
    }
}

function arrastrar(e){
    if(comenzar){
        if (this.arrastrando){
            console.log(e.layerX,e.layerY);      
                var movX = e.layerX;
                var movY = e.layerY;
                dibujar(movX,movY);
        }
    }
}

function termino(e){
    if(comenzar){
        this.arrastrando=false;
    }
}

function dibujar(x,y){  
   ctx.fill();
   console.log(limpiarfondo);
   if(limpiarfondo){
        ctx.fillStyle="#FFFFFF";       
    }
   else{ 
       ctx.fillStyle=this.color.value;
   }
   ctx.beginPath();
   console.log(color.value);
   size = document.getElementById("customRange").value;
   ctx.arc(x,y,this.size,0, Math.PI * 2);
   ctx.fill();
}

function nuevoTrazarLinea(primero,segundo){
    ctx.strokeStyle = "#FFFF00";
    ctx.moveTo(primero.getX(),primero.getY());
    ctx.lineTo(segundo.getX(),segundo.getY());
    ctx.stroke();
}

function UsarLapiz(){
    comenzar=true;
    limpiarfondo=false;
    atributos.style.display = 'inline';
}

function UsarGoma(){
    limpiarfondo=true;
    comenzar=true;
}

canvas.addEventListener("mousedown",arrancar);

canvas.addEventListener("mousemove",arrastrar);

canvas.addEventListener("mouseup",termino);