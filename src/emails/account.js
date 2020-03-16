const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendWelcomeEmail = (email,name) => {
    sgMail.send({
        to: email,
        from: 'utkarshatre399@gmail.com',
        subject: 'Welcome to the app',
        text: `Welcome to the app, ${name}. Let me know how you get along with app.`
    })
    console.log('mail sent')
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'utkarshatre399@gmail.com',
        subject: 'sorry for the bad experience',
        text: `good bye from the app, ${name}. Let us know where we went wrong`
    })
    console.log('cancelation mail sent')
}
 
module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}
