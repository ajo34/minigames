export async function sendResult (gameName, result) {
    const game = {
        name: gameName,
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
console.log('common')