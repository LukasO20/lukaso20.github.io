// -- GLOBAL generic VARs --
// Global var is namevar_g

var screen_user_g = $(window)

// -- MENU FUNCTIONS --
const menu = $('.article-menu')
const navegate_itens_menu = menu.find('.li-links')
const h1_menu = menu.find('.li-profile-menu .h1-emphasis')

const span_item_menu = '<span class="span-item minimize-menu-open"><span class="fa-solid fa-chevron-right"></span></span>'

const button_menu_contact = $('body .article-menu .menu-ul-itens .group-li-items .li-item.social-media-itens')
const button_expand_menu = $('body .article-menu .menu-ul-itens .li-profile-menu .icon-expand')

button_menu_contact.on('click', function(){
    let menu_contact = $('body .article-menu .menu-ul-itens .group-li-contacts')
    let button_status = $('body .article-menu .menu-ul-itens .group-li-items .social-media-itens')

    !menu_contact.hasClass('group-li-contacts-open') ? (menu_contact.addClass('group-li-contacts-open'), (button_status.addClass('icon-socialmedia-open'), button_status.parents('.group-li-items').addClass('socialmedia-open')), button_status.attr('title', 'Close social media details')) 
    : (menu_contact.removeClass('group-li-contacts-open'), (button_status.removeClass('icon-socialmedia-open'), button_status.parents('.group-li-items').removeClass('socialmedia-open')), button_status.attr('title', 'Open social media details'))
})

button_expand_menu.on('click', function(){
    const button_expand_menu = $(this)

    let menu = $('.article-menu')
    let menu_items = $('.article-menu .nav-article-menu')
    let menu_contact = $('body .article-menu .menu-ul-itens .group-li-contacts')

    if (!menu.hasClass('article-menu-expanded')) {
        menu.addClass('article-menu-expanded') 
        menu_items.addClass('nav-article-menu-expanded')
        menu_contact.addClass('group-li-contacts-expanded')
        button_expand_menu.attr('title', 'Minimize menu')

    } else {
        menu.removeClass('article-menu-expanded')
        menu_items.removeClass('nav-article-menu-expanded')
        menu_contact.removeClass('group-li-contacts-expanded')
        button_expand_menu.attr('title', 'Expand menu')

    }

    NameStyleMenu(h1_menu)
})

navegate_itens_menu.on('click', function (){
    const className = $(this).attr('class').split(' ')
    const classFilter = className[1]
    const divs = $('section .div-section')

    if (divs.length) {
        divs.each(function (index){
            switch (classFilter){
                case 'li1':
                    if (index === 1) {
                        return $('html, body').animate({
                            scrollTop: divs.eq(index).offset().top 
                        }, 700)
                    }
                    break
                case 'li2':
                    if (index === 2) {
                        return $('html, body').animate({
                            scrollTop: divs.eq(index).offset().top + 130
                        }, 700)
                    }
                    break
                case 'li3':
                    if (index === 3) {
                        return $('html, body').animate({
                            scrollTop: divs.eq(index).offset().top + 130
                        }, 700)
                    }
                    break
                case 'li4':
                    if (index === 4) {
                        return $('html, body').animate({
                            scrollTop: divs.eq(index).offset().top + 130
                        }, 700)
                    }
                    break
            }
        })
    }
})

// -- menu mobile settings --

const screen_width = () => {

    let permission = false
    screen_user_g.resize(function () { permission = true,  ResponsiveComponents($(this).width()) })

    // If user don't move the window and current resolution under 650px
    !permission ? ResponsiveComponents(screen_user_g.width()) : undefined
}

screen_width()



// -- SECTION FUNCTIONS -- 
const button_up = $('section .button-up')

button_up.on('click', function (){
    const divs = $('section .div-section')

    if (divs.length){
        const divScroll = divs.eq(0)

        $('html, body').animate({
            scrollTop: divScroll.offset().top
        }, 700)
    }
})

// -- EMAIL FUNCTIONS --
const navegate_email = $('body .email-section, .email-footer')
const formEmail = $('section .form-email')
const contentEmail = $('section .form-email .div-contact-content-email')
const sendEmail = $('section .div-section-content-t4 .a-contact-send-email')

navegate_email.on('click', function (){
    const divs = $('section .div-section')

    if (divs.length){
        const divScroll = divs.eq(4)

        $('html, body').animate({
            scrollTop: divScroll.offset().top
        }, 700)
    }
})

sendEmail.on('click', function (){
    try {
        let name = contentEmail.find('input[name="name"]').val()
        let email = contentEmail.find('input[name="email"]').val()
        let message = contentEmail.find('textarea[name="message"]').val()

        let messageAtention = $('<div class="message-email-inputs"><span>Oops! Check if all the data has been filled out, try again. </span></div>')
        let messageAtentionEmail = $('<div class="message-email-validation"><span>E-mail provided is invalid. Check the typed credentials and try again!</span></div>')

        let parentMessage = $('body section .div-section-content-t4 .div-contact-content .div-user-data-textarea')

        if (name !== '' && email !== '' && message !== '') {
            if (validator.isEmail(email)) {
                parentMessage.find('.message-email-inputs').remove()
                parentMessage.find('.message-email-validation').remove()
                console.log('Email enviado! (Teste)')

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
})

// -- FOOTER FUNCTIONS --
const footer_year = $('footer .div-footer-info .message .footer-year')
const data_now = new Date()
footer_year.text(data_now.getFullYear())

// -- SCROLL FUNCTIONS --
const screen_scroll = $(window)
const section = $('section')

screen_scroll.on('scroll', function (){
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
                        console.log(item)
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

// -- THEMER FUNCTIONS --
const switch_theme = $('section .div-section-titles .buttons-config .switch-theme')

switch_theme.on('click', function (){
    localStorage.setItem('theme', '')
    $(this).toggleClass('dark light')
    switch_theme.find('.icon-current-theme').toggleClass('fa-moon fa-sun')

    if ($(this).hasClass('light')) { localStorage.theme = 'themelight', $('section .div-section-titles .buttons-config .switch-theme').attr('title', 'Change theme to dark')} 
    else { localStorage.theme = 'themedark', $('section .div-section-titles .buttons-config .switch-theme').attr('title', 'Change theme to light')
}

    Theme()
})

function Theme() {
    localStorage.theme === 'themelight' ? 
    
    ($('main section .button-up').addClass('button-up-light'),
    $('.nav-article-menu').addClass('nav-article-menu-light'),
    $('section').addClass('section-theme-light'), 
    $('footer').addClass('footer-light'))  

    :

    ($('main section .button-up').removeClass('button-up-light'),
    $('.nav-article-menu').removeClass('nav-article-menu-light'),
    $('section').removeClass('section-theme-light'),
    $('footer').removeClass('footer-light'))    
}

$(document).ready(function(){
    try {
        if(localStorage.theme === 'themelight') {
            switch_theme.addClass('light')
            switch_theme.find('.icon-current-theme').addClass('fa-sun')
            $('section .div-section-titles .buttons-config .switch-theme').attr('title', 'Change theme to dark')
        } else {
            switch_theme.addClass('dark')
            switch_theme.find('.icon-current-theme').addClass('fa-moon')
            $('section .div-section-titles .buttons-config .switch-theme').attr('title', 'Change theme to light')
        }
    } catch(e) {
        console.log(`Error change theme of page ${e}`)
    }

    Theme()
})

function ResponsiveComponents(window_size) {

    //Type Screen
    if (window_size !== undefined && window_size !== null) {
        window_size <= 650 ? NameStyleMenu(h1_menu, true) 
        : NameStyleMenu(h1_menu, false), menu.hasClass('article-menu-expanded') ? menu.removeClass('article-menu-expanded') : undefined, menu.find('.nav-article-menu').hasClass('nav-article-menu-expanded') ? menu.find('.nav-article-menu').removeClass('nav-article-menu-expanded') : undefined
    }
}

function NameStyleMenu(element, custom_setting = undefined) {
    const style_h1 = $(element)
    const style_h1_span = style_h1.find('.span-title-emphasis')

    if (menu.hasClass('article-menu-expanded')) {
        style_h1.find('.span-item1-h1-style').length < 1 ? (style_h1_span.append('<span class="span-item1-h1-style">ucas .O</span>'), style_h1.append('<span class="span-item2-h1-style">Web Developer</span>')) : undefined
    } else {
        style_h1.find('.span-item1-h1-style').length === 1 ? style_h1.find('.span-item1-h1-style, .span-item2-h1-style').remove() : undefined
    }

    // -- responsive settings
    if (!menu.hasClass('article-menu-expanded')) {
        if (custom_setting === true) {
            style_h1.find('.span-item1-h1-style').length < 1 ? (style_h1_span.append('<span class="span-item1-h1-style">ucas .O</span>'), style_h1.append('<span class="span-item2-h1-style">Web Developer</span>')) : undefined
        } 
        
        if (custom_setting === false) {
            style_h1.find('.span-item1-h1-style').length === 1 ? style_h1.find('.span-item1-h1-style, .span-item2-h1-style').remove() : undefined
        }
    }
}