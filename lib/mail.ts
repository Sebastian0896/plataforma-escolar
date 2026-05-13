// lib/mail.ts
import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true para 465, false para otros
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export const sendResetPasswordEmail = async (email: string, token: string, nombre: string) => {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Restablecer contraseña</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #1e3a5f 0%, #2c5f8a 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 0 0 10px 10px;
          border: 1px solid #e0e0e0;
          border-top: none;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #2c5f8a;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          padding-top: 20px;
          font-size: 12px;
          color: #888;
        }
        .warning {
          background-color: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 12px;
          margin: 15px 0;
          font-size: 13px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>📚 Plataforma Educativa</h1>
        <p>Restablecimiento de contraseña</p>
      </div>
      <div class="content">
        <p>Hola <strong>${nombre}</strong>,</p>
        <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
        <p>Si fuiste tú, haz clic en el siguiente botón para crear una nueva contraseña:</p>
        <div style="text-align: center;">
          <a href="${resetUrl}" class="button" style="color: white;">Restablecer contraseña</a>
        </div>
        <div class="warning">
          ⚠️ Este enlace expirará en <strong>1 hora</strong> por razones de seguridad.
        </div>
        <p>Si no solicitaste este cambio, puedes ignorar este mensaje. Tu contraseña actual seguirá siendo válida.</p>
        <hr />
        <p style="font-size: 14px;">Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
        <p style="font-size: 12px; word-break: break-all; color: #666;">${resetUrl}</p>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Plataforma Educativa. Todos los derechos reservados.</p>
        <p>Este es un mensaje automático, por favor no responder a este correo.</p>
      </div>
    </body>
    </html>
  `

  const textContent = `
    Restablecimiento de contraseña - Plataforma Educativa

    Hola ${nombre},

    Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.

    Si fuiste tú, accede al siguiente enlace para crear una nueva contraseña:
    ${resetUrl}

    Este enlace expirará en 1 hora por razones de seguridad.

    Si no solicitaste este cambio, puedes ignorar este mensaje.
  `

  await transporter.sendMail({
    from: process.env.SMTP_FROM || `"Plataforma Educativa" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Restablece tu contraseña - Plataforma Educativa',
    text: textContent,
    html: htmlContent,
  })
}