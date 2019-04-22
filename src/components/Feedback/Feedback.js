import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { graphql, gql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Row,
  Col,
  Grid
} from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import Loader from '../Loader';
import s from './Feedback.css';

class Feedback extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getFooterSetting: PropTypes.shape({
        title1: PropTypes.string.isRequired,
        content1: PropTypes.string.isRequired,
        title2: PropTypes.string.isRequired,
        content2: PropTypes.string.isRequired,
        title3: PropTypes.string.isRequired,
        content3: PropTypes.string.isRequired,
      })
    }),
  };

  render() {
    const { data: { loading, getFooterSetting } } = this.props;

    if(!loading) {
      return (
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.feedbackContainer}>
              <Grid fluid>
                <Row className={s.feedbackRow}>

                  {
                    getFooterSetting && <Col
                      xs={12} sm={4} md={4} lg={4}
                      className={s.feedbackBox
                      }>

                      <div className={s.feedbackIcon}>
                        <FontAwesome.FaPhone />
                      </div>

                      <div className={s.feedbackContent}>
                        <label className={s.landingLabel}>{getFooterSetting.title1}</label>
                        <label className={s.landingCaption}>{getFooterSetting.content1}</label>
                      </div>
                    </Col>
                  }
                  {
                    getFooterSetting && <Col
                      xs={12} sm={4} md={4} lg={4}
                      className={s.feedbackBox}
                    >

                      <div className={s.feedbackIcon}>
                        <FontAwesome.FaShield />
                      </div>
                      <div className={s.feedbackContent}>
                        <label className={s.landingLabel}>{getFooterSetting.title2}</label>
                        <label className={s.landingCaption}>
                          {getFooterSetting.content2}
                        </label>
                      </div>
                    </Col>
                  }
                  {
                    getFooterSetting && <Col
                      xs={12} sm={4} md={4} lg={4}
                      className={s.feedbackBox}
                    >

                      <div className={s.feedbackIcon}>
                        <FontAwesome.FaCheckSquareO />
                      </div>
                      <div className={s.feedbackContent}>
                        <label className={s.landingLabel}> {getFooterSetting.title3}</label>
                        <label className={s.landingCaption}>{getFooterSetting.content3}</label>
                      </div>
                    </Col>
                  }
                </Row>
              </Grid>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />
    }
  }
}

export default compose(
  injectIntl,
  withStyles(s),
  graphql(gql`
   query getFooterSetting {
    getFooterSetting {
        id
        title1
        content1
        title2
        content2
        title3
        content3
      }
    }
`, { options: { ssr: true } })
)(Feedback);
