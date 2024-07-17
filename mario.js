var canvas = document.getElementById("miCanvas");
var sonido = document.getElementById("sonidos");
var ctx = canvas.getContext("2d");
var ganar=0;
var indice=0;
var indice2=0;
var vida=3;
var niveles=1;
var pausa=false;
var inicio=false;
var flag=false;
var i=1;
//posicion del jugador
var Jx=100;
var Jy=100;
var Jwidth=30;
var Jheight=30;
//caida del jugador
var Vx=0;
var Vy=0;
var caida=1;
//posicion plataformas
var Px=200;
var Py=100;
var Pwidth=200;
var Pheight=20;
var sx3=100;
var sx4=1050;
var sx5=50;
var sy3=50;
var Yswidth=50;
//suelo
var sx1=0;
var sx2=250;
var sy=600;
var swidth=200;
var sheight=30;
var Nwidth=30;

//imagenes
var img=new Image();
img.src = "mariosr.png";
var fmg=new Image();
fmg.src = "fantasma.png";
var omg=new Image();
omg.src = "over.png";
var cmg=new Image();
cmg.src = "castillo.png";
var emg=new Image();
emg.src = "escenario.png";
var smg=new Image();
smg.src = "inicio.png";
var rmg=new Image();
rmg.src = "corona.png";

caer();
function dibujar(){
    //se corrobora que se preciones la tecla P para iniciar
    if(inicio==true){
        //se corrobora que no se precione la Barra espaciadora para seguir jugando
        if(pausa == false){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.beginPath();
            //condicion para ver que mapa se mostrara
            if(niveles==1){
                plataformas1();
                colisionPlataformas1();
                escenario1();
            }else{
                plataformas2();
                colisionPlataformas2();
                escenario2();
            }
            marcador();
            vidas();
            //dibuja a mario
            ctx.drawImage(img,indice*140,5,130,158,Jx,Jy,Jwidth,Jheight);
            
            ctx.fill();
            ctx.closePath();
            //indice para el sprite para fantasma
            indice2=(indice2+1)%7;
            //indice para el sprite para mario
            indice=(indice+1)%4;
            //Ya que solo hay dos niveles se verifica que mientras no se 
            //revase la cantidad de nveles y el jugador se
            //posicione en el lugar de gane avance de nivel
            if(niveles<2 && Jx>1230){
                niveles++;
                ganar=0;
            }
            //si el nivel es igual a 2 y la variable ganar a revasado 
            //la cantidad de valores se activa la bandera 
            if(niveles==2 && Jx>1180 && Jy<120){
                flag=true;
            }
            //si vida es igual a 0 se muestra el sprite de fantasma y la imagen 
            //de GAME OVER
            if(vida==0){
                ctx.drawImage(fmg,indice2*95,0,90,90,550,250,200,200);
                ctx.drawImage(omg,0,0,1079,1079,560,100,200,200);
                ganar=0;
                i++;
            }
            //si la bandera esta activada se llama a la funcion ganaste
            if(flag==true){
                ganaste();
            }
            if(vida==0 && i==20){
                niveles=1;
                vida=3;
            }
        }
    }else{
        sonido.innerHTML='<audio src="skrillex.mp3" autoplay></audio>';
        play();
    }
}
//tenemos la variables Vy a la cual se le estara sumando su valor a la posicion en Y
//de nuestro jugador para que simule la caida de inicio de juego o cuando muera reaparezca,
//para esto, se hace la condicion que mientras el largo del cuerpo de nuestro jugador y
//la posicion en Y de nuestro jugador en el canvas y que nuestra variable Vy a la cual
//se le estara sumando cada cuantos pixeles avance simulando la velocidad de caida,
//toda esta informacion se suma y mientras no revase nuestro largo del canvas, a Vy se le estara suando
//la variabla caida la cual tiene un valor de 1, y la variable Vy se le suma a la 
//posicion del jugador para que simule la caida.
//si la suma de los tres datos no cumple la condicion de ser menor o igual al largo del
//canvas le asignamos el valor cero a Vy para que ya no siga cayendo y se salga del canvas.
function caer(){
    dibujar();
    Jy+=Vy;
    if(Jy + Jheight + Vy <= canvas.height){
        Vy+=caida;
    }else{
        Vy=0;
    }
}

//el texto GANASTE se muestra en el centro de la pantalla
//que abarca el canvas, junto con la imagen de una corona
function ganaste(){
    ctx.font="100px Times New Roman";
    ctx.Style="#000000";
    ctx.fillText("G A N A S T E",400,250);
    ctx.drawImage(rmg,300,200,800,500);
}
//el texto PRESIONA P PARA INICIAR
//se muestra al inicio del juego 
//junto con una imagen alusiva al juego
function play(){
    ctx.font="20px Arial";
    ctx.Style="#000000";
    ctx.fillText("PRECIONA P PARA INICIAR",520,100);
    ctx.drawImage(smg,350,150,600,400);
}
//se ha hecho una etiqueta de instrucciones
//las cuales se montraran en la parte
//superior izq de la pantalla con excepcion 
//de las vaidas las cuales se muestran en la parte superior 
//izquierda de la pantalla
function marcador(){
    ctx.font="20px ComicSans";
    ctx.fillStyle="#000000";
    ctx.fillText("Vidas="+vida,1250,20);
    ctx.fillText("Barra espaciadora  = PAUSA",10,30);
    ctx.fillText("Flecha derecha = camina hacia adelante",10,45);
    ctx.fillText("Flecha izquierda = camina hacia atras",10,60);
    ctx.fillText("Flecha arriba = salta",10,75);
    ctx.fillText("D salta hacia adelante",10,90);
    ctx.fillText("A salta hacia atras",10,105);
    ctx.fillText("W salta",10,120);
}
//para las vidas se hace la condicion que no rebase los limites de mi suelo
//si esto sucede Vy que mi variable de caida se reinicia, Jx,Jy que son la 
//posicion de mi personaje se reinician a la posicion inicial, todo esto para
//que mi personaje aparezca cayendo desde el inicio del nivel
//mi valiable vidas que al inicio del juego tiene 3 se le resta 1 cada 
//vez que muere el personahe
function vidas(){
    if(Jy>665){
        Vy=0;
        Jx=100;
        Jy=100;
        Jy+=Vy;
        if(Jy + Jheight + Vy <= canvas.height){
            Vy+=caida;
        }else{
            Vy=0;
        }
        vida--;
    }
}

document.addEventListener('keydown',teclado,false);
setInterval(caer,50);
//Mi funcion de instrucciones a travez de teclado
//cada vez que el jugador presione una tecla en especifico se 
//realizara una accion en el juego en especifico
//La funcion teclado detecta solamente las teclas
//flecha hacia adelante, atras y arriba,
//y las teclas D para saltar hacia adelante,
//A para saltar hacia atras
//W para saltar
//P para iniciar el juego y
//Barra espaciadora para pause
// para que las teclas funcionen
//tienen que cumpler las condiciones que son:
//que el codigo de la tecla presionada se aceptada
//que la posicion de nuestro jugador no revase los limites de nuestro
//canvas en x y que el juego no este en pausa
function teclado(e){
    //se mueve hacia atras
    if(e.keyCode==37 && Jx>50 && pausa == false){
        Jx-=10;
        ganar-=10;
    }
    //se mueve hacia delante
    if(e.keyCode==39 && Jx<1300 && pausa == false){
        Jx+=10;
        ganar+=10;
    }  
    //se mueve hacia arriba
    if(e.keyCode==87 || e.keyCode==38 && pausa == false){
        Jy-=150;
    }  
    //salta hacia adelante con la D
    if(e.keyCode==68 && Jx<1300 && pausa == false){
        Jy-=110;
        Jx+=30;
        ganar+=30;
    }  
    //salta hacia atras con la A
    if(e.keyCode==65 && Jx>50 && pausa == false){
        Jy-=110;
        Jx-=30;
        ganar-=30;
    }
    //espacio para pause
    if(e.keyCode==32){
        pausa=!pausa;
    }
    //p para iniciar el juego
    if(e.keyCode==80){
        inicio=!inicio;
    }
}  
//a partir de una imagen se dibuja el escenario
//los cuales pueden venir nubes, pasto, castillos, etc
//para dibujar se asignan la posicion en x, y que se
//quiere tomar de la imagen, lo largo y ancho de ellas
//la posicion en x, y que quiera que aparezca en el canvas
// y el largo y ancho de estas.
function escenario1(){
    ctx.drawImage(cmg,0,0,169,169,1240,470,130,130);
    ctx.drawImage(emg,140,50,108,45,300,20,100,80);
    ctx.drawImage(emg,140,50,108,45,500,40,100,80);
    ctx.drawImage(emg,140,50,108,45,700,10,100,80);
    ctx.drawImage(emg,140,50,108,45,900,50,100,80);
    ctx.drawImage(emg,140,50,108,45,1100,0,100,80);
    ctx.drawImage(emg,217,4,108,40,50,528,100,80);
    ctx.drawImage(emg,217,4,108,40,250,528,100,80);
    ctx.drawImage(emg,217,4,108,40,350,528,100,80);
    ctx.drawImage(emg,56,45,25,60,50,528,30,60);
    ctx.drawImage(emg,56,45,25,60,150,552,30,60);
    ctx.drawImage(emg,56,45,25,60,250,528,30,60);
    ctx.drawImage(emg,56,45,25,60,350,528,30,60);
    ctx.drawImage(emg,56,45,25,60,500,452,30,60);
    ctx.drawImage(emg,56,45,25,60,615,402,30,60);
    ctx.drawImage(emg,56,45,25,60,700,352,30,60);
    ctx.drawImage(emg,56,45,25,60,800,302,30,60);
    ctx.drawImage(emg,56,45,25,60,900,302,30,60);
    ctx.drawImage(emg,56,45,25,60,1200,552,30,60);
    
}
//se dibujan las plataforma con la funcion fillRect
//las cuales se les definio la posicion x, y en las
//que se localizaran en el canvas, y tambien 
//el largo y ancho que tendran.
function plataformas1(){
    ctx.fillStyle="#540C0A";
    ctx.fillRect(sx1,sy,swidth,sheight);
    ctx.fillRect(sx2,sy,swidth,sheight);
    ctx.fillRect(sx3*5,sy3*10,Yswidth,sheight);
    ctx.fillRect(sx3*6,sy3*9,Yswidth,sheight);
    ctx.fillRect(sx3*7,sy3*8,Yswidth,sheight);
    ctx.fillRect(sx3*8,sy3*7,Yswidth,sheight);
    ctx.fillRect(sx3*9,sy3*7,Yswidth,sheight);
    ctx.fillRect(sx4,sy3*10,Yswidth,sheight);
    ctx.fillRect(sx3*12,sy3*12,swidth,sheight);
}
//deteccion de las plataformas
//para que nuestro objeto detecte las plataformas se tiene que verificar que 
//la suma de el cuerpo a lo largo de nuestro jugador y su posicion en Y
//sea menor o igual a la posicion en Y de donde se encuestra nuestra plataforma
// con esto nuestro objeto se queda sobre ese nivel, tambien se verifica
// que la sumandole la variable que se lamacena la caida Vy sea mayor o igual 
// a la posicion Y de nuestra platafora para que nuestro jugar pueda seguir cayendo 
//hacia la plataforma
//Se verifica que la suma de la posicion en X de nuestro jugador mas
// lo ancho del jugador se mayor o igual a lo largo de la plataforma y que si la 
//posicion de nuestro jugador es menor a la suma de la posicion de la plataforma 
// y lo largo de esta.
//Estas codiciones fucionan para que se pueda posicionar el jugador en la plataforma en la 
//posicion exacta y que al momento de que revase la plataforma se pueda caer
function colisionPlataformas1(){
    if(Jy+Jheight<=sy && Jy+Jheight+Vy >= sy && Jx+Jwidth >= sx1 && Jx<=sx1+swidth){
        Vy=0;
    }
    if(Jy+Jheight<=sy && Jy+Jheight+Vy >= sy && Jx+Jwidth >= sx2 && Jx<=sx2+swidth){
        Vy=0;
    }
    if(Jy+Jheight<=sy3*10 && Jy+Jheight+Vy >= sy3*10 && Jx+Jwidth >= sx3*5 && Jx<=sx3*5+Yswidth){
        Vy=0;
    }
    if(Jy+Jheight<=sy3*9 && Jy+Jheight+Vy >= sy3*9 && Jx+Jwidth >= sx3*6 && Jx<=sx3*6+Yswidth){
        Vy=0;
    }
    if(Jy+Jheight<=sy3*8 && Jy+Jheight+Vy >= sy3*8 && Jx+Jwidth >= sx3*7 && Jx<=sx3*7+Yswidth){
        Vy=0;
    }
    if(Jy+Jheight<=sy3*7 && Jy+Jheight+Vy >= sy3*7 && Jx+Jwidth >= sx3*8 && Jx<=sx3*8+Yswidth){
        Vy=0;
    }
    if(Jy+Jheight<=sy3*7 && Jy+Jheight+Vy >= sy3*7 && Jx+Jwidth >= sx3*9 && Jx<=sx3*9+Yswidth){
        Vy=0;
    }
    if(Jy+Jheight<=sy3*10 && Jy+Jheight+Vy >= sy3*10 && Jx+Jwidth >= sx4 && Jx<=sx4+Yswidth){
        Vy=0;
    }
    if(Jy+Jheight<=sy3*12 && Jy+Jheight+Vy >= sy3*12 && Jx+Jwidth >= sx3*12 && Jx<=sx3*12+swidth){
        Vy=0;
    }

}
function escenario2(){
    ctx.drawImage(cmg,0,0,169,169,1240,20,130,130);
    ctx.drawImage(emg,140,50,108,45,300,20,100,80);
    ctx.drawImage(emg,140,50,108,45,500,40,100,80);
    ctx.drawImage(emg,140,50,108,45,700,10,100,80);
    ctx.drawImage(emg,140,50,108,45,900,50,100,80);
    ctx.drawImage(emg,140,50,108,45,1100,0,100,80);

    ctx.drawImage(emg,217,4,108,40,50,528,100,80);
    
    ctx.drawImage(emg,56,45,25,60,50,528,30,60);
    ctx.drawImage(emg,56,45,25,60,150,552,30,60);
    ctx.drawImage(emg,56,45,25,60,250,552,30,60);
    ctx.drawImage(emg,56,45,25,60,350,552,30,60);
    ctx.drawImage(emg,56,45,25,60,450,52,30,60);
    ctx.drawImage(emg,56,45,25,60,640,552,30,60);
    ctx.drawImage(emg,56,45,25,60,750,252,30,60);
    ctx.drawImage(emg,56,45,25,60,850,52,30,60);
    ctx.drawImage(emg,56,45,25,60,950,252,30,60);
    ctx.drawImage(emg,56,45,25,60,1155,352,30,60);

    ctx.drawImage(emg,217,4,108,40,1160,78,100,80);
}
function plataformas2(){
    ctx.fillStyle="#540C0A";
    ctx.fillRect(sx1,sy,swidth,sheight);
    ctx.fillRect(sx5*5,sy,Nwidth,sheight);
    ctx.fillRect(sx5*7,sy,Nwidth,sheight);
    ctx.fillRect(sx5*9,sy,Nwidth,sheight);
    ctx.fillRect(sx5*11,sy,Nwidth,sheight);
    ctx.fillRect(sx5*13,sy,Nwidth,sheight);
    ctx.fillRect(sx5*15,sy,Nwidth,sheight);
    ctx.fillRect(sx5*17,sy,Nwidth,sheight);
    ctx.fillRect(sx5*19,sy,Nwidth,sheight);
    ctx.fillRect(sx5*21,sy3*10,Nwidth,sheight);
    ctx.fillRect(sx5*23,sy3*8,Nwidth,sheight);
    ctx.fillRect(sx5*21,sy3*6,Nwidth,sheight);

    ctx.fillRect(sx5*5,sy3*6,Nwidth,sheight);
    ctx.fillRect(sx5*7,sy3*6,Nwidth,sheight);
    ctx.fillRect(sx5*9,sy3*6,Nwidth,sheight);
    ctx.fillRect(sx5*11,sy3*6,Nwidth,sheight);
    ctx.fillRect(sx5*13,sy3*6,Nwidth,sheight);
    ctx.fillRect(sx5*15,sy3*6,Nwidth,sheight);
    ctx.fillRect(sx5*17,sy3*6,Nwidth,sheight);
    ctx.fillRect(sx5*19,sy3*6,Nwidth,sheight);
    ctx.fillRect(sx5*7,sy3*2,Nwidth,sheight);

    ctx.fillRect(sx5*6,sy3*3,Nwidth,sheight);

    ctx.fillRect(sx5*9,sy3*2,Nwidth,sheight);
    ctx.fillRect(sx5*11,sy3*2,Nwidth,sheight);
    ctx.fillRect(sx5*13,sy3*2,Nwidth,sheight);
    ctx.fillRect(sx5*15,sy3*2,Nwidth,sheight);
    ctx.fillRect(sx5*17,sy3*2,Nwidth,sheight);
    ctx.fillRect(sx5*20,sy3*3,Nwidth,sheight);

    ctx.fillRect(sx5*23,sy3*3,swidth,sheight);
}
function colisionPlataformas2(){
    if(Jy+Jheight<=sy && Jy+Jheight+Vy >= sy && Jx+Jwidth >= sx1 && Jx<=sx1+swidth){
        Vy=0;
    }
    if(Jy+Jheight<=sy && Jy+Jheight+Vy >= sy && Jx+Jwidth >= sx5*5 && Jx<=sx5*5+Nwidth || Jy+Jheight<=sy && Jy+Jheight+Vy >= sy &&  Jx+Jwidth >= sx5*7 && Jx<=sx5*7+Nwidth) {
        Vy=0;
    }
    if(Jy+Jheight<=sy && Jy+Jheight+Vy >= sy && Jx+Jwidth >= sx5*9 && Jx<=sx5*9+Nwidth || Jy+Jheight<=sy && Jy+Jheight+Vy >= sy &&  Jx+Jwidth >= sx5*11 && Jx<=sx5*11+Nwidth) {
        Vy=0;
    }
    if(Jy+Jheight<=sy && Jy+Jheight+Vy >= sy && Jx+Jwidth >= sx5*13 && Jx<=sx5*13+Nwidth || Jy+Jheight<=sy && Jy+Jheight+Vy >= sy &&  Jx+Jwidth >= sx5*15 && Jx<=sx5*15+Nwidth) {
        Vy=0;
    }
    if(Jy+Jheight<=sy && Jy+Jheight+Vy >= sy && Jx+Jwidth >= sx5*17 && Jx<=sx5*17+Nwidth || Jy+Jheight<=sy && Jy+Jheight+Vy >= sy &&  Jx+Jwidth >= sx5*19 && Jx<=sx5*19+Nwidth) {
        Vy=0;
    }
    if(Jy+Jheight<=sy3*10 && Jy+Jheight+Vy >= sy3*10 && Jx+Jwidth >= sx5*21 && Jx<=sx5*21+Nwidth || Jy+Jheight<=sy3*8 && Jy+Jheight+Vy >= sy3*8 &&  Jx+Jwidth >= sx5*23 && Jx<=sx5*23+Nwidth) {
        Vy=0;
    }
    if(Jy+Jheight<=sy3*6 && Jy+Jheight+Vy >= sy3*6 && Jx+Jwidth >= sx5*21 && Jx<=sx5*21+Nwidth) {
        Vy=0;
    }
    if(Jy+Jheight<=sy3*6 && Jy+Jheight+Vy >= sy3*6 && Jx+Jwidth >= sx5*5 && Jx<=sx5*5+Nwidth || Jy+Jheight<=sy3*6 && Jy+Jheight+Vy >= sy3*6 &&  Jx+Jwidth >= sx5*7 && Jx<=sx5*7+Nwidth) {
        Vy=0;
    }
    if(Jy+Jheight<=sy3*6 && Jy+Jheight+Vy >= sy3*6 && Jx+Jwidth >= sx5*9 && Jx<=sx5*9+Nwidth || Jy+Jheight<=sy3*6 && Jy+Jheight+Vy >= sy3*6 &&  Jx+Jwidth >= sx5*11 && Jx<=sx5*11+Nwidth) {
        Vy=0;
    }
    if(Jy+Jheight<=sy3*6 && Jy+Jheight+Vy >= sy3*6 && Jx+Jwidth >= sx5*13 && Jx<=sx5*13+Nwidth || Jy+Jheight<=sy3*6 && Jy+Jheight+Vy >= sy3*6 &&  Jx+Jwidth >= sx5*15 && Jx<=sx5*15+Nwidth) {
        Vy=0;
    }
    if(Jy+Jheight<=sy3*6 && Jy+Jheight+Vy >= sy3*6 && Jx+Jwidth >= sx5*17 && Jx<=sx5*17+Nwidth || Jy+Jheight<=sy3*6 && Jy+Jheight+Vy >= sy3*6 &&  Jx+Jwidth >= sx5*19 && Jx<=sx5*19+Nwidth) {
        Vy=0;
    }
    if(Jy+Jheight<=sy3*2 && Jy+Jheight+Vy >= sy3*2 && Jx+Jwidth >= sx5*7 && Jx<=sx5*7+Nwidth) {
        Vy=0;
    }
    if(Jy+Jheight<=sy3*3 && Jy+Jheight+Vy >= sy3*3 && Jx+Jwidth >= sx5*6 && Jx<=sx5*6+Nwidth || Jy+Jheight<=sy3*2 && Jy+Jheight+Vy >= sy3*2 &&  Jx+Jwidth >= sx5*9 && Jx<=sx5*9+Nwidth) {
        Vy=0;
    }
    if(Jy+Jheight<=sy3*2 && Jy+Jheight+Vy >= sy3*2 && Jx+Jwidth >= sx5*11 && Jx<=sx5*11+Nwidth || Jy+Jheight<=sy3*2 && Jy+Jheight+Vy >= sy3*2 &&  Jx+Jwidth >= sx5*13 && Jx<=sx5*13+Nwidth) {
        Vy=0;
    }
    if(Jy+Jheight<=sy3*2 && Jy+Jheight+Vy >= sy3*2 && Jx+Jwidth >= sx5*15 && Jx<=sx5*15+Nwidth || Jy+Jheight<=sy3*2 && Jy+Jheight+Vy >= sy3*2 &&  Jx+Jwidth >= sx5*17 && Jx<=sx5*17+Nwidth) {
        Vy=0;
    }
    if(Jy+Jheight<=sy3*3 && Jy+Jheight+Vy >= sy3*3 && Jx+Jwidth >= sx5*20 && Jx<=sx5*20+Nwidth || Jy+Jheight<=sy3*3 && Jy+Jheight+Vy >= sy3*3 &&  Jx+Jwidth >= sx5*23 && Jx<=sx5*23+swidth) {
        Vy=0;
    }
}