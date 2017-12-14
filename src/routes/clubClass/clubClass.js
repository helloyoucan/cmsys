import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {Button} from 'antd';

import styles from './clubClass.less';
import TableList from './tableList';
export default class clubClass extends PureComponent {
  static defaultProps = {};

  state = {};


  render() {
    return (
      <div className={styles.component}>
        <TableList/>
      </div>
    );
  }
}
