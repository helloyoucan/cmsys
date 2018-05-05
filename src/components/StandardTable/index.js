import React, {PureComponent} from 'react';
import {Table, Alert} from 'antd';
import styles from './index.less';


class StandardTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    totalCallNo: 0,
  };

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
        totalCallNo: 0,
      });
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const totalCallNo = selectedRows.reduce((sum, val) => {
      return sum + parseFloat(val.callNo, 10);
    }, 0);

    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }

    this.setState({selectedRowKeys, totalCallNo});
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }

  render() {
    const {selectedRowKeys, totalCallNo} = this.state;
    const {data: {list, pagination}, loading, columns, isSelect, expandedRowRender} = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: pagination.currentPage,
      showTotal: (total, range) => (`第 ${range[0]} -  ${range[1]} 条 共 ${total} 条`),
      ...pagination,
    };
    // console.log(paginationProps)
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      // getCheckboxProps: record => ({
      //   disabled: record.disabled,
      // }),
    };

    return (
      <div className={styles.standardTable}>
        {isSelect ? (<div className={styles.tableAlert}>
          <Alert
            message={(
              <div>
                已选择 <a style={{fontWeight: 600}}>{selectedRowKeys.length}</a> 项
                <a onClick={this.cleanSelectedKeys} style={{marginLeft: 24}}>清空</a>
              </div>
            )}
            type="info"
            showIcon
          />
        </div>) : ''}

        < Table
          loading={loading}
          rowKey={record => record.id}
          expandedRowRender={expandedRowRender ? expandedRowRender : null}
          rowSelection={isSelect ? rowSelection : null}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default StandardTable;
