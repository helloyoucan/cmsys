import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  message, Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Upload,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import styles from './style.less';
import moment from 'moment';
import {Link} from 'dva/router';
const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

@connect(state => ({
  clubLogout: state.clubLogout,
  yearbook: state.yearbook,
  activityList: state.activityList,
  article: state.article,
  workflow: state.workflow,
  info: state.info
}))
export default class TaskPage extends PureComponent {
  state = {
    confirmLoading: false,
    uploadLoading: false,
    taskData: {
      "outcomeList": [],
      "commentVoList": null,
      "businessData": {
        "assSituation": "1",
        "formKey": "",
        "editStatus": 0,
        "assId": 0,
        "deleteStatus": 0,
        "auditStatus": 0,
        "id": 0,
        "cancelReasons": "0",
        "recheckNum": 0
      },
      "taskId": "12506"
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
      const {taskId, type} = this.props.location.data.taskId;
      console.log(type)
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

  render() {
    const {clubLogout, dispatch} = this.props;
    const {taskData, clubList} = this.state
    let clubList_obj = {}
    clubList.forEach(item => {
      clubList_obj[item.id] = item.name
    })
    return (
      <PageHeaderLayout title="社团注销表" content="">
        <Card bordered={false}>
          <LogoutForm
            dispatch={dispatch}
            clubList_obj={clubList_obj}
            taskData={taskData}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
