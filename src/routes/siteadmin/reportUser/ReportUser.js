import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ReportUser.css';

// Query
import reportUserQuery from './reportUserQuery.graphql';

import Loader from '../../../components/Loader';
import ReportManagement from '../../../components/siteadmin/ReportManagement';

class ReportUser extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getAllReport: PropTypes.array,
        })
    };

    render() {
        const { data: { loading } } = this.props;
        if (loading) {
            return <Loader type={"text"} />;
        }

        const { data: { getAllReport, refetch }, title } = this.props;
        return <ReportManagement
            data={getAllReport}
            title={title}
            refetch={refetch}
        />
    }

}

export default compose(
    withStyles(s),
    graphql(reportUserQuery,
        {
            options: {
                fetchPolicy: 'network-only',
                ssr: false
            }
        }),
)(ReportUser);
