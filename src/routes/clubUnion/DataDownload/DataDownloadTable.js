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
  Icon, Modal
} from 'antd';
const confirm = Modal.confirm;
import StandardTable from '../../../components/StandardTable/index';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import DataDownloadForm from './DataDownloadForm';
import DataDownloadModal from './DataDownloadModal';
import moment from 'moment';

@connect(state => ({
  dataDownload: state.dataDownload,
}))
export default class DataDownloadTable extends PureComponent {
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

  getData(params) {
    this.props.dispatch({
      type: 'dataDownload/queryList',
      payload: {
        keyword: '',
        pageNo: 1,
        pageSize: 10,
        ...params
      }
    })
  }

  handleStandardTableChange = (pagination) => {
    const {formValues} = this.state;
    this.getData({
      keyword: formValues.keyword,
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    })
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
          type: 'dataDownload/getOne',
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
    this.getData({
      keyword: value.keyword,
    })
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
    const {dispatch, dataDownload: {data: {pagination}}} = this.props;
    let {selectedRows, formValues} = this.state;
    /*  if (arguments.length > 1) {//删除单个
     selectedRows.push({
     id: delOneId
     });
     }
     if (!selectedRows) return;*/
    confirm({
      title: '你确定要删除这些信息吗?',
      content: '删除后不可恢复',
      okText: '是的',
      okType: 'danger',
      cancelText: '不，取消',
      onOk: () => {
        dispatch({
          type: 'dataDownload/changeLoading',
          payload: {
            bool: true,
          },
        });
        dispatch({
          type: 'dataDownload/del',
          payload: {
            id: delOneId
          },
          callback: () => {
            this.getData({
              ...formValues,
              pageNo: pagination.currentPage,
              pageSize: pagination.pageSize,
            })
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

  handleChangeStatus(val, id) {
    let type = val == 0 ? 'dataDownload/enable' : 'dataDownload/disable';
    this.setState({
      SwitchLoadingId: id,
    });
    this.props.dispatch({
      type,
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
    const {dataDownload: {loading: userLoading, data}} = this.props;
    const {selectedRows} = this.state;
    const columns = [
      {
        title: '文件名',
        dataIndex: 'name',
      },
      {
        title: '文件路径',
        dataIndex: 'path',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (val, record) => {
          return (
            <Switch
              loading={record.id === this.state.SwitchLoadingId}
              checked={val == 1}
              checkedChildren="显示"
              unCheckedChildren="不显示"
              onChange={this.handleChangeStatus.bind(this, val, record.id)}
            />
          );
        }
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
            <a href="javascript:;" onClick={this.handleDelete.bind(this, val)}>删除</a>
          </div>
        ),
      },
    ];
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className="tableList">
            <div className="tableListForm">
              <DataDownloadForm
                handleSearch={this.handleSearch.bind(this)}
                formReset={this.handleFormReset.bind(this)}
                dispatch={this.props.dispatch}
              />
            </div>
            <div className="tableListOperator">
              <Button icon="plus" type="primary" onClick={this.handelModal.bind(this, 'add')}>新建</Button>
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
        <DataDownloadModal modalVisible={this.state.modalVisible}
                           modalLoading={this.state.modalLoading}
                           data={this.state.modalData}
                           getData ={this.getData.bind(this)}
                           dispatch={this.props.dispatch}
                           handleModalVisible={this.handleModalVisible.bind(this)}
        />

      </PageHeaderLayout>
    );
  }
}
