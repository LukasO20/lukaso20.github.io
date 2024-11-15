const routes = {
    home: '/pages/home.html',
    about: '/pages/about.html'
}

const renderPage = () => {
    const app = document.getElementById('container-content')
    const hash = location.hash.slice(1) || 'home'
    const page = routes[hash] || '404.html'

    loadPage(page).then((html) => {
        app.innerHTML = html
    }).catch((error) => {
        console.log(`Error: this page ${error} doesn't exists...`)
        app.innerHTML = '<h1>Page not found :[</h1>'
    })
}

const loadPage = (page) => {
    console.log('THIS PAGE ', location.hash.slice(1))

    return fetch(page)
        .then(response => response.text())
        .then(html => html)
        .catch(error => {
            console.log('Error loading page: ', error)
            throw error
        })
}

renderPage()

window.addEventListener('hashchange', renderPage)
window.addEventListener('load', renderPage)

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("a").forEach(link => {        
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = e.target.getAttribute("href").substring(1)
        loadPage(`/pages/${page}.html`)
        location.hash = page
        })
    })

    loadPage(routes.home)
})

