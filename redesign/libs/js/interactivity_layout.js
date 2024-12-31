const createMessage = ({ elementCreate, elementTarget, elementClass = '', text = '', visibility = null, add = null, remove = null } = {}) => {

    const multipleValidation = 
    (typeof elementTarget !== 'string' && !Array.isArray(elementTarget)) || 
    (Array.isArray(elementTarget) && elementTarget.some(item => typeof item !== 'string' || item === '')) || 
    (typeof elementTarget === 'string' && elementTarget === '')

    if (add) {
        if (typeof elementCreate !== 'string' || elementCreate === '') {
            return console.error('Parameter "element" needs to be a non-empty string to create elements...')
        }  
        if (multipleValidation) {
            return console.error('Parameter "elementTarget" needs to be a non-empty string...')
        }
        if (!elementTarget.startsWith('#') && !elementTarget.startsWith('.')) {
            return console.error('Parameter "elementTarget" should be an ID (starting with "#") or a class (starting with ".")')
        }    
    }

    const container = document.querySelector('.container')
    const popupmessage = document.createElement(elementCreate)
    popupmessage.textContent = text

    if (Array.isArray(elementClass)) {
        popupmessage.classList.add(...elementClass)
    } else if (elementClass) {
        popupmessage.classList.add(elementClass)
    }

    if (add) {
        container.querySelector(elementTarget).appendChild(popupmessage)
    } else if (remove) {
        if (multipleValidation) {
            return console.error('Parameter "elementTarget" needs especificed to remove an element')
        }

        if (Array.isArray(elementTarget)) {
            elementTarget.forEach(item => {
                const remove = container.querySelector(item)
                console.log('ITEM TO REMOVE', remove ? true : false, ': ', remove)
                //if (remove) { container.removeChild(remove) }
            })
        } else if (elementClass) {
           // container.removeChild(elementTarget)
        }
    }
}

export { createMessage }