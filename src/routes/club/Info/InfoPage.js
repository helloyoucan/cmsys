import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Upload,
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
                <Input placeholder="社团名称"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="社团类别"
            >
              {getFieldDecorator('category', {
                rules: [{
                  required: true, message: '请输入选择',
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
              label="创建日期"
            >
              {getFieldDecorator('date', {
                rules: [{
                  required: true, message: '请选择起止日期',
                }],
                initialValue: formData.date
              })(
                <DatePicker/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="社团简介"
            >
              {getFieldDecorator('introduce', {
                rules: [{
                  required: true, message: '请输入',
                }],
                initialValue: formData.introduce
              })(
                <TextArea style={{minHeight: 32}} placeholder="请输入社团简介" rows={4}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="是否展示信息"
              help="是否把信息展示都网站上"
            >
              <div>
                {getFieldDecorator('isShow', {
                  rules: [{
                    required: true, message: '请选择',
                  }],
                  initialValue: formData.isShow || '1'
                })(
                  <Radio.Group>
                    <Radio value="1">展示</Radio>
                    <Radio value="0">不展示</Radio>
                  </Radio.Group>
                )}
              </div>
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
