import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider
} from 'antd';
const FormItem = Form.Item;
const {Option} = Select;
@Form.create()
export default class ModalList extends PureComponent {

  state = {
    addInputValue: '',
  };

  handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
    });
  }

  handleAdd = () => {
    this.props.dispatch({
      type: 'rule/add',
      payload: {
        description: this.state.addInputValue,
      },
    });

    message.success('添加成功');
    this.props.handleModalVisible();
  }

  render() {
    return (
      <Modal
        title="新建规则"
        visible={this.props.modalVisible}
        onOk={this.handleAdd}
        onCancel={() => this.props.handleModalVisible()}
      >
        <FormItem
          labelCol={{span: 5}}
          wrapperCol={{span: 15}}
          label="描述"
        >
          <Input placeholder="请输入" onChange={this.handleAddInput} value={this.state.addInputValue}/>
        </FormItem>
      </Modal>
    )
  }
}
