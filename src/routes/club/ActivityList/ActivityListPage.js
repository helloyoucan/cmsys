import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  message, Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Upload,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const {RangePicker} = DatePicker;
const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;
import {Link} from 'dva/router';
import moment from 'moment';

@connect(state => ({
  info: state.info,
  activityList: state.activityList,
  currentUser: state.login.currentUser,
}))
@Form.create()
export default class ActivityListPage extends PureComponent {
  state = {
    confirmLoading: false,
    clubName: [],
    formData: {
      actName: '',//活动名称
      actTime: moment(new Date()),//活动时间
      actZone: '校内',//活动区域（校内或校外）
      actPlace: '',//活动地点
      actType: '',//活动类型
      actNumber: '',//活动人数
      actRemarks: '',//活动简介
      hostUnit: '',//主办单位
      coUnit: '',//协办单位
      actLead: {//活动负责人
        name: '', phone: ''
      },
      actLeadTeacher: {//活动负责老师
        name: '', phone: ''
      },
      actPlan: [],//活动策划资料存储路径
    },
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let actPlan = ''
        this.state.formData.actPlan.forEach(item => {
          actPlan += JSON.stringify(item) + '$'
        })
        values = {
          assId: this.props.currentUser.assId,
          ...values,
          actPlan: actPlan.length > 0 ? actPlan.slice(0, -1) : '',
          actLead: JSON.stringify(values.actLead),
          actLeadTeacher: JSON.stringify(values.actLeadTeacher),
          actTime: values.actTime.format('x')
        }
        this.setState({
          confirmLoading: true
        })
        if (this.props.location.data != undefined && this.props.location.data.id != null) {
          this.props.dispatch({
            type: 'activityList/update',
            payload: {
              id: this.state.formData.id,
              ...values
            },
            callback: (res) => {
              this.afterSubmit(res)
            }
          });
        } else {
          this.props.dispatch({
            type: 'activityList/add',
            payload: values,
            callback: (res) => {
              this.afterSubmit(res)
            }
          });
        }
      }
    });
  }

  afterSubmit(res) {
    this.setState({
      confirmLoading: false
    })
    if (res.ret) {
      this.setState({
        formData: {
          ...this.state.formData,
          editStatus: 0
        }
      })
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'info/getAll',
      payload: {},
      callback: (res) => {
        res.data.unshift({id: -1, name: '不属于任何社团'})
        const club = res.data.find(item => {
          return item.id == this.props.currentUser.assId
        })
        this.setState({
          clubName: club ? club.name : ''
        });
      }
    });
    if (this.props.location.data != undefined) {
      const id = this.props.location.data.id;
      if (id != null) {
        this.props.dispatch({
          type: 'activityList/getOne',
          payload: {
            id
          },
          callback: (res) => {
            if (res.ret) {
              let actPlan = res.data.actPlan == '' ? [] : res.data.actPlan.split('$')
              actPlan = actPlan.map(item => {
                return JSON.parse(item)
              })
              res.data = {
                ...res.data,
                actPlan,
                actLead: JSON.parse(res.data.actLead),
                actLeadTeacher: JSON.parse(res.data.actLeadTeacher),
                actTime: moment(res.data.actTime)
              }
              this.setState({
                formData: res.data
              })
            } else if (res.msg) {
              message.error(res.msg);
            }
          }
        })
      }
    }
  }


  render() {
    const {getFieldDecorator} = this.props.form;
    const {formData, clubName} = this.state
    const uploadSetting = {
      fileList: formData.actPlan,
      name: 'fileName',
      action: '/sys/file/uploadActPlanFile',
      headers: {
        authorization: 'authorization-text',
      },
      onChange: (info) => {
        let actPlan = info.fileList;
        actPlan = actPlan.map((file) => {
          if (file.response) {
            file.url = file.response;
          }
          return file;
        });
        actPlan = actPlan.filter((file) => {
          if (file.response) {
            return file.response != undefined;
          }
          return true;
        });

        this.setState({
          formData: {
            ...this.state.formData,
            actPlan: actPlan
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
        let actPlan = this.state.formData.actPlan.filter(item => {
          return item.response != file.response
        })
        this.setState({
          formData: {
            ...this.state.formData,
            actPlan: actPlan
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
      <PageHeaderLayout title="社团活动资料" content="">
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
              {clubName}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="活动名称"
            >
              {getFieldDecorator('actName', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.actName
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="活动时间"
            >
              {getFieldDecorator('actTime', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.actTime
              })(
                <DatePicker showTime format="YYYY-MM-DD HH:mm"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="活动区域"
            >
              {getFieldDecorator('actZone', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.actZone
              })(
                <RadioGroup>
                  <Radio value={"校内"} defaultChecked={true}>校内</Radio>
                  <Radio value={"校外"}>校外</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="活动地点"
            >
              {getFieldDecorator('actPlace', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.actPlace
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="活动类型"
            >
              {getFieldDecorator('actType', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.actType
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="活动人数"
            >
              {getFieldDecorator('actNumber', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.actNumber
              })(
                <Input type="number"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="活动简介"
            >
              {getFieldDecorator('actRemarks', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.actRemarks
              })(
                <TextArea rows="4"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="主办单位"
            >
              {getFieldDecorator('hostUnit', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.hostUnit
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="协办单位"
            >
              {getFieldDecorator('coUnit', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.coUnit
              })(
                <Input/>
              )}
            </FormItem>
            <p style={{'paddingLeft': '20%', 'fontSize': '20px'}}>活动负责人</p>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {getFieldDecorator('actLead.name', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.actLead.name
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系电话"
            >
              {getFieldDecorator('actLead.phone', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.actLead.phone
              })(
                <Input/>
              )}
            </FormItem>

            <p style={{'paddingLeft': '20%', 'fontSize': '20px'}}>活动负责老师</p>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {getFieldDecorator('actLeadTeacher.name', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.actLeadTeacher.name
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系电话"
            >
              {getFieldDecorator('actLeadTeacher.phone', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.actLeadTeacher.phone
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="活动策划资料"
            >
              <Upload {...uploadSetting}>
                <Button>
                  <Icon type="upload"/> 点击上传
                </Button>
              </Upload>
            </FormItem>
            {/*<FormItem
             {...formItemLayout}
             label="备注"
             >
             {getFieldDecorator('remarks', {
             rules: [{}], initialValue: formData.remarks
             })(
             <TextArea rows="4"/>
             )}
             </FormItem>*/}
            <FormItem {...submitFormLayout} style={{marginTop: 32}}>
              {
                formData.editStatus == 0 ? '' : (
                  <Button type="primary" htmlType="submit" loading={this.state.confirmLoading}>
                    保存
                  </Button>
                )
              }
              <Button>
                <Link to={{
                  pathname: '/clubManagement/clubApproval/alList',
                }
                }> 返回列表</Link> </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
