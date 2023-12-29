const section = $('section')
const menu = $('main article')
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

$('section .div-section-content-t4 .a-contact-send-email').on('click', function (e){
    e.preventDefault()
    try {
        let name = contentEmail.find('input[name="name"]').val()
        let email = contentEmail.find('input[name="email"]').val()
        let message = contentEmail.find('textarea[name="message"]').val()

        if (name !== '' || email !== '' || message !== '') {
            //sendEmail.submit()
            console.log('WOW, TUDO CERTO!!')
            console.log(name)
            console.log(email)
            console.log(message)
        } else {
            console.log('OPS, TUDO ERRADO!!')
        }
    } catch (e) {
        console.log(`Erro ao enviar e-mail: ${e}`)
    }
})