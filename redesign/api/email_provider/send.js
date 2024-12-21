const mailgun = require('mailgun.js')
const formData = require('form-data')

const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
    url: 'https://api.mailgun.net'
})

const sendMail = async (req, res) => {
    try {
        mg.messages.create('domainhere', form)
            .then(response => {
                console.log('E-mail sended with successfull!')
            })
    } 
    catch (error) {
        console.error('Something was wrong to send e-mail: ', error)
        res.status(500).json({ success: false, error: error.message })
    }
} 

module.exports = { sendMail }