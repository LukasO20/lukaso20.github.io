const renderPage = (route) => {
    const container = document.getElementById('container-content')
    const page = `pages/${route}.html`
    console.log('PAGE ', page)
    fetch(page)
        .then(response => response.text())
        .then(html => container.innerHTML = html)
        .catch(error => {
            console.log('Error loading page: ', error)
            container.innerHTML = `<div class="message"><h1>404 - Page not found :[</h1></div>`
            throw error
        })
}

const handleRouteChange = (event) => {
    console.log('FROM CLICK - ', event)

    const route = location.hash.replace('#', '') || 'home'
    renderPage(route)
}

const linkPage = document.querySelectorAll('.link-page')
linkPage.forEach(link => 
    link.addEventListener('click', () => {
        const route = link.getAttribute('href').replace('#', '')
        renderPage(route)
    })
)

window.addEventListener('hashchange', handleRouteChange())
window.addEventListener('load', handleRouteChange())