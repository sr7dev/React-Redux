import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td } from  'reactable';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';

// Redux Action
import { viewReceiptAdmin } from '../../../actions/Reservation/viewReceiptAdmin';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ReservationManagement.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Components
import Payout from './Payout';
import Refund from './Refund';
import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';
import ModalForm from './ModalForm';

class ReservationManagement extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      listId: PropTypes.number.isRequired,
      hostId: PropTypes.string.isRequired,
      guestId: PropTypes.string.isRequired,
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      guestServiceFee: PropTypes.number.isRequired,
      hostServiceFee: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      reservationState: PropTypes.string.isRequired,
      listData: PropTypes.shape({
        title: PropTypes.string.isRequired
      }),
      hostData: PropTypes.shape({
        profileId: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired
      }),
      hostPayout: PropTypes.shape({
        id: PropTypes.number.isRequired,
        payEmail: PropTypes.string.isRequired,
        methodId: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        last4Digits: PropTypes.number
      }),
      hostTransaction: PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
      guestData: PropTypes.shape({
        profileId: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired
      }),
      transaction: PropTypes.shape({
        payerEmail: PropTypes.string.isRequired,
        paymentType: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        paymentMethodId: PropTypes.number
      }),
      refundStatus: PropTypes.shape({
        id: PropTypes.number.isRequired,
        receiverEmail: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired
      }),
      cancellationDetails: PropTypes.shape({
        refundToGuest: PropTypes.number.isRequired,
        payoutToHost: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        guestServiceFee: PropTypes.number.isRequired,
        hostServiceFee: PropTypes.number.isRequired,
      }),
    })),
    viewReceiptAdmin: PropTypes.func.isRequired,
  };

  static defaultProps = {
    data: []
  };



  componentWillReceiveProps(nextProps) {
    const { completed, loading } = nextProps;
    const { refetch } = this.props;
    if(completed && !loading){
      console.log('comp will receive props')
      refetch();
    }
  }

  render () {
    const { data, title, viewReceiptAdmin } = this.props;
    let userType = 'host';

    return (
      <div className={cx(s.pagecontentWrapper)}>
      <ModalForm />
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <div className={'table-responsive'}>
            {
              data && data.length > 0 && <a
                href="/export-admin-data?type=reservations"
                className={cx('pull-right', s.exportLink)}
              >
                Export Data into CSV
              </a>
            }
            
            <Table className="table"
              noDataText="No matching records found."
              filterable={['Code']}
              sortable={true}
              itemsPerPage={20}>
              
              {
                data && data.map(function(value, index) {
                  let subTotal = value.total + value.guestServiceFee;                  
                  return (
                      <Tr key={index}>
                        <Td column={"Reservation Id"} data={value.id} />
                        <Td column={"Code"}>
                          {value.confirmationCode}
                        </Td>
                        <Td column={"Status"} data={value.reservationState.toUpperCase()} />
                        <Td column={"List Title"}>
                          <Link to={"/rooms/" + value.listId}>
                            {
                              value.listData ? value.listData.title : 'List is missing'
                            }
                          </Link>
                        </Td>
                        <Td column={"Refund to Guest"}>
                          <Refund 
                            id={value.id}
                            reservationState={value.reservationState}
                            transactionData={value.transaction}
                            refundData={value.refundStatus}
                            cancelData={value.cancellationDetails}
                          />
                        </Td>
                        <Td column={"Sub Total"}>
                          <CurrencyConverter
                            amount={subTotal}              
                            from={value.currency}
                          />
                        </Td>
                        <Td column={"Payout"}>
                          <Payout 
                            hostId={value.hostId}
                            checkIn={value.checkIn}
                            id={value.id}
                            hostPayout={value.hostPayout}
                            amount={value.total}
                            currency={value.currency}
                            hostTransaction={value.hostTransaction}
                            reservationState={value.reservationState}
                            cancelData={value.cancellationDetails}
                            hostData={value.hostData}
                            hostServiceFee={value.hostServiceFee}
                          />
                        </Td>
                        <Td column={"Details"}>
                      <Link to={"/siteadmin/viewreservation/" + value.id} >
                      View
                      </Link>
                        </Td>
                        
                      </Tr>
                  )
                })
              }
            </Table>
            </div>
          </div>
      </div>
      );
    }

}

const mapState = (state) => ({
  completed: state.reservation.completed,
  loading: state.reservation.loading,
});

const mapDispatch = {
  viewReceiptAdmin,
};

export default withStyles(s)(connect(mapState, mapDispatch)(ReservationManagement));



