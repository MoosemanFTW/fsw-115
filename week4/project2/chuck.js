var chuckContainer = document.getElementById('chuckContainer')
var chuckButton = document.getElementById('chuckButton')
axios.get('http://api.icndb.com/jokes/random').then(res => console.log(res.data.value));


function getChuckJoke(){
    axios.get('http://api.icndb.com/jokes/random')
    .then(res => {
        let jokeEl = document.createElement('h4')
        jokeEl.textContent= res.data.value.joke
        chuckContainer.appendChild(jokeEl)
    }).catch(err => console.log(err))
};


chuckButton.addEventListener('click', getChuckJoke);