import React from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Index from '../../components/User/index';
export default class User extends React.Component {
  render() {
    return (
      <div>
        <PageHeaderLayout>
          <Index></Index>
        </PageHeaderLayout>
      </div>
    )
  }
}
