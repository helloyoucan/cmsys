import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  message,
  Card,
  Button,
  Spin
} from 'antd';
import {Link} from 'dva/router';
import Result from '../../components/Result/index';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
@connect(state => ({
  workflow: state.workflow,
}))
export default class TaskProgress extends PureComponent {
  state = {
    imgUrl: '',
    span: {
      x: 0,
      y: 0,
      height: 0,
      width: 0
    },
    acs: {}
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
              const Img = new Image()
              Img.src = res.data.url
              Img.onload = () => {
                this.setState({
                  acs: res.data.acs
                })
                for (let key in res.data.acs) {
                  res.data.acs[key] = res.data.acs[key] * this.refs.img.height / Img.height
                }
                res.data.acs={
                  x: res.data.acs.x-5,
                  width: res.data.acs.width+10,
                  y: res.data.acs.y-5,
                  height: res.data.acs.height+10,
                }
                this.setState({
                  imgUrl: res.data.url,
                  span: {
                    ...res.data.acs,
                  }
                })
              }
              this.setState({
                imgUrl: res.data.url
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
    const {imgUrl, span} = this.state
    const extra = (
      imgUrl == '' ? (<div style={ {textAlign: 'center'}}><Spin /></div>) :
        (<div style={{position: 'relative'}}>
          <span
            style={{
              position: 'absolute',
              border: '4px solid red',
              borderRadius: '5px',
              left: span.x,
              top: span.y,
              height: span.height,
              width: span.width
            }}></span>
          <img ref="img" src={imgUrl} style={ {width: '100%'}} alt="进度图"/>
        </div>)
    )
    const actions = (
      <div>
        <Button type="primary"><Link to={`/task/list`}>返回列表</Link></Button>
      </div>
    );
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <Result
            extra={extra}
            actions={actions}
            style={{width: '100%'}}
          />
        </Card>
      </PageHeaderLayout>
    )
  }
}
