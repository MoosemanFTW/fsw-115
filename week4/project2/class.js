var classContainer = document.getElementById('classContainer')
var classButton = document.getElementById('classButton')

axios.get('https://www.dnd5eapi.co/api/classes/').then(res => console.log(res.data.results));


function getClasses(){
    axios.get('https://www.dnd5eapi.co/api/classes/')
    .then(res =>{ 
        for(i=0; i<res.data.results.length; i++){
            let item = document.createElement('h3')
            item.textContent = res.data.results[i].name
            
            classContainer.appendChild(item)
        }
        
    }).catch(err => console.log(err))
};
classButton.addEventListener('click', getClasses);


