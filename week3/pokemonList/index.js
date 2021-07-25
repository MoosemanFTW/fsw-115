
const xhr = new XMLHttpRequest()
xhr.open('get', 'https://pokeapi.co/api/v2/pokemon', true)
xhr.send()

xhr.onreadystatechange = () =>{
    if(xhr.readyState === 4 && xhr.status === 200){
        let data =JSON.parse(xhr.responseText)
        console.log(data)
        printData(data.results)
    }else if(xhr.readyState === 4 && xhr.status !== 200){
        console.log(xhr.responseText)
    }
}

function printData(data){
    for(i=0; i < data.length; i++){
        const pokemon = document.createElement('h2')
        const pokemonURL = document.createElement('h5')
        const breakLine = document.createElement('h1')
        pokemon.textContent = data[i].name 
        pokemonURL.textContent = data[i].url
        breakLine.textContent = '--------------'
        document.body.appendChild(pokemon)
        document.body.appendChild(pokemonURL)
        document.body.appendChild(breakLine)
    }
}