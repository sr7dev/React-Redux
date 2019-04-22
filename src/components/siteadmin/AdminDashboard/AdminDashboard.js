import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    Row,
    Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminDashboard.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import DashboardTile from './DashboardTile';

class AdminDashboard extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        user: PropTypes.shape({
            loading: PropTypes.bool,
            getUserDashboard: PropTypes.shape({
                totalCount: PropTypes.number.isRequired,
                todayCount: PropTypes.number.isRequired,
                monthCount: PropTypes.number.isRequired,
            })
        }),
        listing: PropTypes.shape({
            loading: PropTypes.bool,
            getListingDashboard: PropTypes.shape({
                totalCount: PropTypes.number.isRequired,
                todayCount: PropTypes.number.isRequired,
                monthCount: PropTypes.number.isRequired,
            })
        }),
    };

    static defaultProps = {
        user: {
            loading: true
        },
        listing: {
            loading: true
        },
        reservation: {
            loading: true
        }
    };

    render() {
        const { user, listing,reservation, user: { getUserDashboard }, listing: { getListingDashboard },reservation: {getReservationDashboard}, title } = this.props;
        if (user.getUserDashboard && listing.getListingDashboard && reservation.getReservationDashboard){
            return (
                <div className={cx(s.pagecontentWrapper)}>
                    <div className={s.contentBox}>
                        <h1 className={s.headerTitle}>{title}</h1>
                        <Row>
                            <DashboardTile 
                                label={"Total Users"} 
                                value={getUserDashboard.totalCount} 
                                icon={<FontAwesome.FaUser/>}
                                color={s.bgGreen}
                            />
                            <DashboardTile 
                                label={"Last 24 hours - Users"} 
                                value={getUserDashboard.todayCount} 
                                icon={<FontAwesome.FaUser/>}
                                color={s.bgTomato}
                            />
                            <DashboardTile 
                                label={"Last 30 days - Users"} 
                                value={getUserDashboard.monthCount} 
                                icon={<FontAwesome.FaUser/>}
                                color={s.bgAqua}
                            />
                            <DashboardTile 
                                label={"Total Listings"} 
                                value={getListingDashboard.totalCount} 
                                icon={<FontAwesome.FaHome/>}
                                color={s.bgGreen}
                            />
                            <DashboardTile 
                                label={"Last 24 hours - Listings"} 
                                value={getListingDashboard.todayCount} 
                                icon={<FontAwesome.FaHome/>}
                                color={s.bgTomato}
                            />
                            <DashboardTile 
                                label={"Last 30 days - Listings"} 
                                value={getListingDashboard.monthCount} 
                                icon={<FontAwesome.FaHome/>}
                                color={s.bgAqua}
                            />
                            <DashboardTile
                                label={"Total Reservations"}
                                value={getReservationDashboard.totalCount}
                                icon={<FontAwesome.FaBuilding />}
                                color={s.bgGreen}
                            />
                            <DashboardTile
                                label={"Last 24 hours - Reservations"}
                                value={getReservationDashboard.todayCount}
                                icon={<FontAwesome.FaBuilding />}
                                color={s.bgTomato}
                            />
                            <DashboardTile
                                label={"Last 30 days - Reservations"}
                                value={getReservationDashboard.monthCount}
                                icon={<FontAwesome.FaBuilding />}
                                color={s.bgAqua}
                            />
                        </Row>
                    </div>
                </div>
            );
        }  else {
            return (
                <div>Loading...</div>
            );
        }
        
    }
}

export default withStyles(s)(AdminDashboard);
