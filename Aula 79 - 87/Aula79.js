var diryJ,dirxJ;

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