import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// External Component
import moment from 'moment';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Calendar.css';
import {
  Row,
  Col,
  FormGroup,
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import CurrencyConverter from '../../CurrencyConverter';

// Helper
import { convert } from '../../../helpers/currencyConvertion';

// Locale
import messages from '../../../locale/messages';

class BillDetails extends Component {
    static propTypes = {
        basePrice: PropTypes.number.isRequired,
        cleaningPrice: PropTypes.number,
        currency: PropTypes.string.isRequired,
        monthlyDiscount: PropTypes.number,
        weeklyDiscount: PropTypes.number,
        startDate: PropTypes.object.isRequired,
        endDate: PropTypes.object.isRequired,
        serviceFees: PropTypes.shape({
          guest: PropTypes.shape({
            type: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired
          }).isRequired
        }).isRequired,
        base: PropTypes.string.isRequired,
        rates: PropTypes.object.isRequired,
        formatMessage: PropTypes.func,
    };

    static defaultProps = {
    	basePrice: 0,
    	cleaningPrice: 0,
    	monthlyDiscount: 0,
    	weeklyDiscount: 0,
    	startDate: null,
    	endDate: null
    }

    render() {
    	const { basePrice, cleaningPrice, currency, monthlyDiscount, weeklyDiscount, startDate, endDate } = this.props;
        const { serviceFees, base, rates } = this.props;
        const { formatMessage } = this.props.intl;
        let serviceFee = 0, serviceFeeCurrency;

    	let momentStartDate, momentEndDate, dayDifference, priceForDays, discount, discountType, total;
    	if(startDate != null && endDate != null){
            momentStartDate = moment(startDate);
            momentEndDate = moment(endDate);
            dayDifference = momentEndDate.diff(momentStartDate, 'days');
            priceForDays = Number(basePrice) * Number(dayDifference);
            discount = 0;
            discountType = null;
            total = 0;
        }

        if(dayDifference >= 7){
            if(monthlyDiscount > 0 && dayDifference >= 28) {
                discount = (Number(priceForDays) * Number(monthlyDiscount)) / 100;
                discountType = monthlyDiscount + "% " + formatMessage(messages.monthlyDiscount);
            } else {
                discount = (Number(priceForDays) * Number(weeklyDiscount)) / 100;
                discountType = weeklyDiscount + "% " + formatMessage(messages.weeklyDiscount);
            }
        }

        if(serviceFees){
            if(serviceFees.guest.type === 'percentage'){
                serviceFee = priceForDays * (Number(serviceFees.guest.value) / 100);
            } else {
                serviceFee = convert(base, rates, serviceFees.guest.value, serviceFees.guest.currency, currency);
            }
        }

        total = (priceForDays + serviceFee + cleaningPrice) - discount;

        return (
            <FormGroup>
                    <Row>  
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <table className={cx('table')}>
                          <tbody>
                            <tr>
                              <td className={cx(s.noBorder)}>
                                <CurrencyConverter
                                    amount={basePrice}
                                    from={currency}
                                /> 
                                x {dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
                            </td>
                              <td className={cx(s.noBorder, 'text-right')}>
                                  <CurrencyConverter
                                    amount={priceForDays}
                                    from={currency}
                                  />
                              </td>
                            </tr>
                            {
                                discount > 0 && <tr>
                                    <td>{discountType}</td>
                                    <td className={cx('text-right', s.discountText)}>
                                        - <CurrencyConverter
                                                amount={discount}
                                                from={currency}
                                            /> 
                                    </td>
                                </tr>
                            }
                            {
                              serviceFee > 0 && <tr>
                                <td><FormattedMessage {...messages.serviceFee} /></td>
                                <td className={cx('text-right')}>
                                    <CurrencyConverter
                                        amount={serviceFee}
                                        from={currency}
                                    />
                                </td>
                             </tr>
                            }
                            {
                                cleaningPrice > 0 && <tr>
                                    <td><FormattedMessage {...messages.cleaningFee} /></td>
                                    <td className={cx('text-right')}>
                                        <CurrencyConverter
                                            amount={cleaningPrice}
                                            from={currency}
                                        />
                                    </td>
                                </tr>
                            }                           
                            <tr>
                              <td><FormattedMessage {...messages.total} /></td>
                              <td className={cx('text-right')}>
                                  <CurrencyConverter
                                        amount={total}
                                        from={currency}
                                    />
                              </td>
                            </tr>  
                          </tbody>    
                        </table>    
                      </Col>
                    </Row>
                </FormGroup>  
        );
    }
}

export default injectIntl(withStyles(s) (BillDetails));
