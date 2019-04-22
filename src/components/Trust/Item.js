import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Button, Row, Col, Panel} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Trust.css';
import Loader from '../Loader';

class Item extends Component {
    static propTypes = {
       title: PropTypes.string.isRequired,
       content: PropTypes.string.isRequired,
       handleClick: PropTypes.func,
       isAction: PropTypes.bool,
       buttonLabel: PropTypes.string,
       url: PropTypes.string,
       isLink: PropTypes.bool,
       show: PropTypes.bool,
    };
    render () {
        const { title, content, handleClick, isAction, buttonLabel, url, isLink, show } = this.props;
        return (
            <li className={cx(s.space4, "clearfix")}>
                <h4>{title}</h4>
                <Row>
                    <Col xs={12} sm={7} md={7} lg={7}>
                        <p className={s.description}>{content}</p>
                    </Col>
                    {
                        isAction && isLink && <Col xs={12} sm={5} md={5} lg={5}>
                            <a 
                                className={cx(s.button, s.btnPrimaryBorder, s.btnlarge)}
                                href={url}
                            >
                                {buttonLabel}
                            </a>
                        </Col>
                    }

                    {
                        isAction && !isLink && <Col xs={12} sm={5} md={5} lg={5}>
                            <Loader 
                                type={"button"} 
                                className={cx(s.button, s.btnPrimaryBorder, s.btnlarge)}
                                handleClick={handleClick}
                                show={show}
                                label={buttonLabel}
                                spinnerColor={"#ff5a5f"}
                            />
                        </Col>
                    }
                </Row>
            </li>
        )
    }
}
export default withStyles(s)(Item);
