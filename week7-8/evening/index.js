// https://rickandmortyapi.com/api/character?page=1


let cleanedData;


const getData = (url) => {
    return new Promise( (resolve, reject) => {
        axios.get(url)
        .then(res => resolve(res.data.results))
        .catch(err => reject(err))
    })
}


const initApp = () => {

    let baseUrl = 'https://rickandmortyapi.com/api/character?page='
    let pendingPromises = []

    for(let i = 1; i < 35; i++ ){
        let newUrl = baseUrl + i
        pendingPromises.push( getData(newUrl) )
    }

    Promise.all(pendingPromises).then( data => {
        cleanedData = data.flat()
        buildPage(cleanedData)
    })
}
initApp()



const buildPage = (characters) => {
    let container = document.getElementById('character-container')
    container.innerHTML = ''

    characters.forEach(character => {
        let characterFlipCardContainer = document.createElement('div')
        characterFlipCardContainer.classList.add('flip-card')

        let characterFlipCardInner = document.createElement('div')
        characterFlipCardInner.classList.add('flip-card-inner')

        let characterFlipCardFront = document.createElement('div')
        characterFlipCardFront.classList.add('flip-card-front')

        let characterImage = document.createElement('img')
        characterImage.src = character.image
        characterFlipCardFront.appendChild(characterImage)

        let characterFlipCardBack = document.createElement('div')
        characterFlipCardBack.classList.add('flip-card-back')

        let characterName = document.createElement('h1')
        characterName.textContent = character.name
        characterFlipCardBack.appendChild(characterName)

        characterFlipCardInner.appendChild(characterFlipCardFront)
        characterFlipCardInner.appendChild(characterFlipCardBack)

        characterFlipCardContainer.appendChild(characterFlipCardInner)
        container.appendChild(characterFlipCardContainer)
    })
}

const searchCharacters = async (e) => {
    e.preventDefault()
    let search = document.getElementById('searchInput').value

    let filteredCharacters = cleanedData.filter(character => character.name.includes(search))
    buildPage(filteredCharacters)

    // let searchData = await getData('https://rickandmortyapi.com/api/character?name=' + search)
    // buildPage(searchData)
}

const form = document.getElementById('searchForm')
form.addEventListener('submit', searchCharacters)