const nodemailer = require("nodemailer");
require("dotenv").config();

// Config para onde será enviado
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  connectionTimeout: process.env.EMAIL_TIMEOUT,
  ignoreTLS: true,
});

async function sendMfa(email, cod) {
  await transporter.sendMail({
    from: '"Contato TodoList" <contato@todolist.com.br>',
    to: email,
    subject: "Código de Validação",
    text: "Código: #",
    html: `<!DOCTYPE html>
<html>

<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">

    <div style="background-color: #347928; color: #ffffff; text-align: center; padding: 15px; font-size: 24px;">
      Código de Verificação
    </div>
  
    <div style="padding: 20px; color: #333333; line-height: 1.5; font-size: 16px;">
      <p style="margin: 0 0 10px;">Olá,</p>
      <p style="margin: 0 0 20px;">Seu código de verificação já está disponível!</p>
      <div style="font-size: 24px; font-weight: bold; color: #347928; text-align: center; margin: 20px 0;">
      ${cod}
      </div>

      <p style="margin: 0 0 10px;">Use este código para continuar o processo. Ele expira em 10 minutos.</p>
    </div>

    <div style="text-align: center; margin-top: 20px; padding: 10px; font-size: 12px; color: #888888;">
      Obrigado por usar nosso serviço!
    </div>
  </div>
</body>

</html>`,
  });
}
module.exports = sendMfa;
