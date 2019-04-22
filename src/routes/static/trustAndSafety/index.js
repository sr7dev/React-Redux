import React from 'react';
import Layout from '../../../components/Layout';
import Page from '../../../components/Page';

export default {

  path: '/safety',

  async action({ locale }) {
    const data = await new Promise((resolve) => {
      require.ensure([], (require) => {
        resolve(require('./trustAndSafety.md'));
      }, 'trustAndSafety');
    });

    return {
      title: data.title,
      chunk: 'trustAndSafety',
      component: <Layout><Page {...data} /></Layout>,
    };
  },

};
