import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Component
import CurrencyConverter from '../CurrencyConverter';

class TotalAmount extends Component {
    static propTypes = {
        className: PropTypes.string.isRequired,
        mode: PropTypes.string.isRequired
    };

    static defaultProps = {
    	data: []
  	};

    render() {
		const { className, mode, data } = this.props;
		const { formatMessage } = this.props.intl;
    	let label, currency, amount = 0;
  		if(mode === 'completed'){
  			label = formatMessage(messages.paidOut);
  			if(data != null && data.length > 0) {
  				data.map((item) => {
	    			amount = amount + item.hostTransaction.amount;
	    			currency = item.hostTransaction.currency;
	    		})
  			}
    	} else {
				label = formatMessage(messages.pendingPayouts);
    		if(data != null && data.length > 0) {
	    		data.map((item) => {
	    			amount = amount + item.total;
	    			currency = item.currency;
	    		})
	    	}
    	}

        return (
            <h3 className={className}>
	            <span>{label} : </span>
	            <span>
	            	<CurrencyConverter
      						amount={amount}
      						from={currency}
      					/>
	            </span>
            </h3>
        );
    }
}

export default injectIntl(TotalAmount);
