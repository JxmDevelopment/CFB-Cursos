var dv1

window.addEventListener("load",inicia)

function inicia()
{
    dv1=document.getElementById("dv1")
    dv1.addEventListener("mouseover",troca) // Quando colocar o mouse em cima vai trocar de veiculo
    dv1.addEventListener("mouseout",trocaOriginal)
}

function troca()
{
    var obj=event.target
    obj.style.backgroundImage="url('c3.jpg')"

}

function trocaOriginal()
{
    var obj=event.target
    obj.style.backgroundImage="url('c4.jpg')"
}