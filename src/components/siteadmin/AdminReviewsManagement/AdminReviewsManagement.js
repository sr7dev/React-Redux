import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td } from  'reactable';
import { connect } from 'react-redux';

import { deleteAdminReview } from '../../../actions/siteadmin/AdminReviews/deleteAdminReview';
import Link from '../../../components/Link';
import messages from './messages';

// Toaster
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminReviewsManagement.css';
import * as FontAwesome from 'react-icons/lib/fa';

import { censorEmail, censorPhone } from '../../../helpers/secureEmail';

import StarRating from '../../StarRating';

class AdminReviewsManagement extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    editUser: PropTypes.func,
    deleteAdminReview: PropTypes.func,
    title: PropTypes.string.isRequired,
  };

  render () {
    const { data, editUser, deleteAdminReview, title } = this.props;
    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <div className={'table-responsive'}>
          <Table className="table"
            filterable={['List ID', 'Review Content', 'Review Rating']}
            noDataText="No matching records found."
            sortable={true}
            defaultSort={{column: 'Updated Date', direction: 'desc'}}
            itemsPerPage={20}
          >
            {
              data && data.map(function(value, key) {
                return (
                    <Tr key={key}>
                      <Td column={"List ID"} data={value.listId} />
                      <Td column={"List Title"}>
                        <Link to={"/rooms/" + value.listId}>
                          {
                            value.listData ? value.listData.title : 'List is missing'
                          }
                        </Link>
                      </Td>
                      <Td column={"Review Content"} data={value.reviewContent} />
                      <Td column={"Review Rating"}>
                        <StarRating className={s.reviewStar} value={value.rating} name={'review'} />
                      </Td>
                      <Td column="View">
                      <Link to={"/siteadmin/edit-review/" + value.id}>
                          Edit
                      </Link>
                      </Td>
                      <Td column="Delete">
                      <div>
                        <Confirm
                          onConfirm={() => deleteAdminReview(value.id)}
                          body="Are you sure you want to delete this?"
                          confirmText="Confirm Delete"
                          title="Deleting Review"
                        >
                          <a href="javascript:void(0)">Delete</a>
                        </Confirm>
                      </div>
                      </Td> }
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
  deleteAdminReview,
};

export default withStyles(s)(connect(mapState, mapDispatch)(AdminReviewsManagement));

