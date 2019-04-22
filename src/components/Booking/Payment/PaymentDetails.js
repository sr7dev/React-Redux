import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

import {
  Button,
  Form,
  Grid,
  Row, FormGroup,
  Col,
  ControlLabel,
  FormControl,
  FieldGroup,
  Panel,
  Label,
} from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import logoUrl from './logo-small.jpg';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';

// Component
import CurrencyConverter from '../../CurrencyConverter';

// Locale
import messages from '../../../locale/messages';

class PaymentDetails extends Component {
    static propTypes = {
    	basePrice: PropTypes.number.isRequired,
	    cleaningPrice: PropTypes.number,
	    currency: PropTypes.string.isRequired,
      dayDifference: PropTypes.number.isRequired,
      discount: PropTypes.number,
      discountType: PropTypes.string,
      priceForDays: PropTypes.number.isRequired,
      serviceFees: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      formatMessage: PropTypes.func,
    };

    render() {
        const { basePrice, cleaningPrice, currency, dayDifference } = this.props;
        const { priceForDays, serviceFees, discount, discountType, total } = this.props;
        const { formatMessage } = this.props.intl;
      
        return (
            <div>
            	<div>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <table className={cx('table')}>
                        <tbody>
                          <tr className={s.tableText}>
                            <td className={cx(s.noBorder)}>
                              <span>
                                <CurrencyConverter
                                  amount={basePrice}
                                  from={currency}
                                /> 
                              </span>
                              <span>  
                                x {dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
                              </span>
                            </td>
                            <td className={cx(s.noBorder, 'text-right')}>
                              <span>
                                <CurrencyConverter
                                  amount={priceForDays}
                                  from={currency}
                                /> 
                              </span>
                            </td>
                          </tr>
                          {
                            cleaningPrice > 0 && <tr className={s.tableText}>
                              <td className={cx(s.noBorder)}><FormattedMessage {...messages.cleaningFee} /></td>
                              <td className={cx(s.noBorder, 'text-right')}>
                                <span>
                                  <CurrencyConverter
                                    amount={cleaningPrice}
                                    from={currency}
                                  /> 
                                </span>
                              </td>
                            </tr>
                          }                          
                          {
                            serviceFees > 0 && <tr className={s.tableText}>
                            <td className={cx(s.noBorder)}><FormattedMessage {...messages.serviceFee} /></td>
                            <td className={cx(s.noBorder, 'text-right')}>
                              <span>
                                <CurrencyConverter
                                  amount={serviceFees}
                                  from={currency}
                                /> 
                              </span>
                            </td>
                          </tr>
                          }
                          {
                            discount > 0 &&  <tr className={s.tableText}>
                              <td className={cx(s.noBorder)}>{discountType}</td>
                              <td className={cx(s.noBorder, 'text-right')}>
                                - <span>
                                  <CurrencyConverter
                                    amount={discount}
                                    from={currency}
                                  /> 
                                </span>
                              </td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </Col>
                  </Row>
                </div>
                <div className={cx(s.totalValue, s.space2)}>
                  <Col xs={12} sm={12} md={12} lg={12} className={s.smPadding}>
                    <table className={cx('table')}>
                      <tbody>
                        <tr className={s.totalText}>
                          <td className={cx(s.noBorder)}><FormattedMessage {...messages.total} /></td>
                          <td className={cx(s.noBorder, 'text-right')}>
                            <span>
                              <CurrencyConverter
                                amount={total}
                                from={currency}
                                superSymbol
                              />
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </div>
            </div>
        );
    }
}

export default injectIntl(withStyles(s)(PaymentDetails));
