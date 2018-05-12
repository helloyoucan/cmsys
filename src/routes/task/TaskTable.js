import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Card,
  Button,
  message,
  Divider,
  Modal
} from 'antd';
const confirm = Modal.confirm;
import {Link} from 'dva/router';
import StandardTable from '../../components/StandardTable/index';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import TaskForm from './TaskForm';
// import TaskModal from './TaskModal';
import moment from 'moment';
@connect(state => ({
  clubLogout: state.clubLogout,
  currentUser: state.login.currentUser,
  workflow: state.workflow,
}))
export default class TaskTable extends PureComponent {
  state = {
    addInputValue: '',
    modalVisible: false,
    modalLoading: false,
    modalData: {
      key: '',
      id: '',
      data: {}
    },
    expandForm: false,
    selectedRows: [],
    formValues: {
      keyword: ""
    },
    SwitchLoadingId: ''


  };

  componentDidMount() {
    this.getData({})
  }

  getData(params, isRefresh) {
    const {dispatch, currentUser} = this.props;
    if (isRefresh) {
      params = {
        keyword: '',
        pageNo: 1,
        pageSize: 10,
      }
    }
    dispatch({
      type: 'workflow/getTaskList',
      payload: {
        assId: currentUser.assId || '',
        pageNo: 1,
        pageSize: 10,
        ...params
      }
    });
  }

  handleStandardTableChange = (pagination) => {
    const {formValues} = this.state;
    const params = {
      keyword: formValues.keyword,
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    };
    this.getData(params);
  }

  handelModal(key, id) {
    switch (key) {
      case 'add':
        break;
      case 'edit':
        break;
    }
    switch (key) {
      case 'add':
        this.setState({
          modalVisible: true,
          modalData: {
            key,
            id: ''
          }
        });
        break;
      case 'read':
      case 'edit':
        this.setState({
          modalVisible: true,
          modalLoading: true,
          modalData: {
            key,
          }
        });
        this.props.dispatch({
          type: 'clubLogout/getOne',
          payload: {
            id
          },
          callback: (res) => {
            if (res.ret) {
              var old = this.state.modalData;
              this.setState({
                modalData: {
                  ...old,
                  data: res.data,
                },
                modalLoading: false,
              });
            } else if (res.msg) {
              message.error(res.msg);
            }
          }
        });

        break;
      default:
        return;
    }
  }

  handleModalVisible() {
    this.setState({
      modalVisible: false
    })
  }


  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleSearch(value) {
    this.setState({
      formValues: {
        ...value
      },
      selectedRows: [],
    });
    this.getData(({
      ...value,
    }))
  }

  handleFormReset() {
    this.setState({
      formValues: {}
    });
  }


  submitTask(id) {
    this.props.dispatch({
      type: 'clubLogout/viewTaskFrom',
      payload: {
        taskId: id
      },
      callback: (res) => {
        console.log(res)
      }
    })


    this.state.modalVisible = false
    const {formValues} = this.state;
    const that = this;
    this.props.dispatch({
      type: 'clubLogout/submitTask',
      payload: {
        id: id
      },
      callback: (res) => {
        const pagination = that.props.clubLogout.taskSubmit.pagination;
        const params = {
          keyword: formValues.keyword,
          pageNo: pagination.currentPage,
          pageSize: pagination.pageSize,
        };
        that.getData(params);
      }
    })
  }

  render() {
    const {workflow: {data, loading: userLoading,}} = this.props;
    const {selectedRows} = this.state;
    const columns = [
      {
        title: '任务类型',
        dataIndex: 'processDefinitionKey',
        render: (val) => {
          switch (val) {
            case 'ass-cancel'://注销
           return '社团注销'
              break;
            case 'ass-act'://活动
              return '社团活动'
              break;
            case 'ass-ann'://年审
              return '社团年审'
              break;
            case 'act-art'://推文
              return '推文发布'
              break;
          }
        }
      },
      {
        title: '任务名称',
        dataIndex: 'name',
      },
      {
        title: '创建日期',
        dataIndex: 'createTime',
        render: (val) => {
          return moment(val).format('YYYY-MM-DD HH:mm')
        }
      },
      {
        title: '任务办理人',
        dataIndex: 'assignee',
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: (val, row) => {
          let type = '', pathname = '';
          switch (row.processDefinitionKey) {
            case 'ass-cancel'://注销
              type = 'clubLogout'
              pathname = '/task/taskLogoutPage'
              break;
            case 'ass-act'://活动
              type = 'activityList'
              pathname = '/task/taskActPage'
              break;
            case 'ass-ann'://年审
              type = 'yearbook'
              pathname = '/task/taskYbPage'
              break;
            case 'act-art'://推文
              type = 'article'
              pathname = '/task/taskArtPage'
              break;
          }
          return (
            <div>
              {/* <a href="javascript:;" onClick={this.submitTask.bind(this, val)}></a>*/}
              <Link to={{
                pathname,
                data: {
                  taskId: val,
                  type: type += '/viewTaskFrom'
                }
              }}> 提交审批任务</Link>
              <Divider type="vertical"/>
              <Link to={{
                pathname: '/task/progress',
                data: {taskId: val}
              }}> 查看进度</Link>
              {/*           <Divider type="vertical"/>
               <a href="javascript:;" onClick={this.handelModal.bind(this, 'read', val)}>查看详细</a>
               <Divider type="vertical"/>
               <a href="javascript:;" onClick={this.handelModal.bind(this, 'edit', val)}>修改</a>
               */}
            </div>
          )
        },
      },
    ];
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className="tableList">
            <div className="tableListForm">
              {/*  <TaskForm
               handleSearch={this.handleSearch.bind(this)}
               formReset={this.handleFormReset.bind(this)}
               dispatch={this.props.dispatch}
               />*/}
            </div>
            <div className="tableListOperator">
              <Button type="primary" onClick={this.getData.bind(this, {})}>
                刷新
              </Button>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={userLoading}
              columns={columns}
              data={data}
              isSelect={false}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        {/* <TaskModal modalVisible={this.state.modalVisible}
         modalLoading={this.state.modalLoading}
         data={this.state.modalData}
         dispatch={this.props.dispatch}
         submitTask={this.submitTask.bind(this)}
         handleModalVisible={this.handleModalVisible.bind(this)}
         />*/}

      </PageHeaderLayout>
    );
  }
}
