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
const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
  rule: state.rule,
}))
export default class TableList extends PureComponent {
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
      type: 'rule/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const {dispatch} = this.props;
    const {formValues} = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {...obj};
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  }


  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }
  handleMenuClick = (e) => {
    const {dispatch} = this.props;
    const {selectedRows} = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleSetFormValues(value) {
    this.setState({
      formValues: value
    });
  }

  handleFormReset() {
    this.setState({
      formValues: {}
    });
  }

  render() {
    const {rule: {loading: ruleLoading, data}} = this.props;
    const {selectedRows} = this.state;
    const statusMap = ['default', 'processing', 'success', 'error'];
    const status = ['关闭', '运行中', '已上线', '异常'];
    const columns = [
      {
        title: '规则编号',
        dataIndex: 'no',
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
      {
        title: '服务调用次数',
        dataIndex: 'callNo',
        sorter: true,
        render: val => (
          <div style={{textAlign: 'center'}}>
            {val} 万
          </div>
        ),
      },
      {
        title: '状态',
        dataIndex: 'status',
        filters: [
          {
            text: status[0],
            value: 0,
          },
          {
            text: status[1],
            value: 1,
          },
          {
            text: status[2],
            value: 2,
          },
          {
            text: status[3],
            value: 3,
          },
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]}/>;
        },
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: () => (
          <div>
            <a href="">删除</a>
            <Divider type="vertical"/>
            <a href="">修改</a>
          </div>
        ),
      },
    ];
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className="tableList">
            <div className="tableListForm">
              <FormList
                setFormValues={this.handleSetFormValues.bind(this)}
                formReset={this.handleFormReset.bind(this)}
                dispatch={this.props.dispatch}
              />
            </div>
            <div className="tableListOperator">
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>新建</Button>
              {
                selectedRows.length > 0 && (
                  <span>
                    <Button>批量操作</Button>
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down"/>
                      </Button>
                    </Dropdown>
                  </span>
                )
              }
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={ruleLoading}
              columns={columns}
              data={data}
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
