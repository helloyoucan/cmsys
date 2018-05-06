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
  yearbook: state.yearbook,
  currentUser: state.login.currentUser,
}))
export default class TaskResult extends Component {
  state = {
    confirmLoading: false,
    uploadLoading: false,
    taskData: null,
    clubName: []
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
        /*this.props.dispatch({
         type: 'clubLogout/viewHisComment',
         payload: {
         id
         },
         callback: (res) => {
         console.log(res)
         this.setState({
         taskData: res.data
         })
         }
         })*/
      }
    }
  }


  render() {
    const {taskData} = this.state;
    const {clubName} = this.state
    /*let clubList_obj = {}
     this.state.clubList.forEach(item => {
     clubList_obj[item.id] = item.name
     })*/
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
      <PageHeaderLayout title="社团注销表" content="">
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
