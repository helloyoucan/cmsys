import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {Button} from 'antd';

import styles from './ClubSpecies.less';
import TableList from './TableList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
export default class clubClass extends PureComponent {
  static defaultProps = {};

  state = {};


  render() {
    return (
      <div className={styles.component}>
        <PageHeaderLayout>
          <TableList/>
        </PageHeaderLayout>
      </div>
    );
  }
}
