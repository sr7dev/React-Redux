'use strict';
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
import {emailConfig} from '../../config';

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.email,
        pass: emailConfig.password
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: emailConfig.tls
    }
}));

const sendEmail = (app) => {

    app.post('/sendEmail', function (req, res, next) {
        let mailOptions = req.body.mailOptions;
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.send({status: 400, response: error});
            }
            res.send({status: 200, response: 'email send successfully'});
        });
    });

};

export default sendEmail;  