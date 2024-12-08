import nodemailer from 'nodemailer'

export default async function handler(reqs, res) {
    if (reqs.method === 'POST') {
        const { name, email, message } = req.body

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                
            }
        })

        try {
            await transporter.sendMail({
                from: email,
                to: 'lukinhaso22@gmail.com',
                subject: `Let's contact? From lukaso github page`,
                text: `Name: ${name}\nMensagem: ${message}`
            })
            res.status(200).json({ message: 'Email sended with success!'})
        } catch (error) {
            res.status(500).json({ error: `Error to send email: ${error.message}`})
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Ops something got wrong: Method ${req.method} Not Allowed`)
    }
}