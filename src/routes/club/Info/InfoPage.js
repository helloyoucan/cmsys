import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  message, Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Upload,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './style.less';
import {Link} from 'dva/router';
const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

@connect(state => ({
  info: state.info,
  dataManagement: state.dataManagement
}))
@Form.create()
export default class InfoPage extends PureComponent {
  state = {
    confirmLoading: false,
    uploadLoading: false,
    association: [],
    formData: {
      id: '',
      name: '',//名称
      category: '',//类型
      purpose: '',//宗旨
      profile: '',//简介
      remarks: '',//备注
      actField: '',//活动领域
      initSituation: {//协会发起人基本情况
        name: '', phone: ''
      },
      leadSituation: {//协会现任负责人基本情况
        name: '', phone: ''
      },
      leadTeacherSituation: {//篮球协会指导老师基本情况
        name: '', phone: ''
      },
      assFile: [],//协会资料存储路径
      assFilename: [],//协会资料
    },
    fileList: []
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let assFile = ''
        this.state.formData.assFile.forEach(item => {
          assFile += JSON.stringify(item) + '$'
        })
        values = {
          ...values,
          assFile: assFile.length > 0 ? assFile.slice(0, -1) : '',
          initSituation: JSON.stringify(values.initSituation),
          leadSituation: JSON.stringify(values.leadSituation),
          leadTeacherSituation: JSON.stringify(values.leadTeacherSituation),
          assFilename: null
        }
        if (this.props.location.data != undefined && this.props.location.data.id != null) {
          this.props.dispatch({
            type: 'info/update',
            payload: {
              id: this.state.formData.id,
              ...values
            }
          });
        } else {
          this.props.dispatch({
            type: 'info/add',
            payload: values
          });
        }
      }
    });
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'dataManagement/queryAssociation',
      payload: {},
      callback: (res) => {
        this.setState({
          association: res.data ? res.data : []
        })
      }
    });
    this.getData({})
  }

  getData() {
    if (this.props.location.data != undefined) {
      const id = this.props.location.data.id;
      if (id != null) {
        this.props.dispatch({
          type: 'info/getOne',
          payload: {
            id: this.props.location.data.id
          },
          callback: (res) => {
            if (res.ret) {
              let assFile = res.data.assFile == '' ? [] : res.data.assFile.split('$')
              assFile = assFile.map(item => {
                return JSON.parse(item)
              })
              res.data.assFile = assFile
              res.data.initSituation = JSON.parse(res.data.initSituation)
              res.data.leadSituation = JSON.parse(res.data.leadSituation)
              res.data.leadTeacherSituation = JSON.parse(res.data.leadTeacherSituation)
              this.setState({
                formData: res.data
              })
            } else if (res.msg) {
              message.error(res.msg);
            }
          }
        });
      }
    }
  }

  render() {
    const {info} = this.props;
    const {getFieldDecorator} = this.props.form;
    //const formData = info.oneData == undefined ? {} : info.oneData;
    const {formData, association} = this.state
    const uploadSetting = {
      //showUploadList: false,
      fileList: formData.assFile,
      name: 'fileName',
      action: '/sys/file/uploadAssFile',
      headers: {
        authorization: 'authorization-text',
      },
      defaultFileList: formData.assFile,

      onChange: (info) => {
        let assFile = info.fileList;
        assFile = assFile.map((file) => {
          if (file.response) {
            file.url = file.response;
          }
          return file;
        });
        assFile = assFile.filter((file) => {
          if (file.response) {
            return file.response != undefined;
          }
          return true;
        });

        this.setState({
          formData: {
            ...this.state.formData,
            assFile: assFile
          }
        })


        if (info.file.status === 'done') {
          if (typeof info.file.response == 'string') {
            message.success('上传成功');
          } else {
            message.error(`上传失败`);
          }
        } else if (info.file.status === 'error') {
          message.error(`上传失败`);
        }

      },
      onRemove: (file) => {
        let assFile = this.state.formData.assFile.filter(item => {
          return item.response != file.response
        })
        this.setState({
          formData: {
            ...this.state.formData,
            assFile: assFile
          }
        })
      }
    }
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10},
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 10, offset: 7},
      },
    };
    return (
      <PageHeaderLayout title="社团信息填写" content="">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{marginTop: 8}}
          >
            <FormItem
              {...formItemLayout}
              label="社团名称"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.name
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="社团类型"
            >
              {getFieldDecorator('category', {
                rules: [{
                  required: true, message: '请选择',
                }], initialValue: formData.category
              })(
                <Select >
                  {association.map(item => {
                    return ( <Option value={item.pmname} key={item.id}>{item.pmvalue}</Option>)
                  })}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="社团宗旨"
            >
              {getFieldDecorator('purpose', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.purpose
              })(
                <TextArea rows="4"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="社团简介"
            >
              {getFieldDecorator('profile', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.profile
              })(
                <TextArea rows="4"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="活动领域"
            >
              {getFieldDecorator('actField', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.name
              })(
                <TextArea rows="2"/>
              )}
            </FormItem>

            <p style={{'paddingLeft': '20%', 'fontSize': '20px'}}>发起人资料</p>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {getFieldDecorator('initSituation.name', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.initSituation.name
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系电话"
            >
              {getFieldDecorator('initSituation.phone', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.initSituation.phone
              })(
                <Input/>
              )}
            </FormItem>
            <p style={{'paddingLeft': '20%', 'fontSize': '20px'}}>现任负责人资料</p>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {getFieldDecorator('leadSituation.name', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.leadSituation.name
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系电话"
            >
              {getFieldDecorator('leadSituation.phone', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.leadSituation.phone
              })(
                <Input/>
              )}
            </FormItem>
            <p style={{'paddingLeft': '20%', 'fontSize': '20px'}}>指导老师资料</p>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {getFieldDecorator('leadTeacherSituation.name', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.leadTeacherSituation.name
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系电话"
            >
              {getFieldDecorator('leadTeacherSituation.phone', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.leadTeacherSituation.phone
              })(
                <Input/>
              )}
            </FormItem>
            <p style={{'paddingLeft': '20%', 'fontSize': '20px'}}>社团成立资料</p>
            <FormItem
              {...formItemLayout}
              label="社团成立资料"
            >
              <Upload {...uploadSetting}>
                <Button>
                  <Icon type="upload"/> 点击上传
                </Button>
              </Upload>
              <p>提示：社团成立资料包括申请表、业务指导部门意见、社团章程等</p>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="备注"
            >
              {getFieldDecorator('remarks', {
                rules: [{}], initialValue: formData.remarks
              })(
                <TextArea rows="4"/>
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{marginTop: 32}}>
              <Button type="primary" htmlType="submit" loading={this.state.confirmLoading}>
                保存
              </Button>
              <Button>
                <Link to={{
                  pathname: '/clubManagement/cinfoList',
                }
                }> 返回列表</Link> </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
