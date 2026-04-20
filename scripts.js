const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')
const mensagemVazia = document.querySelector('.empty-message')
const contador = document.getElementById('task-count')
const botoesFiltro = document.querySelectorAll('.filter-btn')

let minhaListaDeItens = []
let filtroAtual = 'todas'

function controlarMensagemVazia() {
    if (minhaListaDeItens.length === 0) {
        mensagemVazia.style.display = 'block'
    } else {
        mensagemVazia.style.display = 'none'
    }
}

function atualizarContador() {
    contador.textContent = minhaListaDeItens.length
}

function filtrarTarefas(lista) {
    if (filtroAtual === 'pendentes') {
        return lista.filter(item => item.concluida === false)
    }

    if (filtroAtual === 'concluidas') {
        return lista.filter(item => item.concluida === true)
    }

    return lista
}

function adicionarNovaTarefa() {
    const textoDaTarefa = input.value.trim()

    if (textoDaTarefa === '') {
        alert('Digite uma tarefa antes de adicionar')
        return
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

    const listaFiltrada = filtrarTarefas(minhaListaDeItens)

    listaFiltrada.forEach((item) => {
        const posicao = minhaListaDeItens.findIndex(tarefa => tarefa === item)

        novaLi = novaLi + `
        <li class="task ${item.concluida ? 'done' : ''}">
            <button class="btn-concluir" data-posicao="${posicao}" aria-label="Concluir tarefa">
                <img src="checked.png" alt="">
            </button>
            <p>${item.tarefa}</p>
            <button class="btn-deletar" data-posicao="${posicao}" aria-label="Excluir tarefa">
                <img src="trash.png" alt="">
            </button>
        </li>
        `
    })

    listaCompleta.innerHTML = novaLi

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

    controlarMensagemVazia()
    atualizarContador()

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida
    mostrarTarefas()
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1)
    mostrarTarefas()
}

function recarregarItens() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }

    mostrarTarefas()
}

button.addEventListener('click', adicionarNovaTarefa)

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        adicionarNovaTarefa()
    }
})

botoesFiltro.forEach((botao) => {
    botao.addEventListener('click', function() {
        filtroAtual = botao.dataset.filtro

        botoesFiltro.forEach((btn) => btn.classList.remove('active-filter'))
        botao.classList.add('active-filter')

        mostrarTarefas()
    })
})

recarregarItens()