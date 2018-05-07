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
  activityList: state.activityList,
  dataManagement: state.dataManagement
}))
export default class TaskResult extends Component {
  state = {
    confirmLoading: false,
    uploadLoading: false,
    taskData: null,
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
    if (this.props.location.data != undefined) {
      const id = this.props.location.data.id;
      if (id != null) {
        this.props.dispatch({
          type: 'article/viewHisComment',
          payload: {
            id
          },
          callback: (res) => {
            this.setState({
              taskData: res.data
            })
          }
        })
      }
    }
  }


  render() {
    const {taskData, tweetType} = this.state;
    let clubList_obj = {}
    this.state.clubList.forEach(item => {
      clubList_obj[item.id] = item.name
    })
    let type = tweetType.find(item => {
      return taskData && taskData.businessData.type == item.pmname
    })
    type = type == undefined ? '' : type.pmvalue
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
              label="文章标题"
            >
              {taskData && taskData.businessData.title}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="文章类型"
            >
              {taskData && type}

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
                  pathname: '/clubManagement/clubApproval/artList',
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
