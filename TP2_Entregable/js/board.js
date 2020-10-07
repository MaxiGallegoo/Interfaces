
class Board {
	constructor() {
		this.matrix = [
			[],
			[],
			[],
			[],
			[],
			[],
			[],
			[]
		];
		this.arrayArrow = [];
		this.playerOne;
		this.playerTwo;
		this.MaxSize = 8;
		this.currentX=0;
		this.currentY=0;
		this.playerNow=true;
	}
	setPlayerOne(chip) {
		this.playerOne = chip; 
	}
	setPlayerTwo(chip) {
		this.playerTwo = chip; 
	}
	//Set X position of player one
	setPoneX(x){
		this.playerOne.setX(x);
	}
	//Set Y position of player one
	setPoneY(y) {
		this.playerOne.setY(y);
	}
	//Set X position of player one
	setPtwoX(x){
		this.playerTwo.setX(x);
	}
	//Set Y position of player one
	setPtwoY(y) {
		this.playerTwo.setY(y);
	}
	load(){
		var tamanoFicha=62;
		var tamanoIntermedio=31;
		var valorMaxX=650;
		var valorMaxY=600;
		for(let x=150;x <valorMaxX; x++){
			this.currentY = 0;	
			for(let y=100;y <valorMaxY ; y++){	
				if (this.currentX < this.MaxSize){
					if (this.currentY < this.MaxSize) {
						point = new Ficha(x+tamanoIntermedio,y+tamanoIntermedio);
						this.matrix[this.currentX].push(point);
					}
				}
				this.currentY++;
				y=y+tamanoFicha-1;
			}
			this.currentX++;	
			x=x+tamanoFicha-1;
		}
	}
	
	addArrow(arrow){
	this.arrayArrow.push(arrow);
	}

	draw(){
		this.cleanCanvas();
		for (let i=0; i<this.arrayArrow.length; i++){
			this.arrayArrow[i].draw();
		}
		for(let i=0;i<this.matrix.length;i++)
		{
			for(let y=0;y<this.matrix.length;y++){
				this.matrix[i][y].draw();
			}
		}
		if (this.playerOne !== undefined && this.playerTwo !== undefined) {
			this.playerOne.draw();
			this.playerTwo.draw();
		}
	}

	cleanCanvas(){
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

	detecClick(x,y){
			if(this.playerOne.onTap(x,y)){
				if(this.playerOne){
					return this.playerOne;
				}		
			}else{
				if(this.playerTwo.onTap(x,y)){
					return this.playerTwo;
				}
			}
		return null;
	}

	playerRefesh(X,Y){
		if(this.playerNow){
			this.setPoneX(X);
			this.setPoneY(Y);
		}else{
			this.setPtwoX(X);
			this.setPtwoY(Y);
		}
	}

	isCoordValid(chip) {
		if(true){
			for(var i = 0;i<this.arrayArrow.length;i++){
				if(chip.onTap(this.arrayArrow[i].getX(),this.arrayArrow[i].getY())){
					return i;
				}
			}
		}
		return null;
	}

	drop(chip, position){
		let chipNow = chip,
		    xAux=0,
			yAux=0;	
		for(var i = this.matrix.length-1 ; i>=0 ;i--){
			if(this.matrix[position][i].getValor() == 0){
				this.matrix[position][i].setValor(chipNow.getValor());
				this.matrix[position][i].setColor(chipNow.getColor());
				drawChips();
				this.draw();
				if(this.playerNow){
					this.playerNow=false;
				}else{
					this.playerNow=true;
				}
				return;
			}
		}
		return;
	}

	actualizarFila(x){
		return true;
	}

}
