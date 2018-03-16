import React, {PureComponent} from 'react';
import {
  Form,
  Input,
  Modal,
  Radio
} from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
@Form.create()
export default class updatePsw extends PureComponent {

  state = {
    confirmLoading: false,
    formData: {
      password: ''
    },

  };


  handleOK() {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true,
        });
        this.props.dispatch({
          type: 'user/updatePsw',
          payload: {
            newPwd: values.password
          },
          callback: (res) => {
            if (res.ret) {
              this.props.onCancel();
              this.props.form.resetFields();
            }
            this.setState({
              confirmLoading: false,
            });
          }
        });

      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('您输出两次的密码不一样!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
    };
    return (
      <Modal
        title="修改密码"
        visible={this.props.visible}
        onOk={this.handleOK.bind(this)}
        onCancel={() => this.props.onCancel()}
        confirmLoading={this.state.confirmLoading}
      >
        <FormItem
          {...formItemLayout}
          label="密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="再次输入密码"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请再次输入密码!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur}/>
          )}
        </FormItem>
      </Modal>
    )
  }
}
