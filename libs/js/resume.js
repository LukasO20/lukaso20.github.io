//RESUME PAGE

function DownloadResume(resume_details) {
    return new Promise((resolve, reject) => {
        resolve(resume_details)
    })
}

const resume = $('.resume-page-body main section .div-section-container .download')

resume.on('click', function(){
    
    //Apply modifications to PDF
    let resume_details = {
        main: $('main'),
        section: $('section'),
        article: $('article'),
        sc_div_container: $('.div-section-container')
    }

    resume_details.main.addClass('main-print')
    resume_details.section.addClass('section-print')
    resume_details.article.addClass('article-print')
    resume_details.sc_div_container.addClass('div-section-container-print')

    let TransformContent = () => {
        const articlecontacs_ul = $('.article-contacs')
        articlecontacs_ul.append('<li class="li-item append">Github: /LukasO20</li>')
    } 

    TransformContent()
    
    //Config e Save PDF
    let body_resume = $('.resume-page-body').html()
    let resume_pdf = html2pdf()

    let options = {
        margin: [3.6, 1, 3.5, 0],
        filename: 'Lucas_Oliveira_resume.pdf',
        image: {type: 'jpeg', quality: 0.98},
        html2canvas: {scale: 2},
        jsPDF: {unit: 'em', format: 'a4', orientation: 'portrait'}
    }

    resume_pdf.set(options).from(body_resume).save()

    DownloadResume(resume_details)
    .then(
        resume => (resume.main.removeClass('main-print'), resume.article.removeClass('article-print'),
         resume.sc_div_container.removeClass('div-section-container-print'), resume.section.removeClass('section-print'),
         resume.article.find('.li-item.append').remove())
    )
    .catch(e => console.log(`Download Error: ${e}`))
})

//TRANSLATE (PT-EN)

const button_translate_pt = $('.resume-page-body main section .div-section-container .tl-portuguese-content')

button_translate_pt.on('click', function(){
    button_translate_en.removeClass('tl-english-content-active')
    $(this).toggleClass('tl-portuguese-content-active')
    ContentLanguageJSON(ptbr = true, en = false)
})

const button_translate_en = $('.resume-page-body main section .div-section-container .tl-english-content')

button_translate_en.on('click', function (){
    button_translate_pt.removeClass('tl-portuguese-content-active')
    $(this).toggleClass('tl-english-content-active')
    ContentLanguageJSON(ptbr = false, en = true)
})

function ContentLanguageJSON (ptbr = undefined, en = undefined) {    

    const article = $('article')
    const section = $('section')
    let type_resume_content = ''
    
    ptbr === true ? type_resume_content = 'resume_portuguese' : undefined 
    en === true ? type_resume_content = 'resume_english' : undefined 

    //LOAD TRANSLATE CONTENT
    $.getJSON(`/libs/json/${type_resume_content}.json`, function (data) {  

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