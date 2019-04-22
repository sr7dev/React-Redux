// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Redux Form
import { formValueSelector } from 'redux-form';

// Translation
import { injectIntl } from 'react-intl';
import messages from './messages';

// Redux
import { connect } from 'react-redux';

import AddListSettingsForm from './AddListSettingsForm';
import EditListSettingsForm from './EditListSettingsForm';

class ListSettingsForm extends Component {

  static propTypes = {
    id: PropTypes.number,
  };

  render() {
    const { id } = this.props;
    if(id != undefined) {
      return (
        <EditListSettingsForm />
      )
    } else {
        return (
          <AddListSettingsForm />
        )
    }
  }

}

// Decorate with connect to read form values
const selector = formValueSelector("EditListSettingsForm"); // <-- same as form name

const mapState = (state) => ({
  id: selector(state, 'id'),
});

const mapDispatch = {
};

export default injectIntl(connect(mapState, mapDispatch)(ListSettingsForm));
