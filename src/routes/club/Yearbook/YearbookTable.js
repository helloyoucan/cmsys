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
import moment from 'moment'
import StandardTable from '../../../components/StandardTable/index';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import YearbookForm from './YearbookForm';
// import YearbookModal from './YearbookModal';
@connect(state => ({
  yearbook: state.yearbook,
  currentUser: state.login.currentUser,
  info: state.info
}))
export default class YearbookTable extends PureComponent {
  state = {
    addInputValue: '',
    modalVisible: false,
    modalLoading: false,
    modalData: {
      key: '',
      id: '',
      data: {}
    },
    clubList: [],
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
    this.props.dispatch({
      type: 'info/getAll',
      payload: {},
      callback: (res) => {
        this.setState({
          clubList: res.data
        });
      }
    });
    const {dispatch, currentUser} = this.props;
    if (isRefresh) {
      params = {
        keyword: '',
        pageNo: 1,
        pageSize: 10,
      }
    }
    dispatch({
      type: 'yearbook/queryList',
      payload: {
        assId: currentUser.assId || '',
        keyword: '',
        pageNo: 1,
        pageSize: 10,
        ...params
      }
    });
  }

  handleStandardTableChange = (pagination) => {
    const {dispatch} = this.props;
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
        this.props.dispatch({
          type: 'yearbook/goToPath',
          payload: {
            path: '/clubManagement/clubApproval/ybPage',
          }
        })
        /*this.setState({
         modalVisible: true,
         modalData: {
         key,
         id: ''
         }
         });*/
        break;
      case 'read':
        this.setState({
          modalVisible: true,
          modalLoading: true,
          modalData: {
            key,
          }
        });
        this.props.dispatch({
          type: 'yearbook/getOne',
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
    const {dispatch} = this.props;
    this.getData(({
      ...value,
    }))
  }

  handleFormReset() {
    this.setState({
      formValues: {}
    });
  }

  startProcess(type, id) {
    confirm({
      title: '你确定要启动审批流程?',
      content: '请确认',
      okText: '是的',
      okType: 'info',
      cancelText: '不，取消',
      onOk: () => {
        this.state.modalVisible = false
        const {formValues} = this.state;
        const that = this;
        this.props.dispatch({
          type: 'yearbook/startProcess',
          payload: {
            id: id
          },
          callback: (res) => {
            const pagination = that.props.yearbook.data.pagination;
            const params = {
              keyword: formValues.keyword,
              pageNo: pagination.currentPage,
              pageSize: pagination.pageSize,
            };
            that.getData(params);
          }
        })
      },
      onCancel() {
        message.warning('您取消了操作');
      },
    });

  }

  handleDelete(delOneId) {
    /*
     * delOneId：删除单个时的传参
     * */
    const {dispatch, yearbook: {data: {pagination}}} = this.props;
    let {selectedRows, formValues} = this.state;
    // let ids = selectedRows.map((item) => (item.id));
    // if (arguments.length > 1) {//删除单个
    //   ids.push(delOneId);
    // }
    // if (!ids) return;
    confirm({
      title: '你确定要删除这些信息吗?',
      content: '删除后不可恢复',
      okText: '是的',
      okType: 'danger',
      cancelText: '不，取消',
      onOk: () => {
        dispatch({
          type: 'yearbook/changeLoading',
          payload: {
            bool: true,
          },
        });
        dispatch({
          type: 'yearbook/del',
          payload: {
            id: delOneId
          },
          callback: () => {
            this.getData({
              ...formValues,
              pageNo: pagination.currentPage,
              pageSize: pagination.pageSize,
            })
          }
        });
      },
      onCancel() {
        message.warning('您取消了操作');
      },
    });
  }

  handelReadResult(id) {
    this.props.dispatch({
      type: 'yearbook/viewHisComment',
      payload: {
        id
      },
      callback: (res) => {
        this.props.dispatch({
          type: 'yearbook/goToPath',
          payload: {
            path: '/clubManagement/clubApproval/result',
            ...res.data
          }
        })
        console.log(res)
      }
    })
  }

  render() {
    const {yearbook: {loading: userLoading, data}} = this.props;
    const {selectedRows, clubList} = this.state;
    const columns = [
      {
        title: '社团名称',
        dataIndex: 'assId',
        render: (val) => {
          const data = (clubList.find((item) => {
            return item.id == val
          }))
          return data == undefined ? '' : data.name
        },
      },
      /* {
       title: '复核次数',
       dataIndex: 'recheckNum',
       },*/
      /*{
       title: '状态',
       dataIndex: 'status',
       render: (val) => {
       const status = ['', '初始录入', '审核中', '审核完成']
       return status[val]
       },
       },*/
      {
        title: '创建时间',
        dataIndex: 'insertTime',
        render: (val) => (moment(val).format('YYYY-MM-DD HH:mm:ss'))
      },
      {
        title: '状态',
        dataIndex: 'auditStatus',
        render: (val, row) => {
          const status = ['', '初始录入', '审核中', '审核完成', '审核不通过']
          return status[val]
        },
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: (val, row) => {
          let status = (data.list.find((item) => {
            return item.id == val
          })).status
          return ( <div>
            {row.auditStatus == 1 ? (
              <span>
                <Button disabled={status == 1} size="small" onClick={this.startProcess.bind(this, 'edit', val)}
                        type="danger">启动审批流程</Button>
                 < Divider type="vertical"/>
              </span>
            ) : '' }
            <Link to={{pathname: '/clubManagement/clubApproval/ybPage', data: {id: val}}}> 查看详细</Link>
            {row.auditStatus == 3 || row.auditStatus == 4 ? (
              <span>
                 <Divider type="vertical"/>
                <Link to={{pathname: '/clubManagement/clubApproval/ybResult', data: {id: val}}}> 查看审批信息</Link>
                <Divider type="vertical"/>
               <a href="javascript:;" onClick={this.handleDelete.bind(this, val)}>删除</a>
            </span>
            ) : '' }
            {row.auditStatus == 1 ? (
              <span>
               <Divider type="vertical"/>
               <a href="javascript:;" onClick={this.handleDelete.bind(this, val)}>删除</a>
              </span>
            ) : '' }
          </div>)
        },
      },
    ];
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className="tableList">
            <div className="tableListForm">
              <YearbookForm
                handleSearch={this.handleSearch.bind(this)}
                formReset={this.handleFormReset.bind(this)}
                dispatch={this.props.dispatch}
              />
            </div>
            <div className="tableListOperator">
              <Button icon="plus" type="primary" onClick={this.handelModal.bind(this, 'add', null)}>
                新建
              </Button>
            </div>
            <StandardTable
              // expandedRowRender={record => <p style={{margin: 0}}>{record.recheckNum}</p>}
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
        {/*<YearbookModal modalVisible={this.state.modalVisible}
         modalLoading={this.state.modalLoading}
         data={this.state.modalData}
         clubList={clubList}
         dispatch={this.props.dispatch}
         getData={this.getData.bind(this)}
         startProcess={this.startProcess.bind(this)}
         handleModalVisible={this.handleModalVisible.bind(this)}
         />*/}

      </PageHeaderLayout>
    );
  }
}
