import React, {PureComponent} from 'react';
import {connect} from 'dva';
import fetch from 'dva/fetch';
import {
  message, Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Upload,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const {RangePicker} = DatePicker;
const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;
import {Link} from 'dva/router';
import moment from 'moment';
import {EditorState, convertToRaw, ContentState, convertFromHTML} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
@connect(state => ({
  info: state.info,
  article: state.article,
  currentUser: state.login.currentUser,
  dataManagement: state.dataManagement
}))
@Form.create()
export default class ArticlePage extends PureComponent {
  state = {
    confirmLoading: false,
    clubName: [],
    formData: {
      title: '',//文章标题
      type: 'YUGAO',//文章类型// 1推文，2预告
      // showStatus: 1,//展示状态，1为展示，0为不展示
      content: '',//文章内容
    },
    tweetType: [],//推文类型
    editorState: EditorState.createEmpty(),
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
      if (!err) {
        if (content
            .replace(/<[^>]+>/g, "")//html标签
            .replace(/&[a-zA-Z]{1,10};/, '')//转义字符
            .replace(/[\r\n]/g, "")//换行符
          == '') {
          message.warning('请输入文章内容再保存哦~')
          return
        }
        values = {
          ...values,
          content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
          assId: this.props.currentUser.assId
        }
        this.setState({
          confirmLoading: true
        })
        if (this.props.location.data != undefined && this.props.location.data.id != null) {
          this.props.dispatch({
            type: 'article/update',
            payload: {
              id: this.state.formData.id,
              ...values
            },
            callback: (res) => {
              this.afterSubmit(res)
            }
          });
        } else {
          this.props.dispatch({
            type: 'article/add',
            payload: values,
            callback: (res) => {
              this.afterSubmit(res)
            }
          });
        }
      }
    });
  }

  afterSubmit(res) {
    this.setState({
      confirmLoading: false
    })
    if (res.ret) {
      this.setState({
        formData: {
          ...this.state.formData,
          editStatus: 0
        }
      })
    }
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'info/getAll',
      payload: {},
      callback: (res) => {
        res.data.unshift({id: -1, name: '不属于任何社团'})
        const club = res.data.find(item => {
          return item.id == this.props.currentUser.assId
        })
        this.setState({
          clubName: club ? club.name : ''
        });
      }
    });
    this.props.dispatch({
      type: 'dataManagement/queryTweet',
      payload: {},
      callback: (res) => {
        this.setState({
          tweetType: res.data
        });
      }
    });
    if (this.props.location.data != undefined) {
      const id = this.props.location.data.id;
      if (id != null) {
        this.props.dispatch({
          type: 'article/getOne',
          payload: {
            id
          },
          callback: (res) => {
            if (res.ret) {
              const contentBlock = htmlToDraft(res.data.content);
              const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
              const editorState = EditorState.createWithContent(contentState);
              this.setState({
                formData: res.data,
                editorState
              })
            } else if (res.msg) {
              message.error(res.msg);
            }
          }
        })
      }
    }
  }

  uploadCallback(file) {
    return new Promise((resolve, reject) => {
      let formData = new FormData()
      formData.append('fileName', file)
      fetch(`/sys/file/uploadActArtFile`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      }).then(res => {
        return res.text()//后端返回字符串
      }).then(res => {
        if (typeof res == 'string') {
          message.success('图片上传成功')
          resolve({data: {link: res}})
        } else {
          reject(res)
          message.error('图片上传失败')
        }
      }).catch(res => {
        reject(res)
        message.error('图片上传失败')
      })
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {formData, clubName, tweetType, editorState} = this.state
    const uploadSetting = {
      fileList: formData.actPlan,
      name: 'fileName',
      action: '/sys/file/uploadActPlanFile',
      headers: {
        authorization: 'authorization-text',
      },
      onChange: (info) => {
        let actPlan = info.fileList;
        actPlan = actPlan.map((file) => {
          if (file.response) {
            file.url = file.response;
          }
          return file;
        });
        actPlan = actPlan.filter((file) => {
          if (file.response) {
            return file.response != undefined;
          }
          return true;
        });

        this.setState({
          formData: {
            ...this.state.formData,
            actPlan: actPlan
          }
        })


        if (info.file.status === 'done') {
          if (typeof info.file.response == 'string') {
            message.success('上传成功');
          } else {
            message.error(`上传失败`);
          }
        } else if (info.file.status === 'error') {
          message.error(`上传失败`);
        }

      },
      onRemove: (file) => {
        let actPlan = this.state.formData.actPlan.filter(item => {
          return item.response != file.response
        })
        this.setState({
          formData: {
            ...this.state.formData,
            actPlan: actPlan
          }
        })
      }
    }
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10},
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 10, offset: 7},
      },
    };
    const contentStyle = {
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      minHeight: '600px',
      'border': '1px solid #d9d9d9',
      padding: '5px'
    }
    const config = {
      image: {uploadCallback: this.uploadCallback.bind(this), previewImage: true}
    }

    return (
      <PageHeaderLayout title="社团推文" content="">
        <Card bordered={false}>

          <FormItem
            {...formItemLayout}
            label="社团名称"
          >
            {clubName}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="文章标题"
          >
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '请输入',
              }], initialValue: formData.title
            })(
              <Input disabled={formData.editStatus == 0}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="文章类型"
          >
            {getFieldDecorator('type', {
              rules: [{
                required: true, message: '请输入',
              }], initialValue: formData.type
            })(
              <RadioGroup disabled={formData.editStatus == 0}>
                {tweetType.map((item, index) => {
                  return (<Radio key={index} value={item.pmname}>{item.pmvalue}</Radio>)
                })}
              </RadioGroup>
            )}
          </FormItem>
          {/*  <FormItem
           {...formItemLayout}
           label="展示状态"
           >
           {getFieldDecorator('showStatus', {
           rules: [{
           required: true, message: '请输入',
           }], initialValue: formData.showStatus
           })(
           <RadioGroup disabled={formData.editStatus == 0}>
           <Radio value={1}>展示</Radio>
           <Radio value={0}>不展示</Radio>
           </RadioGroup>
           )}
           </FormItem>*/}
          {/*<FormItem
           {...formItemLayout}
           label="文章内容"
           >
           {getFieldDecorator('content', {
           rules: [{
           required: true, message: '请输入',
           }], initialValue: formData.content
           })(
           <TextArea rows={4}/>
           )}
           </FormItem>*/}
          {/*  <div
           dangerouslySetInnerHTML={{__html: formData.content}}
           style={{
           display: formData.editStatus == 0 ? 'block' : 'none',
           ...contentStyle
           }}>
           </div>*/}
          <div style={{
            // display: formData.editStatus == 0? 'block' : 'block',
            ...contentStyle
          }}>
            <Editor
              readOnly={ formData.editStatus == 0}
              editorState={editorState}
              localization={{locale: 'zh'}}
              toolbar={ config }
              onEditorStateChange={this.onEditorStateChange.bind(this)}
            />
            {/* <textarea
             disabled
             value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
             />*/}
          </div>

          {/*<FormItem
           {...formItemLayout}
           label="备注"
           >
           {getFieldDecorator('remarks', {
           rules: [{}], initialValue: formData.remarks
           })(
           <TextArea rows="4"/>
           )}
           </FormItem>*/}
          <FormItem {...submitFormLayout} style={{marginTop: 32, textAlign: 'center'}}>
            {
              formData.editStatus == 0 ? '' : (
                <Button
                  onClick={this.handleSubmit.bind(this)}
                  type="primary"
                  htmlType="submit"
                  loading={this.state.confirmLoading}>
                  保存
                </Button>
              )
            }
            <Button>
              <Link to={{
                pathname: '/clubManagement/clubApproval/artList',
              }
              }> 返回列表</Link> </Button>
          </FormItem>

        </Card>
      </PageHeaderLayout>
    );
  }
}
