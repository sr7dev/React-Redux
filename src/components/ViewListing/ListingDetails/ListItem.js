import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingDetails.css';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

class ListItem extends React.Component {
  static propTypes = {
    itemList: PropTypes.arrayOf(PropTypes.shape({
        listsettings: PropTypes.shape({
          itemName: PropTypes.string,
          settingsType: PropTypes.shape({
            typeName: PropTypes.string
          }),
        }),
        spacesId: PropTypes.string,
    })).isRequired,
    label: PropTypes.string.isRequired,
  };

  render() {
    const { itemList, label } = this.props;

    return (
        <Col xs={12} sm={12} md={8} lg={8} className={cx(s.space2, s.horizontalLineThrough)}>
            <Row>
              <Col xs={12} sm={3} md={3} lg={3} className={cx(s.space1, s.spaceTop1)}>
                <p className={s.textMuted}> {label} </p>
              </Col>
              <Col xs={12} sm={9} md={9} lg={9} className={cx(s.space1,s.spaceTop1)}>
                <Row>
                  <Col md={12} lg={12}>
                    {
                      itemList.map((item, key)=> {
                        if(item.listsettings.isEnable === "1") {
                          return (
                            <p key={key}><span className={cx(s.text)}>{item.listsettings.itemName}</span></p>
                          )
                        }
                      })
                    }
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
    );
  }

}

export default injectIntl(withStyles(s) (ListItem));