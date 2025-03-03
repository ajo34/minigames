const btns = document.querySelectorAll('.choiceBtn')
btns.forEach(btn => {
    btn.addEventListener('click', play)
})

const playOptions = ['Rock', 'Paper', 'Scissors']

function play(evt) {
    const playerChoice = evt.target.innerText
    const cpuChoice = playOptions[Math.floor(Math.random() * playOptions.length)]
    compare(playerChoice, cpuChoice)
}

function compare (playerChoice, cpuChoice) {
    result = playOptions.indexOf(playerChoice) - playOptions.indexOf(cpuChoice)

    if (result == 0) {
        console.log(playerChoice, cpuChoice, 'draw')
        sendResult(1)
    } else if (result == 1 || result == -2){
        console.log(playerChoice, cpuChoice, 'win')
        sendResult(2)
    } else {
        console.log(playerChoice, cpuChoice, 'loss')
        sendResult(0)
    }
}

async function sendResult (result) {
    const game = {
        name: 'Rock Paper Scissors',
        result: result
    }

    try {
        const response = await fetch('/regresult',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(game)
            }
        )
        let data = await response.json();
        console.log('data', data)

    } catch (error) {
        console.log('erriror', error)
    }
}