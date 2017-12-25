import React, {PureComponent} from 'react';
import {
  Spin,
  Form,
  Select,
  Button,
  Radio
} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const {Option} = Select;
@Form.create()
export default class FormList extends PureComponent {
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
    const { form} = this.props;
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
    let categorys = this.props.category.map((item) => {
      return (<RadioButton key={item.pmname} value={item.pmname}>{item.pmvalue}</RadioButton>)
    })
    return (
      <Form onSubmit={this.handleSearch} layout="inline" style={{
        lineHeight: '40px',
        marginBottom: '10px'
      }}>

        <FormItem label="用户类型">
          {getFieldDecorator('categoryId')(
            < RadioGroup >
              {categorys.length > 0 ? categorys : <Spin spinning={true} size="small"></Spin>}
            </RadioGroup>
          )}
        </FormItem>
        <Button type="primary" htmlType="submit">查询</Button>
        <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>重置</Button>
      </Form>
    );
  }
}
