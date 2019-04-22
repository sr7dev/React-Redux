import React from 'react';
import PropTypes from 'prop-types';
import {graphql, compose, gql} from 'react-apollo';
import { FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import Home from '../../components/Home';
import { FormattedMessage } from 'react-intl';

//Components
import BannerCaption from '../../components/Home/BannerCaption';
import HomeSlider from '../../components/Home/HomeSlider';
import NewsBox from '../../components/Home/NewsBox';
import SearchForm from '../../components/Home/SearchForm';
import Loader from '../../components/Loader';
import SeeAll from '../../components/Home/SeeAll';

// Graphql
import getRecommendQuery from './getRecommend.graphql';
import getImageBannerQuery from './getImageBanner.graphql';
import getMostViewedListingQuery from './getMostViewedListing.graphql';

import { getListingFieldsValues } from '../../actions/getListingFieldsValues';

// Locale
import messages from '../../locale/messages';

class Homepage extends React.Component {
  static propTypes = {
    getRecommendData: PropTypes.shape({
      loading: PropTypes.bool,
      getRecommendData: PropTypes.array
    }),
    getImageBannerData: PropTypes.shape({
      loading: PropTypes.bool,
      getImageBanner: PropTypes.object
    }),
    getMostViewedListingData: PropTypes.shape({
      loading: PropTypes.bool,
      GetMostViewedListing: PropTypes.array
    }),
    formatMessage: PropTypes.func,
  };

  static defaultProps = {
    getRecommendData: {
      loading: true
    },
    getImageBannerData: {
      loading: true
    },
    getMostViewedListingData: {
      loading: true
    },
  }

  render() {
    const { getRecommendData, getImageBannerData, getMostViewedListingData, getBannerData } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.pageContainer}><BannerCaption data={getBannerData} /></div>
          <div className={s.pageContainer}><SearchForm /></div>
          
          {
            getRecommendData.loading && getImageBannerData.loading && getMostViewedListingData.loading && <div>
              <Loader type="text" />
            </div>
          }
          {
            !getRecommendData.loading && !getImageBannerData.loading && !getMostViewedListingData.loading && <div className={s.pageContainer}>
              {
                getRecommendData.getRecommend && getRecommendData.getRecommend.length > 0 && <div >
                  <h3 className={s.containerTitle}>
                    <FormattedMessage {...messages.recommended} />
                    <SeeAll />
                  </h3>  
                  <HomeSlider data={getRecommendData.getRecommend} />
                </div>
              }

              {
                getMostViewedListingData.GetMostViewedListing && getMostViewedListingData.GetMostViewedListing.length > 0 && <div className={s.pageContainer}>
                  <h3 className={s.containerTitle}>
                    <FormattedMessage {...messages.mostViewed} />
                    <SeeAll />
                  </h3>  
                  <HomeSlider data={getMostViewedListingData.GetMostViewedListing} />
                </div>
              }
              
              {
                getImageBannerData.getImageBanner != null && <div className={s.pageContainer}>
                  <NewsBox data={getImageBannerData.getImageBanner} />
                </div>
              }              
            </div>
          }
        </div>
      </div>
    );
  }
}

export default compose(
    withStyles(s),
    graphql(gql`
        query getBanner{
          getBanner {
            id
            title
            content
          }
        }
      `,{
        name: 'getBannerData',
        options: {
          ssr: true
        }
      }),
    graphql(getRecommendQuery, {
      name: 'getRecommendData', 
      options: {
        ssr: false
      }
    }),
    graphql(getMostViewedListingQuery, {
      name: 'getMostViewedListingData', 
      options: {
        ssr: false
      }
    }),
    graphql(getImageBannerQuery, {
      name: 'getImageBannerData', 
      options: {
        ssr: false
      }
    }),
)(Homepage);
