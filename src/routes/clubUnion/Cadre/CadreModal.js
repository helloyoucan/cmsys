import React, {PureComponent} from 'react';
import {connect} from 'dva';
import LineMessage from '../../../components/LineMessage/index';
import moment from 'moment';
import {
  Card,
  Form,
  Input,
  Select,
  Modal,
  Spin,
  Radio,
} from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;
@Form.create()
export default class CadreModal extends PureComponent {

  state = {
    addInputValue: '',
    confirmLoading: false,
    formData: {
      stuNum: '',//学号
      name: '',//姓名 ,
      sex: '',//性别 ,
      annual: '',//任职年度
      college: '',//所属学院（从字典值中取）
      major: '',//所属专业
      dept: '',//部门
      position: '',//现任职位 ,
      sanction: '',//奖罚情况 ,
      remarks: '',//备注 ,
    },
    ModalTitle: '',
  };

  componentDidMount() {

  }


  handleOK() {
    const {data} = this.props;
    switch (data.key) {
      case 'read':
        this.props.handleModalVisible();
        break;
      case 'add':
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            this.setState({
              confirmLoading: true,
            });
            this.props.dispatch({
              type: 'clubUnionCadre/add',
              payload: values,
              callback: (res) => {
                if (res.ret) {
                  this.props.handleModalVisible();
                  this.props.form.resetFields();
                }
                this.setState({
                  confirmLoading: false,
                });
              }
            });

          }
        });
        break;
      case 'edit':
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            this.setState({
              confirmLoading: true,
            });
            this.props.dispatch({
              type: 'clubUnionCadre/update',
              payload: {
                ...values,
                id: data.data.id
              },
              callback: (res) => {
                if (res.ret) {
                  this.props.handleModalVisible();
                  this.props.form.resetFields();
                }
                this.setState({
                  confirmLoading: false,
                });
              }
            });

          }
        });
        break;
      default:
        break;
    }


  }


  render() {
    const {getFieldDecorator} = this.props.form;
    const {data, collegeName, collegeNameObj, sex, sex_obj, modalLoading} = this.props;
    const formData = data.data == undefined ? {} : data.data;
    let title = '';
    switch (data.key) {
      case 'read':
        title = '查看';
        break;
      case 'add':
        title = '添加';
        break;
      case 'edit':
        title = '修改';
        break;
      default:
        break;
    }
    var years = (new Array((new Date()).getFullYear() - 1999 + 4)).fill(0);
    years = years.map((_, index) => {
      return (1999 + index) + '-' + (2000 + index);
    });
    return (
      <Modal
        title={title + '社联干部'}
        visible={this.props.modalVisible}
        onOk={this.handleOK.bind(this)}
        onCancel={() => this.props.handleModalVisible()}
        confirmLoading={this.state.confirmLoading}
      >
        {data.key == "read" ?
          <Card loading={modalLoading} bordered={false}>
            <LineMessage label="姓名">
              {formData.name}
            </LineMessage>
            <LineMessage label="性别">
              {sex_obj[formData.sex]}
            </LineMessage>
            <LineMessage label="学号">
              {formData.stuNum}
            </LineMessage>
            <LineMessage label="所属学院">
              {collegeNameObj[formData.college]}
            </LineMessage>
            <LineMessage label="所属专业">
              {formData.major}
            </LineMessage>
            <LineMessage label="部门">
              {formData.dept}
            </LineMessage>
            <LineMessage label="现任职位">
              {formData.position}
            </LineMessage>
            <LineMessage label="任职状态">
              {formData.status == 1 ? "在职" : "离职"}
            </LineMessage>
            <LineMessage label="任职年度">
              {formData.annual}
            </LineMessage>
            <LineMessage label="奖罚情况">
              {formData.sanction}
            </LineMessage>
            <LineMessage label="添加时间">
              {moment(formData.insertTime).format('YYYY-MM-DD')}
            </LineMessage>
            <LineMessage label="添加人">
              {formData.insertMan}
            </LineMessage>
            <LineMessage label="最后修改时间">
              {moment(formData.lastupdTime).format('YYYY-MM-DD')}
            </LineMessage>
            <LineMessage label="最后修改人">
              {formData.lastupdMan}
            </LineMessage>
            <LineMessage label="备注">
              {formData.remarks}
            </LineMessage>

          </Card>
          :
          <Spin spinning={modalLoading}>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="姓名"
            >  {getFieldDecorator('name', {
              rules: [{required: true, message: '请输入!'}],
              initialValue: formData.name
            })(
              <Input/>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="性别"
            >  {getFieldDecorator('sex', {
              rules: [{required: true, message: '请输入!'}],
              initialValue: formData.sex
            })(
              <RadioGroup >
                {sex.map((item) => {
                  return ( <Radio key={item.pmname} value={item.pmname}>{item.pmvalue}</Radio>)
                })}
              </RadioGroup>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="学号"
            >  {getFieldDecorator('stuNum', {
              rules: [{required: true, message: '请输入!'}],
              initialValue: formData.stuNum
            })(
              <Input/>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="所属学院"
            >  {getFieldDecorator('college', {
              rules: [{required: true, message: '请输入!'}],
              initialValue: formData.college
            })(
              <Select placeholder="所属学院" style={{width: '100%'}}>
                {collegeName.map((item) => {
                  return ( <Option key={item.pmname} value={item.pmname}>{item.pmvalue}</Option>)
                })}
              </Select>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="所属专业"
            >  {getFieldDecorator('major', {
              rules: [{required: true, message: '请输入!'}],
              initialValue: formData.major
            })(
              <Input/>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="部门"
            >  {getFieldDecorator('dept', {
              rules: [{required: true, message: '请输入!'}],
              initialValue: formData.dept
            })(
              <Input/>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="现任职位"
            >  {getFieldDecorator('position', {
              rules: [{required: true, message: '请输入!'}],
              initialValue: formData.position
            })(
              <Input/>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="任职年度"
            >  {getFieldDecorator('annual', {
              rules: [{required: true, message: '请输入!'}],
              initialValue: formData.annual
            })(
              <Select placeholder="任职年度" style={{width: '100%'}}>
                {years.map((item) => {
                  return ( <Option key={item} value={item}>{item}</Option>)
                })}
              </Select>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="奖罚情况"
            >  {getFieldDecorator('sanction', {
              rules: [{message: '请输入!'}],
              initialValue: formData.sanction
            })(
              <TextArea rows={3}/>
            )}
            </FormItem>
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 15}}
              label="备注"
            >  {getFieldDecorator('assId', {
              initialValue: formData.remarks
            })(
              <TextArea rows={3}/>
            )}
            </FormItem>
          </Spin>
        }
      </Modal>
    )
  }
}
