import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  message, Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Upload,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

@connect(state => ({
  info: state.info,
}))
@Form.create()
export default class InfoPage extends PureComponent {
  state = {
    confirmLoading: false,
    uploadLoading: false,
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'info/update',
          payload: values,
        });
      }
    });
  }

  render() {
    const {info} = this.props;
    const {getFieldDecorator, getFieldValue} = this.props.form;
    const formData = info.oneData == undefined ? {} : info.oneData;
    const uploadSetting = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        console.log(info)
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
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
    const uploadButton = (
      <div>
        <Icon type={this.state.uploadLoading ? 'loading' : 'plus'}/>
        <div className="ant-upload-text">上传logo</div>
      </div>
    );
    return (
      <PageHeaderLayout title="社团信息填写" content="">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{marginTop: 8}}
          >
            <FormItem
              {...formItemLayout}
              label="社团logo"
            >
              {getFieldDecorator('logo', {
                initialValue: formData.logo
              })(
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="/sys/file/upload"
                  // beforeUpload={beforeUpload}
                  // onChange={this.handleChange}
                >
                  {formData.logo ? <img src={formData.logo} alt=""/> : uploadButton}
                </Upload>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="社团名称"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.name
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="社团类型"
            >
              {getFieldDecorator('category', {
                rules: [{
                  required: true, message: '请选择',
                }], initialValue: formData.category
              })(
                <Select
                  mode="multiple"
                >
                  <Option value="1">类别一</Option>
                  <Option value="2">其它</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="社团宗旨"
            >
              {getFieldDecorator('purpose', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.name
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="活动领域"
            >
              {getFieldDecorator('actField', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.name
              })(
                <Input/>
              )}
            </FormItem>
            <p>发起人资料</p>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {getFieldDecorator('initSituation.name', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.initSituation.name
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系电话"
            >
              {getFieldDecorator('initSituation.phone', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.initSituation.phone
              })(
                <Input/>
              )}
            </FormItem>
            <p>现任负责人资料</p>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {getFieldDecorator('leadSituation.name', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.leadSituation.name
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系电话"
            >
              {getFieldDecorator('leadSituation.phone', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.leadSituation.phone
              })(
                <Input/>
              )}
            </FormItem>
            <p>指导老师资料</p>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {getFieldDecorator('leadTeacherSituation.name', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.leadTeacherSituation.name
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系电话"
            >
              {getFieldDecorator('leadTeacherSituation.phone', {
                rules: [{
                  required: true, message: '请输入',
                }], initialValue: formData.leadTeacherSituation.phone
              })(
                <Input/>
              )}
            </FormItem>
            <p>社团成立资料</p>
            <FormItem
              {...formItemLayout}
              label="申请表"
            >
              {getFieldDecorator('applicationFilename', {
                initialValue: formData.applicationFilename
              })(
                <Upload {...uploadSetting}>
                  {formData.applicationFilename ?
                    ( <p>{formData.applicationFilename}-{formData.applicationFile}</p>) :
                    (
                      <Button>
                        <Icon type="upload"/> 点击上传
                      </Button>)
                  }
                </Upload>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="业务指导部门意见"
            >
              {getFieldDecorator('applicationFilename', {
                initialValue: formData.busDeptAdviceFilename
              })(
                <Upload {...uploadSetting}>
                  {formData.busDeptAdviceFilename ?
                    ( <p>{formData.busDeptAdviceFilename}-{formData.busDeptAdviceFile}</p>) :
                    (
                      <Button>
                        <Icon type="upload"/> 点击上传
                      </Button>)
                  }
                </Upload>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="社团章程"
            >
              {getFieldDecorator('applicationFilename', {
                initialValue: formData.constitutionFilename
              })(
                <Upload {...uploadSetting}>
                  {formData.constitutionFilename ?
                    ( <p>{formData.constitutionFilename}-{formData.constitutionFile}</p>) :
                    (
                      <Button>
                        <Icon type="upload"/> 点击上传
                      </Button>)
                  }
                </Upload>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="备注"
            >
              {getFieldDecorator('remarks', {
                rules: [{}], initialValue: formData.remarks
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{marginTop: 32}}>
              <Button type="primary" htmlType="submit" loading={this.state.confirmLoading}>
                保存
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
