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
import StandardTable from '../../../components/StandardTable/index';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import LogoutForm from './LogoutForm';
import LogoutModal from './LogoutModal';

@connect(state => ({
  clubLogout: state.clubLogout,
  currentUser: state.login.currentUser,
  info: state.info
}))
export default class LogoutTable extends PureComponent {
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
      type: 'clubLogout/queryList',
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
        this.setState({
          modalVisible: true,
          modalData: {
            key,
            id: ''
          }
        });
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

  startProcess(id) {
    const {formValues} = this.state;
    const that = this;
    this.props.dispatch({
      type: 'clubLogout/startProcess',
      payload: {
        id: id
      },
      callback: (res) => {
        const pagination= that.props.clubLogout.data.pagination;
        console.log(pagination)
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
    const {clubLogout: {loading: userLoading, data}} = this.props;
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
      {
        title: '复核次数',
        dataIndex: 'recheckNum',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (val) => {
          const status = ['', '初始录入', '审核中', '审核完成']
          return status[val]
        },
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: (val) => {
          let status = (data.list.find((item) => {
            return item.id == val
          })).status
          return ( <div>
            <Button disabled={status == 1} size="small" onClick={this.startProcess.bind(this, 'edit', val)}
                    type="danger">提交到任务</Button>
            <Divider type="vertical"/>
            <a href="javascript:;" onClick={this.handelModal.bind(this, 'read', val)}>查看详细</a>
          </div>)
        },
      },
    ];
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className="tableList">
            <div className="tableListForm">
              <LogoutForm
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
        <LogoutModal modalVisible={this.state.modalVisible}
                     modalLoading={this.state.modalLoading}
                     data={this.state.modalData}
                     clubList={clubList}
                     dispatch={this.props.dispatch}
                     startProcess={this.startProcess.bind(this)}
                     handleModalVisible={this.handleModalVisible.bind(this)}
        />

      </PageHeaderLayout>
    );
  }
}
