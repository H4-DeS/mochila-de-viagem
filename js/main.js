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

    let existe = itens.find(e => e.nome === nome.value);
        
    if(existe){
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);
    } else {
        itemAtual.id = itens.length;
        
        adicionaElemento(itemAtual);
        itens.push(itemAtual); //insere um objeto novo na array itens   
              
    }

    localStorage.setItem("itens", JSON.stringify(itens)); //converte a array itens para string do tipo JSON 
    nome.value = "";
    quantidade.value= "";
    nome.focus();
});

function adicionaElemento(item){
    const novoItem = document.createElement("li");
    novoItem.classList.add("item"); //cria novo item na lista do HTML
    const qtdNovoItem = document.createElement("strong");
    qtdNovoItem.dataset.id = item.id;
    qtdNovoItem.innerHTML = item.quantidade;
    novoItem.appendChild(qtdNovoItem);
    novoItem.innerHTML += item.nome;
    lista.appendChild(novoItem);
    
}

function atualizaElemento(item){
    
    document.querySelector('[data-id="' + item.id + '"]').innerHTML = item.quantidade;
    itens[item.id].quantidade = item.quantidade; 

}