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

@connect(state => ({
  info: state.info,
  dataManagement: state.dataManagement
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
    SwitchLoadingId: '',
    association: []

  };

  componentDidMount() {
    this.props.dispatch({
      type: 'dataManagement/queryAssociation',
      payload: {},
      callback: (res) => {
        this.setState({
          association: res.data ? res.data : []
        })
      }
    });
    this.getData({})
  }

  getData(params, isRefresh) {
    if (isRefresh) {
      params = {
        keyword: '',
        pageNo: 1,
        pageSize: 10,
      }
    }
    this.props.dispatch({
      type: 'info/queryList',
      payload: {
        keyword: '',
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
    const {selectedRows, association} = this.state;
    const columns = [
      {
        title: '社团名称',
        dataIndex: 'name',
      },
      {
        title: '社团类型',
        dataIndex: 'category',
        render: (val) => {
          const ass = association.find(item => {
            return item.pmname == val
          })
          return ass ? ass.pmvalue : ''
        }
      },
      {
        title: '活动领域',
        dataIndex: 'actField',
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: (val) => (
          <div>
            <a href="javascript:;" onClick={this.handelModal.bind(this, 'read', val)}>查看详细</a>
            {/*<Divider type="vertical"/>
            <a href="javascript:;" onClick={this.handelModal.bind(this, 'edit', val)}>修改</a>*/}
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
