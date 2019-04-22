import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminReviews.css';

// Component
import AdminReviewsManagement from '../../../components/siteadmin/AdminReviewsManagement/AdminReviewsManagement';

// Query
import adminReviewsQuery from './adminReviewsQuery.graphql';

class AdminReviews extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getAdminReviews: PropTypes.array,
        })
    };

    static defaultProps = {
        data: {
            loading: true
        }
    };

    render() {
        const { data: { loading }, title } = this.props;

        const { data: { getAdminReviews, refetch } } = this.props;

        return (
            <AdminReviewsManagement 
                data={getAdminReviews}
                title={title}
                refetch={refetch}
            />  
        );
    }
}

export default compose(
    withStyles(s),
    graphql(adminReviewsQuery,
    {
        options: {
            fetchPolicy: 'network-only',
            ssr: false
        }
    }),
)(AdminReviews);