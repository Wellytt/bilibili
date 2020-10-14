<template>
  <div class="userinfo">
    <nav-bar/>
    <img src="@/assets/bannerTop_new.png" alt="个人首页背景图" class="backImg">
    <user-detail :userInfo="model"></user-detail>
    <user-article></user-article>
  </div>
</template>

<script>
  import NavBar from "../components/common/NavBar";
  import userDetail from "../components/usercomponent/userDetail";
  import UserArticle from "../components/usercomponent/userArticle";
  export default {
    data() {
      return {
        model: {}
      }
    },
    components: {
      UserArticle,
      NavBar,
      userDetail
    },
    methods: {
      async UserinfoData() {
        const res = await this.$http.get('/user/' + localStorage.getItem('id'),{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        this.model = res.data[0]
      }
    },
    created() {
      this.UserinfoData()
    }
  }
</script>

<style lang="less" scoped>
.userinfo{
  .backImg{
    height: 25vw;
    width: 100%;
  }
}
</style>