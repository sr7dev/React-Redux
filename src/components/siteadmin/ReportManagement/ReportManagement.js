import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td } from 'reactable';
import { connect } from 'react-redux';
import moment from 'moment';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ReportManagement.css';


class ReportManagement extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            userId: PropTypes.number.isRequired,
            reporterId: PropTypes.string.isRequired,
            reporterType: PropTypes.string.isRequired,
        })),
    };

    static defaultProps = {
        data: []
    };


    render() {
        const { data, title } = this.props;

        return (
            <div className={cx(s.pagecontentWrapper)}>
                <div className={s.contentBox}>
                    <h1 className={s.headerTitle}>{title}</h1>
                    <div className={'table-responsive'}>

                        <Table className="table"
                            noDataText="No matching records found."
                            filterable={['Report Type']}
                            sortable={true}
                            itemsPerPage={20}
                        >
                            {
                                data && data.map(function (value, index) {
                                    let date = moment(value.createdAt).format('MM/DD/YYYY');
                                    return (
                                        <Tr key={index}>
                                            <Td column={"ID"}>
                                                {value.id}
                                            </Td>
                                            {
                                                value.reporterData && value.reporterData.displayName &&
                                                    <Td column={"Reporter Name"}>
                                                        {value.reporterData.displayName}
                                                    </Td> 

                                            }
                                            {
                                                value.reporterData === null &&
                                                 <Td column={"Reporter Name"}>
                                                    User Deleted
                                                    </Td>
                                            }
                                            {
                                                value.reporterData && value.reporterEmail.email &&
                                                <Td column={"Reporter Email"}>
                                                    <a
                                                        //href={"/users/show/" + value.userData.profileId} 
                                                        href={"/users/show/" + value.userProfileId.profileId}
                                                        target="_blank"
                                                    >
                                                        {value.reporterEmail.email}
                                                    </a>
                                                </Td>
                                            }
                                            {
                                                value.reporterData === null && <Td column={"Reporter Email"}>
                                                    User Deleted
                                                    </Td>
                                            }
                                            {
                                                value.userData && value.userData.displayName &&
                                                <Td column={"User Name"} data={value.userData.displayName} />
                                            }
                                            {
                                                value.userData === null && <Td column={"User Name"}>
                                                    User Deleted
                                                    </Td>
                                            }
                                            {
                                                value.userData && value.userEmail.email &&
                                                <Td column={"User Email"}>
                                                    <a
                                                        //href={"/users/show/" + value.userProfileId.profileId} 
                                                        href={"/users/show/" + value.userData.profileId}
                                                        target="_blank"
                                                    >
                                                        {value.userEmail.email}
                                                    </a>
                                                </Td>
                                            }
                                            {
                                                value.userData === null 
                                                && <Td column={"User Email"}>
                                                    User Deleted
                                                    </Td>
                                            }
                                            {
                                                value.reportType &&
                                                <Td
                                                    column={"Report Type"}
                                                    data={value.reportType}
                                                >
                                                </Td>
                                            }
                                            {
                                                value && <Td column={"Date"}>
                                                    {date}
                                                </Td>
                                            }
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
};

export default withStyles(s)(connect(mapState, mapDispatch)(ReportManagement));



