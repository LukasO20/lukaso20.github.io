const section = $('section')
const menu = $('article')
const sendEmail = $('section .form-email')
const contentEmail = $('section .form-email .div-contact-content-email')

const button_menu_contact = $('body .article-menu .menu-ul-itens .group-li-items .li-item.expand-socialmedia')
const button_expand_menu = $('body .article-menu .menu-ul-itens .group-li-items .li-item.expand-menu')

$(window).on('scroll', function (){
    const scrollTop = $(this).scrollTop()
    const screenHeight = $(this).height()

    console.log(screenHeight)

    if (section.length){     
        const divs = section.children('.div-section') 

        if(divs.length){
            divs.each(function (index){
                const divTop = $(this).offset().top
                const divHeight = $(this).outerHeight()
                const divBottom = divTop + divHeight

                if (scrollTop >= divTop && scrollTop < divBottom){
                    const itemDynamic = itemCssDynamic(index)
                  
                    section.find('.h1-principal').css('font-size', itemDynamic.textSizeH1)
                    section.find('.h2-principal').css('font-size', itemDynamic.textSizeH2)  
                    
                    menu.find('.li-links').each(function (){
                        let item = $(this)

                        switch (index) {
                            case 1:
                                if (item.hasClass('li1')){
                                    item.addClass('li-links-dynamic')
                                } else {
                                    item.removeClass('li-links-dynamic')       
                                }
                                break
                            case 2:
                            case 3:
                            case 4:
                                if (item.hasClass(`li${index}`)){
                                    item.addClass('li-links-dynamic')
                                } else {
                                    item.removeClass('li-links-dynamic')       
                                }
                                break
                            default:
                                item.removeClass('li-links-dynamic')       
                        }

                        if (index > 1) {
                            section.find('.button-up').css('opacity', '1')
                        } else {
                            section.find('.button-up').css('opacity', '0')
                        }
                    })
                }
            })
        }
    }
})

function itemCssDynamic(index) {
    const itemStyle = {
        textSizeH1: '',
        textSizeH2: '',
    }

    switch (index) {
        case 0:
            itemStyle.textSizeH1 = '2.5em'
            itemStyle.textSizeH2 = '2.1em'
            return itemStyle
        default:
            itemStyle.textSizeH1 = '0em'
            itemStyle.textSizeH2 = '0em'
            return itemStyle
    }
}

menu.find('.li-links').on('click', function (){
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

section.find('.button-up').on('click', function (){
    const divs = $('section .div-section')

    if (divs.length){
        const divScroll = divs.eq(0)

        $('html, body').animate({
            scrollTop: divScroll.offset().top
        }, 700)
    }
})

$('body').find('.fa-envelope').on('click', function (){ 
    const divs = $('section .div-section')

    if (divs.length){
        const divScroll = divs.eq(4)

        $('html, body').animate({
            scrollTop: divScroll.offset().top + 10
        }, 700)
    }
})

$('body footer').find('.click-email-footer').on('click', function(){
    const divs = $('section .div-section')

    if (divs.length){
        const divScroll = divs.eq(4)

        $('html, body').animate({
            scrollTop: divScroll.offset().top + 10
        }, 700)
    }
})

$('section .div-section-content-t4 .a-contact-send-email').on('click', function (e){
    e.preventDefault()

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
        console.log(`Erro ao enviar e-mail: ${e}`)
    }
})

button_menu_contact.on('click', function(){
    let menu_contact = $('body .article-menu .menu-ul-itens .group-li-contacts')
    let button_status = $('body .article-menu .menu-ul-itens .group-li-items .li-item.expand-socialmedia')

    !menu_contact.hasClass('group-li-contacts-open') ? (menu_contact.addClass('group-li-contacts-open'), button_status.addClass('expand-socialmedia-open')) : (menu_contact.removeClass('group-li-contacts-open'), button_status.removeClass('expand-socialmedia-open'))
})

button_expand_menu.on('click', function(){
    let menu = $('.article-menu')
    let menu_items = $('.article-menu .nav-article-menu')
    let button_status = $('.nav-article-menu .menu-ul-itens .group-li-items .expand-menu')
    let menu_contact = $('body .article-menu .menu-ul-itens .group-li-contacts')

    if (!menu.hasClass('article-menu-expanded')) {
        menu.addClass('article-menu-expanded') 
        menu_items.addClass('nav-article-menu-expanded')
        button_status.addClass('expand-menu-open')
        menu_contact.addClass('group-li-contacts-expanded')

    } else {
        menu.removeClass('article-menu-expanded')
        menu_items.removeClass('nav-article-menu-expanded')
        button_status.removeClass('expand-menu-open')
        menu_contact.removeClass('group-li-contacts-expanded')
    }
})

//THEMER

$('section .div-section-titles .buttons-config .switch-type .input-switch').on('click', function (){
    localStorage.setItem('theme', 'themedark')

    if ($(this).is(':checked')) {
        localStorage.theme = 'themeligther'
        $('section .div-section-titles .buttons-config .switch-type span').toggleClass('fa-moon fa-lightbulb')
        $('section .div-section-titles .buttons-config .switch-type .switch').attr('title', 'Change theme to dark')

    } else {
        localStorage.theme = 'themedark'
        $('section .div-section-titles .buttons-config .switch-type span').toggleClass('fa-lightbulb fa-moon')
        $('section .div-section-titles .buttons-config .switch-type .switch').attr('title', 'Change theme to light')
    }

    Theme()
})

$(document).ready(function(){
    try {
        if(localStorage.theme === 'themeligther') {
            $('section .div-section-titles .buttons-config .switch-type .input-switch').attr('checked', 'checked')
            $('section .div-section-titles .buttons-config .switch-type .switch').attr('title', 'Change theme to dark')
            $('section .div-section-titles .buttons-config .switch-type span').toggleClass('fa-moon fa-lightbulb')

        } else {
            $('section .div-section-titles .buttons-config .switch-type .input-switch').removeAttr('checked', 'checked')
            $('section .div-section-titles .buttons-config .switch-type .switch').attr('title', 'Change theme to light')
        }
    } catch(e) {
        console.log(`Error change theme of page ${e}`)
    }

    Theme()
})

function Theme() {
    localStorage.theme === 'themeligther' ? 
    
    ($('main section .button-up').addClass('button-up-light'),
    $('.nav-article-menu').addClass('nav-article-menu-light'),
    $('section').addClass('section-theme-light'), 
    $('section .div-section-titles .buttons-config .title-switch').addClass('title-switch-light'),
    $('footer').addClass('footer-light'))  

    :

    ($('main section .button-up').removeClass('button-up-light'),
    $('.nav-article-menu').removeClass('nav-article-menu-light'),
    $('section').removeClass('section-theme-light'),
    $('section .div-section-titles .buttons-config .title-switch').removeClass('title-switch-light'),
    $('footer').removeClass('footer-light'))    
}

