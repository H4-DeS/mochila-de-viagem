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
        atualizaElemento(itemAtual); //Atualiza o HTML
        itens[itens.findIndex(e => e.id === existe.id)] = itemAtual; //Atualiza o array
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length -1]).id + 1 : 0; //testa se a length do array não é false, caso seja atribui 0, caso contrário soma 1
        adicionaElemento(itemAtual);
        itens.push(itemAtual); //insere um novo objeto no array itens   
              
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
    novoItem.appendChild (botaoDeleta(item.id));
    lista.appendChild(novoItem);
        
}

function atualizaElemento(item){
    
    document.querySelector('[data-id="' + item.id + '"]').innerHTML = item.quantidade;
    itens[item.id].quantidade = item.quantidade; 

}

function botaoDeleta(id) {
    const botaoDeleta = document.createElement("button");
    botaoDeleta.innerHTML = "X";
    botaoDeleta.addEventListener('click', function (){
        console.log(this.parentNode);
        removeElemento(this.parentNode, id);
    })
    return botaoDeleta
}

function removeElemento(tag, id) {
    tag.remove();
    itens.splice(itens.findIndex(elemento => elemento.id == id), 1);
    localStorage.setItem("itens", JSON.stringify(itens));
}