import React, {PureComponent} from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';
const FormItem = Form.Item;
@Form.create()
export default class CadreForm extends PureComponent {
  state = {
    formValues: {},
  };

  componentWillMount() {

  }

  handleFormReset = () => {
    const {form} = this.props;
    form.resetFields();
    this.props.formReset();
  }


  handleSearch = (e) => {
    e.preventDefault();
    const {form} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue
      };
      this.props.handleSearch(values);
    });
  }


  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline" style={{
        lineHeight: '40px',
        marginBottom: '10px'
      }}>

        <FormItem label="姓名">
          {getFieldDecorator('keyword')(
            <Input/>
          )}
        </FormItem>
        <Button type="primary" htmlType="submit">查询</Button>
        <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>重置</Button>
      </Form>
    );
  }
}
