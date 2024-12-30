const createMessage = ({ elementCreate, elementTarget, elementClass = '', text = '', visibility = null, add = null, remove = null } = {}) => {

    if (typeof elementCreate !== 'string' || elementCreate === '') {
        return console.error('Parameter "element" needs to be a non-empty string to create elements...');
    }  
    if (typeof elementTarget !== 'string' || elementTarget === '') {
        return console.error('Parameter "elementTarget" needs to be a non-empty string...');
    }
    if (!elementTarget.startsWith('#') && !elementTarget.startsWith('.')) {
        return console.error('Parameter "elementTarget" should be an ID (starting with "#") or a class (starting with ".")');
    }

    const container = document.querySelector('.container')
    const popupmessage = document.createElement(elementCreate)

    popupmessage.textContent = text
    popupmessage.classList.add(elementClass)

    if (add) {
        container.querySelector(elementTarget).appendChild(popupmessage)
    } else if (remove) {
        if (typeof elementTarget !== 'string' || elementTarget === '') {
            return console.error('Parameter "elementTarget" needs especificed to remove an element');
        }
        container.removeChild(elementTarget)
    }
}

export { createMessage }