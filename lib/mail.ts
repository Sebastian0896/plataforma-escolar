// lib/mail.ts
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendResetPasswordEmail(email: string, token: string, nombre: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`

  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'Plataforma Educativa <noreply@mieducacion.edu.do>',
    to: email,
    subject: 'Restablece tu contraseña',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Restablecer contraseña</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2c5f8a; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 24px; background-color: #2c5f8a; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; padding-top: 20px; font-size: 12px; color: #888; }
          .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📚 Plataforma Educativa</h1>
        </div>
        <div class="content">
          <p>Hola <strong>${nombre}</strong>,</p>
          <p>Recibimos una solicitud para restablecer tu contraseña.</p>
          <div style="text-align: center;">
            <a href="${resetUrl}" class="button">Restablecer contraseña</a>
          </div>
          <div class="warning">
            ⚠️ Este enlace expira en <strong>1 hora</strong>.
          </div>
          <p>Si no solicitaste esto, ignora este mensaje.</p>
          <hr />
          <p style="font-size: 12px;">O copia este enlace: ${resetUrl}</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Plataforma Educativa</p>
        </div>
      </body>
      </html>
    `,
  })

  if (error) {
    console.error('Error sending email:', error)
    throw new Error('No se pudo enviar el correo')
  }

  return data
}