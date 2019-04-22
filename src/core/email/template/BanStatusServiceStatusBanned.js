import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import { url, sitename } from '../../../config';

class BanStatusServiceStatusBanned extends React.Component {

    static propTypes = {
        content: PropTypes.shape({
            userMail: PropTypes.string.isRequired,
        }).isRequired
    };

    render() {
        const buttonStyle = {
            margin: 0,
            fontFamily: 'Arial',
            padding: '10px 16px',
            textDecoration: 'none',
            borderRadius: '2px',
            border: '1px solid',
            textAlign: 'center',
            verticalAlign: 'middle',
            fontWeight: 'normal',
            fontSize: '18px',
            whiteSpace: 'nowrap',
            background: '#ffffff',
            borderColor: '#ff5a5f',
            backgroundColor: '#ff5a5f',
            color: '#ffffff',
            borderTopWidth: '1px',
        };

        const linkText = {
            color: '#ff5a5f',
            fontSize: '16px',
            textDecoration: 'none',
            cursor: 'pointer',
        }

        const textStyle = {
            color: '#484848',
            backgroundColor: '#F7F7F7',
            fontFamily: 'Arial',
            fontSize: '16px',
            padding: '35px'
        };
        const { content: { userName, userMail, adminMail } } = this.props;
        let mailTo = 'mailto:' + adminMail;

        return (
            <Layout>
                <Header color="rgb(255, 90, 95)" backgroundColor="#F7F7F7" />
                <Body textStyle={textStyle}>
                    <div>
                        Dear {userName},
                    </div>
                    <EmptySpace height={20} />
                    <div>
                        You are banned.
                                 	</div>
                    <EmptySpace height={20} />
                    <div>
                        Please get in touch with <a href={mailTo}>{adminMail}</a> if you have any questions.
					        		</div>
                    <EmptySpace height={40} />
                    <div>
                        Regards, <br />
                        The {sitename} Team
					        		</div>

                </Body>
                <Footer />
                <EmptySpace height={20} />
            </Layout>
        );
    }

}

export default BanStatusServiceStatusBanned;