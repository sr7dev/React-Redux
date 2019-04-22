import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import EditProfile from './EditProfile';

const title = 'Edit Profile';

export default {

  path: '/user/edit',

  action({ store }) {

    // From Redux Store
    let isAuthenticated = store.getState().runtime.isAuthenticated;

    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    return {
      title,
      component: <UserLayout><EditProfile title={title} /></UserLayout>,
    };
  },

};
