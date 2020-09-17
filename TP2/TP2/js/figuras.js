
class Figuras {
  constructor() {
	this.luz = 50;
    this.arregloFiguras = [];
  }

addFigura(figura){
  this.arregloFiguras.push(figura);
  this.dibujar();
}
vacio(){
	if(this.arregloFiguras.length > 1){
		return false;
	}
	return true;
}
dibujar(){
	for(let i=0;i<this.arregloFiguras.length;i++)
	{
		 this.arregloFiguras[i].dibujar();
	}
}

cambiarColorcla(){
	if (this.luz < 100)
	{
		this.luz++;
	}
	for(let i=0;i<this.arregloFiguras.length;i++){
		this.arregloFiguras[i].osc();
	}
}
cambiarColorosc()
{
	if (this.luz > 0)
	{
		this.luz--;
	}
	for(let i=0;i<this.arregloFiguras.length;i++){
		this.arregloFiguras[i].cla();
	}
}

deteccionDeClick(x,y){
	for(var i = this.arregloFiguras.length-1;i >= 0 ;i--){
		if(this.arregloFiguras[i].onTap(x,y)){
				return this.arregloFiguras[i];
		}
	}
    return null;
}

borrarpunto(c){
	for(var i =0;i<this.arregloFiguras.length;i++){
		  if(this.arregloFiguras[i]==c){
			 var pos=i;
		  }
	}
	this.arregloFiguras.splice(pos,1);
}

}
