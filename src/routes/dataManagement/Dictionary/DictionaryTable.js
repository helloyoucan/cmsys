import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Card,
  Button,
  message,
  Divider,
  Switch
} from 'antd';
import StandardTable from '../../../components/StandardTable/index';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import DictionaryForm from './DictionaryForm';
import DictionaryModal from './DictionaryModal';
import moment from 'moment';

@connect(state => ({
  user: state.user,
  dataManagement: state.dataManagement
}))
export default class DictionaryTable extends PureComponent {
  state = {
    addInputValue: '',
    modalVisible: false,
    modalLoading: false,
    modalData: {
      key: '',
      id: '',
      data: {}
    },
    SwitchLoadingId: '',
    expandForm: false,
    selectedRows: [],
    formValues: {},
    SwitchLoadingId: ''


  };

  componentDidMount() {
    this.getData()
  }

  getData(params) {
    this.props.dispatch({
      type: 'dataManagement/getDicParamsForPage',
      payload: {
        pmappname: '',
        pageNo: 1,
        pageSize: 10,
        ...params
      }
    });
  }

  handleStandardTableChange = (pagination) => {
    const {formValues} = this.state;
    this.getData({
      pmappname: formValues.pmappname,
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
          type: 'dataManagement/getOne',
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
    this.getData({
      pmappname: value.pmappname,
    })
  }

  handleFormReset() {
    this.setState({
      formValues: {}
    });
    this.getData()
  }

  handleChangeStatus(val, id) {
    let type = val == 0 ? 'dataManagement/setDicParamsIsEnable' : 'dataManagement/setDicParamsIsDisable';
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
    const {dataManagement: {loading: userLoading, dicParams}} = this.props;
    const {selectedRows} = this.state;
    const columns = [
      {
        title: '分类名称',
        dataIndex: 'pmappname',
      },
      {
        title: '项名',
        dataIndex: 'pmname',
      },
      {
        title: '项值',
        dataIndex: 'pmvalue',
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
        title: '修改时间',
        dataIndex: 'lastupdTime',
        render(val) {
          return <span>{moment(val).format('YYYY-MM-DD')}</span>;
        },
      },
      {
        title: '最后修改人',
        dataIndex: 'lastupdMan',
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
              <DictionaryForm
                handleSearch={this.handleSearch.bind(this)}
                formReset={this.handleFormReset.bind(this)}
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
              data={dicParams}
              isSelect={false}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <DictionaryModal modalVisible={this.state.modalVisible}
                         modalLoading={this.state.modalLoading}
                         data={this.state.modalData}
                         dispatch={this.props.dispatch}
                         handleModalVisible={this.handleModalVisible.bind(this)}/>

      </PageHeaderLayout>
    );
  }
}
