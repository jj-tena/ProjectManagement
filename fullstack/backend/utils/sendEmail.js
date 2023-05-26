import nodemailer from 'nodemailer'

export const emailRegister = async (data) => {
    const {name, email, token} = data;
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "389f82a85566fa",
            pass: "fb129b43072fe9"
        }
    });
    const info = await transport.sendMail({
        from: 'ProjectManagement',
        to: email,
        subject: 'ProjectManagement - Confirma tu cuenta',
        text: 'Confirma tu cuenta en ProjectManagement',
        html: `
        <p>Hola ${name} confirma tu cuenta en ProjectManagement</p>
        <p>Tu cuenta está casi lista, solo tienes que confirmarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/verify/${token}">Confirmar cuenta</a>
        <p>Si no creaste esta cuenta puedes ignorar el mensaje</p>
        `
    })
}