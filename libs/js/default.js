//const dynamic_title = $('body main section .div-section-titles h1')

const section = $('section')
const menu = $('main article')

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

                if(scrollTop >= divTop && scrollTop < divBottom){
                    const itemDynamic = itemCssDynamic(index)

                    section.find('.h1-principal').css('font-size', itemDynamic.textSizeH1)
                    section.find('.h2-principal').css('font-size', itemDynamic.textSizeH2)
                
                    menu.find('.li-links').each(function (){
                        let item = $(this)
                        switch (index) {
                            case 1:
                                if (item.hasClass('li1')){
                                    return item.addClass('li-links-dynamic')
                                }
                                break
                            case 2:
                                if (item.hasClass('li2')){
                                    return item.addClass('li-links-dynamic')
                                }
                                break
                            case 3:
                                if (item.hasClass('li3')){
                                    return item.addClass('li-links-dynamic')
                                }
                                break
                            case 4:
                                if (item.hasClass('li4')){
                                    return item.addClass('li-links-dynamic')
                                }
                                break
                            default:
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