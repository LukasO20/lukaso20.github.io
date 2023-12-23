//const dynamic_title = $('body main section .div-section-titles h1')

const section = $('section')
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
                    const divDynamic = getDivPosition(index)
                    section.find('.h2-principal').text(divDynamic)
                }
            })  
        }
    }
})

function getDivPosition(index) {
    switch (index) {
        case 1:
            return 'About me'
        case 2:
            return 'My skills'
        case 3:
            return 'My works'
        case 4:
            return 'Contact'
        default: 
            return "I'm a web developer"
    }
}