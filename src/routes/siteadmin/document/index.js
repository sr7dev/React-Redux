import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import Document from './Document';

const title = 'Document Verification Management';

export default {

  path: '/siteadmin/document',

  async action({ store }) {


    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

    if (!isAdminAuthenticated) {
      return { redirect: '/siteadmin/login' };
    }

    return {
      title,
      component: <AdminLayout><Document title={title} /></AdminLayout>,
    };
  },

};
