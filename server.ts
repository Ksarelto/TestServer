import express, { Express, Request, Response } from 'express'
import nodemailer from 'nodemailer'
import { SMTPClient } from 'emailjs';
import cors from 'cors'

const app: Express = express()
const port = 8085

interface IEmailFormData {
  email: string;
  password: string;
  emailTo: string;
  subject: string;
  text: string
}

const sendEmail = async (formData: IEmailFormData) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: formData.email,
      pass: formData.password //for gmail 'ablbytncxahkebbu'
    }
  })

  transporter.sendMail({
    from: formData.email,
    to: formData.emailTo,
    subject: formData.subject,
    text: formData.text
  }, (err, info) => {
    console.log(err)
    console.log(info)
  })
}


app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.post('/', async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    sendEmail(req.body as IEmailFormData)
    res.send('Got it')
  } catch (err) {
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
