var diryJ,dirxJ,jog,velJ,pjx,pjy;
var tamTelaW, tamTelaH;
var jogo;
var frames;

function teclaDw(){
	var tecla=event.keyCode;
	if(tecla==38){ // Cima
		diryJ=-1;
	}else if(tecla==40){ // Baixo
		diryJ=1;
	}
	if(tecla==37){ // Esquerda
		dirxJ=-1;
	}else if(tecla==39){ // Direita
		dirxJ=1;
	}
	if(tecla==32){ // Espaço - Tiro
		atira(pjx+17,pjy) // +17 para a posição ficar no centro (porque quando cria ele cria, ele cria no 0)
	}
}
function teclaUp(){
	var tecla=event.keyCode;
	if((tecla==38)||(tecla==40)){ // Direita
		diryJ=0; // Para a movimentação
	}
	if((tecla==37)||(tecla==39)) // Esquerda
	{
		dirxJ=0;
	}
}
function atira(x,y) // Posição do jogador na posição
{
	var t=document.createElement("div") // Tiro
	var att1=document.createAttribute("class")
	var att2=document.createAttribute("style")
	att1.value="tiroJog"
	att2.value="top:"+y+"px;left:"+x+"px" // <div class="tiroJog" style="top:909.5px;left:290.5px"></div>
	t.setAttributeNode(att1)
	t.setAttributeNode(att2)
	document.body.appendChild(t)
}
function controlaJogador()
{
	pjy+=diryJ*velJ
	pjx+=dirxJ*velJ
	jog.style.top=pjy+"px"
	jog.style.left=pjx+"px"
}
function gameLoop()
{
	if(jogo)
	{ // Funções de controles
		controlaJogador()
	}
	frames=requestAnimationFrame(gameLoop)
}
function inicia()
{
	jogo=true;

	// Ini tela
	tamTelaH=window.innerHeight;
	tamTelaW=window.innerWidth;

	// Ini Jogador
	dirxJ=diryJ=0;
	pjx=tamTelaW/2 // MEIO DA TELA
	pjy=tamTelaH/2
	velJ=5
	jog=document.getElementById("naveJog")
	jog.style.top=pjy+"px" // PX = Unidade de medida píxel
	jog.style.left=pjx+"px"
	gameLoop()
}
window.addEventListener("load",inicia);

document.addEventListener("keydown",teclaDw)
document.addEventListener("keyup",teclaUp)