class Ficha {

  constructor(x, y) {
    this.posX = x;
    this.posY = y;
    this.color = "#FFFFFF";
    this.size = 20;
    this.center = false;
    this.forma = false;
    this.valor = 0;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  getX() {
    return this.posX;
  }
  setX(x) {
    this.posX = x;
  }

  getY() {
    return this.posY;
  }
  setY(y) {
    this.posY = y;
  }
  getCenter() {
    return this.center;
  }
  getForma() {
    return this.forma;
  }
  getValor() {
    return this.valor;
  }
  setForma() {
    this.forma = true;
  }
  setValor(v) {
    this.valor = v;
  }
  setColor(c) {
    this.color = c;
  }
  getColor(){
    return this.color;
  }

  puntoCenter() {
    this.hue = 120;
    this.color = "hsl(120, 100%, 50%)";
    this.size = 7;
    this.center = true;
  }
  onTap(x, y) {
    let cX = this.posX;
    let cY = this.posY;
    let distancia = Math.sqrt((Math.pow((x - cX), 2)) + (Math.pow((y - cY), 2)));
    if (distancia > this.size + 10) {
      return false;
    }
    else {
      return true;
    }
  }

  actualizar(x, y) {
    this.posX = x;
    this.posY = y;
  }

}
