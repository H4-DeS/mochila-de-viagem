const form = document.querySelector("#novoItem");
const lista = document.querySelector("#lista");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    adicionaElemento(e.target.elements['nome'].value, e.target.elements['quantidade'].value);

});

function adicionaElemento(nome, quantidade){
    const novoItem = document.createElement("li");
    const qtdNovoItem = document.createElement("strong");
    novoItem.classList.add("item");

    qtdNovoItem.innerHTML = quantidade;
    novoItem.appendChild(qtdNovoItem);
    novoItem.innerHTML += nome;
    lista.appendChild(novoItem);
    console.log(novoItem);
}