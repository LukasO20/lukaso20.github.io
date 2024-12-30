import { createMessage } from '../../libs/js/interactivity_layout.js'
const API_URL = 'http://localhost:5000'

const sendEmail = async (form) => {
    try {
        const response = await fetch(`${API_URL}/email_provider/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        })

        let messageResult = ''

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to send e-mail.')
        }
        
        const data = await response.json()
        messageResult = typeof data.message === 'string' ? data.message : 'Successfull!'
        createMessage({elementCreate: 'label', elementTarget: '#emailForm', elementClass: 'message-pop-up valid', text: `${messageResult}`, add: true})
        return data

    } catch (error) {
        console.error('Server connection failed: ', error.message)
        throw error
    }
}

export { sendEmail }