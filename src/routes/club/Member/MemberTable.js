import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Card,
  Button,
  message,
  Divider,
  Switch,
  Dropdown,
  Menu,
  Icon,
  Modal
} from 'antd';
const confirm = Modal.confirm;
import StandardTable from '../../../components/StandardTable/index';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import MemberForm from './MemberForm';
import MemberModal from './MemberModal';

@connect(state => ({
  clubMember: state.clubMember,
  dataManagement: state.dataManagement,
  currentUser: state.login.currentUser,
  info: state.login.info
}))
export default class MemberTable extends PureComponent {
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
      keyword: "",
      assId: ''
    },
    SwitchLoadingId: '',
    clubList: []

  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'info/getAll',
      payload: {},
      callback: (res) => {
        this.setState({
          clubList: res.data
        });
      }
    });
    dispatch({
      type: 'dataManagement/queryCollegeName'
    });
    this.getData({})
  }

  handleStandardTableChange = (pagination) => {
    const {formValues} = this.state;
    const {currentUser} = this.props;
    this.getData({
      keyword: formValues.keyword,
      assId: currentUser.assId == -1 ? formValues.assId : currentUser.assId,
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    });
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
      case 'edit':
        this.setState({
          modalVisible: true,
          modalLoading: true,
          modalData: {
            key,
          }
        });
        this.props.dispatch({
          type: 'clubMember/getOne',
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
    const {currentUser} = this.props;
    this.getData({
      assId: currentUser.assId == -1 ? value.assId : currentUser.assId,
      keyword: value.keyword,
    })
  }

  getData(params, isRefresh) {
    const {dispatch, currentUser} = this.props;
    if (isRefresh) {
      params = {
        assId: currentUser.assId == -1 ? '' : currentUser.assId,
        keyword: '',
        pageNo: 1,
        pageSize: 10,
      }
    }
    dispatch({
      type: 'clubMember/queryList',
      payload: {
        assId: currentUser.assId == -1 ? '' : currentUser.assId,
        keyword: '',
        pageNo: 1,
        pageSize: 10,
        ...params
      }
    });
  }

  handleFormReset() {
    this.setState({
      formValues: {}
    });
  }

  handleDelete(delOneId) {
    /*
     * delOneId：删除单个时的传参
     * */
    const {dispatch, clubMember: {data: {pagination}}} = this.props;
    let {selectedRows, formValues} = this.state;
    let ids = selectedRows.map((item) => (item.id));
    if (arguments.length > 1) {//删除单个
      ids.push(delOneId);
    }
    if (!ids) return;
    confirm({
      title: '你确定要删除这些信息吗?',
      content: '删除后不可恢复',
      okText: '是的',
      okType: 'danger',
      cancelText: '不，取消',
      onOk: () => {
        dispatch({
          type: 'clubMember/changeLoading',
          payload: {
            bool: true,
          },
        });
        dispatch({
          type: 'clubMember/dels',
          payload: {
            ids: ids
          },
          callback: () => {
            this.getData({
              ...formValues,
              pageNo: pagination.currentPage,
              pageSize: pagination.pageSize,
            });
            this.setState({
              selectedRows: [],
            });
          }
        });
      },
      onCancel() {
        message.warning('您取消了操作');
      },
    });
  }

  render() {
    const {currentUser, clubMember: {loading: userLoading, data}, dataManagement: {collegeName}} = this.props;
    const {clubList} = this.state
    let collegeName_obj = {};
    collegeName.forEach((item) => {
      collegeName_obj[item.pmname] = item.pmvalue;
    });


    const {selectedRows} = this.state;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '性别',
        dataIndex: 'sex',
      },
      {
        title: '学号',
        dataIndex: 'stuNum',
      },
      {
        title: '所属学院',
        dataIndex: 'college',
        render(val) {
          return collegeName_obj[val];
        },
      },

      {
        title: '专业',
        dataIndex: 'major',
      },
      {
        title: '所属社团',
        dataIndex: 'assName',
        key: 'assName',
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: (val) => (
          <div>
            <a href="javascript:;" onClick={this.handelModal.bind(this, 'read', val)}>查看详细</a>
            {currentUser.assId == -1 ? '' : (
              <span>
              <Divider type="vertical"/>
            <a href="javascript:;" onClick={this.handelModal.bind(this, 'edit', val)}>修改</a>
            <Divider type="vertical"/>
            <a href="javascript:;" onClick={this.handleDelete.bind(this, val)}>删除</a>
            </span>
            )}
          </div>
        ),
      },
    ];
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className="tableList">
            <div className="tableListForm">
              <MemberForm
                currentUser={currentUser}
                clubList={clubList}
                handleSearch={this.handleSearch.bind(this)}
                formReset={this.handleFormReset.bind(this)}
                dispatch={this.props.dispatch}
              />
            </div>
            <div className="tableListOperator">
              {currentUser.assId == -1 ? '' : (
                <Button icon="plus" type="primary" onClick={this.handelModal.bind(this, 'add')}>新建</Button>
              )}
              {
                selectedRows.length > 0 && (
                  <span>
                    <Button onClick={this.handleDelete.bind(this)}>删除</Button>
                  </span>
                )
              }
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={userLoading}
              columns={columns}
              data={data}
              isSelect={true}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <MemberModal modalVisible={this.state.modalVisible}
                     modalLoading={this.state.modalLoading}
                     data={this.state.modalData}
                     dispatch={this.props.dispatch}
                     handleModalVisible={this.handleModalVisible.bind(this)}
                     collegeName={collegeName}
                     collegeNameObj={collegeName_obj}
                     handelGetData={this.getData.bind(this)}
        />

      </PageHeaderLayout>
    );
  }
}
