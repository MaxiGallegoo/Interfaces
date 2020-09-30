
class Tablero {
  
constructor() {
    this.arregloFichas = [];
	this.centro = null;
  }

addFicha(ficha){
  this.arregloFichas[this.arregloFichas.length]=ficha;
  this.dibujar();
}

dibujar() {
	this.limpiarFondo();
	var primero = null;
	var segundo = null;
	for(let i=0;i<this.arregloFichas.length;i++)
	{
		primero = segundo;
		segundo = this.arregloFichas[i];
		this.arregloFichas[i].dibujar();
	}

}
limpiarFondo(){
	ctx.fillStyle="#5D2971";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.closePath();
	ctx.fillStyle ="#3904E4";
	ctx.fillRect(150, 100, 500, 500); // x, y, ancho, lar
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
}


deteccionDeClick(x,y){
	if(true){
		for(var i =0;i<this.arregloFichas.length;i++){
		  if(this.arregloFichas[i].onTap(x,y)){
				return this.arregloFichas[i];
		  }
		}
 	}
    return null;
}

agregaFicha(c){
	this.arregloCirculos;
	for(var i =0;i<this.arregloFichas.length;i++){
		  if(this.arregloFichas[i]==c){
			 var pos=i;
		  }
	}
	this.actualizarFila(this.arregloFichas[pos]);
}
actualizarFila(x){
	return true;
}
}
