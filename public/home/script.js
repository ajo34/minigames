fetchGames()

async function fetchGames() {
    try {
        let response = await fetch('/fetchgames/');
        let games = await response.json();
        displayGames(games)
    } catch (error) {
        console.log('Ereror', error)
    }
}

function displayGames(games){
    games.forEach(game => {
        let gameBox = document.createElement('div')
        gameBox.innerHTML = `<a href="/${game.name.toLowerCase()}">${game.name}</a>`
        document.body.appendChild(gameBox)
    }) 
}
