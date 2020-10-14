<template>
  <div class="navbar">
    <div class="logo">
      <img src="@/assets/logo.png" alt="bilibili图标" @click="$router.push('/')">
    </div>
    <div>
      <p>
        请输入内容
        <van-icon class="ipt_icon" name="search" />
      </p>
    </div>
    <div>
      <img :src="imgUrl" alt="默认头像" @click="$router.push('/userinfo')" v-if="imgUrl">
      <img src="@/assets/default_img.jpg" @click="$router.push('/login')" alt="头像" v-else>
      <p><a href="https://app.bilibili.com/">下载APP</a></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar",
    data() {
      return {
        imgUrl: ''
      }
    },
    async mounted() {
      if(localStorage.getItem('token')){
        const res = await this.$http.get('/user/' + localStorage.getItem('id'))
        this.imgUrl = res.data[0].user_img
      }
    }
  }
</script>

<style lang="less" scoped>
.navbar{
  height: 12.5vw;
  background: #fff;
  display: flex;
  .logo{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    img{
      width: 100%;
    }
  }
  div:nth-child(2) {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0vw 1.39vw;
    p{
      background-color: #f4f4f4;
      padding-left: 6.94vw;
      position: relative;
      font-size: 3.33vw;
      height: 6.39vw;
      line-height: 7.22vw;;
      width: 100%;
      border-radius: 3.61vw;
      color: #aaa;
      .ipt_icon{
        position: absolute;
        left: 2.78vw;
        top: 50%;
        transform: translate(0,-40%);
        color: #aaa;
      }
    }
  }
  div:nth-child(3) {
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 6.67vw;
      height: 6.67vw;
      border-radius: 50%;
    }
    >p>a{
      padding: 1.39vw 2.78vw;
      margin: 0vw 2.22vw;
      background: #fb7299;
      color: #fff;
      border-radius: 0.83vw;
      font-size: 3.61vw;
    }
  }
}
</style>