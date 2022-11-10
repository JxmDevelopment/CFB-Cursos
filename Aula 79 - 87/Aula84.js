var diryJ,dirxJ,jog,velJ,pjx,pjy;
var velT
var tamTelaW, tamTelaH;
var jogo;
var frames;
var contBombas,painelContBombas,velB,tmpCriaBomba
var bombasTotal
var vidaPlaneta

function teclaDw()
{
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
function teclaUp()
{
	var tecla=event.keyCode;
	if((tecla==38)||(tecla==40)){ // Direita
		diryJ=0; // Para a movimentação
	}
	if((tecla==37)||(tecla==39)) // Esquerda
	{
		dirxJ=0;
	}
}
function criaBomba()
{
	if(jogo)
	{
		var y=0 // Top
		var x=Math.random()*tamTelaW // Sortear posição da bomba * Largura da tela
		var bomba=document.createElement("div")
		var att1=document.createAttribute("class")
		var att2=document.createAttribute("style")
		att1.value="bomba"
		att2.value="top:"+y+"px;left:"+x+"px"
		bomba.setAttributeNode(att1)
		bomba.setAttributeNode(att2)
		document.body.appendChild(bomba)
		contBombas--
	}
}
function controlaBomba()
{
	bombasTotal=document.getElementsByClassName("bomba")
	var tam=bombasTotal.length
	for(var i=0;i<tam;i++)
	{
		if(bombasTotal[i])
		{
			var pi=bombasTotal[i].offsetTop
			pi+=velB // Posição + Velocidade Bomba
			bombasTotal[i].style.top=pi+"px"
			if(pi>tamTelaH) // Verificar se a bomba chegou no TOP para remover a div
			{
				vidaPlaneta-=10 // Cada bomba tira 10 de vida do planeta
				bombasTotal[i].remove()
			}
		}
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
function controleTiros()
{
	var tiros=document.getElementsByClassName("tiroJog") // Pegou todos os elementos que tem a classe 'tirojog' e armazenou em tiro
	var tam=tiros.length
	for(var i=0;i<tam;i++)
	{
		if(tiros[i]) // pt = Posição Tiro
		{
			var pt=tiros[i].offsetTop // Pega a posição vertical
			pt-=velT // - Porque vai pra cima
			tiros[i].style.top=pt+"px"
			colisaoTiroBomba(tiros[i])
			if(pt<0)
			{
				tiros[i].remove() // Quando o tiro chega no top ele deleta ( a div )
				// document.body.removeChild(tiros[i])
			}
		}
	}

}
function colisaoTiroBomba(tiro)
{
	var tam=bombasTotal.length
	for(var i=0;i<tam;i++)
	{
		if(bombasTotal[i])
		{
			if(
				(
					(tiro.offsetTop<=(bombasTotal[i].offsetTop+40))&& // +40 [Gif é 24x40] 24 de largura, 40 de altura	| Cima tiro com Baixo bomba
					((tiro.offsetTop+6)>=(bombasTotal[i].offsetTop)) // O tiro é 6px, [ CSS .tiroJog ] | Baixo tiro com Cima bomba
			)
			&&
			(
				(tiro.offsetLeft<=(bombasTotal[i].offsetLeft+24))&& // Esquerda tiro com Direita bomba
				((tiro.offsetLeft+6)>=(bombasTotal[i].offsetLeft)) // Direita tiro com Esquerda bomba
			)
			)
			{
				bombasTotal[i].remove() // Se houve colisão
				tiro.remove()
			}
		}
	}
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
		controleTiros()
		controlaBomba()
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
	dirxJ=diryJ=0
	pjx=tamTelaW/2 // MEIO DA TELA
	pjy=tamTelaH/2
	velJ=5
	velT=5
	jog=document.getElementById("naveJog")
	jog.style.top=pjy+"px" // PX = Unidade de medida píxel
	jog.style.left=pjx+"px"

	// Controles Das Bombas
	clearInterval(tmpCriaBomba) // Limpa a bomba caso dê um F5 por exemplo
	contBombas=150
	velB=3
	tmpCriaBomba=setInterval(criaBomba,1700)

	// Controles Do Planeta
	vidaPlaneta=100

	gameLoop()
}
window.addEventListener("load",inicia);

document.addEventListener("keydown",teclaDw)
document.addEventListener("keyup",teclaUp)