import React from 'react';
import Layout from '../../../components/Layout';
import Page from '../../../components/Page';

export default {

  path: '/about',

  async action({ locale }) {
    const data = await new Promise((resolve) => {
      require.ensure([], (require) => {
        try {
          resolve(require(`./about.${locale}.md`)); // eslint-disable-line import/no-dynamic-require
        } catch (e) {
          resolve(require('./about.md'));
        }
      }, 'about');
    });

    return {
      title: data.title,
      chunk: 'about',
      component: <Layout><Page {...data} /></Layout>,
    };
  },

};
