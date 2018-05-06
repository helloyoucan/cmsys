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
  Button
} from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;
@Form.create()
export default class LogoutModal extends PureComponent {

  state = {
    addInputValue: '',
    confirmLoading: false,
    formData: {
      assId: '',
      cancelReasons: '',
      assSituation: '',
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
              type: 'clubLogout/add',
              payload: values,
              callback: (res) => {
                if (res.ret) {
                  this.props.handleModalVisible();
                  this.props.form.resetFields();
                  this.props.getData();
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
              type: 'clubLogout/update',
              payload: {
                ...values,
                id: data.data.id
              },
              callback: (res) => {
                if (res.ret) {
                  this.props.handleModalVisible();
                  this.props.form.resetFields();
                  this.props.getData()
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
    const {data, modalLoading, clubList} = this.props;
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
    const status = ['', '初始录入', '审核中', '审核完成', '审核不通过']
    let clubList_obj = {};
    clubList.forEach(item => {
      clubList_obj[item.id] = item.name
    })
    const footer = (<div>
      <Button onClick={() => this.props.handleModalVisible()}>关闭</Button>
      {
        data.data && data.data.id && data.data.auditStatus === 1 ?
          <Button type="danger" onClick={() => this.props.startProcess(data.data.id)}>提交到任务</Button> : ''
      }
      <Button type="primary" onClick={this.handleOK.bind(this)}>确定</Button>
    </div>)
    return (
      <Modal
        title={title + '注销信息'}
        visible={this.props.modalVisible}
        onOk={this.handleOK.bind(this)}
        onCancel={() => this.props.handleModalVisible()}
        confirmLoading={this.state.confirmLoading}
        footer={footer}
      >
        {data.key == "read" ?
          <Card loading={modalLoading} bordered={false}>
            <LineMessage label="社团名称">
              {clubList_obj[formData.id]}
            </LineMessage>
            <LineMessage label="注销理由">
              {formData.cancelReasons}
            </LineMessage>
            <LineMessage label="社团情况">
              {formData.assSituation}
            </LineMessage>
            <LineMessage label="申请状态">
              {status[formData.auditStatus]}
            </LineMessage>
          </Card>
          :
          <Spin spinning={modalLoading}>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="选择社团"
            >
              {getFieldDecorator('assId', {
                rules: [{
                  required: true, message: '请选择',
                }], initialValue: formData.assId
              })(
                <Select filterOption showSearch style={{width: '100%'}}>
                  {
                    clubList && clubList.map((item) => {
                      return <Option value={item.id} key={item.id}>{item.name}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="注销理由"
            >
              {getFieldDecorator('cancelReasons', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.cancelReasons
              })(
                <TextArea rows={4}/>
              )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="社团情况"
            >
              {getFieldDecorator('assSituation', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.assSituation
              })(
                <TextArea rows={4}/>
              )}
            </FormItem>
          </Spin>
        }
      </Modal>
    )
  }
}
