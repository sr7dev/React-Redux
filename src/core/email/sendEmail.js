import React from 'react';
import Oy from 'oy-vey';
import { IntlProvider } from 'react-intl';
import fetch from '../fetch';
import EmailTemplate from './template/EmailTemplate';
import {emailConfig} from '../../config';
import {getSubject} from './template/subjects';

export async function sendEmail(to, type, content) {
        let from = emailConfig.sender + '<' + emailConfig.email + '>';
        let html, subject, previewText;
        let subjectData = getSubject(type);
        html = Oy.renderTemplate(
            <IntlProvider locale={"en"}>
                <EmailTemplate type={type} content={content}  /> 
            </IntlProvider>,{
            title: subjectData.subject,
            previewText: subjectData.previewText
        });
        
        let mailOptions = {
            from,
            to, // list of receivers
            subject: subjectData.subject, // Subject line
            //text: textMessage, // plain text body
            html
        };
        const resp = await fetch('/sendEmail', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mailOptions}),
            credentials: 'include'
        });
        const { status, response } = await resp.json();
        return { status, response };
} 
