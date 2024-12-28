import { createMessage } from '../../libs/js/interactivity_layout.js'
const API_URL = 'http://localhost:5000'

const sendEmail = async (form, element) => {
    try {
        const response = await fetch(`${API_URL}/email_provider/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to send e-mail.')
        }
        
        const data = await response.json()
        createMessage({elementCreate: 'label', elementTarget: '#emailForm', text: 'Message sent with successful!', add: true})
        return data

    } catch (error) {
        console.error('Server connection failed: ', error.message)
        throw error
    }
}

export { sendEmail }