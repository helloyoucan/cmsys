import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider
} from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FormList from './FormList';
import ModalList from './ModalList';
import moment from 'moment';
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
  user: state.user,
  dictionary: state.dictionary
}))
export default class UserList extends PureComponent {
  state = {
    addInputValue: '',
    modalVisible: false,
    modalData: {
      key: '',
      id: '',
    },
    expandForm: false,
    selectedRows: [],
    formValues: {},

  };

  componentDidMount() {
    const {dispatch} = this.props;
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
      case 'read':
        this.setState({
          modalVisible: true,
          modalData: {
            key,
            id
          }
        });
        break;
      case 'add':
        this.setState({
          modalVisible: true,
          modalData: {
            key,
            id: ''
          }
        });
        break;
      case 'edit':
        this.setState({
          modalVisible: true,
          modalData: {
            key,
            id
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

  handelEdit = (e) => {
    const {dispatch} = this.props;
    const {selectedRows} = this.state;
    if (!selectedRows) return;
    dispatch({
      type: 'rule/remove',
      payload: {
        id: selectedRows.map(row => row.id).join(','),
      },
      callback: () => {
        this.setState({
          selectedRows: [],
        });
      },
    });
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

  render() {
    const {user: {loading: userLoading, data}, dictionary: {category}} = this.props;
    const {selectedRows} = this.state;
    const columns = [
      {
        title: '名称',
        dataIndex: 'username',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: val => (val == 1 ? '启用' : '禁用')
      },
      {
        title: '用户类型',
        dataIndex: 'category_name',
        render(val) {
          return val;
        },
      },
      {
        title: '所属社团',
        dataIndex: 'ass_id',
        render(val) {
          return val;
        },
      },
      {
        title: '最后修改时间',
        dataIndex: 'lastupd_time',
        render(val) {
          return val;
        },
      },
      {
        title: '最后修改人',
        dataIndex: 'lastupd_man',
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
                dispatch={this.props.dispatch}
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
                   category={category}
                   data={this.state.modalData}
                   dispatch={this.props.dispatch}
                   handleModalVisible={this.handleModalVisible.bind(this)}/>
      </PageHeaderLayout>
    );
  }
}
