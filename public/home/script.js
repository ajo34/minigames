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
        //../game/${game.name.toLowerCase()}
        gameBox.innerHTML = `<a href="http://localhost:8000/game?game=${game.name}">${game.name}</a>`
        document.body.appendChild(gameBox)
    }) 
}
