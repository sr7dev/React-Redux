import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from '../Link';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Logo.css';

class Logo extends Component {
    static propTypes = {
        siteName: PropTypes.string.isRequired,
        logoImage: PropTypes.string,
        link: PropTypes.string,
        className: PropTypes.string,
        logoHeight: PropTypes.string,
        logoWidth: PropTypes.string, 
    };

    static defaultProps = {
    	siteName: null,
    	logoImage: null,
    	link: '/',
        logoHeight: '34',
        logoWidth: '34'
    }

    render() {
    	const { siteName, logoImage, link, className, logoHeight, logoWidth } = this.props;
    	return (
    		<Link to={link} className={className}>
    			{
    				logoImage != null && <img src={"/images/logo/" + logoImage} height={logoHeight} width={logoWidth} />
    			}
    			{
    				logoImage === null && siteName != null && <span className={s.logoColor}>{siteName}</span>
    			}
    			{
    				logoImage === null && siteName === null && <span className={s.logoColor}>Site Name</span>
    			}
            </Link>
        );
    }
}

const mapState = (state) => ({
	siteName: state.siteSettings.data.siteName,
	logoImage: state.siteSettings.data.Logo,
    logoHeight: state.siteSettings.data.logoHeight,
    logoWidth: state.siteSettings.data.logoWidth,
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(Logo));
