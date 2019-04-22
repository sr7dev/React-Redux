import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Tr, Td } from 'reactable';
import { connect } from 'react-redux';
import { deleteUser } from '../../../actions/siteadmin/users';
import Link from '../../../components/Link';
import messages from './messages';
// Redux Action
import { updateBanServiceHistoryStatus } from '../../../actions/siteadmin/updateBanServiceHistoryStatus';
// Toaster
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserManagement.css';
import * as FontAwesome from 'react-icons/lib/fa';
class UserManagement extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    editUser: PropTypes.func,
    deleteUser: PropTypes.func,
    title: PropTypes.string.isRequired,
    updateBanServiceHistoryStatus: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }
  async handleChange(e, userId, userMail, userName) {
    const { updateBanServiceHistoryStatus } = this.props;
    let id = userId;
    let banStatus = e.target.value;
    await updateBanServiceHistoryStatus(id, banStatus, userMail, userName);
  }
  render() {
    const { data, data: { userMail }, editUser, deleteUser, title, handleChange } = this.props;
    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <div className={'table-responsive'}>
            {
              data && data.length > 0 && <a
                href="/export-admin-data?type=users"
                className={cx('pull-right', s.exportLink)}
              >
                Export Data into CSV
            </a>
            }
            <Table className="table"
              filterable={['First name', 'Last name', 'Email address', 'Phone number']}
              noDataText="No matching records found."
              sortable={true}
              defaultSort={{ column: 'Created Date', direction: 'desc' }}
              itemsPerPage={20}
            >
              {
                data && data.map((value, key) => {
                  let userBanStatus = value.userBanStatus;
                  let recordId = value.id;
                  let userMail = value.email;
                  let userName = value.profile.firstName + ' ' + value.profile.lastName;
                  if (userBanStatus == '1') {
                    userBanStatus = '1';
                  } else if (userBanStatus == '0') {
                    userBanStatus = '0';
                  }
                  return (
                    <Tr key={key}>
                      <Td column={"Profile Id"} data={value.profile.profileId} className={s.userVerticalAlign}/>
                      <Td column={"First name"} data={value.profile.firstName} className={s.userVerticalAlign}/>
                      <Td column={"Last name"} data={value.profile.lastName} className={s.userVerticalAlign}/>
                      <Td column={"Email address"} data={value.email} className={s.userVerticalAlign}/>
                      <Td column={"Phone number"} data={value.profile.phoneNumber} className={s.userVerticalAlign}/>
                      <Td column={"Created Date"} data={moment(value.profile.createdAt).format('MM/DD/YYYY')} className={s.userVerticalAlign}/>
                      <Td column={"View"} className={s.userVerticalAlign}>
                        <Link to={"/siteadmin/profileView/" + ((value.profile) ? value.profile.profileId : '')} >
                          View 
                        </Link>
                      </Td>
                      {
                        <Td column="Action">
                          <select name="userBanStatus" className={cx(s.formControlSelect, s.userVerticalAlign, s.btnMarginBottom)}
                            onChange={(e) => this.handleChange(e, recordId, userMail, userName)} defaultValue={value.userBanStatus}>
                            <option value="">Select</option>
                            <option value="1">Ban</option>
                            <option value="0">UnBan</option>
                          </select>
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
});
const mapDispatch = {
  updateBanServiceHistoryStatus
};
export default withStyles(s)(connect(mapState, mapDispatch)(UserManagement));
