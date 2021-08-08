var list = document.getElementById('container')
list.style.textAlign = 'center'
document.todoForm.style.textAlign = 'center'

axios.get('http://api.bryanuniversity.edu/justinmilligan/list').then(res => console.log(res.data))
 var getRec = () =>{
    axios.get('http://api.bryanuniversity.edu/justinmilligan/list')
     .then(res =>  {
         clearData()
        for(i=0; i<res.data.length; i++){
            let item = document.createElement('h3')
            item.textContent = res.data[i].description + ' ' + 'Complete: ' +  res.data[i].isComplete
           item.style.background = 'url(https://cdn.switch.com/wp-content/uploads/2020/10/bg-tagline.jpg)'
           

            const remove = document.createElement('button')
            remove.textContent= 'X'
            remove.id = res.data[i]._id
            remove.addEventListener('click', deleteBtn)

            let completebtn = document.createElement('button')
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
    })
    .catch(err => console.log(err))
}

clearData = () =>{
    const el = list
    while(el.firstChild){
        el.removeChild(el.firstChild)
    }
}
deleteBtn = (e) =>{
    e.preventDefault();
    
        axios.delete(`http://api.bryanuniversity.edu/justinmilligan/list/${e.target.getAttribute('id')}`)
        .then( () => getRec())
        .catch(err => console.log(err))
        
    
}
putRec = (e) =>{
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
        name: todoForm.name.value,
        description: todoForm.description.value,
        price: todoForm.price.value,
        isComplete: false
    }
    axios.post('http://api.bryanuniversity.edu/justinmilligan/list/', newItem)
    .then(() => getRec())
    .catch(err => console.log(err))
})




document.addEventListener('DOMContentLoaded',getRec)



console.log(axios)
