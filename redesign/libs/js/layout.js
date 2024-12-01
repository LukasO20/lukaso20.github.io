// variables
const container = document.querySelector('.container')

// scroll functions
const toScrollTop = document.querySelector('.scroll.top')
const toScrollBottom = document.querySelector('.scroll.bottom')

window.addEventListener('scroll', () => {
    shiftScrollView()
})

const scrollToElement = (el) => {
    el.scrollIntoView({
        behavior: 'smooth'
    })
}

const shiftScrollView = () => {
    const currentScroll = document.documentElement.scrollTop
    if (currentScroll > lastTopScroll) {     
        if (toScrollBottom !== undefined) {
            scrollToElement(toScrollBottom)
        }
    } else if (currentScroll < lastTopScroll) {
        if (toScrollTop !== undefined) {
            scrollToElement(toScrollTop)
        }
    } 
    console.log('VALUES - ', ' CURRENT - ', currentScroll, ' LAST - ', lastTopScroll)
    lastTopScroll = currentScroll <= 0 ? 0 : currentScroll
}

let lastTopScroll = 0