var dv1

window.addEventListener("load",inicia)

function inicia()
{
    dv1=document.getElementById("dv1")
    dv1.addEventListener("click",troca)
}

function troca()
{
    var obj=event.target
    obj.style.backgroundImage="url('c3.jpg')"

}