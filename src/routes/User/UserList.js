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
}))
export default class UserList extends PureComponent {
  state = {
    addInputValue: '',
    modalVisible: false,
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


  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }
  handelDelete = (e) => {
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
        categoryId: value,
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
    const {user: {loading: userLoading, data}} = this.props;
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
        title: '用户类别',
        dataIndex: 'value',
      },
      {
        title: '添加时间',
        dataIndex: 'insert_time',
        render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
      },
      {
        title: '用户类别',
        dataIndex: 'category_id',
        render(val) {
          return val;
        },
      },
      {
        title: '添加人',
        dataIndex: 'insert_man',
        render(val) {
          return val;
        },
      },
      {
        title: '操作',
        render: () => (
          <div>
            <a href="#">查看详细</a>
            <Divider type="vertical"/>
            <a href="#">修改</a>
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
              />
            </div>
            <div className="tableListOperator">
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>新建</Button>
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
                   dispatch={this.props.dispatch}
                   handleModalVisible={this.handleModalVisible}/>
      </PageHeaderLayout>
    );
  }
}
