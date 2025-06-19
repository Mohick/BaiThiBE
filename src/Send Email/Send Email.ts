import emailjs from '@emailjs/nodejs';

const sendEmail = async (templateFrom: {
    toEmail: string,
    titleEmail: string,
    messageEmail: string
}) => {
    const emailjsConfig = {
        publicKey: process.env.EMAILJS_PUBLIC_KEY as string,
        privateKey: process.env.EMAILJS_PRIVATE_KEY as string
    }
    emailjs.send(process.env.EMAILJS_SERVICE_ID as string, process.env.EMAILJS_TEMPLATE_ID as string, templateFrom, emailjsConfig)
}


export {
    sendEmail
}