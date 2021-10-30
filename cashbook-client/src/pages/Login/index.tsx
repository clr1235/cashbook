import { useState } from "react";
import { Input, Button, Tabs, Form, Toast } from 'antd-mobile'
import Captcha from 'react-captcha-code';
import styles from './index.module.less'

const {Item} = Form
const Login = () => {
  const [form] = Form.useForm()
  const [captchaTmp, setCaptchaTmp] = useState('')
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({
    mode: 'login',
    acount: '', // 账号
    password: '', // 密码
    captcha: '', // 验证码
  })

  // 改变模式
  const onChangeMode = (key?: string) => {
    setState({
      ...state,
      mode: key as string
    })
  }

  // 验证码刷新
  const handleChangeCaptcha = (captcha?: string) => {
    setCaptchaTmp(captcha as string)
  }

  // 提交
  const onFinish = async () => {
    const values = form.getFieldsValue()
    console.log(values, 'datat-=-=-=');
    if (!values.acount) {
      return Toast.show({
        content: '请输入账号',
        position: 'top',
      })
    }
    if (!values.password) {
      return Toast.show({
        content: '请输入密码',
        position: 'top',
      })
    }
    if (!values.captcha) {
      return Toast.show({
        content: '请输入验证码',
        position: 'top',
      })
    }
    if (values.captcha && values.captcha !== captchaTmp) {
      return Toast.show({
        content: '验证码错误',
        position: 'top',
      })
    }
    setLoading(true)

  }

  // formItems
  const renderFormItems = () => {
    return <div className={styles.box}>
    <Item name="acount" label="账号" rules={[{ required: true, message: ' ' }]}>
      <Input
        placeholder="请输入账号"
        clearable
      ></Input>
    </Item>
    <Item name="password" label="密码" rules={[{ required: true, message: ' ' }]}>
      <Input
        placeholder="请输入密码"
        clearable
        type='password'
      ></Input>
    </Item>
    <Item className={styles.captcha} name="captcha" label="验证码" rules={[{ required: true, message: ' ' }]}>
      <div className={styles.form_item}>
        <Input
          placeholder="请输入验证码"
          clearable
        ></Input>
        <Captcha charNum={4} className={styles.captcha} onChange={handleChangeCaptcha}></Captcha>
      </div>
    </Item>
  </div>
  }

  return (
    <div className={styles.login_page}>
      <Form className={styles.form_box} form={form} onClick={onFinish} layout='horizontal'
          footer={
            <Button block color="primary" type="submit" loading={loading}>
              {state.mode === 'login' ? "登录" : "注册"}
            </Button>
          }>
        <Tabs activeKey={state.mode} onChange={onChangeMode}>
          <Tabs.TabPane title="登录" key="login">
            {renderFormItems()}
          </Tabs.TabPane>
          <Tabs.TabPane title="注册" key="register">
            {renderFormItems()}
          </Tabs.TabPane>
        </Tabs>
      </Form>
    </div>
  )
}

export default Login
