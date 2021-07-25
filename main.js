const dom = {
    buttonParallel: document.getElementById('getUsersParallel'),
    buttonOneByOne: document.getElementById('getUsersOneByOne'),
    buttonOneByOneSuccess: document.getElementById('getUsersOneByOneSuccess'),
    userList: document.getElementById('userList'),
}

const generateUsersRequests = () => [...Array(10)].map(() => {
    const randomUserId = Math.floor(Math.random() * 13) + 1
    return `https://jsonplaceholder.typicode.com/users/${randomUserId}`
})

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getRequests = ({ requests = [], isParallelDispatch = true }) => {
    if (isParallelDispatch) {
        return Promise
            .all(requests.map(request => fetch(request)))
            .then(responses => {
                const hasErrors = !!responses.find(request => request.status === 404)
                return responses
            })
    } else {
        const result = []

        const getRequest = async (requests) => {
            console.log()
            const a = await fetch(requests[0]).then(async (res) => {
                if (requests.length > 1) {
                    requests.shift()
                    if (res.ok) {
                        await getRequest(requests)
                    } else {
                        result.push(...requests.map(request => ({
                            url: request,
                            ok: false,
                            notSent: true
                        })))
                    }
                }
                return res
            })
            result.push(a)
            return result
        }
        return getRequest(requests)
    }

}


async function renderRequests({ isParallelDispatch, shouldShowWithErrors }) {
    const responses = await getRequests({ requests: generateUsersRequests(), isParallelDispatch })
    console.log(responses)
    const responsesListElement = responses
        .filter(response => shouldShowWithErrors ? response : response.ok)
        .reverse()
        .map(response => `<li>
            ${response.url} - 
            ${response.ok ? '✅' : response.notSent ? '⛔' : '❌'} - 
            status: ${response.ok ? 'success' : 'failed'}
        </li>`)

    dom.userList.innerHTML = `<ul>${responsesListElement}</ul>`
}

dom.buttonParallel.addEventListener('click', () => renderRequests({ isParallelDispatch: true, shouldShowWithErrors: true }))
dom.buttonOneByOne.addEventListener('click', () => renderRequests({ isParallelDispatch: false, shouldShowWithErrors: true }))
dom.buttonOneByOneSuccess.addEventListener('click', () => renderRequests({ isParallelDispatch: false, shouldShowWithErrors: false }))
