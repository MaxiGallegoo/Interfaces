var canvas = document.getElementById('canvas');
let ctx = document.getElementById('canvas').getContext("2d");
let tablero = new Tablero();
let arrastrando=false; // para chequear si se apreto sobre un punto.
let punto=null; // punto actual.
let comenzar=true;
iniciar();

function iniciar(){	
	ctx.fillStyle="#5D2971";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.closePath();
	ctx.fillStyle ="#3904E4";
	ctx.fillRect(150, 100, 500, 500); // x, y, ancho, lar
	console.log("arraque");
	ctx.lineWidth = 4;
	ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(150,100);
	ctx.lineTo(650,100);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(150,100);
	ctx.lineTo(150,600);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(650,100);
	ctx.lineTo(650,600);
	ctx.stroke();
	if(comenzar){
		dibujarTablero();
		dibujarFlechas();
		this.comenzar=false;
	}
	else{
		this.tablero.dibujar();
	}
	dibujarFichas();
}

function dibujarTablero(){
	ctx.lineWidth = 4;
	ctx.strokeStyle = "#000000";
	var tamanoFicha=50;
	var tamanoIntermedio=25;
	var valorMaxX=650;
	var valorMaxY=600;
	for(x=150;x <valorMaxX; x++){	
		for(y=100;y <valorMaxY ; y++){	
			this.punto = new Ficha(x+tamanoIntermedio,y+tamanoIntermedio);
			tablero.addFicha(this.punto);		
				y=y+tamanoFicha-1;
		}	
		x=x+tamanoFicha-1;
	}
	tablero.dibujar();
}
function dibujarFlechas(){
		for(y=150;y <= 600 ; y++){	
			this.punto = new Ficha(y+25,70);
			this.punto.setForma();
			this.punto.setColor("#FF0000");
			tablero.addFicha(this.punto);
			y=y+50-1;
		}
		tablero.dibujar();	
}

function dibujarFichas(){
		this.punto = new Ficha(40,560);
		this.punto.setColor("#FFFF00");
		this.punto.setValor(1);
		tablero.addFicha(this.punto);
		this.punto = new Ficha(760,560);
		this.punto.setColor("#0CEF00");
		this.punto.setValor(1);
		tablero.addFicha(this.punto);
		tablero.dibujar();
}


function Puntero(e){
	this.punto = null;
	var i = 0;
	if (this.punto == null)
	{
		this.punto = tablero.deteccionDeClick(e.layerX,e.layerY);
	}
    if(this.punto || null){
		this.arrastrando=true;
    }
}

function termine(e){
     this.arrastrando=false;
}

function arrastrar(e){
	if (this.arrastrando){	
		if(this.punto.getValor() || 0 ){
			if(this.punto || null)
			{
				var movX = e.layerX - this.punto.getX();
				var movY = e.layerY - this.punto.getY();
				this.punto.actualizar(e.layerX,e.layerY);
				redibujar();
			}
			else
			{
			this.punto.actualizar(e.layerX,e.layerY);	
				redibujar();
			}
		}
	
	}
}

   function redibujar(){
	tablero.dibujar();
  }

function selecColumna(e){
	this.punto = null;
	if (this.punto == null){
		this.punto = tablero.deteccionDeClick(e.layerX,e.layerY);
		if (this.punto != null)
		{
			tablero.agregaFicha(this.punto);
			redibujar();
		}
	}
}


canvas.addEventListener("dblclick",selecColumna);
canvas.addEventListener("mousemove",arrastrar);
canvas.addEventListener("mousedown",Puntero);
canvas.addEventListener("mouseup",termine);