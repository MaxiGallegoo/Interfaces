var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
ctx.fillStyle="#FFFF00";
ctx.closePath();
var width = canvas.width;  
var height = canvas.height;
var minRandom=1;
let btnRandom = document.querySelector('#random'),
 	btnCirculo = document.querySelector('#circulo'),
 	btnCuadrado = document.querySelector('#cuadrado');
let figura = new Figuras(); // poligono actual (sin terminar) que no esta en la lista de poligonos
let arregloFiguras;
let arrastrando=false; // para chequear si se apreto sobre un punto.
let punto = null; // punto actual.
let apretando = false; // si esta apretando la tecla c (para oscurecer)
let Btn=0;


	function Puntero(e){
		
		this.punto = figura.deteccionDeClick(e.layerX,e.layerY);
		if (this.punto == null)
		{
			console.log(Btn);
			if(1 == Btn){
				this.punto = new Circulo(e.layerX,e.layerY);	
			}else if(2 == Btn){
				this.punto = new Cuadrado(e.layerX,e.layerY);	
			}else{
				this.punto = randomFigura();
			}
			figura.addFigura(this.punto);
			console.log(e.layerX,e.layerY);
		}
		else
		{
			this.arrastrando=true;
		}
	}
	function randomFigura(){
		let x = getRandomInt(3);
		console.log(x);
		this.punto=null
		if(x == 1){
			this.punto = new Circulo(getRandomInt(height),getRandomInt(height));
		}else{
			this.punto = new Cuadrado(getRandomInt(height),getRandomInt(height));
		}
		return this.punto;
	}
	
	function getRandomInt(max) {
		return Math.floor(Math.random() * (max - minRandom)) + minRandom;
	}

	function arrastrar(e){
		if (this.arrastrando)
		{
			if(true)
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

   function redibujar(){
		ctx.clearRect(0, 0, width, height);
		figura.dibujar();
	}

   function termine(e){
     this.arrastrando=false;
   }

	function borrarPunto(e){
		this.punto = null
		this.punto = figura.deteccionDeClick(e.layerX,e.layerY);
		if (this.punto != null){
			figura.borrarpunto(this.punto);
			redibujar();
		}		
	}

	function precionando(e){
		if (e.code == "KeyW"){
			apretando = false;
		}
	}

	function desprecionando(e){
		apretando = false;
	}

	function scrolling(e){
		this.punto = null;
		console.log("llegue");
		if (apretando){
			while (this.punto == null){
				this.punto = figura.deteccionDeClick(e.layerX,e.layerY);
			}
			if (!figura.vacio()){
				console.log("llegue");
				if (e.deltaY > 0){
					figura.cambiarColorcla();
				}
				else{
					figura.cambiarColorosc();
				}
				redibujar();
			}
		}
	}
	function selecBtn1 (){
		Btn=1;
	}
	function selecBtn2 (){
		Btn=2;
	}

canvas.addEventListener("mousewheel",scrolling);
window.addEventListener("keydown",precionando);
window.addEventListener("keyup",desprecionando);
canvas.addEventListener("mousedown",Puntero);
canvas.addEventListener("mousemove",arrastrar);
canvas.addEventListener("mouseup",termine);
canvas.addEventListener("dblclick",borrarPunto);
btnCirculo.addEventListener("click",selecBtn1);
btnCuadrado.addEventListener("click",selecBtn2);

