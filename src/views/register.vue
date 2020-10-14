<template>
  <div>
    <Login-top middle-top="注册bilibili">
     <div slot="right" style="font-size: 3.61vw" @click="$router.push('/login')">切换到登陆页面</div>
    </Login-top>
    <Login-text label="姓名"
                style="margin: 4.17vw 0"
                rule="^.{6,16}$"
                placeholder="请输入姓名"
                @inputChange="res => model.name = res"

    />
    <Login-text label="账号"
                rule="^.{6,16}$"
                placeholder="请输入账号"
                @inputChange="res => model.username = res"
    />
    <login-text label="密码"
                placeholder="请输入密码"
                type="password"
                rule="^.{6,16}$"
                @inputChange="res => model.password = res"
    />

    <login-btn btntext="注册" @registerSubmit="registerSubmit"/>
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
          name: '',
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
        if(rulg.test(this.model.name) && rulg.test(this.model.username) && rulg.test(this.model.password)){
          const res = await this.$http.post('/register',this.model);
          this.$msg.fail(res.data.msg)
          localStorage.setItem('id',res.data.id)
          localStorage.setItem('token',res.data.objtoken)
          setTimeout(() => {
            this.$router.push('/userinfo')
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