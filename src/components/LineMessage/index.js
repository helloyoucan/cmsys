import React, {PureComponent} from 'react';
import {
  Row,
  Col,
} from 'antd';
import  styles from './index.less'
export  default class LineMessage extends PureComponent {

  render() {
    return (
      <Row gutter={8} className={styles.line}>
        <Col span={12} className={styles.label}>{this.props.label + "："}</Col>
        <Col span={12}>{this.props.children}</Col>
      </Row>
    )
  }
}
