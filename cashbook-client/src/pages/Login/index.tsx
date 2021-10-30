import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Tabs, Toast } from 'antd-mobile'
import Captcha from 'react-captcha-code';
import styles from './index.module.less'


const { Panel } = Tabs;

const Login = () => {
  const [state, setState] = useState({
    mode: 0, // 0: 登录，1: 注册
    acount: '', // 账号
    password: '', // 密码
    captcha: '', // 验证码
  })
  // 表单校验所需方法
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: state,
    reValidateMode: "onChange",
  });

  // 改变模式
  const onChangeMode = (index?: number) => {
    setState({
      ...state,
      mode: index as number
    })
  }

  // 验证码刷新
  const handleChangeCaptcha = (captcha?: string) => {
    setState({
      ...state,
      captcha: captcha as string
    })
  }

  // 提交
  const onSubmit = async (data?: any) => {
    console.log(data, 'datat-=-=-=');
  }

  return (
    <div className={styles.login_page}>
      <form className={styles.form_box}>
        <Tabs value={state.mode} onChange={onChangeMode}>
          <Panel title="登录">
            <div className={styles.box}>
              <div className={styles.form_item}>
                <i className="iconfont icon-phone"></i>
                <Controller
                  control={control}
                  name="acount"
                  rules={{
                    required: "请输入账号",
                  }}
                  render={({ field }) => (
                    <Input
                      type="acount"
                      {...field}
                      placeholder="请输入账号"
                      clearable={true}
                    ></Input>
                  )}
                ></Controller>
              </div>
              <div className={styles.form_item}>
                <i className="iconfont icon-mima"></i>
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: "请输入密码",
                  }}
                  render={({ field }) => (
                    <Input
                      type="password"
                      {...field}
                      placeholder="请输入密码"
                      clearable={true}
                    ></Input>
                  )}
                ></Controller>
              </div>
              <div className={styles.form_item}>
                <i className="iconfont icon-mima"></i>
                <Controller
                  control={control}
                  name="captcha"
                  rules={{
                    required: "请输入验证码",
                  }}
                  render={({ field }) => (
                    <Input
                      type="captcha"
                      {...field}
                      placeholder="请输入验证码"
                      clearable={true}
                    ></Input>
                  )}
                ></Controller>
                <Captcha charNum={4} className={styles.captcha} onChange={handleChangeCaptcha}></Captcha>
              </div>
            </div>
          </Panel>
          <Panel title="注册">
            <div className="content">可是可是可是上课</div>
          </Panel>
        </Tabs>
        <div className={styles.btn_box}>
          <Button block theme="primary" onClick={handleSubmit((data) => {
            onSubmit(data);
          })}>
            {state.mode === 0 ? "登录" : "注册"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Login
