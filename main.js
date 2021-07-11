const dom = {
    button: document.getElementById('getUsers'),
    userList: document.getElementById('userList'),
}

const generateUsersRequests = () => [...Array(10)].map(() => {
    const randomUserId = Math.floor(Math.random() * 15) + 1
    return `https://jsonplaceholder.typicode.com/users/${randomUserId}`
})



const getRequests = ({ requests = [], isParallelDispatch = true, shouldShowPartResult = true }) => Promise
    .all(requests.map(request => fetch(request)))
    .then(responses => {
        const hasErrors = !!responses.find(request => request.status === 404)
        if (!shouldShowPartResult && hasErrors) return null
        return responses
    })


async function renderRequests() {
    const responses = await getRequests({ requests: generateUsersRequests() })
    const responsesListElement = responses.map(response => `<li>${response.url} - ${response.ok ? '✅' : '❌'}</li>`)

    dom.userList.innerHTML = `<ul>${responsesListElement}</ul>`
    console.log(responses)

}

dom.button.addEventListener('click', renderRequests)