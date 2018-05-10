import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  message, Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Upload, Timeline
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import moment from 'moment';
import {Link} from 'dva/router';
const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

@connect(state => ({
  // clubLogout: state.clubLogout,
  yearbook: state.yearbook,
  // activityList: state.activityList,
  // article: state.article,
  workflow: state.workflow,
  info: state.info
}))
@Form.create()
export default class AlPage extends PureComponent {
  state = {
    confirmLoading: false,
    uploadLoading: false,
    taskData: {
      "outcomeList": [],
      "commentVoList": null,
      "businessData": {
        "editStatus": 0,
        "formKey": "",
        "assId": 0,
        "deleteStatus": 0,
        "auditStatus": 0,
        "id": 0,
        /*----*/
        actName: '',//活动名称
        actTime: moment(new Date()),//活动时间
        actZone: '校内',//活动区域（校内或校外）
        actPlace: '',//活动地点
        actType: '',//活动类型
        actNumber: '',//活动人数
        actRemarks: '',//活动简介
        hostUnit: '',//主办单位
        coUnit: '',//协办单位
        actLead: "",//活动负责人
        actLeadTeacher: "",//活动负责老师
        actPlan: [],//活动策划资料存储路径
      },
      "taskId": ""
    },
    formData: {
      outcome: '',
      comment: ''
    },
    clubList: [],
    type: '',
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'info/getAll',
      payload: {},
      callback: (res) => {
        this.setState({
          clubList: res.data
        });
      }
    });
    this.getData({})
  }

  getData() {
    if (this.props.location.data != undefined) {
      const {taskId, type} = this.props.location.data;
      if (taskId != null) {
        this.props.dispatch({
          type: type,
          payload: {
            taskId: taskId
          },
          callback: (res) => {
            let actPlan = res.data.businessData.actPlan == '' ? [] : res.data.businessData.actPlan.split('$')
            actPlan = actPlan.map(item => {
              return JSON.parse(item)
            })
            res.data.businessData = {
              ...res.data.businessData,
              actPlan,
              actLead: JSON.parse(res.data.businessData.actLead),
              actLeadTeacher: JSON.parse(res.data.businessData.actLeadTeacher)
            }
            this.setState({
              taskData: {
                ...res.data
              }
            })
          }
        })
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true
        })
        this.props.dispatch({
            type: 'activityList/submitTask',
            payload: {
              ...values,
              id: this.state.taskData.businessData.id,
              taskId: this.state.taskData.taskId
            },
            callback: () => {
              this.setState({
                confirmLoading: false
              })
              this.props.dispatch({
                  type: 'workflow/goToList',
                  payload: {
                    path: '/task/list'
                  }
                }
              )
            }
          }
        )
      }
    });
  }

  render() {
    const {taskData, clubList} = this.state
    let clubList_obj = {}
    clubList.forEach(item => {
      clubList_obj[item.id] = item.name
    })
    const {getFieldDecorator} = this.props.form;
    const {formData} = this.state;
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
      <PageHeaderLayout title="社团活动审批" content="">
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
              {clubList_obj[taskData.businessData.assId]}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="活动时间"
            >
              {taskData && moment(taskData.businessData.actTime).format('YYYY-MM-DD HH:mm')}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="活动区域"
            >
              {taskData && taskData.businessData.actZone}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="活动地点"
            >
              {taskData && taskData.businessData.actPlace}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="活动类型"
            >
              {taskData && taskData.businessData.actType}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="活动人数"
            >
              {taskData && taskData.businessData.actNumber}个

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="活动简介"
            >
              {taskData && taskData.businessData.actRemarks}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="主办单位"
            >
              {taskData && taskData.businessData.hostUnit}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="协办单位"
            >
              {taskData && taskData.businessData.coUnit}
            </FormItem>
            <p style={{'paddingLeft': '20%', 'fontSize': '20px'}}>活动负责人</p>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {taskData && taskData.businessData.actLead.name}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系电话"
            >
              {taskData && taskData.businessData.actLead.phone}

            </FormItem>
            <p style={{'paddingLeft': '20%', 'fontSize': '20px'}}>活动负责老师</p>

            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {taskData && taskData.businessData.actLeadTeacher.name}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系电话"
            >
              {taskData && taskData.businessData.actLeadTeacher.phone}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="活动策划资料"
            >
              {taskData && taskData.businessData.actPlan.map((item, index) => {
                return (<p key={index}><a href={item.response}>{item.name}</a></p>)
              })}
              {taskData && taskData.businessData.actPlan.length > 0 ? '' : '无'}
            </FormItem>
            {
              taskData.commentVoList == null ? '' : (
                <FormItem
                  {...formItemLayout}
                  label="历史审批信息"
                >
                  {taskData.commentVoList == null ? '' :
                    < Timeline >
                      {taskData.commentVoList.map(item => {
                        return (
                          <Timeline.Item
                            key={item.time}>{item.fullMessage} {moment(item.time).format('YYYY-MM-DD HH:mm')}</Timeline.Item>)
                      })}
                    </Timeline>
                  }
                </FormItem>
              )
            }
            <FormItem
              {...formItemLayout}
              label="审批信息"
            >
              {getFieldDecorator('comment', {
                rules: [{
                  required: true, message: '请填写',
                }], initialValue: formData.comment
              })(
                <TextArea rows={4}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="审批结果"
            >
              {getFieldDecorator('outcome', {
                rules: [{
                  required: true, message: '请选择',
                }], initialValue: formData.outcome
              })(
                <Select style={{width: '100%'}}>
                  {
                    taskData.outcomeList.map((item) => {
                      return <Option value={item} key={item}>{item}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{marginTop: 32}}>
              <Button type="primary" onClick={this.handleSubmit.bind(this)} htmlType="submit"
                      loading={this.state.confirmLoading}>
                提交
              </Button>
              <Button>
                <Link to={{
                  pathname: '/task/list',
                }
                }> 返回列表</Link> </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
