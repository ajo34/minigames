import {sendResult} from '../commonscript.js'
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
    
    const result = playOptions.indexOf(playerChoice) - playOptions.indexOf(cpuChoice)
    
    if (result == 0) {
        console.log(playerChoice, cpuChoice, 'draw')
        sendResult('Rock-Paper-Scissors', 1)
    } else if (result == 1 || result == -2){
        console.log(playerChoice, cpuChoice, 'win')
        sendResult('Rock-Paper-Scissors', 2)
    } else {
        console.log(playerChoice, cpuChoice, 'loss')
        sendResult('Rock-Paper-Scissors', 0)
    }
}

