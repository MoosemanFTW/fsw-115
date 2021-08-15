const nameCont = document.getElementById('nameContainer')
const planetCont = document.getElementById('planetContainer')
const filmCont = document.getElementById('filmContainer')

const getData = async () =>{
    
    try{
        const luke = await axios.get('https://swapi.dev/api/people/1')
        const homeworld = await axios.get(luke.data.homeworld)
        const films = luke.data.films
        const pendingFilms = []
        for(i=0;i<films.length;i++){
            pendingFilms.push(axios.get(films[i]))
        }
        Promise.all(pendingFilms)
        .then(res =>{
            console.log(res)
            const fillerText = document.createElement('h1')
            fillerText.setAttribute('id','filmText')
            fillerText.textContent = 'Appears in:'
            filmCont.appendChild(fillerText)
            for(i=0;i<res.length;i++){
            const filmEl = document.createElement('h2')
            filmEl.setAttribute('id','filmText')
            filmEl.textContent = `• ${res[i].data.title}`
            filmCont.appendChild(filmEl)
        }
        })
        .catch(err => console.log(err))        
        console.log(luke)
        console.log(homeworld)
        displayLukeData(luke,homeworld)
    }
    catch(err){
        console.log(err)
    }
    

}

getData()

displayLukeData = (luke,homeworld) =>{
    const nameEl = document.createElement('h1')
    nameEl.setAttribute('id','nameEl')
    const extraInfoEl = document.createElement('h2')
    extraInfoEl.setAttribute('id','extraInfo')
    nameEl.textContent = `${luke.data.name}`
    extraInfoEl.textContent = ` Eye Color: ${luke.data.eye_color} 
    Hair Color: ${luke.data.hair_color} 
    Height: ${luke.data.height}`
    nameCont.appendChild(nameEl)
    nameCont.appendChild(extraInfoEl)

    const worldEl = document.createElement('h1')
    worldEl.setAttribute('id','wolrdEl')
    const extraWorldInfo = document.createElement('h2')
    extraWorldInfo.setAttribute('id','extraInfo')
    extraWorldInfo.textContent = `Terrain: ${homeworld.data.terrain} Population: ${homeworld.data.population}`
    worldEl.textContent = ` Home Planet: ${homeworld.data.name}`
    planetCont.appendChild(worldEl)
    planetCont.appendChild(extraWorldInfo)
}
