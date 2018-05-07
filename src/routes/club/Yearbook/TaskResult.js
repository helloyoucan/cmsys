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
  yearbook: state.yearbook
}))
export default class TaskResult extends Component {
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
        annFile: '',//文件信息
        annFilename: '',
        instructSituation: {},//指导老师
        assMemberComp: '',//会员组成
        assSize: '',//社团规模
      },
      "taskId": ""
    },
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
          type: 'yearbook/viewHisComment',
          payload: {
            id
          },
          callback: (res) => {
            if (res.ret) {
              let annFile = res.data.businessData.annFile == '' ? [] : res.data.businessData.annFile.split('$')
              annFile = annFile.map(item => {
                return JSON.parse(item)
              })
              res.data.businessData.annFile = annFile
              res.data.businessData.instructSituation = JSON.parse(res.data.businessData.instructSituation)
              this.setState({
                taskData: {
                  ...res.data
                }
              })
            }

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
      <PageHeaderLayout title="社团年审审批结果" content="">
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
              label="社团规模"
            >
              {taskData.businessData.assSize}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="会员组成"
            >
              {taskData.businessData.assMemberComp}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="相关文件"
            >
              {
                taskData.businessData.annFile.length > 0 ? taskData.businessData.annFile.map(item => {
                  return ( <p key={item.lastModified}><a href={item.response}>{item.name}</a></p>)
                }) : '无'
              }

            </FormItem>
            <p style={{'paddingLeft': '20%', 'fontSize': '20px'}}>指导老师资料</p>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {taskData.businessData.instructSituation && taskData.businessData.instructSituation.name}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系方式"
            >
              {taskData.businessData.instructSituation && taskData.businessData.instructSituation.phone}

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
                }> 返回列表</Link> </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>

    )
  }
}
