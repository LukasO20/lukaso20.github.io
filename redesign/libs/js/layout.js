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
        behavior: 'smooth',
        block: 'start'
    })

    //spacing adjustments
    const styles = window.getComputedStyle(el)
    const marginTop = parseInt(styles.marginTop)
    const paddingTop = parseInt(styles.paddingTop)

    if (marginTop + paddingTop > 0) {
        window.scrollBy(0, -(marginTop + paddingTop))
    }
}

let lastTopScroll = 0
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