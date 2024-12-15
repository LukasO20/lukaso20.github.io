// variables
const body = document.querySelector('body')
const container = document.querySelector('.container')
const footer = container.querySelector('.footer')

// scroll functions
const toScrollTop = document.querySelector('.scroll.top')
const toScrollBottom = document.querySelector('.scroll.bottom')
const scrollIndicator = document.querySelectorAll('.container-scroll-indicator label')

window.addEventListener('scroll', () => {
    shiftScrollView()
})

scrollIndicator.forEach(item => {
    item.addEventListener('click', function (e) {
        const indicator = e.target.attributes.class.value.split(' ')[0]
        if (indicator === 'indicator-1') {
            autoScroll(toScrollTop)
        } else {
            autoScroll(toScrollBottom)
        }
    })
})

const shiftStyleIndicator = (scrollDataBefore, scrollDataCurrent, element) => {
    if (element !== undefined) {
        element.forEach((item, i) => {
            item.classList.remove('on')

            if (scrollDataCurrent > scrollDataBefore) {     
                if (i === 1) { item.classList.add('on') }
            } else if (scrollDataCurrent < scrollDataBefore) {
                if (i === 0) { item.classList.add('on') }
            } 
        })
    }
}

const autoScroll = (scrollData) => {
    scrollData.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
    })
}

let lastTopScroll = 0
const shiftScrollView = () => {
    const currentScroll = document.documentElement.scrollTop

    shiftStyleIndicator(lastTopScroll, currentScroll, scrollIndicator)
    lastTopScroll = currentScroll <= 0 ? 0 : currentScroll
}

// change themes
const themeButton = document.querySelector('.theme--title')
const linkThemeHref = document.querySelector('#themelink')

themeButton.addEventListener('click', function (e) {
    setThemeLocalStorage(e), applyTheme(linkThemeHref)
})

const mapTheme = {
    lightlayout: 'public/css/lighttheme.css',
    darklayout: 'public/css/darktheme.css',
    lightbg: `public/img/background_white_theme.svg`,
    darkbg: `public/img/background_black_theme.svg`
}

const setThemeLocalStorage = (e) => {
    const themeButton = e.currentTarget
    const newTheme = themeButton.classList.toggle('dark') ? 'dark' : 'light'
    localStorage.setItem('theme', newTheme)
}

const applyTheme = (linkElement) => {
    const theme = localStorage.getItem('theme') || 'dark'
    localStorage.setItem('theme', theme)

    linkElement.href = mapTheme[`${theme}layout`]

    themeButton.classList.remove('dark', 'light');
    themeButton.classList.add(theme)

    const iconButtonTheme = themeButton.querySelector('i')
    const iconTheme = theme === 'dark' ? 'fa-moon' : 'fa-sun'
    
    iconButtonTheme.classList.remove('fa-moon', 'fa-sun')
    iconButtonTheme.classList.add(iconTheme)

    loader('show')
    loadImg(mapTheme[`${theme}bg`], (error, imageURL) => {
        if (error) {
            console.error(`Error on change imagem: ${error.message}`)
        } else {
            body.style.backgroundImage = `url('${mapTheme[`${theme}bg`]}')`
        }

        setTimeout(() => {
            loader('hide')
        }, 2500)
    })
}

const loadImg = (imageURL, callback) => {
    const img = new Image()
    img.src = imageURL

    img.onload = () => callback(null, imageURL)
    img.onerror = () => callback(new Error(`Fail to load image: ${imageURL}`))
}

const loader = (action) => {
    const loader = {
        show() {
            const loader = document.createElement('div')
            const spinner = document.createElement('div')

            loader.classList.add('loader')
            loader.classList.add(localStorage.theme === 'dark' ? 'dark' : 'light')
            spinner.classList.add('loader-spinner')

            loader.appendChild(spinner)
            footer.classList.add('hide')
            body.style.overflowY = 'hidden'
            body.appendChild(loader)
        },
        hide() {
            const loader = document.querySelector('.loader')
            if (loader) {
                body.style.overflowY = 'auto'
                footer.classList.remove('hide')
                loader.remove()
            }
        }
    }

    if (loader[action]) {
        return loader[action]()
    } else {
        return console.error('Loader: Method not found...')
    }
}

document.addEventListener('DOMContentLoaded', function () {
    applyTheme(linkThemeHref)
})