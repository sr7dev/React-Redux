import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td } from  'reactable';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';

// Redux Action
import { removeListing } from '../../../actions/siteadmin/ListingManagement/removeListing';
import { 
  addListToRecommended, 
  removeListFromRecommended 
} from '../../../actions/siteadmin/ListingManagement/manageRecommend';

import messages from './messages';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingManagement.css';
import * as FontAwesome from 'react-icons/lib/fa';

class ListingManagement extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    title: PropTypes.string.isRequired,
    addListToRecommended: PropTypes.func.isRequired,
    removeListFromRecommended: PropTypes.func.isRequired,
  };

  render () {
    const { data, intl, removeListing, title, addListToRecommended, removeListFromRecommended } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <div className={'table-responsive'}>
            {
              data && data.length > 0 && <a
                href="/export-admin-data?type=listings"
                className={cx('pull-right', s.exportLink)}
              >
                Export Data into CSV
              </a>
            }
            <Table className="table"
              filterable={['id', 'Owner Email', 'City', 'State', 'Country']}
              noDataText="No matching records found."
              sortable={true}
              defaultSort={{ column: 'Id', direction: 'desc'}}
              itemsPerPage={20}
            >
              {
                data && data.map(function(value, key) {
                  let viewListing = "/rooms/" + value.id;
                  let editListing = '/become-a-host/' + value.id + '/home';
                  let isPublished = value.isPublished ? 'Yes' : 'No';
                  let isReady = value.isReady ? 'Yes' : 'No';

                  return (
                      <Tr key={key}>
                        <Td column={"Id"} data={value.id} />
                        <Td column={"Title"} data={value.title} />
                        <Td column={"Owner Name"} data={value.user.profile.firstName} />
                        <Td column={"Owner Email"} data={value.user.email} />
                        <Td column={"City"} data={value.city} />
                        <Td column={"State"} data={value.state} />
                        <Td column={"Country"} data={value.country} />
                        <Td column={"Created Date"} data={moment(value.createdAt).format('MM/DD/YYYY')} />
                        
                        {
                          value.recommend !=null && <Td column="Recommend">
                            <a href="javascript:void(0)" onClick={() => removeListFromRecommended(value.id)} >
                              Remove
                            </a>
                          </Td>
                        }

                        {
                          value.recommend ==null && <Td column="Recommend">
                            <a href="javascript:void(0)" onClick={() => addListToRecommended(value.id)} >
                              Set
                            </a>
                          </Td>
                        }

                        <Td column="Publised">
                          {isPublished}
                        </Td>
                        <Td column="Ready">
                          {isReady}
                        </Td>
                          
                        <Td column="Edit">
                          <a href={editListing} target="_blank" >
                              Edit
                          </a>
                        </Td>

                        <Td column="View">
                          <a href={viewListing} target="_blank" >
                            View
                          </a>
                        </Td>
                        
                        <Td column="Delete">
                          <Confirm
                            onConfirm={()=> removeListing(value.id, "admin")}
                            body="Are you sure you want to delete this?"
                            confirmText="Confirm Delete"
                            title="Deleting Listing"
                          >
                            <a href="javascript:void(0)">Delete</a>
                          </Confirm>
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
});

const mapDispatch = {
  removeListing,
  addListToRecommended,
  removeListFromRecommended
};

export default withStyles(s)(connect(mapState, mapDispatch)(ListingManagement));



