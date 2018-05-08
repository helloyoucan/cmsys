import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  message, Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Upload,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import {Link} from 'dva/router';
const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

@connect(state => ({
  info: state.info,
  yearbook: state.yearbook,
  currentUser: state.login.currentUser,
}))
@Form.create()
export default class YearbookPage extends PureComponent {
  state = {
    confirmLoading: false,
    clubName: [],
    formData: {
      assSize: '',//模特协会社团规模
      assMemberComp: '',//模特协会会员组成
      annFile: [],//协会资料存储路径
      annFilename: [],//协会资料
      instructSituation: {//模特协会指导老师基本情况
        name: '', phone: ''
      },
    },
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let annFile = ''
        this.state.formData.annFile.forEach(item => {
          annFile += JSON.stringify(item) + '$'
        })
        values = {
          assId: this.props.currentUser.assId,
          ...values,
          annFile: annFile.length > 0 ? annFile.slice(0, -1) : '',
          instructSituation: JSON.stringify(values.instructSituation),
          annFilename: null
        }
        this.setState({
          confirmLoading: true
        })
        if (this.props.location.data != undefined && this.props.location.data.id != null) {
          this.props.dispatch({
            type: 'yearbook/update',
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
            type: 'yearbook/add',
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
    if (this.props.location.data != undefined) {
      const id = this.props.location.data.id;
      if (id != null) {
        this.props.dispatch({
          type: 'yearbook/getOne',
          payload: {
            id
          },
          callback: (res) => {

            if (res.ret) {
              let annFile = res.data.annFile == '' ? [] : res.data.annFile.split('$')
              annFile = annFile.map(item => {
                return JSON.parse(item)
              })
              res.data.annFile = annFile
              res.data.instructSituation = JSON.parse(res.data.instructSituation)
              this.setState({
                formData: res.data
              })
            } else if (res.msg) {
              message.error(res.msg);
            }
          }
        })
      }
    }
  }

  getData() {
    if (this.props.location.data != undefined) {
      const id = this.props.location.data.id;
      if (id != null) {
        this.props.dispatch({
          type: 'info/getOne',
          payload: {
            id: this.props.location.data.id
          },
          callback: (res) => {
            if (res.ret) {
              let annFile = res.data.annFile == '' ? [] : res.data.annFile.split('$')
              annFile = annFile.map(item => {
                return JSON.parse(item)
              })
              res.data.annFile = annFile
              res.data.instructSituation = JSON.parse(res.data.instructSituation)
              this.setState({
                formData: res.data
              })
            } else if (res.msg) {
              message.error(res.msg);
            }
          }
        });
      }
    }
  }

  render() {
    const {yearbook} = this.props;
    const {getFieldDecorator} = this.props.form;
    //const formData = info.oneData == undefined ? {} : info.oneData;
    const {formData, clubName} = this.state
    const uploadSetting = {
      //showUploadList: false,
      fileList: formData.annFile,
      name: 'fileName',
      action: '/sys/file/uploadAssAnnFile',
      headers: {
        authorization: 'authorization-text',
      },
      defaultFileList: formData.annFile,

      onChange: (info) => {
        let annFile = info.fileList;
        annFile = annFile.map((file) => {
          if (file.response) {
            file.url = file.response;
          }
          return file;
        });
        annFile = annFile.filter((file) => {
          if (file.response) {
            return file.response != undefined;
          }
          return true;
        });

        this.setState({
          formData: {
            ...this.state.formData,
            annFile: annFile
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
        if(this.state.formData.editStatus == 0) return false
        let annFile = this.state.formData.annFile.filter(item => {
          return item.response != file.response
        })
        this.setState({
          formData: {
            ...this.state.formData,
            annFile: annFile
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
    return (
      <PageHeaderLayout title="社团年审资料提交" content="">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{marginTop: 8}}
          >
            <FormItem
              {...formItemLayout}
              label="社团名称"
            >
              {clubName}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="社团规模"
            >
              {getFieldDecorator('assSize', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.assSize
              })(
                <TextArea rows="4" disabled={formData.editStatus == 0}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="会员组成"
            >
              {getFieldDecorator('assMemberComp', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.assMemberComp
              })(
                <TextArea rows="4" disabled={formData.editStatus == 0}/>
              )}
            </FormItem>

            <p style={{'paddingLeft': '20%', 'fontSize': '20px'}}>指导老师基本情况</p>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {getFieldDecorator('instructSituation.name', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.instructSituation.name
              })(
                <Input disabled={formData.editStatus == 0}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系电话"
            >
              {getFieldDecorator('instructSituation.phone', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.instructSituation.phone
              })(
                <Input disabled={formData.editStatus == 0}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="年审资料"
            >
              <Upload {...uploadSetting}
                      disabled={formData.editStatus == 0}>
                <Button>
                  <Icon type="upload"/> 点击上传
                </Button>
              </Upload>
            </FormItem>
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
            <FormItem {...submitFormLayout} style={{marginTop: 32}}>
              {
                formData.editStatus == 0 ? '' : (
                  <Button type="primary" htmlType="submit" loading={this.state.confirmLoading}>
                    保存
                  </Button>
                )
              }
              <Button>
                <Link to={{
                  pathname: '/clubManagement/clubApproval/ybList',
                }
                }> 返回列表</Link> </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
