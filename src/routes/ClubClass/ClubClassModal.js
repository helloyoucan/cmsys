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
export default class ClubClassModal extends PureComponent {

  state = {
    addInputValue: '',
    confirmLoading: false,
    formData: {name: ''},
    ModalTitle: '',
  };

  componentDidMount() {

  }


  handleOK() {
    const {data} = this.props;
    switch (data.key) {
      case 'read':
        this.props.handleModalVisible();
        break;
      case 'add':
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            this.setState({
              confirmLoading: true,
            });
            this.props.dispatch({
              type: 'clubClass/add',
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
              type: 'clubClass/update',
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
    const {data, modalLoading} = this.props;
    const {name} = data.data == undefined ? this.state.formData : data.data;
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
        title={title + '社团类型'}
        visible={this.props.modalVisible}
        onOk={this.handleOK.bind(this)}
        onCancel={() => this.props.handleModalVisible()}
        confirmLoading={this.state.confirmLoading}
      >
        {data.key == "read" ?
          <Card loading={modalLoading} bordered={false}>
            <LineMessage label="类别名">
              {formData.name}
            </LineMessage>
            <LineMessage label="社团类型状态">
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
              label="类别名"
            >  {getFieldDecorator('name', {
              rules: [{required: true, message: '请输入!', whitespace: true}],
              initialValue: name
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
