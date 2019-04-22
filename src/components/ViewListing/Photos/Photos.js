import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Photos.css';
import { Button } from 'react-bootstrap';
import cx from 'classnames';

// Component
import ListCoverPhoto from '../../ListCoverPhoto';
import ImageSlider from '../ImageSlider';
import WishListIcon from '../../WishListIcon';

// Redux Action
import { openImageLightBox, closeImageLightBox } from '../../../actions/ImageLightBox';
import { setStickyTop } from '../../../actions/Sticky/StrickyActions';

// Translation
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

class Photos extends React.Component {
  static propTypes = {
    listPhotos: PropTypes.array,
    coverPhoto: PropTypes.number,
    openImageLightBox: PropTypes.func.isRequired,
    closeImageLightBox: PropTypes.func.isRequired,
    imageLightBox: PropTypes.bool.isRequired,
    formatMessage: PropTypes.func,
  };

  static defaultProps = {
    listPhotos: [],
    imageLightBox: false
  }

  constructor(props) {
    super(props);
    this.state = {
      sources: []
    }
  }

  componentDidMount () {
    const { data, setStickyTop } = this.props;
    let listPhotos = data.listPhotos;
    let sources = [];
    let sticky = document.querySelector('[data-sticky-top]'), stickyHeight = 412;
    
    if(listPhotos != null) {
      listPhotos.map((item, key) => {
        let sourceObject = {};
        sourceObject["src"] = '/images/upload/x_large_' + item.name;
        //sourceObject["caption"] = 'Sydney, Australia - Photo by Jill Smith'
        sources.push(sourceObject);
      });
      this.setState({ sources });
    }
    stickyHeight = (sticky.getBoundingClientRect().height + 10);
    setStickyTop(stickyHeight);
  }
  
  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    let listPhotos = data.listPhotos;
    let sources = [];
    let sticky = document.querySelector('[data-sticky-top]'), stickyHeight = 412;

    if (listPhotos != null) {
      listPhotos.map((item, key) => {
        let sourceObject = {};
        sourceObject["src"] = '/images/upload/x_large_' + item.name;
        //sourceObject["caption"] = 'Sydney, Australia - Photo by Jill Smith'
        sources.push(sourceObject);
      });
      this.setState({ sources });
    }
    stickyHeight = (sticky.getBoundingClientRect().height + 10);
    setStickyTop(stickyHeight);
  }
  
  render() {
    const { sources } = this.state;
    const { data, openImageLightBox, closeImageLightBox, imageLightBox } = this.props;
    let coverPhoto = data.coverPhoto;
    let listPhotos = data.listPhotos;  
    let wishListStatus = data.wishListStatus;
    let isListOwner = data.isListOwner;
    
    return (
      <div className={s.bannerContainer} data-sticky-top>
        <ImageSlider 
            imageLightBox={imageLightBox} 
            closeImageLightBox={closeImageLightBox}
            sources={sources} 
        />
        <a onClick={void(0)}            
         onClick={openImageLightBox} 
          >
          <ListCoverPhoto 
            className={s.bannerImage}
            coverPhoto={coverPhoto}
            listPhotos={listPhotos}
            photoType={"xx_large"}
            bgImage
          >
          {
              listPhotos && listPhotos.length > 0 && <Button 
                className={cx(s.btn, s.viewPhotosBtn)} 
                onClick={openImageLightBox}
              >
                <FormattedMessage {...messages.viewPhotos} />
              </Button>
          }          
          </ListCoverPhoto>
        </a>
        {
          !isListOwner && <WishListIcon type="button" listId={data.id} key={data.id} isChecked={wishListStatus} />
        }
	    </div>
    );
  }
}

const mapState = (state) => ({
  imageLightBox: state.viewListing.imageLightBox
});

const mapDispatch = {
  openImageLightBox,
  closeImageLightBox,
  setStickyTop
};

export default withStyles(s) (connect(mapState, mapDispatch)(Photos));
