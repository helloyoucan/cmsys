import React, {PureComponent} from 'react';
import {connect} from 'dva';
import LineMessage from '../../../components/LineMessage/index';
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
export default class DictionaryModal extends PureComponent {

  state = {
    addInputValue: '',
    confirmLoading: false,
    formData: {pmappname: '', pmname: '', pmvalue: ''},
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
              type: 'dataManagement/saveDicParams',
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
              type: 'dataManagement/updateDicParams',
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
    const {data, modalLoading, allDicType} = this.props;
    const {pmappname, pmname, pmvalue} = data.data == undefined ? this.state.formData : data.data;
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
        title={title + '字典表'}
        visible={this.props.modalVisible}
        onOk={this.handleOK.bind(this)}
        onCancel={() => this.props.handleModalVisible()}
        confirmLoading={this.state.confirmLoading}
      >
        {data.key == "read" ?
          <Card loading={modalLoading} bordered={false}>
            <LineMessage label="分类名称">
              {formData.pmappname}
            </LineMessage>
            <LineMessage label="项名">
              {formData.pmname}
            </LineMessage>
            <LineMessage label="项值">
              {formData.pmvalue}
            </LineMessage>
            <LineMessage label="状态">
              {formData.status == 1 ? '启用' : '禁用'}
            </LineMessage>
           {/* <LineMessage label="添加时间">
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
            </LineMessage>*/}
          {/*  <LineMessage label="备注">
              {formData.remarks}
            </LineMessage>*/}
          </Card>
          :
          <Spin spinning={modalLoading}>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="分类名称"
            >  {getFieldDecorator('pmappname', {
              rules: [{required: true, message: '请输入!', whitespace: true}],
              initialValue: pmappname
            })(
              <Select style={{width: '100%'}}>
                {allDicType.map((item, index) => (
                  <Option key={index} value={item.pmappname}>{item.pmappname}</Option>))}
              </Select>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="项名"
            >  {getFieldDecorator('pmname', {
              rules: [{required: true, message: '请输入!', whitespace: true}],
              initialValue: pmname
            })(
              <Input/>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="项值"
            >  {getFieldDecorator('pmvalue', {
              rules: [{required: true, message: '请输入!', whitespace: true}],
              initialValue: pmvalue
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
