class Cuadrado{

    constructor(x,y){
      this.posX = x;
      this.posY = y;
      this.hue = this.getRandomInt(360);
      this.light = 50;
      this.size = 35;
      this.color = "hsl("+this.hue+", 75%, 50%)";
    }
    setLuz(l)
    {
        this.light = l;
    }
    osc(){
      if (this.light < 100)
      {
          this.light++;
      }
      this.color = "hsl("+this.hue+",100%,"+this.light+"%)";
    } 
    cla(){
      if (this.light > 0)
      {
          this.light--;
      }
      this.color = "hsl("+this.hue+",100%,"+this.light+"%)";
    }

    dibujar (){
     ctx.fillStyle=this.color;
     ctx.beginPath();
     ctx.fillRect(this.posX,this.posY, this.size, this.size);
     ctx.fill();
    }

    getX(){
      return this.posX;
    }
  
    getY(){
      return this.posY;
    }
    getRandomInt(max) {
      return Math.floor(Math.random() * (max - minRandom)) + minRandom;
    }
    onTap(x,y){
     return !(x < this.posX || x>this.posX + this.width || y < this.posY || y > this.posY+ this.height);
    }

    actualizar(x,y){
      this.posX = x;
      this.posY = y;
    }
  
  }