import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td } from  'reactable';

// Redux
import { connect } from 'react-redux';
import { openListSettingsModal } from '../../../actions/siteadmin/modalActions';

// Redux Form
import { initialize } from 'redux-form';

// Toaster
import { toastr } from 'react-redux-toastr';

// Component
import ListSettingsModal from '../ListSettingsModal';
//import Link from '../../../components/Link';
import AddListSettingsForm from '../ListSettingsForm/AddListSettingsForm';
import EditListSettingsForm from '../ListSettingsForm/EditListSettingsForm';
import Loader from '../../Loader';

// Style
import cx from 'classnames';
import {
  Button,
  Col 
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListSettingsManagement.css';
import * as FontAwesome from 'react-icons/lib/fa';

class ListSettingsManagement extends React.Component {

  static propTypes = {
    listSettingsData: PropTypes.object,
    initialize: PropTypes.func,
    openListSettingsModal: PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.state = {
      isDataLoaded: false,
      listSettings: [],
      listSettingsType: null,
      isEdit: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { listSettingsData } = nextProps;
    const { initialize } = this.props;

    if(listSettingsData != undefined) {
      if(listSettingsData.status != "failed") {
        this.setState({ isDataLoaded: true, listSettingsType: listSettingsData });
        if(listSettingsData.fieldType === "numberType"){
          if(listSettingsData.listSettings.length > 0){
            initialize("EditListSettingsForm", listSettingsData.listSettings[0], true);
            this.setState({ isEdit: true });
          } else {
            initialize("AddListSettingsForm", { typeId: listSettingsData.id  }, true);
          }
        } else {
          this.setState({ listSettings: listSettingsData.listSettings });
        }
      }
    }
  }

  renderTable () {

    const { listSettings, listSettingsType } = this.state;
    const { openListSettingsModal } = this.props;

    return (
      <div>
        <ListSettingsModal />
        <Col xs={12} sm={3} md={3} lg={3} className={cx(s.noPadding, s.buttonMargin)}> 
          <Button 
            className={cx(s.button, s.btnPrimary)} 
            onClick={() => openListSettingsModal({ typeId: listSettingsType.id }, "AddListSettingsForm")} 
          >
            Add New
          </Button>
        </Col>
        <div className={'table-responsive'}>
        <Table className="table"
          noDataText="No matching records found."
          itemsPerPage={20}
          defaultSort={{column: 'Settings ID', direction: 'desc'}}
        >
          {
              listSettings && listSettings.map(function(item, key) {
              let status = item.isEnable == 1 ? "Enabled" : "Disabled";
              return (
                  <Tr key={key}>
                    <Td column={"Settings ID"} data={item.id} />
                    <Td column={"Item Name"} data={item.itemName} />
                    <Td column={"Status"} data={status} />
                    <Td column={"Operation"}>
                      <Col xs={12} sm={3} md={3} lg={3} className={s.noPadding}>
                        <Button className={cx(s.btnPrimaryBorder)} onClick={() => openListSettingsModal(item, "EditListSettingsForm")}>
                          Manage
                        </Button>
                      </Col>
                    </Td>
                  </Tr>
              )
            })
          }
        </Table>
        </div>
      </div>
    );

  }

  renderForm() {
    const { listSettingsType, isEdit } = this.state;
    return (
      <div>
        {
          isEdit && <EditListSettingsForm fieldType={listSettingsType.fieldType} />
        }

        {
          !isEdit && <AddListSettingsForm fieldType={listSettingsType.fieldType} />
        }
        </div>
    );
  }

  render () {
    const { listSettingsType, isDataLoaded } = this.state;

    if(!isDataLoaded){
      return <Loader type={"text"} />;
    } else {
        if(listSettingsType.fieldType === "numberType"){
          return (
            <div className={cx(s.pagecontentWrapper)}>
              <div className={s.contentBox}>
                <h1 className={s.headerTitle}>{listSettingsType.typeLabel}</h1>
                {this.renderForm()}
              </div>
            </div>
          )
        } else {
            return (
              <div className={cx(s.pagecontentWrapper)}>
                <div className={s.contentBox}>
                  <h1 className={s.headerTitle}>{listSettingsType.typeLabel}</h1>
                  {this.renderTable()}
                </div>
              </div>
            )
        }
    }
  }

}

const mapState = (state) => ({
  listSettingsData: state.adminListSettingsData.data,
});

const mapDispatch = {
  openListSettingsModal,
  initialize
};

export default withStyles(s)(connect(mapState, mapDispatch)(ListSettingsManagement));

