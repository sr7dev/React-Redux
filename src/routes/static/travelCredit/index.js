import React from 'react';
import Layout from '../../../components/Layout';
import Page from '../../../components/Page';

export default {

  path: '/travel',

  async action({ locale }) {
    const data = await new Promise((resolve) => {
      require.ensure([], (require) => {
        resolve(require('./travelCredit.md'));
      }, 'travelCredit');
    });

    return {
      title: data.title,
      chunk: 'travelCredit',
      component: <Layout><Page {...data} /></Layout>,
    };
  },

};
