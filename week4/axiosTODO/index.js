var list = document.getElementById('container')
var button = document.getElementById('button')

axios.get('http://api.bryanuniversity.edu/justinmilligan/list').then(res => console.log(res.data))

    axios.get('http://api.bryanuniversity.edu/justinmilligan/list')
     .then(res =>  {
        for(i=0; i<res.data.length; i++){
            let item = document.createElement('h3')
            item.textContent = res.data[i].description + ' ' + 'Complete: ' +  res.data[i].isComplete
            
            if(res.data[i].isComplete === true){
                item.style.textDecoration = 'line-through'
            }
            list.appendChild(item)
        }
    })
    .catch(err => console.log(err))
  




// button.addEventListener('click', getTodo)
console.log(axios)
