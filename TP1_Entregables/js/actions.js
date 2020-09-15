var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
ctx.fillStyle="#FFFF00";
ctx.closePath();
var width = canvas.width;   //cambian con las imagenes
var height = canvas.height; //idem arriba
let imageData;
let imageAspectRadio;
let imageAspectWidth;
let imageAspectHeight;
//botones

//filtros
    let filtrobtn0 = document.querySelector('#binarizacion'),
        filtrobtn1 = document.querySelector('#brillo'),
        filtrobtn2 = document.querySelector('#negativo'),
        filtrobtn3 = document.querySelector('#sepia'),
        filtrobtn4 = document.querySelector('#contraste');

    //acciones
        let limpiar = document.querySelector('#clean'),
        descargar = document.querySelector('#descargar');
           

//Eventos despues de tocar botones
    document.querySelector('.ifile').addEventListener("change",cargarImagen);
    limpiar.addEventListener("click",function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    descargar.addEventListener('click',descargarImagen);

filtrobtn0.addEventListener('click', filtroBinarizacion);
filtrobtn1.addEventListener('click', filtroBrillo);
filtrobtn2.addEventListener('click', filtroNegativo);
filtrobtn3.addEventListener('click', filtroSepia);
filtrobtn4.addEventListener('click', filtroContraste);

//Funciones
    function cargarImagen(event){
        let file = event.target.files[0];
        let fr = new FileReader();
        fr.onload = function(){ 
                let img = new Image();
                img.onload = function(){ 
                    if(height > width){
                        imageAspectRadio = (1.0 * height) / width;
                        imageAspectWidth = canvas.width;
                        imageAspectHeight = canvas.width * imageAspectRadio;
                }  else{
                    imageAspectRadio = (1.0 * width) /height;
                    imageAspectWidth = canvas.height * imageAspectRadio;
                    imageAspectHeight = canvas.height;
                }
                canvas.width = imageAspectWidth;
                canvas.height = imageAspectHeight;
                ctx.drawImage(img,0,0,imageAspectWidth,imageAspectHeight);         
                imageData = ctx.getImageData(0, 0, imageAspectWidth, imageAspectHeight);
                }
                img.src = fr.result;
            }; 
        fr.readAsDataURL(file); 
	}

    function getRojo(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 0];
    }

    function getVerde(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 1];
    }

    function getAzul(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 2];
    }

    function setPixel(imageData, x, y, r, g, b, a) {
        index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    }
    
    function getImgData() {
        return ctx.getImageData( 0, 0, canvas.width, canvas.height );
    }

    function filtroBinarizacion(){

            var imgData = getImgData();
            var data = imgData.data;
         
            for(var i = 0; i < data.length; i += 4) {
              var grayscale= 0.33*data[i]+0.5*data[i+1]+0.15*data[i+2];
              data[i]=grayscale;
              data[i+1]=grayscale;
              data[i+2]=grayscale;
            }
         
            ctx.putImageData(imgData,0,0);
    }
    
    function filtroBrillo(){
        let K =  document.querySelector("#cantContraste").value,
            imgData = getImgData(),
            pixels = imgData.data;
        for (var i = 0, n = pixels.length; i < n; i += 4) {
            pixels[i] = rangeColor(pixels[i] + K);
            pixels[i + 1] = rangeColor(pixels[i + 1] + K);
            pixels[i + 2] = rangeColor(pixels[i + 2] + K);
        }
        ctx.putImageData(imgData, 0, 0);
    }

    function rangeColor(pix) {
        if (pix < 0)
            pix = 0;
        if (pix > 255)
            pix = 255;
        return pix;
    }
    function filtroNegativo(){
            let  imageData = getImgData(),
                pixels = imageData.data,
                numPixels = imageData.width * imageData.height;
         
            for ( let i = 0; i < numPixels; i++ ) {
                let r = pixels[ i * 4 ];
                let g = pixels[ i * 4 + 1 ];
                let b = pixels[ i * 4 + 2 ];
         
                pixels[ i * 4 ] = 255 - r;
                pixels[ i * 4 + 1 ] = 255 - g;
                pixels[ i * 4 + 2 ] = 255 - b;
            }
         
            ctx.putImageData( imageData, 0, 0 );
    }
    
    function filtroSepia(){
        var imageData = getImgData(),
            pixels = imageData.data;
     
        for ( var i = 0; i < pixels.length; i++ ) {
            var r = pixels[ i * 4 ];
            var g = pixels[ i * 4 + 1 ];
            var b = pixels[ i * 4 + 2 ];
     
            pixels[ i * 4 ] = 255 - r;
            pixels[ i * 4 + 1 ] = 255 - g;
            pixels[ i * 4 + 2 ] = 255 - b;
     
            pixels[ i * 4 ] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
            pixels[ i * 4 + 1 ] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
            pixels[ i * 4 + 2 ] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
        }
     
        ctx.putImageData( imageData, 0, 0 );
    }

    function filtroContraste(){     
        let k = document.querySelector("#cantContraste").value;
            contrast = Math.tan(k * Math.PI / 180.0),
		    imageData = getImgData(),
            pixels = imageData.data;         
		for (var i = 0, n = pixels.length; i < n; i += 4) {
			pixels[i] = rangeColor(128 + (pixels[i] - 128) * contrast);
			pixels[i + 1] = rangeColor(128 + (pixels[i + 1] - 128) * contrast);
			pixels[i + 2] = rangeColor(128 + (pixels[i + 2] - 128) * contrast);
		}
		ctx.putImageData(imageData, 0, 0);
    }

    function detectarBordes(){
        let imgparcial=getBYN();
        let param=document.querySelector("#parametro").value*1000;
        let kernelX=[[-1,-2,-1],[0,0,0],[1,2,1]];
        let kernelY=[[-1,0,1],[-2,0,2],[-1,0,1]];
        let result=imgparcial;
        for (y=0;y<imgparcial.height;y++){
            for (x=0;x<imgparcial.width;x++){
                index=(x+y*canvas.width)*4;
                let gx=0; let gy=0;
                let vecinos=getVecinos(imgparcial,x,y);
                for (let i = 0; i <=2; i++) {
                    for (let j = 0; j <=2; j++) {
                        gx+=vecinos[i][j].data[0]*kernelX[i][j];
                        gy+=vecinos[i][j].data[0]*kernelY[i][j];
                    }
                }
                let color=Math.sqrt(gx*gx+gy*gy);
                if (color>param)
                     color=255;
                else color=0;
                result.data[index+0]=color;
                result.data[index+1]=color;
                result.data[index+2]=color;
            }
        }
        ctx.putImageData(result,0,0);
    }
   function descargarImagen(){
            let filename = prompt("Guardar como",""),
            link = document.createElement('a');
            if (filename == null){
                return false;
            }
            else if (filename == ""){           
                link.download = "Sin título";
                link.href = canvas.toDataURL("image/png");      
            }
            else{           
                link.download = filename;
                link.href = canvas.toDataURL("image/png");
            }
            link.click();
        }