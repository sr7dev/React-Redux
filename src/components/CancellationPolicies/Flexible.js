import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { 
  Row, 
  Col,
  Tooltip
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CancellationPolicies.css';

class Flexible extends React.Component {

  static propTypes = { 
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { siteName } = this.props;
    return (
        <div>
          <div >
            <h3>Flexible: Full refund 1 day prior to arrival</h3>
            <ul className={s.subText}>
              <li>
                Cleaning fees are always refunded if the guest did not check in.
              </li>
              <li>
                The {siteName} service fee is refundable if the guest cancels 
                before the trip starts. If a guest books a reservation that overlaps with any part of an existing reservation, we won’t refund the {siteName} service fee if they decide to cancel.
              </li>
              <li>
                Accommodation fees (the total nightly rate you're charged) are refundable in certain circumstances as outlined below.
              </li>
              <li>
                If there is a complaint from either party, notice must be given to {siteName} within 24 hours of check-in.
              </li>
              <li>{siteName} will mediate when necessary, and has the final say in all disputes.</li>
              <li>A reservation is officially canceled when the guest clicks the cancellation button on the cancellation confirmation page, which they can find in Dashboard > Your Trips > Cancel.</li>
              <li>
                Cancellation policies may be superseded by the Guest Refund Policy, extenuating circumstances, or cancellations by {siteName} for any other reason permitted under the Terms of Service. Please review these exceptions.
              </li>
              <li>
                Applicable taxes will be retained and remitted.
              </li>
            </ul>
          </div>
          <div className={cx(s.lineGraph, s.hidesm)}>
              <Row className={s.graphContainer}>
                <Col md={4} className={cx(s.timeLine,s.refund)}>
                  <div className={s.timeLinePoint}>
                    <Tooltip placement="top" id="tooltip-top" className={s.toolTop}>
                      1 day Prior
                    </Tooltip>
                    <div className={s.toolMarker}></div>
                    <div className={s.toolLable}>
                      Thu, Jun 08 <br />
                      3:00 PM
                    </div>

                  </div>
                </Col>
                <Col md={4} className={cx(s.timeLine, s.semiRefund)}>
                  <div className={s.timeLinePoint}>
                    <Tooltip placement="top" id="tooltip-top" className={s.toolTop}>
                      Check in 
                      </Tooltip>
                    <div className={s.toolMarker}></div>
                    <div className={s.toolLable}>
                      Fri, Jun 09 <br />
                      3:00 PM
                    </div>
                  </div>
                </Col>
                <Col md={4} className={cx(s.timeLine, s.nonRefund)} >
                  <div className={s.timeLinePoint}>
                    <Tooltip placement="top" id="tooltip-top" className={s.toolTop}>
                      Check Out 
                      </Tooltip>
                    <div className={s.toolMarker}></div>
                    <div className={s.toolLable}>
                      Mon, Jun 12 <br />
                      11:00 AM
                    </div>
                  </div>
                </Col>
                <div className={s.toolText}>
                  Example
                </div>
              </Row>
          </div>
          <Row>
            <Col md={4} lg={4}>
            <p>
              For a full refund of accommodation fees, cancellation must be made a full 24 hours prior to listing’s local check in time (or 3:00 PM if not specified) on the day of check in. For example, 
              if check-in is on Friday, cancel by Thursday of that week before check in time.
            </p>
            </Col>
            <Col md={4} lg={4}>
            <p>
              If the guest cancels less than 24 hours before check-in, the first night is non-refundable.
            </p>
            </Col>
            <Col md={4} lg={4}>
            <p>
              If the guest arrives and decides to leave early, the accommodation fees for the nights not spent 24 hours after the official cancellation are fully refunded.
            </p>
            </Col>
          </Row>
        </div>
    );
  }
}
export default withStyles(s)(Flexible);
