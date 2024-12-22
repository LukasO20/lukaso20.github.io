const apiURL = process.env.test || 'http://localhost:5000'

export const sendEmail = async(form) => {
    try {
        const response = await fetch(`${apiURL}/api/email_provider/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to send e-mail.')
        }
        
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error to send e-mail: ', error.meessage)
        throw error
    }
}