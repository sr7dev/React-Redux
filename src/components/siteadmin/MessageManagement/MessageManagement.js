import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td } from 'reactable';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux Action
import { viewReceiptAdmin } from '../../../actions/Reservation/viewReceiptAdmin';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MessageManagement.css';
import * as FontAwesome from 'react-icons/lib/fa';

import Link from '../../Link';


// Locale
import messages from '../../../locale/messages';


class MessageManagement extends React.Component {

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
                payEmail: PropTypes.string.isRequired
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
                currency: PropTypes.string.isRequired
            }),
            refundStatus: PropTypes.shape({
                id: PropTypes.number.isRequired,
                receiverEmail: PropTypes.string.isRequired,
                total: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
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
        if (completed && !loading) {
            console.log('comp will receive props')
            refetch();
        }
    }

    render() {
        const { data, title, viewReceiptAdmin } = this.props;
        const { formatMessage } = this.props.intl;
        let userType = 'host';

        return (
            <div className={cx(s.pagecontentWrapper)}>
                <div className={s.contentBox}>
                    <h1 className={s.headerTitle}>{title}</h1>
                    <div className={'table-responsive'}>
                        <Table className="table"
                            noDataText="No matching records found."
                            filterable={['Host Email Id', 'Guest  Email Id', 'Host', 'Guest']}
                            sortable={true}
                            itemsPerPage={20}>
                            {
                                data && data.map(function (value, index) {
                                    console.log('values', value.hostProfile.profileId);
                                    return (
                                        <Tr key={index}>
                                            <Td column={"List Title"}>
                                                <a
                                                    target="_blank"
                                                    href={"/rooms/" + value.listId}
                                                    className={cx(s.previewLink)}
                                                >
                                                    {
                                                        value.listData ? value.listData.title : 'List is missing'
                                                    }
                                                </a>
                                            </Td>
                                            {
                                                value.hostProfile && value.hostProfile.displayName &&
                                                <Td column={"Host"}>
                                                    {value.hostProfile.displayName}
                                                </Td>
                                            }
                                            {
                                                value.hostUserData && value.hostUserData.email && <Td
                                                    column={"Host Email Id"} >
                                                    <a href={"/users/show/" + value.hostProfile.profileId} target="_blank" >
                                                        {value.hostUserData.email}
                                                    </a>
                                                </Td>
                                            }

                                            {
                                                value.guestProfile && value.guestProfile.displayName &&
                                                <Td
                                                    column={"Guest"}
                                                    data={value.guestProfile.displayName}
                                                >
                                                </Td>
                                            }


                                            {
                                                value.guestUserData && value.guestUserData.email &&
                                                <Td
                                                    column={"Guest  Email Id"}
                                                >
                                                    <a href={"/users/show/" + value.guestProfile.profileId} target="_blank" >
                                                        {value.guestUserData.email}
                                                    </a>
                                                </Td>
                                            }

                                            {
                                                value.id && value.id && <Td column={"Message History"}>
                                                    <a
                                                        target="_blank"
                                                        href={"/message/" + value.id + "/" + userType}
                                                        className={cx(s.previewLink)}
                                                    >
                                                        <FormattedMessage {...messages.messageHistroyLabel} />
                                                    </a>
                                                </Td>
                                            }
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

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(MessageManagement)));



