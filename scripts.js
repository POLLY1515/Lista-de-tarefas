const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = [];



function adicionarNovaTarefa(){

    const textoDaTarefa = input.value.trim();

    if(textoDaTarefa === ""){
        alert("Digite uma tarefa antes de adicionar");
        return;
    }

minhaListaDeItens.push({
   tarefa: textoDaTarefa,
   concluida: false

})
input.value = ''
input.focus()

  mostrarTarefas()

}

function mostrarTarefas() {
    let novaLi = ''

    minhaListaDeItens.forEach((item, posicao) => {
        novaLi = novaLi + `
        <li class="task ${item.concluida ? "done" : ""}">
            <img src="checked.png" alt="checked na tarefa" class="btn-concluir" data-posicao="${posicao}">
            <p>${item.tarefa}</p>
            <img src="trash.png" alt="tarefa para o lixo" class="btn-deletar" data-posicao="${posicao}">
        </li>
        `
    })

    listaCompleta.innerHTML = novaLi;

    const botoesConcluir = document.querySelectorAll('.btn-concluir')
    const botoesDeletar = document.querySelectorAll('.btn-deletar')

    botoesConcluir.forEach((botao) => {
        botao.addEventListener('click', function() {
            const posicao = Number(botao.dataset.posicao)
            concluirTarefa(posicao)
        })
    })

    botoesDeletar.forEach((botao) => {
        botao.addEventListener('click', function() {
            const posicao = Number(botao.dataset.posicao)
            deletarItem(posicao)
        })
    })

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}

function concluirTarefa(posicao){
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

    mostrarTarefas()

}

function deletarItem(posicao){
    
    minhaListaDeItens.splice(posicao, 1)
    mostrarTarefas()
}

function recarregarItens(){
    const tarefasDoLocalStorage = localStorage.getItem('lista')
    
    if(tarefasDoLocalStorage){
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)

    }

    mostrarTarefas()
}

recarregarItens()
button.addEventListener('click', adicionarNovaTarefa)

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        adicionarNovaTarefa()
    }
})


