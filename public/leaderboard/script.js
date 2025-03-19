fetchRecords()
async function fetchRecords() {
    try {
        let response = await fetch('/fetchrecords/');
        let records = await response.json();
        displayRecords(records)
    } catch (error) {
        console.log('Eriror', error)
    }
}

function displayRecords(records){
    console.log('displaying ...', records[0])
    const container = document.getElementById('tableContainer')
    const table = document.createElement('table')
    table.innerHTML = `
    <tr>
        <th>User</th>
        <th>Games won<th>
    </tr>`
    records.forEach(record => {
        table.innerHTML += `
        <tr>
            <td>
                ${record.name}
            </td>
            <td>
                ${record.games_won}
            </td>
        </tr>`
    })
    container.appendChild(table)
    
}