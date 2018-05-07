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
  article: state.article,
  workflow: state.workflow,
  info: state.info,
  dataManagement: state.dataManagement
}))
@Form.create()
export default class logoutPage extends PureComponent {
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
        title: '',//文章标题
        type: 'YUGAO',//文章类型// 1推文，2预告
        showStatus: 1,//展示状态，1为展示，0为不展示
        content: '',//文章内容
      },
      "taskId": ""
    },
    formData: {
      outcome: '',
      comment: ''
    },
    clubList: [],
    tweetType: [],
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
    this.props.dispatch({
      type: 'dataManagement/queryTweet',
      payload: {},
      callback: (res) => {
        this.setState({
          tweetType: res.data
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
            type: 'article/submitTask',
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
    const {taskData, clubList, tweetType} = this.state
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
      <PageHeaderLayout title="社团推文审批" content="">
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
              label="文章标题"
            >
              {taskData && taskData.businessData.title}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="文章类型"
            >
              {taskData &&
              tweetType.length == 0 ?
                ''
                : tweetType.find(item => {
                  return taskData.businessData.type == item.pmname
                }).pmvalue }

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="展示状态"
            >
              {taskData && ['不展示', '展示'][taskData.businessData.showStatus]}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="文章内容"
            >
              {taskData && taskData.businessData.content}

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
