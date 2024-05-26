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
	if(tecla==32){ // Espaço TIRO
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

function controlaJogador()
{
	//pjy+=
}

function gameLoop()
{
	if(jogo)
	{ // Funções de controles
	
	}
	frames=requestAnimationFrame(gameLoop)
}

function inicia()
{
	jogo=false; // Irá ficar true quando clicar em jogar

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
}
window.addEventListener("load",inicia);

document.addEventListener("keydown",teclaDw)
document.addEventListener("keyup",teclaUp)