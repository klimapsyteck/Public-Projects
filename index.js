const texto = document.querySelector('input')
const btnInsert = document.querySelector('.divInsert button')
const btnDeleteAll = document.querySelector('.header button')
const ul = document.querySelector('ul')
let edit = false;
let info = null;

let itensDB = []

btnDeleteAll.onclick = () => {
    itensDB = []    
    updateDB()
}

texto.addEventListener('keypress', e =>{
    if(e.key === 'Enter' && texto.valeu != ''){
        if(edit === true){
            let newTask = texto.value
            itensDB[info] = {'item': newTask} 
            edit = false  
            info = null      
            updateDB()
        }else{
            setItemDB()
        }
        
    }
})

btnInsert.onclick = () =>{
    if(texto.value != '' && edit === false){
        setItemDB()
    }else{
        let newTask = texto.value
        itensDB[info] = {'item': newTask} 
        edit = false  
        info = null      
        updateDB()
    }
}

function setItemDB(){
    if(itensDB.length >= 20){
        alert("Quantidade máximo de tarefas ja inseridos!")
        return
    }else {
        itensDB.push({'item': texto.value, 'status': ''})
        updateDB()
    }
}

function updateDB() {
    localStorage.setItem('todolist', JSON.stringify(itensDB))
    loadItens()
}

function loadItens() {
    ul.innerHTML = "";
    itensDB = JSON.parse(localStorage.getItem('todolist')) ?? []
    itensDB.forEach((item, i) => {
        insertEmTela(item.item, item.status, i)
    })
}

function insertEmTela(text, status, i){
    const li = document.createElement('li')

    li.innerHTML = `
        <div class="divLi">
            <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i})" />
            <span data-si=${i}> ${text} </span>
            <button onclick="loadItem(${i})" data-i=${i}> <i class="bx bx-edit gy-color"> </i> </button>
            <button onclick="removeItem(${i})" data-i=${i}> <i class="bx bx-trash"> </i> </button>
        </div>
    `
    ul.appendChild(li)

    if(status) {
        document.querySelector(`[data-si="${i}"]`).classList.add('line-through')
    }else{
        document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')
    }

    texto.value = ''
}

function done(chk, i){
    if (chk.checked){
        itensDB[i].status = 'checked'
    }else{
        itensDB[i].status = ''
    }

    updateDB()
}

function loadItem(i){
    texto.value = itensDB[i].item  
    edit = true    
    info = i 
}

function removeItem(i){
    if(confirm("Deseja realmente excluir?") === true){
        itensDB.splice(i, 1)
        updateDB()
    }else{
        return
    }
    
}


loadItens()