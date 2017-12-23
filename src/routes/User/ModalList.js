import React, {PureComponent} from 'react';
import {connect} from 'dva';
import LineMessage from '../../components/LineMessage/index';
import moment from 'moment';
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
  Divider,
  Spin
} from 'antd';
const FormItem = Form.Item;
const {Option} = Select;
@Form.create()
export default class ModalList extends PureComponent {

  state = {
    addInputValue: '',
    confirmLoading: false,
    formData: {username: '', categoryId: '', assId: ''},
    ModalTitle: '',
  };

  componentDidMount() {

  }


  handleOK() {
    const {data} = this.props;
    switch (data.key) {
      case 'read':
        break;
      case 'add':
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            this.setState({
              confirmLoading: true,
            });
            this.props.dispatch({
              type: 'user/addUser',
              payload: values,
              callback: (res) => {
                if (res.ret) {
                  this.props.handleModalVisible();
                  this.props.form.resetFields();
                }
                this.setState({
                  confirmLoading: false,
                });
              }
            });

          }
        });
        break;
      case 'edit':
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            this.setState({
              confirmLoading: true,
            });
            this.props.dispatch({
              type: 'user/updateUser',
              payload: {
                ...values,
                id: data.data.id
              },
              callback: (res) => {
                if (res.ret) {
                  this.props.handleModalVisible();
                  this.props.form.resetFields();
                }
                this.setState({
                  confirmLoading: false,
                });
              }
            });

          }
        });
        break;
      default:
        break;
    }


  }


  render() {
    const {getFieldDecorator} = this.props.form;
    const {data, category, modalLoading} = this.props;
    const {username, categoryId, assId} = data.data == undefined ? this.state.formData : data.data;
    const formData = data.data == undefined ? {} : data.data;
    let title = '';
    switch (data.key) {
      case 'read':
        title = '查看';
        break;
      case 'add':
        title = '添加';
        break;
      case 'edit':
        title = '修改';
        break;
      default:
        break;
    }
    return (
      <Modal
        title={title + '用户'}
        visible={this.props.modalVisible}
        onOk={this.handleOK.bind(this)}
        onCancel={() => this.props.handleModalVisible()}
        confirmLoading={this.state.confirmLoading}
      >
        {data.key == "read" ?
          <Card loading={modalLoading} bordered={false}>
            <LineMessage label="用户名">
              {formData.username}
            </LineMessage>
            <LineMessage label="用户类型">
              {this.props.categoryObj[formData.categoryId]}
            </LineMessage>
            <LineMessage label="所属社团">
              {formData.assId}
            </LineMessage>
            <LineMessage label="用户状态">
              {formData.status == 1 ? '启用' : '禁用'}
            </LineMessage>
            <LineMessage label="添加时间">
              {moment(formData.insertTime).format('YYYY-MM-DD')}
            </LineMessage>
            <LineMessage label="添加人">
              {formData.insertMan}
            </LineMessage>
            <LineMessage label="最后修改时间">
              {moment(formData.lastupdTime).format('YYYY-MM-DD')}
            </LineMessage>
            <LineMessage label="最后修改人">
              {formData.lastupdMan}
            </LineMessage>

          </Card>
          :
          <Spin spinning={modalLoading}>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="用户名"
            >  {getFieldDecorator('username', {
              rules: [{required: true, message: '请输入!', whitespace: true}],
              initialValue: username
            })(
              <Input/>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="用户类型"
            >  {getFieldDecorator('categoryId', {
              rules: [{required: true, message: '请输入!', whitespace: true}],
              initialValue: categoryId
            })(
              <Select placeholder="用户类型" style={{width: '100%'}}>
                {category.map((item) => {
                  return ( <Option key={item.pmname} value={item.pmname}>{item.pmvalue}</Option>)
                })}
              </Select>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="所属社团"
            >  {getFieldDecorator('assId', {
              initialValue: assId
            })(
              <Input/>
            )}
            </FormItem>
          </Spin>
        }
      </Modal>
    )
  }
}
