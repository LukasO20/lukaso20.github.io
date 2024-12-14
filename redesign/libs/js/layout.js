// variables
const container = document.querySelector('.container')
const body = document.querySelector('body')

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
    lightbg: `url('public/img/background_white_theme.svg')`,
    darkbg: `url('public/img/background_black_theme.svg')`
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
    body.style.backgroundImage = mapTheme[`${theme}bg`]

    themeButton.classList.remove('dark', 'light');
    themeButton.classList.add(theme)
}

document.addEventListener('DOMContentLoaded', function () {
    applyTheme(linkThemeHref)
})