const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const MailShema = new Shema({
    name: String,
    email: String,
    phone: String,
    comment: String,
    dreceived: String,
    dprocessed: String,
    subject: {
        type: String,
        default: 'Solicitud de datos'    
    }
});

module.exports = mongoose.model('mail', MailShema);