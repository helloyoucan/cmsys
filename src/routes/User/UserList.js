import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Card,
  Button,
  message,
  Divider,
  Switch
} from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FormList from './FormList';
import ModalList from './ModalList';
import moment from 'moment';

@connect(state => ({
  user: state.user,
  dictionary: state.dictionary
}))
export default class UserList extends PureComponent {
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
    SwitchLoadingId: ''


  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'dictionary/getCategory'
    });
    dispatch({
      type: 'user/queryUserList',
      payload: {
        categoryId: '',
        pageNo: 1,
        pageSize: 10
      }
    });
  }

  handleStandardTableChange = (pagination) => {
    const {dispatch} = this.props;
    const {formValues} = this.state;

    const params = {
      categoryId: formValues.categoryId,
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    };
    dispatch({
      type: 'user/queryUserList',
      payload: params,
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
          type: 'user/getOneUser',
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
    dispatch({
      type: 'user/queryUserList',
      payload: {
        categoryId: value.categoryId,
        pageNo: 1,
        pageSize: 10
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
    let type = val == 0 ? 'user/enableOneUser' : 'user/disableOneUser';
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

  render() {
    const {user: {loading: userLoading, data}, dictionary: {category}} = this.props;
    let category_obj = {};
    category.forEach((item) => {
      category_obj[item.pmname] = item.pmvalue;
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
          return category_obj[val];
        },
      },
      {
        title: '所属社团',
        dataIndex: 'assId',
        render(val) {
          return val == -1 ? '' : val;
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
          </div>
        ),
      },
    ];
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className="tableList">
            <div className="tableListForm">
              <FormList
                handleSearch={this.handleSearch.bind(this)}
                formReset={this.handleFormReset.bind(this)}
                category={category}
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
        <ModalList modalVisible={this.state.modalVisible}
                   modalLoading={this.state.modalLoading}
                   category={category}
                   data={this.state.modalData}
                   dispatch={this.props.dispatch}
                   handleModalVisible={this.handleModalVisible.bind(this)}
                   categoryObj={category_obj}/>

      </PageHeaderLayout>
    );
  }
}
