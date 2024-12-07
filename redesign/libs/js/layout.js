// variables
const container = document.querySelector('.container')

// scroll functions
const toScrollTop = document.querySelector('.scroll.top')
const toScrollBottom = document.querySelector('.scroll.bottom')
const scrollIndicator = document.querySelectorAll('.container-scroll-indicator label')

window.addEventListener('scroll', () => {
    shiftScrollView()
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

let lastTopScroll = 0
const shiftScrollView = () => {
    const currentScroll = document.documentElement.scrollTop

    shiftStyleIndicator(lastTopScroll, currentScroll, scrollIndicator)
    lastTopScroll = currentScroll <= 0 ? 0 : currentScroll
}