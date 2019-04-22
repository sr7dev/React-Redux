import React, { Component } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Sticky.css';
// Redux
import { connect } from 'react-redux';

// Redux Form
import { formValueSelector } from 'redux-form';

class Sticky extends React.Component {

    static defaultProps = {
        stickyTop: 412,
        stickyBottom: 1615
    };
    
    componentWillReceiveProps(nextProps) {
        const { stickyTop, stickyBottom } = nextProps;

        const { maximumStay, availability, startDate, endDate } = nextProps;

        let isValid = !maximumStay && availability && startDate != null && endDate != null;

        const setInitialHeight = (elements) => {
            [].forEach.call(elements, (sticky) => {
                sticky.setAttribute('data-sticky-width', sticky.getBoundingClientRect().width);
            });
        };

        const stickies = document.querySelectorAll('[data-sticky]');
        setInitialHeight(stickies);

        document.addEventListener('scroll', () => {
            let top = document.documentElement.scrollTop || document.body.scrollTop,
                bottom = document.documentElement.scrollHeight || document.body.scrollHeight,
                isWeb = (document.documentElement.clientWidth || document.body.clientWidth) >= 1200 ? true : false; 

            let bookItsection = 505;
            if (isValid) {
                bookItsection = 750;
            }
            // if (document.querySelector('[data-sticky-section]')) {
            //     let bookItHeight = document.querySelector('[data-sticky-section]').getBoundingClientRect().height;
            //     bookItsection = (bookItHeight > 650) ? bookItHeight : 650;
            // }    
                
            [].forEach.call(stickies, (sticky) => {
                let stickyInitialWidth = parseFloat(sticky.getAttribute('data-sticky-width'), 10);

                if (top >= stickyTop && top <= stickyBottom && isWeb && document.querySelector('.bookItFormSection')) {
                    sticky.setAttribute('style', 'position: fixed; top: 0px; z-index: 1; width: ' + stickyInitialWidth + 'px');
                    sticky.classList.add('sticky');
                    if (top > (stickyBottom - bookItsection)) {
                        document.querySelector('.bookItFormSection').setAttribute('style', 'opacity: 0; height: 0px;');
                    } else {
                        document.querySelector('.bookItFormSection').removeAttribute('style');
                    }
                } else {
                    sticky.removeAttribute('style');
                    sticky.classList.remove('sticky');
                }
            });
        });

    }

    render() {
        const { children, exitOn } = this.props;

        return (
            <div data-sticky>
                {this.props.children}
            </div>    
        );
    };
}

Sticky.protoTypes = {
    children: React.PropTypes.node
};

const selector = formValueSelector('BookingForm');

const mapState = (state) => ({
    stickyTop: state.sticky.stickyTop,
    stickyBottom: state.sticky.stickyBottom,
    availability: state.viewListing.availability,
    maximumStay: state.viewListing.maximumStay,
    startDate: selector(state, 'startDate'),
    endDate: selector(state, 'endDate'),
});

const mapDispatch = {
};

export default withStyles(s)(connect(mapState, mapDispatch)(Sticky));