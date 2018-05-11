import React, {PureComponent} from 'react';
import {
  Form,
  Input,
  Button,
  Select
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
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
    const {clubList, currentUser} = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline" style={{
        lineHeight: '40px',
        marginBottom: '10px'
      }}>
        {currentUser.assId != -1 ? '' : (
          <FormItem label="社团">
            {getFieldDecorator('assId')(
              <Select style={{width: 120}}>
                <Option value=''>全部</Option>
                {
                  clubList.map(item => {
                    return (<Option value={item.id} key={item.id}>{item.name}</Option>)
                  })
                }
              </Select>
            )}
          </FormItem>
        )}
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
