import React, {PureComponent} from 'react';
import {connect} from 'dva';
import LineMessage from '../../../components/LineMessage/index';
import moment from 'moment';
import {
  Card,
  Form,
  Input,
  Select,
  Modal,
  Spin,
  Radio,
  Upload,
  Button,
  Icon
} from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;
@Form.create()
export default class DataDownloadModal extends PureComponent {

  state = {
    addInputValue: '',
    confirmLoading: false,
    formData: {
      name: '',
      path: '',
      remarks: '',
    },
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
              type: 'dataDownload/add',
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
              type: 'dataDownload/update',
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
    const uploadSetting = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          //message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          // message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <Modal
        title={title + '资料'}
        visible={this.props.modalVisible}
        onOk={this.handleOK.bind(this)}
        onCancel={() => this.props.handleModalVisible()}
        confirmLoading={this.state.confirmLoading}
      >
        {data.key == "read" ?
          <Card loading={modalLoading} bordered={false}>
            <LineMessage label="文件名">
              {formData.name}
            </LineMessage>
            <LineMessage label="文件路径">
              {formData.path}
            </LineMessage>
            <LineMessage label="状态">
              {['不显示', '显示'][formData.status]}
            </LineMessage>
            <LineMessage label="备注">
              {formData.remarks}
            </LineMessage>

            <LineMessage label="上传时间">
              {moment(formData.insertTime).format('YYYY-MM-DD')}
            </LineMessage>
            <LineMessage label="上传人">
              {formData.insertMan}
            </LineMessage>
          </Card>
          :
          <Spin spinning={modalLoading}>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="文件名"
            >  {getFieldDecorator('name', {
              rules: [{required: true, message: '请输入!', whitespace: true}],
              initialValue: formData.name
            })(
              <Input/>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="文件路径"
            >  {getFieldDecorator('path', {
              rules: [{required: true, message: '请输入!', whitespace: true}],
              initialValue: formData.path
            })(
              <Upload {...uploadSetting}>
                <Button>
                  <Icon type="upload"/> Click to Upload
                </Button>
              </Upload>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="备注"
            >  {getFieldDecorator('remarks', {
              rules: [{required: true, message: '请输入!', whitespace: true}],
              initialValue: formData.remarks
            })(
              <TextArea rows={3}/>
            )}
            </FormItem>


          </Spin>
        }
      </Modal>
    )
  }
}
