class Circulo{

  constructor(x,y){
    this.posX = x;
    this.posY = y;
	  this.hue = this.getRandomInt(360);
	  this.light = 50;
    this.size = 10;
    this.color = "hsl("+this.hue+", 75%, 50%)";
  }
  setLuz(l){
	  this.light = l;
  }
  osc(){
	  if (this.light < 100){
      this.light++;
    }
	  this.color = "hsl("+this.hue+",100%,"+this.light+"%)";
  } 
  cla(){
	  if (this.light > 0){
		this.light--;
	  }
	  this.color = "hsl("+this.hue+",100%,"+this.light+"%)";
  }

  dibujar (){
   ctx.fillStyle=this.color;
   ctx.beginPath();
   ctx.arc(this.posX,this.posY,this.size,0, Math.PI * 2);
   ctx.fill();
  }
  getRandomInt(max) {
		return Math.floor(Math.random() * (max - minRandom)) + minRandom;
	}
  getX(){
    return this.posX;
  }

  getY(){
    return this.posY;
  }

  getCenter(){
    return this.center;
  }

  puntoCenter(){
    this.hue = 120;
    this.color = "hsl(120, 100%, 50%)";
    this.size = 7;
    this.center=true;
  }

  onTap(x,y){
   let cX = this.posX;
   let cY = this.posY;
   let distancia = Math.sqrt((Math.pow((x-cX),2))+(Math.pow((y-cY),2)));
   if(distancia>this.size+10){
     return false;
   }
   else{
     return true;
   }
  }
  
  actualizar(x,y){
	this.posX = x;
  this.posY = y;
  }

}
