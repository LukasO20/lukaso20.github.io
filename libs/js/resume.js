// -- RESUME FUNCTIONS --
const resume = $('.resume-page-body .download')

resume.on('click', function(){
    DownloadArchive()
})

function DownloadArchive () {
    const link = document.createElement('a')
    const language = LanguageLocalStorage(undefined, 'getLanguage', false)
    link.href = `../libs/doc/${language === 'pt' ? 'resumept.pdf' : 'resumeen.pdf'}`
    link.download = 'Lucas_Oliveira_resume'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

function LanguageLocalStorage (e, nameCallOnly, callAllStatus) {

    const action = {
        setLanguage: (typeButton) => {
            if (typeButton !== undefined) {
                typeButton.hasClass('pt') ? localStorage.setItem('languageResume', 'pt') : localStorage.setItem('languageResume', 'en')
            }
        },
        getLanguage: () => {
            if (localStorage.languageResume === undefined) {
                localStorage.setItem('languageResume', 'pt')
            }

            const language = localStorage.languageResume
            $('.button-translate').removeClass('active')
            
            if (language === 'pt') {
                ContentLanguageJSON(ptbr = true, en = false)
                $(`.button-translate.${language}`).addClass('active')
            }
            else {
                ContentLanguageJSON(ptbr = false, en = true)
                $(`.button-translate.${language}`).addClass('active')
            }

            return language
        }
    }

    const callOnly = (namef) => {
        if (e === undefined && namef === 'getLanguage') {
            return action.getLanguage()
        }
        else if (action[namef]) {  action[namef](e) }
    }

    const callAll = () => {
        action.setLanguage(e)
        action.getLanguage()
    }

    if (nameCallOnly) { return callOnly(nameCallOnly) }
    if (callAllStatus) { return callAll() }
}
LanguageLocalStorage(undefined, 'getLanguage', false)

//TRANSLATE (PT-EN)
const buttonTranslate = $('.button-translate')

buttonTranslate.on('click', function () {
    //change activity
    $(this).parent().find('.button-translate').removeClass('active') 
    $(this).toggleClass('active')

    //Change language content
    const typeButton = $(this)
    typeButton.hasClass('pt') ? ContentLanguageJSON(ptbr = true, en = false)
        : ContentLanguageJSON(ptbr = false, en = true)

    LanguageLocalStorage(typeButton, 'setLanguage', false)
})

function ContentLanguageJSON (ptbr = undefined, en = undefined) {    

    const article = $('article')
    const section = $('section')
    let typeResumeContent = ''
    
    ptbr === true ? typeResumeContent = 'resume_portuguese' : undefined 
    en === true ? typeResumeContent = 'resume_english' : undefined 

    //LOAD TRANSLATE CONTENT
    $.getJSON(`/libs/json/${typeResumeContent}.json`, function (data) {  

        const article_navegate = () => {    
            article.find('.chld-h3').eq(0).text(data.Article.chld_h3[0])
            article.find('.chld-h3').eq(1).text(data.Article.chld_h3[1])
            article.find('.chld-h3').eq(2).text(data.Article.chld_h3[2])

            article.find('.chld-li').eq(0).text(data.Article.chld_li[0])
            article.find('.chld-li').eq(1).text(data.Article.chld_li[1])

            article.find('.chld-p').eq(0).text(data.Article.chld_p)
        }
        article_navegate()

        const section_navegate = () => {
            section.find('.div-section-head .chld-h1').text(data.Section.Head.chld_h1)
            section.find('.div-section-head .chld-h2').text(data.Section.Head.chld_h2)
            section.find('.div-section-head .chld-p').text(data.Section.Head.chld_p)

            section.find('.div-section-body .chld-h3').eq(0).text(data.Section.Body.chld_h3[0])
            section.find('.div-section-body .chld-h3').eq(1).text(data.Section.Body.chld_h3[1])
            section.find('.div-section-body .chld-h3').eq(2).text(data.Section.Body.chld_h3[2])

            section.find('.div-section-body .chld-h4').eq(0).text(data.Section.Body.chld_h4[0])
            section.find('.div-section-body .chld-h4').eq(1).text(data.Section.Body.chld_h4[1])
            section.find('.div-section-body .chld-h4').eq(2).text(data.Section.Body.chld_h4[2])
            section.find('.div-section-body .chld-h4').eq(3).text(data.Section.Body.chld_h4[3])

            section.find('.div-section-body .chld-p-lv1').eq(0).text(data.Section.Body.chld_p_lv1[0])
            section.find('.div-section-body .chld-p-lv1').eq(1).text(data.Section.Body.chld_p_lv1[1])
            section.find('.div-section-body .chld-p-lv1').eq(2).text(data.Section.Body.chld_p_lv1[2])
            section.find('.div-section-body .chld-p-lv1').eq(3).text(data.Section.Body.chld_p_lv1[3])

            section.find('.div-section-body .chld-p-lv2').eq(0).text(data.Section.Body.chld_p_lv2[0])
            section.find('.div-section-body .chld-p-lv2').eq(1).text(data.Section.Body.chld_p_lv2[1])
            section.find('.div-section-body .chld-p-lv2').eq(2).text(data.Section.Body.chld_p_lv2[2])
            section.find('.div-section-body .chld-p-lv2').eq(3).text(data.Section.Body.chld_p_lv2[3])
            section.find('.div-section-body .chld-p-lv2').eq(4).text(data.Section.Body.chld_p_lv2[4])
            section.find('.div-section-body .chld-p-lv2').eq(5).text(data.Section.Body.chld_p_lv2[5])
            section.find('.div-section-body .chld-p-lv2').eq(6).text(data.Section.Body.chld_p_lv2[6])

            section.find('.div-section-body .chld-label').eq(0).text(data.Section.Body.chld_label[0])
            section.find('.div-section-body .chld-label').eq(1).text(data.Section.Body.chld_label[1])
        }
        section_navegate()
    })
}