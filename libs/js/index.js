// -- GLOBAL generic VARs --
// Global var is namevar_g

var screenUserG = $(window)

// -- MENU FUNCTIONS --
const menu = $('.article-menu')
const navegateItensMenu = menu.find('.li-links')
const h1Menu = menu.find('.li-profile-menu .h1-emphasis')

const buttonMenuContact = menu.find('.social-media-itens')
const buttonExpandMenu = menu.find('.icon-expand')

navegateItensMenu.on('click', function() {
    const className = $(this).attr('class').split(' ')
    const classTypeName = className[1]

    shiftNavegateItensMenu(classTypeName)
})

buttonMenuContact.on('click', function(){
    shiftMenuContact()
})

buttonExpandMenu.on('click', function(){
    const iconButtonExpand = createElement($(this), 'menu')

    shiftAnimationElement($(this), iconButtonExpand, false, true)
    shiftMenu($(this))
    theme(disableThis = 'loadTheme', enableAll = true)
})

function shiftMenu(event) { 
    const menuItens = menu.find('.nav-article-menu')
    const menuContact = menu.find('.group-li-contacts')

    menu.toggleClass('article-menu-expanded')
    menuItens.toggleClass('nav-article-menu-expanded')
    menuContact.toggleClass('group-li-contacts-expanded')
    $(event).attr('title', menu.hasClass('article-menu-expanded') ? 'Minimize menu' : 'Expand menu')
}

function shiftMenuContact() {
    const menuContact = menu.find('.group-li-contacts')
    const iconButtonStatus = menu.find('.social-media-itens')

    menuContact.toggleClass('group-li-contacts-open')
    iconButtonStatus.toggleClass('icon-socialmedia-open')
    iconButtonStatus.parents('.group-li-items').toggleClass('socialmedia-open')
    iconButtonStatus.attr('title', menuContact.hasClass('group-li-contacts-open') ? 'Close social media details' : 'Open social media details')
}

function shiftNavegateItensMenu(classTypeName) {
    const divs = $('section .div-section')
    let topValuePlus = 0
    classTypeName === 'li1' ? topValuePlus = 50 : topValuePlus = 160

    //regex is based on "classTypeName (class - css)" from menu 'li' and its numbers
    const regex = /li(\d+)/
    const matchNumber = classTypeName.match(regex)

    if (matchNumber && matchNumber[1]) {
        const targetIndex = parseInt(matchNumber[1], 10)

        if (divs.length) {
            divs.each(function (index) {
                if (index === targetIndex) {
                     $('html, body').animate({
                        scrollTop: divs.eq(index).offset().top + topValuePlus
                    }, 700)
    
                    return false
                }
            })
        }
    }
}

function shiftAnimationElement(element, icon, animateThis, animateAll) {

    const typeShift = { 
        shiftIcon: (icon) => {
            if (icon !== '' && typeof icon === 'string' && element.jquery) {
                element.html(icon)
            }
        },

        shiftToggle: () => {

        }
    }

    const enableOnlyFunction = (namef) => {
        if (typeShift[namef]) { 
            typeShift[namef]()
            animateAll = false
        }
    }

    const enableFunction = () => {
        typeShift.shiftIcon(icon)
        typeShift.shiftToggle()
    }

    if (animateThis) {
        enableOnlyFunction(animateThis)
    }

    if (animateAll) {
        enableFunction()
    }
}


// -- MAIN FUNCTIONS --
const main = $('main')
const mainfooter = $('footer')

const buttonUpMain = main.find('.button-up')
buttonUpMain.on('click', function (){
    const contentHTMLtarget = main.find('.div-section-titles')
    shiftNavegateMainContents(contentHTMLtarget)
})

// email functions
const buttonEmailFooter = mainfooter.find('.email-footer')
const buttonEmailSection = main.find('.email-section')
const contentHTMLtarget = main.find('.div-section-content-t4')

buttonEmailFooter.on('click', function (){
    shiftNavegateMainContents(contentHTMLtarget)
})

buttonEmailSection.on('click', function (){
    shiftNavegateMainContents(contentHTMLtarget)
})

function shiftNavegateMainContents(contentHTML) {
    if (contentHTML.length){
        let divScroll = contentHTML
        $('html, body').animate({
            scrollTop: divScroll.offset().top
        }, 700)
    }
}

const buttonSendEmail = main.find('.a-contact-send-email')
buttonSendEmail.on('click', function (){
    sendEmail()
})

function sendEmail () {
    try {
        const formEmail = main.find('.form-email')
        const contentEmail = main.find('.div-contact-content-email')

        let name = contentEmail.find('input[name="name"]').val()
        let email = contentEmail.find('input[name="email"]').val()
        let message = contentEmail.find('textarea[name="message"]').val()
        let messageAtention = createElement(contentEmail, 'main')

        let parentMessage = $('.div-user-data-textarea')

        if (name !== '' && email !== '' && message !== '') {
            if (validator.isEmail(email)) {
                parentMessage.find('.message-email-inputs').remove()
                parentMessage.find('.message-email-validation').remove()
                formEmail.submit()

            } else {
                if (!parentMessage.find('.message-email-validation').hasClass('message-email-validation')) {
                    parentMessage.append(messageAtention)
                    parentMessage.find('.message-email-inputs').remove()
                }
            }

        } else {
            if (!parentMessage.find('.message-email-inputs').hasClass('message-email-inputs')) {
                parentMessage.append(messageAtention)
                parentMessage.find('.message-email-validation').remove()
            }
        }

        const buttonCloseMessage = $('.message-email-inputs, .message-email-validation').find('.close-message')
        buttonCloseMessage.on('click', function() {
            removeDivs($(this).parent())
        })

    } catch (e) {
        console.log(`Error to send e-mail: ${e}`)
    }
}

function removeDivs(elementJquery) {
    elementJquery.remove()
}

// scroll functions
const screenScroll = $(window)
screenScroll.on('scroll', function (){
    changeLiStatusScroll($(this).scrollTop())
})

function changeLiStatusScroll (scrollData) {
    const scrollTop = scrollData

    if (main.length){     
        const divs = main.find('.div-section')

        if(divs.length){
            divs.each(function (index){
                const div = $(this)
                const divTop = div.offset().top
                const divHeight = div.outerHeight()
                const divBottom = divTop + divHeight

                if (scrollTop >= divTop && scrollTop < divBottom){         
                    menu.find('.li-links').each(function (){
                        let item = $(this)
                        if (item.hasClass(`li${index}`)){ item.addClass('li-links-selected') }
                        else { item.removeClass('li-links-selected') }

                        index > 1 ? main.find('.button-up').css('opacity', '1') : main.find('.button-up').css('opacity', '0')
                    })
                    return false
                }
            })
        }
    }
}


// -- FOOTER FUNCTIONS --
const footer = $('footer')
const footerYear = footer.find('.footer-year')

const catchDataNowFooter = (dataNow = new Date()) => {
    footerYear.text(dataNow.getFullYear())
}
catchDataNowFooter()


// -- THEME FUNCTIONS --
const switchTheme = $('.switch-theme')
switchTheme.on('click', function (){
    localStorage.setItem('theme', '')
    switchTheme.toggleClass('dark light')
    switchTheme.find('.icon-current-theme').toggleClass('fa-moon fa-sun')

    if (switchTheme.hasClass('light')) { localStorage.theme = 'themelight', switchTheme.attr('title', 'Change theme to dark')} 
    else { localStorage.theme = 'themedark', switchTheme.attr('title', 'Change theme to light') }

    theme(disableThis = undefined, enableAll = true)
})

function theme(disableThis, enableAll) { 

    const themeBody = $('body')
    const themeMenu = $('article')
    const themebuttonUpMain = main.find('.button-up')
    const themeSidebarMenu = themeBody.find('.nav-article-menu')
    const themeSection = main.find('section')
    const themeFooter = footer

    const load = {       
        loadTheme: () => {
    
            localStorage.theme === undefined ? localStorage.theme = 'themedark' : undefined
        
            localStorage.theme === 'themelight' ? 
            
            (themeBody.addClass('light-body'),
            switchTheme.addClass('light'),
            switchTheme.find('.icon-current-theme').addClass('fa-sun'),
            switchTheme.attr('title', 'Change theme to dark'),
            themebuttonUpMain.addClass('button-up-light'),
            themeSidebarMenu.addClass('nav-article-menu-light'),
            themeSection.addClass('section-theme-light'), 
            themeFooter.addClass('footer-light'))  
        
            :
        
            (themeBody.removeClass('light-body'),
            switchTheme.addClass('dark'),
            switchTheme.find('.icon-current-theme').addClass('fa-moon'),
            switchTheme.attr('title', 'Change theme to light'),
            themebuttonUpMain.removeClass('button-up-light'),
            themeSidebarMenu.removeClass('nav-article-menu-light'),
            themeSection.removeClass('section-theme-light'),
            themeFooter.removeClass('footer-light')) 
        },

        changeThemeContent: () => {
    
            const spanStyleItem1 = $('<span class="span-item1-h1-style">ucas .O</span>')
            const spanStyleItem2 = $('<span class="span-item2-h1-style">Web Developer</span>')
    
            //Content to mobile devices
            if (screenUserG.width() <= 650 || themeMenu.hasClass('article-menu-expanded')) {
                const h1Title = themeMenu.find('.li-profile-menu .h1-emphasis')
                const styleH1Span = h1Title.find('.span-title-emphasis')
                
                h1Title.find($('.span-item1-h1-style')).length < 1 ? (styleH1Span.append(spanStyleItem1), h1Title.append(spanStyleItem2)) : undefined 
            }
            else if (screenUserG.width() > 650 || !themeMenu.hasClass('article-menu-expanded')) {
                $('.span-item1-h1-style, .span-item2-h1-style').remove()
            }
        }
    }  
    
    const disableFunction = (namef) => {
        if (load[namef]) { load[namef] = () => { /* console.log(`Function ${namef} is disable`) */ }
        }
    }

    const enableFunction = () => {
        load.loadTheme()
        load.changeThemeContent()
    }

    if (disableThis) {
        disableFunction(disableThis)
    }

    if (enableAll) {
        enableFunction()
    }
}
theme(disableThis = undefined, enableAll = true)


// -- MOBILE SETTINGS -- 
function screenWidthMobile() {
    screenUserG.resize(function () { theme(disableThis = 'loadTheme', enableAll = true) })
}
screenWidthMobile()


// -- GENERAL AUXILIARY FUNCTIONS --
function createElement(element, fromElement) {

    let newElement = undefined

    const typeParent = {
        menu: () => {
            let iconFontAwesome = undefined

            if (element.jquery) {
                element.find('span').hasClass('fa-chevron-right') ? 
                iconFontAwesome = '<span class="fa-solid fa-chevron-left"></span>' :
                iconFontAwesome = '<span class="fa-solid fa-chevron-right"></span>'

                newElement = iconFontAwesome
            }
        },

        main: () => {
            let dataEmpty = undefined

            if (element.jquery) {
                element.find('input[name="name"], input[name="email"], textarea[name="message"]').each(function () {
                    if (!$(this).val()) {
                        dataEmpty = true
                        return false
                    }
                })

                if (dataEmpty) {
                    newElement = '<div class="message-email-inputs"><span>Oops! Check if all the data has been filled out, try again. </span> <span class="fa-regular fa-circle-xmark close-message"></span></div>'
                } 
                else {
                    let messageCheckEmail = element.find('.message-email-inputs').length

                    if (messageCheckEmail === 0 || messageCheckEmail === 1) {
                        newElement = '<div class="message-email-validation"><span>E-mail provided is invalid. Check the typed credentials and try again!</span></span> <span class="fa-regular fa-circle-xmark close-message"></span></div>'
                    }
                } 
            }
        }
    }

    const enableTypeParent = (nameParent) => {
        if (typeParent[nameParent]) { typeParent[nameParent]() }
    }

    if (fromElement) { enableTypeParent(fromElement) }
    return newElement
}