import React, {Component} from 'react';
import {connect} from 'dva';
import {
  message, Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Upload, Timeline
} from 'antd';
const FormItem = Form.Item;
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import {Link} from 'dva/router';
import moment from 'moment';
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;
@connect(state => ({
  info: state.info,
  activityList: state.activityList
}))
export default class TaskResult extends Component {
  state = {
    confirmLoading: false,
    uploadLoading: false,
    taskData: null,
    clubList: []
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
    if (this.props.location.data != undefined) {
      const id = this.props.location.data.id;
      if (id != null) {
        this.props.dispatch({
          type: 'activityList/viewHisComment',
          payload: {
            id
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
              actLeadTeacher: JSON.parse(res.data.businessData.actLeadTeacher),
              actTime: moment(res.data.businessData.actTime)
            }
            this.setState({
              taskData: res.data
            })
          }
        })
      }
    }
  }


  render() {
    const {taskData} = this.state;
    let clubList_obj = {}
    this.state.clubList.forEach(item => {
      clubList_obj[item.id] = item.name
    })
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
      <PageHeaderLayout title="社团活动审批结果" content="">
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
              {taskData && clubList_obj[taskData.businessData.assId]}

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
              taskData && taskData.commentVoList == null ? '' : (
                <FormItem
                  {...formItemLayout}
                  label="历史审批信息"
                >
                  {taskData && taskData.commentVoList == null ? '' :
                    < Timeline >
                      {taskData && taskData.commentVoList.map(item => {
                        return (
                          <Timeline.Item
                            key={item.time}>{item.fullMessage} {moment(item.time).format('YYYY-MM-DD HH:mm')}</Timeline.Item>)
                      })}
                    </Timeline>
                  }
                </FormItem>
              )
            }

            <FormItem {...submitFormLayout} style={{marginTop: 32}}>
              <Button>
                <Link to={{
                  pathname: '/clubManagement/clubApproval/ybList',
                }
                }> 返回列表</Link>
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>

    )
  }
}
