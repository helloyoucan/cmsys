import React, {Component} from 'react';
import {
  message, Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Upload, Timeline
} from 'antd';
const FormItem = Form.Item;
import {Link} from 'dva/router';
import moment from 'moment';
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;
@Form.create()
export default class Name extends Component {
  state = {
    confirmLoading: false,
    uploadLoading: false,
    formData: {
      outcome: '',
      comment: ''
    },
  }

  componentDidMount() {

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true
        })
        this.props.dispatch({
            type: 'clubLogout/submitTask',
            payload: {
              ...values,
              taskId: this.props.taskData.taskId
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
    const {getFieldDecorator} = this.props.form;
    const {taskData, clubList_obj} = this.props;
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
          label="注销理由"
        >
          {taskData.businessData.cancelReasons}

        </FormItem>
        <FormItem
          {...formItemLayout}
          label="社团情况"
        >
          {taskData.businessData.assSituation}

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
    )
  }
}
