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

const linkManipulate = document.querySelectorAll('.link-page')
const linkPage = document.body
linkPage.addEventListener('click', function (e) {
    const link = e.target.closest('.link-page')

    if (link) {
        if (link.matches('.link-page')) {
            linkManipulate.forEach(e => {
                e.classList.remove('active')   

                //manipulated class of navbar button when link event is external 
                e.classList.toggle('active', e.getAttribute('href') === link.getAttribute('href'))
            })
            link.classList.add('active')

            const route = link.getAttribute('href').replace('#', '')
            handleRouteChange(route)
        }
    }
})

window.addEventListener('popstate', (e) => {
    const route = e.state?.route || history.state?.route || 'home'
    renderPage(route)
})

window.addEventListener('load', () => {
    const route = location.hash.replace('#', '') || 'home'
    renderPage(route)
})