const renderPage = (route) => {
    const container = document.getElementById('container-content')
    const page = `pages/${route}.html`
    fetch(page)
        .then(response => response.text())
        .then(html => container.innerHTML = html)
        .catch(error => {
            console.log('Error loading page: ', error)
            container.innerHTML = `<div class="message"><h1>404 - Page not found :[</h1></div>`
            throw error
        })
}

const handleRouteChange = (route) => {
    // Update history to navegator
    const currentState = history.state?.route;
    if (currentState !== route) {
        history.pushState({ route }, '', `#${route}`);
    }
}

const linkPage = document.querySelectorAll('.section-right--nav .link-page')
linkPage.forEach(item => {
    item.addEventListener('click', e => {

        if (e) {
            linkPage.forEach(removeclass => removeclass.classList.remove('active'))
            e.currentTarget.classList.add('active')

            const route = e.currentTarget.getAttribute('href').replace('#', '')
            handleRouteChange(route)
        }
    })
})

window.addEventListener('popstate', (e) => {
    const route = e.state?.route || history.state?.route || 'home'
    renderPage(route)
})

window.addEventListener('load', () => {
    const route = location.hash.replace('#', '') || 'home'
    renderPage(route)
})