"use strict";
var canvas = document.getElementById('canvas'),
	ctx = document.getElementById('canvas').getContext("2d"),
	board = new Board(),
	drag=false, // para chequear si se apreto sobre un point.
	point = null, // point actual.
	begin=true;
	BeginGame();

function BeginGame(){	
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
	if(begin){
		drawBoard();
		drawArrow();
		begin=false;
	}
	else{
		board.draw();
	}
	drawChips();
}

function drawBoard(){
	ctx.lineWidth = 4;
	ctx.strokeStyle = "#000000";
	board.load();
	board.draw();
}
function drawArrow(){
		for(let y=150;y <= 650 ; y++){	
			point = new Ficha(y+25,70);
			point.setForma();
			point.setColor("#FF0000");
			board.addArrow(point);
			y=y+63;
		}
		board.draw();	
}

function drawChips(){
		point = new Ficha(40,560);
		point.setColor("#FFFF00");
		point.setValor(1);
		board.setPlayerOne(point);
		point = new Ficha(760,560);
		point.setColor("#0CEF00");
		point.setValor(2);
		board.setPlayerTwo(point);
		board.draw();
}


function Puntero(e){
	point = null;
	if (point == null)
	{
		point = board.detecClick(e.layerX,e.layerY);
	}
    if(point || null){
		drag=true;
    }
}

function arrastrar(e){
	if (drag){	
		if(point.getValor() || 0 ){
			if(point || null)
			{	
				board.playerRefesh(e.layerX,e.layerY);
				redraw();
			}
			else
			{
				board.playerRefesh(e.layerX,e.layerY);
				redraw();
			}
		}
	}
}

function termine(e){

	let position = board.isCoordValid(point);
	if(drag){
		drag = false;
		e.preventDefault();
		if ((position || null) || (position == 0)) {
			console.log("la posicion es validas: "+ position);
			board.drop(point, position);
		} else {	
			alert("La posición no es válida");
			drawChips();
			redraw();
		}
		point = null;
	}
}

function redraw(){
	board.draw();
}

canvas.addEventListener("mousemove",arrastrar);
canvas.addEventListener("mousedown",Puntero);
canvas.addEventListener("mouseup",termine);