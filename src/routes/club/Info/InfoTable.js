import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Card,
  Button,
  message,
  Divider,
} from 'antd';
import StandardTable from '../../../components/StandardTable/index';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import InfoForm from './InfoForm';
import InfoModal from './InfoModal';
import {routerRedux} from 'dva/router';

@connect(state => ({
  info: state.info,
  currentUser: state.login.currentUser
}))
export default class InfoTable extends PureComponent {
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
      type: 'info/queryList',
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
    /* switch (key) {
     case 'add':
     break;
     case 'edit':
     break;
     }*/
    this.props.dispatch({
      type: 'info/goToPage',
      payload: {
        id: id
      }
    });
    /*switch (key) {
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
     type: 'info/getOne',
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
     }*/
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

  render() {
    const {info: {loading: userLoading, data}} = this.props;
    const {selectedRows} = this.state;
    const columns = [
      {
        title: '社团名称',
        dataIndex: 'name',
      },
      {
        title: '社团类型',
        dataIndex: 'category',
      },
      {
        title: '活动领域',
        dataIndex: 'actField',
      },
      {
        title: '发起人',
        dataIndex: 'initSituation.name',
      },
      {
        title: '现任负责人',
        dataIndex: 'leadSituation.name',
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
              <InfoForm
                handleSearch={this.handleSearch.bind(this)}
                formReset={this.handleFormReset.bind(this)}
                dispatch={this.props.dispatch}
              />
            </div>
            <div className="tableListOperator">
              <Button icon="plus" type="primary" onClick={this.handelModal.bind(this, 'add', null)}>新建</Button>
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
        <InfoModal modalVisible={this.state.modalVisible}
                   modalLoading={this.state.modalLoading}
                   data={this.state.modalData}
                   dispatch={this.props.dispatch}
                   handleModalVisible={this.handleModalVisible.bind(this)}
        />

      </PageHeaderLayout>
    );
  }
}
