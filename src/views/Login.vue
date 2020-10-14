<template>
  <div>
    <Login-top middle-top="登陆bilibili">
      <div slot="right" style="font-size: 3.61vw" @click="$router.push('/register')">用户注册</div>
    </Login-top>
    <Login-text label="账号"
                rule="^.{6,16}$"
                style="margin: 4.17vw 0"
                placeholder="请输入账号"
                @inputChange="res => model.username = res"
    />
    <login-text label="密码"
                placeholder="请输入密码"
                type="password"
                rule="^.{6,16}$"
                @inputChange="res => model.password = res"
    />

    <login-btn btntext="登陆" @registerSubmit="registerSubmit"/>
  </div>
</template>

<script>
  import LoginTop from "../components/common/LoginTop";
  import LoginText from "../components/common/LoginText";
  import LoginBtn from "../components/common/LoginBtn";
  export default {
    data() {
      return {
        model: {
          username: '',
          password: ''
        }
      }
    },
    components: {
      LoginTop,
      LoginText,
      LoginBtn
    },
    methods: {
      async registerSubmit() {
        let rulg = /^.{6,16}$/;
        if(rulg.test(this.model.username) && rulg.test(this.model.password)){
          const res = await this.$http.post('/login',this.model);
          this.$msg.fail(res.data.msg)
          if(res.data.code == 301 || res.data.code == 302){
            return
          }
          localStorage.setItem('token',res.data.token)
          localStorage.setItem('id',res.data.id)
          setTimeout(() => {
            this.$router.push('/')
          },1000)
        }else{
          this.$msg.fail('格式不正确，请重新输入')
        }
      },
    }
  }
</script>

<style scoped>

</style>