import fetch from 'node-fetch'

const send = async (req, res) => {
    if (req.method === 'POST') {
        try {

            const { name, email, message } = req.body
            if (!name || !email || !message) {
                return res.status(400).json({ error: `It's necessary fill out all te fields.`})
            }

            const apiKey = process.env.MAILGUN_API_KEY
            const domain = process.env.MAILGUN_DOMAIN
            const recipientEmail = process.env.RECIPIENT_EMAIL
       
            const maingunURL = `https://api.mailgun.net/v3/${domain}/messages`

            const data = new URLSearchParams()
            data.append('from', `${name} <${email}>`)
            data.append('to', recipientEmail)
            data.append('subject', `Lucas ${name} want to talk to you :) (github profile pages)`)
            data.append(
                'text', 
                `You received a new message from:\n\nName: ${name}\nE-mail: ${email}\n\nMessage:\n${message}
                `)
       
            const response = await fetch(maingunURL, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`,
                    'Content-Type': 'application/x-www-form-urlencoded', 
                },
                body: data
            })
            
            if (response.ok) {
                res.status(200).json({ message: 'E-mail sended with successfull!' })
            } else {
                const errorData = await response.json()
                res.status(500).json({ error: errorData.message || 'Error to send e-mail, try again!'})
            }
        } 
        catch (error) {
            console.error('Something was wrong to send e-mail: ', error)
            res.status(500).json({ success: false, error: error.message })
        }

    } else {
        return req.status(405).json({ error: 'Method not allowed. Check the type of method sended'})
    }
} 

export { send }