const form = document.querySelector("#novoItem");
const lista = document.querySelector("#lista");
const itens = []; //array para armazenar os itens adicionados como objetos

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = e.target.elements['nome']; //variável nome aponta para o input 'nome'
    const quantidade =  e.target.elements['quantidade'];    //variável quantidade aponta para o input 'quantidade'
    
       
    adicionaElemento(nome.value,quantidade.value);
    nome.value = "";
    quantidade.value= "";
});

function adicionaElemento(nome, quantidade){
    const novoItem = document.createElement("li");
    const qtdNovoItem = document.createElement("strong");

    //objeto para armazenar o item/quantidade e enviá-lo para localStorage
    const itemAtual = {
        "nome": nome,
        "quantidade": quantidade
    };

    itens.push(itemAtual); //insere um objeto novo na array itens
    localStorage.setItem("itens", JSON.stringify(itens)); //converte a array itens para string do tipo JSON

    //cria novo item na lista do HTML
    novoItem.classList.add("item");
    qtdNovoItem.innerHTML = quantidade;
    novoItem.appendChild(qtdNovoItem);
    novoItem.innerHTML += nome;
    lista.appendChild(novoItem);
    
}