const list = document.getElementById('container')
const dropDown = document.getElementById('characterName')

 const getRec = () =>{
    axios.get('http://api.bryanuniversity.edu/justinmilligan/list')
     .then(res =>  {
         clearData()
            for(i=0; i<res.data.length; i++){
                let item = document.createElement('h3')
                item.innerHTML = `<span>${res.data[i].name}<br>
                ${res.data[i].description}<br>
                Complete: ${res.data[i].isComplete}</span>`
                item.classList.add('itemEl')
                // item.style.background = 'url(https://cdn.switch.com/wp-content/uploads/2020/10/bg-tagline.jpg)'
            

                const remove = document.createElement('button')
                remove.classList.add('remove')
                remove.textContent= 'X'
                remove.id = res.data[i]._id
                remove.addEventListener('click', deleteBtn)

                let completebtn = document.createElement('button')
                completebtn.classList.add('completebtn')
                completebtn.id = res.data[i]._id
                completebtn.value = res.data[i].isComplete
                let text =''
                res.data[i].isComplete === true ? text = 'Mark Incomplete' : text = 'Mark complete'
                completebtn.textContent = text
                completebtn.addEventListener('click',putRec)
                
                if(res.data[i].isComplete === true){
                    item.style.textDecoration = 'line-through'
                }
                list.appendChild(item)
                list.appendChild(remove)
                list.appendChild(completebtn)
            }
    }).catch(err => console.log(err))
}

const clearData = () =>{
    const el = list
    while(el.firstChild){
        el.removeChild(el.firstChild)
    }
}
const deleteBtn = (e) =>{
    e.preventDefault();
    
        axios.delete(`http://api.bryanuniversity.edu/justinmilligan/list/${e.target.getAttribute('id')}`)
        .then( () => getRec())
        .catch(err => console.log(err))
        
    
}
const putRec = (e) =>{
    e.preventDefault();
    let value = e.target.value
    let completeData = null

    if(value === 'false'){
        completeData= true
    }else{
        completeData= false
    }
    let update = {
        isComplete: completeData
    }
        axios.put(`http://api.bryanuniversity.edu/justinmilligan/list/${e.target.getAttribute('id')}`, update)
        .then(() => getRec())
        .catch(err => console.log(err))
}

const todoForm = document.todoForm
todoForm.addEventListener('submit',e =>{
    e.preventDefault()
    const newItem = {
        name: todoForm.characterName.value,
        description: todoForm.description.value,
        price: todoForm.price.value,
        isComplete: false
    }
    axios.post('http://api.bryanuniversity.edu/justinmilligan/list/', newItem)
    .then(() => getRec())
    .catch(err => console.log(err))
})

const getData = (url) =>{
    return new Promise((resolve,reject) =>{
        axios.get(url)
        .then(res => resolve(res.data.results))
        .catch(err => reject(err))
    })
}

const initRec = () =>{
    let baseUrl = 'https://swapi.dev/api/people/?page='
    let pendingPromises = []
    for(i=1;i<10;i++){
        let pageUrl = baseUrl + i
        pendingPromises.push(getData(pageUrl))
    }
    Promise.all(pendingPromises)
    .then(res =>{
        cleanData = res.flat()
        Showoptions(cleanData)
    })
}
const Showoptions = (data) =>{
    data.forEach(element => {
        let option = document.createElement('option')
        option.value = element.name
        option.textContent = element.name
        dropDown.appendChild(option)
    });
}
initRec()



document.addEventListener('DOMContentLoaded',getRec)



console.log(axios)
