import { createTransport } from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'

const port = 9055
const { SMTP_SERVER, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_TO } = process.env

const smtpTransport = createTransport(<SMTPTransport.Options>{
  host: SMTP_SERVER ?? 'smtp.ethereal.email',
  port: SMTP_PORT ?? 587,
  secure: Number(SMTP_PORT) == 465, // true for port 465, false for other ports
  auth: {
    user: SMTP_USER ?? 'myra.steuber@ethereal.email', // generated ethereal user
    pass: SMTP_PASS ?? 'MxMDMzTPRzDgFPyqJ2', // generated ethereal password
  },
})

function parseBody(body: ReadableStream<Uint8Array> | string): Promise<string> {
  if (typeof body === 'string') {
    return Promise.resolve(body)
  }

  let text = ''
  const reader = body.getReader()

  return new Promise<string>((resolve, reject) => {
    function read() {
      reader
        .read()
        .then(({ done, value }) => {
          if (done) {
            resolve(text)
            return
          }
          text += new TextDecoder().decode(value)
          read()
        })
        .catch(reject)
    }
    read()
  })
}

Bun.serve({
  hostname: '0.0.0.0',
  port,
  async fetch(request) {
    if (request.body && request.body.length > 1024 * 1024) {
      return new Response('Payload Too Large', { status: 413 })
    }

    const body = request.body ? await parseBody(request.body) : '{}'
    const jsonBody = JSON.parse(body)

    const url = new URL(request.url)

    if (url.pathname === '/send_mail') {
      const { name, email, subject, message } = jsonBody

      await smtpTransport.sendMail({
        from: `"${name}" <${email}>`,
        to: SMTP_TO,
        subject: `[Contact Me] ${subject}`,
        text: message,
      })

      return new Response('Email Sent', { status: 200 })
    }

    return new Response('Not Found', { status: 404 })
  },
})

console.log(`Server running at http://0.0.0.0:${port}`)
