import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Card,
  Button,
  message,
  Divider,
  Switch,
  Modal,
  Icon
} from 'antd';
const confirm = Modal.confirm;
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import UserForm from './UserForm';
import UserModal from './UserModal';
import moment from 'moment';

@connect(state => ({
  user: state.user,
  dataManagement: state.dataManagement,
  info: state.info
}))
export default class UserTable extends PureComponent {
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
    formValues: {},
    SwitchLoadingId: '',
    resetPsId: '',
    clubsNames: []
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'dataManagement/queryUserCategory'
    });
    dispatch({
      type: 'info/getAll',
      payload: {},
      callback: (res) => {
        this.setState({
          clubsNames: res.data
        })
      }
    });
    this.getData({});
  }

  handleStandardTableChange = (pagination) => {
    const {dispatch} = this.props;
    const {formValues} = this.state;

    const params = {
      categoryId: formValues.categoryId,
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
      case 'edit':
        this.setState({
          modalVisible: true,
          modalLoading: true,
          modalData: {
            key,
          }
        });
        this.props.dispatch({
          type: 'user/getOne',
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
      formValues: value
    });
    const {dispatch} = this.props;
    this.getData({
      categoryId: value.categoryId
    })
  }

  getData(params, isRefresh) {
    const {dispatch} = this.props;
    if (isRefresh) {
      params = {
        categoryId: '',
        pageNo: 1,
        pageSize: 10,
      }
    }
    dispatch({
      type: 'user/queryList',
      payload: {
        categoryId: '',
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

  handleChangeStatus(val, id) {
    const {dispatch} = this.props;
    let type = val == 0 ? 'user/enableOne' : 'user/disableOne';
    this.setState({
      SwitchLoadingId: id,
    });
    dispatch({
      type: type,
      payload: {
        id: id
      },
      callback: () => {
        this.setState({
          SwitchLoadingId: '',
        });
      }
    });
  }

  handelResetPs(val) {
    const {dispatch} = this.props;
    const that = this;
    confirm({
      title: '你确定要重置该账号的密码?',
      content: '重置后的密码为初始密码',
      okText: '是的',
      okType: 'danger',
      cancelText: '不，取消',
      onOk() {
        that.setState({
          resetPsId: val
        })
        dispatch({
          type: 'user/resetPs',
          payload: {
            id: val
          },
          callback: () => {
            that.setState({
              resetPsId: ''
            })
          }
        });
      },
      onCancel() {
        message.warning('您取消了操作');
      },
    });
  }

  render() {
    const {user: {loading: userLoading, data}, dataManagement: {userCategory}} = this.props;
    const {clubsNames} = this.state
    let userCategory_obj = {};
    userCategory.forEach((item) => {
      userCategory_obj[item.pmname] = item.pmvalue;
    });
    const {selectedRows} = this.state;
    const columns = [
      {
        title: '名称',
        dataIndex: 'username',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (val, record) => {
          return (
            <Switch
              loading={record.id === this.state.SwitchLoadingId}
              checked={val == 1}
              checkedChildren="启用"
              unCheckedChildren="禁用"
              onChange={this.handleChangeStatus.bind(this, val, record.id)}
            />
          );
        },
      },
      {
        title: '用户类型',
        dataIndex: 'categoryId',
        render(val) {
          return userCategory_obj[val];
        },
      },
      {
        title: '所属社团',
        dataIndex: 'assId',
        render(val) {
          if (val == -1) return '';
          const club = clubsNames.find((item => {
            return item.id === val
          }));
          if (club != undefined) {
            return club.name;
          }
          return ''
        },
      },
      {
        title: '最后修改时间',
        dataIndex: 'lastupdTime',
        render(val) {
          return <span>{moment(val).format('YYYY-MM-DD')}</span>;
        },
      },
      {
        title: '最后修改人',
        dataIndex: 'lastupdMan',
        render(val) {
          return val;
        },
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: (val) => (
          <div>
            <a href="javascript:;" onClick={this.handelModal.bind(this, 'read', val)}>查看详细</a>
            <Divider type="vertical"/>
            <a href="javascript:;" onClick={this.handelModal.bind(this, 'edit', val)}>修改</a>
            <Divider type="vertical"/>
            {
              this.state.resetPsId === val ?
                <Icon type="loading"/>
                :
                <a href="javascript:;" style={{'color': 'red'}} onClick={this.handelResetPs.bind(this, val)}>重置密码</a>

            }
          </div>
        ),
      },
    ];
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className="tableList">
            <div className="tableListForm">
              <UserForm
                handleSearch={this.handleSearch.bind(this)}
                formReset={this.handleFormReset.bind(this)}
                userCategory={userCategory}
              />
            </div>
            <div className="tableListOperator">
              <Button icon="plus" type="primary" onClick={this.handelModal.bind(this, 'add')}>新建</Button>
              {
                // selectedRows.length > 0 && (
                //   <span>
                //     <Button onClick={this.handelDelete.bind(this)}>删除</Button>
                //   </span>
                // )
              }
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
        <UserModal modalVisible={this.state.modalVisible}
                   modalLoading={this.state.modalLoading}
                   userCategory={userCategory}
                   data={this.state.modalData}
                   dispatch={this.props.dispatch}
                   handleModalVisible={this.handleModalVisible.bind(this)}
                   userCategoryObj={userCategory_obj}
                   clubsNames={clubsNames}
                   handelGetData={this.getData.bind(this)}/>

      </PageHeaderLayout>
    );
  }
}
