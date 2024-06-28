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
    shiftMenu($(this))
    nameStyleMenu(h1Menu)
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

// -- MAIN FUNCTIONS --
const main = $('main')
const footer = $('footer')

const buttonUpMain = main.find('.button-up')
buttonUpMain.on('click', function (){
    const contentHTMLtarget = main.find('.div-section-titles')
    shiftNavegateMainContents(contentHTMLtarget)
})

// email functions
const buttonEmailFooter = footer.find('.email-footer')
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

        let messageAtention = $('<div class="message-email-inputs"><span>Oops! Check if all the data has been filled out, try again. </span> <span class="fa-regular fa-circle-xmark close-message"></span></div>')
        let messageAtentionEmail = $('<div class="message-email-validation"><span>E-mail provided is invalid. Check the typed credentials and try again!</span></span> <span class="fa-regular fa-circle-xmark close-message"></span></div>')

        let parentMessage = $('body section .div-section-content-t4 .div-contact-content .div-user-data-textarea')

        if (name !== '' && email !== '' && message !== '') {
            if (validator.isEmail(email)) {
                parentMessage.find('.message-email-inputs').remove()
                parentMessage.find('.message-email-validation').remove()

                formEmail.submit()
            } else {
                if (!parentMessage.find('.message-email-validation').hasClass('message-email-validation')) {
                    parentMessage.append(messageAtentionEmail)
                    parentMessage.find('.message-email-inputs').remove()
                }
            }
        } else {
            if (!parentMessage.find('.message-email-inputs').hasClass('message-email-inputs')) {
                parentMessage.append(messageAtention)
                parentMessage.find('.message-email-validation').remove()
            }
        }

    } catch (e) {
        console.log(`Error to send e-mail: ${e}`)
    }
}

// scroll functions NOVAS APLICAÇÕES AQUI (REFATORAR CÓDIGO)
const screenScroll = $(window)
const section = $('section')

screenScroll.on('scroll', function (){
    const scrollTop = $(this).scrollTop()

    if (section.length){     
        const divs = section.children('.div-section') 

        if(divs.length){
            divs.each(function (index){
                const divTop = $(this).offset().top
                const divHeight = $(this).outerHeight()
                const divBottom = divTop + divHeight

                if (scrollTop >= divTop && scrollTop < divBottom){ 
                    
                    menu.find('.li-links').each(function (){
                        let item = $(this)
                        switch (index) {
                            case 1:
                                if (item.hasClass('li1')){ item.addClass('li-links-selected') }
                                else { item.removeClass('li-links-selected') }
                                break
                            case 2:
                            case 3:
                            case 4:
                                if (item.hasClass(`li${index}`)){ item.addClass('li-links-selected') }
                                else { item.removeClass('li-links-selected') }
                                break
                            default:
                                item.removeClass('li-links-selected')       
                        }

                        index > 1 ? section.find('.button-up').css('opacity', '1') : section.find('.button-up').css('opacity', '0')
                    })
                }
            })
        }
    }
})

// -- FOOTER FUNCTIONS --
const footerYear = $('footer .div-footer-info .message .footer-year')
const dataNow = new Date()
footerYear.text(dataNow.getFullYear())

// -- THEMER FUNCTIONS --
const switchTheme = $('section .div-section-titles .buttons-config .switch-theme')

switchTheme.on('click', function (){
    localStorage.setItem('theme', '')
    $(this).toggleClass('dark light')
    switchTheme.find('.icon-current-theme').toggleClass('fa-moon fa-sun')

    if ($(this).hasClass('light')) { localStorage.theme = 'themelight', $('section .div-section-titles .buttons-config .switch-theme').attr('title', 'Change theme to dark')} 
    else { localStorage.theme = 'themedark', $('section .div-section-titles .buttons-config .switch-theme').attr('title', 'Change theme to light')
}

    Theme()
})

function Theme() {
    localStorage.theme === 'themelight' ? 
    
    ($('body').addClass('light-body'),
    $('main section .button-up').addClass('button-up-light'),
    $('.nav-article-menu').addClass('nav-article-menu-light'),
    $('section').addClass('section-theme-light'), 
    $('footer').addClass('footer-light'))  

    :

    ($('body').removeClass('light-body'),
    $('main section .button-up').removeClass('button-up-light'),
    $('.nav-article-menu').removeClass('nav-article-menu-light'),
    $('section').removeClass('section-theme-light'),
    $('footer').removeClass('footer-light'))    
}

$(document).ready(function(){
    try {
        if(localStorage.theme === 'themelight') {
            switchTheme.addClass('light')
            switchTheme.find('.icon-current-theme').addClass('fa-sun')
            $('section .div-section-titles .buttons-config .switch-theme').attr('title', 'Change theme to dark')
        } else {
            switchTheme.addClass('dark')
            switchTheme.find('.icon-current-theme').addClass('fa-moon')
            $('section .div-section-titles .buttons-config .switch-theme').attr('title', 'Change theme to light')
        }
    } catch(e) {
        console.log(`Error change theme of page ${e}`)
    }

    Theme()
})

function ResponsiveComponents(windowSize, component) {

    //Type Screen
    if (windowSize !== undefined && windowSize !== null) {
        windowSize <= 650 ? nameStyleMenu(h1Menu, true) 
        : nameStyleMenu(h1Menu, false), menu.hasClass('article-menu-expanded') ? menu.removeClass('article-menu-expanded') : undefined, menu.find('.nav-article-menu').hasClass('nav-article-menu-expanded') ? menu.find('.nav-article-menu').removeClass('nav-article-menu-expanded') : undefined
    }

    //Type Input
    if (component !== undefined) { component.val() !== '' ? (component.parent().find('label').addClass('type-active'), component.addClass('type-active')) : undefined }
}

function nameStyleMenu(element, customSetting = undefined) {
    const styleH1 = $(element)
    const styleH1Span = styleH1.find('.span-title-emphasis')

    if (menu.hasClass('article-menu-expanded')) {
        styleH1.find('.span-item1-h1-style').length < 1 ? (styleH1Span.append('<span class="span-item1-h1-style">ucas .O</span>'), styleH1.append('<span class="span-item2-h1-style">Web Developer</span>')) : undefined
    } else {
        styleH1.find('.span-item1-h1-style').length === 1 ? styleH1.find('.span-item1-h1-style, .span-item2-h1-style').remove() : undefined
    }

    // -- responsive settings
    if (!menu.hasClass('article-menu-expanded')) {
        if (customSetting === true) {
            styleH1.find('.span-item1-h1-style').length < 1 ? (styleH1Span.append('<span class="span-item1-h1-style">ucas .O</span>'), styleH1.append('<span class="span-item2-h1-style">Web Developer</span>')) : undefined
        } 
        
        if (customSetting === false) {
            styleH1.find('.span-item1-h1-style').length === 1 ? styleH1.find('.span-item1-h1-style, .span-item2-h1-style').remove() : undefined
        }
    }
}

// -- menu mobile settings --

const screen_width = () => {

    let permission = false
    screenUserG.resize(function () { permission = true,  ResponsiveComponents($(this).width()) })

    // If user don't move the window and current resolution under 650px
    !permission ? ResponsiveComponents(screenUserG.width()) : undefined
}

screen_width()