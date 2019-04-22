import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import {url, sitename} from '../../../config';

class ConfirmEmail extends React.Component {

  static propTypes = {
    content: PropTypes.shape({
      token: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
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
      fontSize:'18px',
      whiteSpace: 'nowrap',
      background: '#ffffff',
      borderColor: '#ff5a5f',
      backgroundColor: '#ff5a5f',
      color: '#ffffff',
      borderTopWidth: '1px',
    }; 

    const textStyle = {
      color: '#484848',
      backgroundColor: '#F7F7F7',
      fontFamily: 'Arial',
      fontSize: '16px',
      padding:'35px'
    };
    const { content: {token, email, name} } = this.props;
    let verificationURL = url + `/user/verification?confirm=${token}&email=${email}`;

    return (
      <Layout>
        <Header color="rgb(255, 90, 95)" backgroundColor="#F7F7F7" />
        <Body textStyle={textStyle}>
          <div>
            Hi {name},
          </div>
          <EmptySpace height={20} />
          <div>
            Welcome to {sitename}! In order to get started, you need to confirm your email address.
          </div>
          <EmptySpace height={40} />
          <div>
            <a style={buttonStyle} href={verificationURL}>Confirm your email</a>
          </div>
          <EmptySpace height={30} />
          <div>
            Thanks, <br />
            The {sitename} Team
          </div>
        </Body>
        <Footer />
        <EmptySpace height={20} />
      </Layout>
    );
  }

}

export default ConfirmEmail;