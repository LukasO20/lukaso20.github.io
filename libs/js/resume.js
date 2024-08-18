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
    //Change activity
    $(this).parent().find('.button-translate').removeClass('active') 
    $(this).toggleClass('active')

    //Change language content
    const typeButton = $(this)
    typeButton.hasClass('pt') ? ContentLanguageJSON(ptbr = true, en = false)
        : ContentLanguageJSON(ptbr = false, en = true)

    LanguageLocalStorage(typeButton, 'setLanguage', false)
})

function ContentLanguageJSON (ptbr = undefined, en = undefined) {    
    let typearchive = ''
    
    ptbr === true ? typearchive = 'resume_portuguese' : undefined 
    en === true ? typearchive = 'resume_english' : undefined 

    //LOAD TRANSLATE CONTENT
    $.getJSON(`/libs/json/${typearchive}.json`, function (data) {  

        //Structure base
        const structureAction = (selector, item, i) => $(selector).eq(i).html(item)
             
        const createArticleContent = (data) => {   
            const selectorMap = {
                //key (object json), values(selector html to jquery)
                'titles': 'article h3',
                'others': 'article .chld-li',
                'contacts': 'article .article-contacs li:nth-of-type(2)',
                'last_p': 'article .article-country'
            }

            const actions = {
                //return values according index e selector from 'selectorMap'
                titles: structureAction,
                others: structureAction,
                contacts: structureAction,
                last_p: structureAction
            } 

            apply(selectorMap, actions, data.Article)
        }
        const createSectionContent = (data) => {
            const selectorMap = {
                //key (object json), values(selector html to jquery)
                'titles_h2': 'section h2',
                'titles_h3': 'section h3',
                'titles_h4': 'section h4',
                'p_section': '.chld-p-lv1',
                'li_section': 'section li > p',
                'label_section': 'section label'
            } 

            const actions = {
                //return values according index e selector from 'selectorMap'
                titles_h2: structureAction,
                titles_h3: structureAction,
                titles_h4: structureAction,
                p_section: structureAction,
                li_section: structureAction,
                label_section: structureAction
            } 

            apply(selectorMap, actions, data.Section)
        }

        //Apply content
        const apply = (map, objectReference, objectJson) => {
            Object.entries(objectJson).forEach(([keyJson, contentJson]) => {
                const selector = map[keyJson]
                if (selector) {
                    contentJson.forEach((item, i) => {
                        objectReference[keyJson]?.(selector, item, i)
                    })  
                }
            })
        }

        //data
        const content = data
        createArticleContent(content)
        createSectionContent(content)
    })
}