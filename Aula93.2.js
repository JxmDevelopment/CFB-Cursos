var dv1,dv2,dv3,dv4

window.addEventListener("load",inicia)

function inicia()
{
    dv1=document.getElementById("dv1")
    dv2=document.getElementById("dv2")
    dv3=document.getElementById("dv3")
    dv4=document.getElementById("dv4")

    dv1.addEventListener("mouseover",troca) // Quando colocar o mouse em cima vai trocar de veiculo
    dv1.addEventListener("mouseout",trocaOriginal)

    dv2.addEventListener("mouseover",troca)
    dv2.addEventListener("mouseout",trocaOriginal)

    dv3.addEventListener("mouseover",troca)
    dv3.addEventListener("mouseout",trocaOriginal)

    dv4.addEventListener("mouseover",troca)
    dv4.addEventListener("mouseout",trocaOriginal)
}

function troca()
{
    var obj=event.target
    obj.style.backgroundImage="url('c3.jpg')"
    //dv1.style.backgroundImage="url('c3.jpg')" Se trocar o 'obj' pela 'div' ele irá realizar a troca apenas da div indicada

}

function trocaOriginal()
{
    var obj=event.target
    obj.style.backgroundImage="url('c4.jpg')"
    //dv1.style.backgroundImage="url('c4.jpg')"
}