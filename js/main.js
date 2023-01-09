const form = document.querySelector("#novoItem");
const lista = document.querySelector("#lista");
const itens = JSON.parse(localStorage.getItem("itens")) || []; //array para armazenar os itens adicionados como objetos

itens.forEach((elemento) => {
    adicionaElemento(elemento);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = e.target.elements['nome']; //variável nome aponta para o input 'nome'
    const quantidade =  e.target.elements['quantidade'];    //variável quantidade aponta para o input 'quantidade'
     //objeto para armazenar o item/quantidade e enviá-lo para localStorage
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    };

    itens.push(itemAtual); //insere um objeto novo na array itens   
    localStorage.setItem("itens", JSON.stringify(itens)); //converte a array itens para string do tipo JSON

    adicionaElemento(itemAtual);
    nome.value = "";
    quantidade.value= "";
    nome.focus();
});

function adicionaElemento(item){
    const novoItem = document.createElement("li");
    novoItem.classList.add("item"); //cria novo item na lista do HTML

    const qtdNovoItem = document.createElement("strong");
    qtdNovoItem.innerHTML = item.quantidade;
    novoItem.appendChild(qtdNovoItem);
    novoItem.innerHTML += item.nome;
    lista.appendChild(novoItem);
    
}
