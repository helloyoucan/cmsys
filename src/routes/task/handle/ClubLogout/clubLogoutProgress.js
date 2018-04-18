import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  message,
  Card,
  Button
} from 'antd';
import {Link} from 'dva/router';
import Result from '../../../../components/Result/index';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';
@connect(state => ({
  workflow: state.workflow,
}))
export default class clubLogoutProgress extends PureComponent {
  state = {
    imgUrl: ''
  }

  componentDidMount() {
    if (this.props.location.data != undefined) {
      const taskId = this.props.location.data.taskId;
      if (taskId != null) {
        this.props.dispatch({
          type: 'workflow/viewCurrentImage',
          payload: {
            taskId: taskId
          },
          callback: (res) => {
            if (res.ret) {
              this.setState({
                imgUrl: res.data
              });
            } else if (res.msg) {
              message.error(res.msg);
            }
          }
        });
      }
    }
  }

  render() {
    const extra = (<img src={this.state.imgUrl} alt=""/>)
    const actions = (
      <div>
        <Button type="primary"><Link to={`/task/tSClubLogout`}>返回列表</Link></Button>
      </div>
    );
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <Result
            extra={extra}
            actions={actions}
            style={{marginTop: 48, marginBottom: 16}}
          />
        </Card>
      </PageHeaderLayout>
    )
  }
}
