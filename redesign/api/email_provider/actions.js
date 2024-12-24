let apiURL = ''

const fetchConfig = async () => {
    const response = await fetch('/config')
    const config = await response.json()
    api = config.apiURL
}

await fetchConfig()

const sendEmail = async (form, e) => {
    try {
        const response = await fetch(`${apiURL}/api/email_provider/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        })

        if (!response.ok) {
            const error = await response.json()
            //e.textContent = 'Ops something wrong to send e-mail, try again.'
            throw new Error(error.error || 'Failed to send e-mail.')
        }
        
        const data = await response.json()
        //e.textContent = 'Message sent with successful!'
        return data

    } catch (error) {
        console.error('Server connection failed: ', error.message)
        throw error
    }
}

export { sendEmail }