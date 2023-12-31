const section = $('section')
const menu = $('article')
const sendEmail = $('section .form-email')
const contentEmail = $('section .form-email .div-contact-content-email')



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
                                section.find('.button-up').css('opacity', '0')
                                if (item.hasClass('li1')){
                                    return item.addClass('li-links-dynamic')
                                }
                                break
                            case 2:
                                section.find('.button-up').css('opacity', '1')
                                if (item.hasClass('li2')){
                                    return item.addClass('li-links-dynamic')
                                }
                                break
                            case 3:
                                section.find('.button-up').css('opacity', '1')
                                if (item.hasClass('li3')){
                                    return item.addClass('li-links-dynamic')
                                }
                                break
                            case 4:
                                section.find('.button-up').css('opacity', '1')
                                if (item.hasClass('li4')){
                                    return item.addClass('li-links-dynamic')
                                }
                                break
                            default:
                                section.find('.button-up').css('opacity', '0')
                                return item.removeClass('li-links-dynamic')       
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
                            scrollTop: divs.eq(index).offset().top + 10
                        }, 700)
                    }
                    break
                case 'li3':
                    if (index === 3) {
                        return $('html, body').animate({
                            scrollTop: divs.eq(index).offset().top + 10
                        }, 700)
                    }
                    break
                case 'li4':
                    if (index === 4) {
                        return $('html, body').animate({
                            scrollTop: divs.eq(index).offset().top + 10
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
        const divScroll = divs.eq(1)

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