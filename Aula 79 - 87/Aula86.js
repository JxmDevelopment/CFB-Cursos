var diryJ,dirxJ,jog,velJ,pjx,pjy;
var velT
var tamTelaW, tamTelaH;
var jogo;
var frames;
var contBombas,painelContBombas,velB,tmpCriaBomba
var bombasTotal
var vidaPlaneta,barraPlaneta
var indiceExplosao,indiceSom
var telaMsg

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
                criaExplosao(2,bombasTotal[i].offsetLeft,null) // 2 [Tipo da bomba é o 2] | null [Não precisa do Y]
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
                criaExplosao(1,bombasTotal[i].offsetLeft-25,bombasTotal[i].offsetTop) // Explosão AR
				bombasTotal[i].remove() // Se houve colisão
				tiro.remove()
			}
		}
	}
}
function criaExplosao(tipo,x,y) // Tipo 1=AR | 2=TERRA
{
    if(document.getElementById("explosao"+(indiceExplosao-4))) // Depois de criar 4 explosões, ele remove 1 div.
    {
        document.getElementById("explosao"+(indiceExplosao-4)).remove() // Tem que deixar ao menos 4, para dar tempo da animação acontecer. Se não corta o efeito e/ou o som
    }
    var explosao=document.createElement("div")
    var img=document.createElement("img")
    var som=document.createElement("audio")
    // Atributos para Div
    var att1=document.createAttribute("class")
    var att2=document.createAttribute("style")
    var att3=document.createAttribute("id")
    // Atributo para IMG
    var att4=document.createAttribute("src")
    // Atributos para Áudio
    var att5=document.createAttribute("src")
    var att6=document.createAttribute("id")

    att3.value="explosao"+indiceExplosao
    if(tipo==1)
    {
        att1.value="explosaoAr"
        att2.value="top:"+y+"px;left:"+x+"px;"
        att4.value="explosao_ar.gif?"+new Date() // A cada chamada o valor do date vai ser diferente. Faz com que a identificação do arquivo seja diferente para cada chamada.
    }
    else
    {
        att1.value="explosaoChao"
        att2.value="top:"+(tamTelaH-57)+"px;left:"+(x-17)+"px;" // Tamanho da tela - 57 (tamanho da bomba)
        att4.value="explosao_chao.gif?" +new Date()
    }
    att5.value="exp1.mp3"
    att6.value="som"+indiceSom
    explosao.setAttributeNode(att1)
    explosao.setAttributeNode(att2)
    explosao.setAttributeNode(att3)
    img.setAttributeNode(att4)
    som.setAttributeNode(att5)
    som.setAttributeNode(att6)
    explosao.appendChild(img)
    explosao.appendChild(som)
    document.body.appendChild(explosao)
    document.getElementById("som"+indiceSom).play()
    indiceExplosao++ // Nunca vai ter uma explosão igual. Vai criando explosão0,explosão1,explosão2...
    indiceSom++
}
function controlaJogador()
{
	pjy+=diryJ*velJ
	pjx+=dirxJ*velJ
	jog.style.top=pjy+"px"
	jog.style.left=pjx+"px"
}
function gerenciaGame() // Barra De Life
{
	barraPlaneta.style.width=vidaPlaneta+"px"
	if(contBombas<=0)
	{
		jogo=false
		clearInterval(tmpCriaBomba) // Desativa o jogo e limpa as bombas
		telaMsg.style.backgroundImage="url('vitoria.jpg')"
		telaMsg.style.display="block"
	}
	if(vidaPlaneta<=0)
	{
		jogo=false
		clearInterval(tmpCriaBomba) // Desativa o jogo e limpa as bombas
		telaMsg.style.backgroundImage="url('derrota.jpg')"
		telaMsg.style.display="block"
	}
}
function gameLoop()
{
	if(jogo)
	{ // Funções de controles
		controlaJogador()
		controleTiros()
		controlaBomba()
	}
	gerenciaGame()
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
	contBombas=100
	velB=3
	tmpCriaBomba=setInterval(criaBomba,1700)

	// Controles Do Planeta
	vidaPlaneta=150
	barraPlaneta=document.getElementById("barraPlaneta")
	barraPlaneta.style.width=vidaPlaneta+"px"

    // Controles De Explosões
    indiceExplosao=indiceSom=0

	// Placares
	telaMsg=document.getElementById("telaMsg")

	gameLoop()
}
window.addEventListener("load",inicia);

document.addEventListener("keydown",teclaDw)
document.addEventListener("keyup",teclaUp)