<template>
  <div class="comment">
    <p class="comment-title">
      <span>评论</span>
      <span v-if="dataLength">({{dataLength}})</span>
      <span v-else>(0)</span>
    </p>
    <div class="commentMyinfo">
      <img :src="myuser.user_img" alt="" v-if="myuser">
      <img src="@/assets/default_img.jpg" alt="" v-else>
      <input v-model="comcontent" ref="Postipt" type="text" placeholder="说点什么吧">
      <button @click="commentPublish">发表</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "commentTitle",
    props: ['dataLength'],
    data() {
      return {
        myuser: null,
        comcontent: '',
      }
    },
    methods: {
      async myUserinfo() {
        const res = await this.$http.get('/user/'+ localStorage.getItem('id'))
        this.myuser = res.data[0]
      },
      commentPublish() {
        if(!this.myuser && !localStorage.getItem('token') && !localStorage.getItem('id')){
          this.$msg.fail('请先登录')
          return
        }
        this.$emit('Postcomment',this.comcontent)
        this.comcomment = ' '
      },
      focusIpt() {
        this.$refs.Postipt.focus()
      }
    },
    created() {
      if(localStorage.getItem('token')){
        this.myUserinfo();
      }
    },
    updated() {
      this.focusIpt()
    }
  }
</script>

<style lang="less" scoped>
  .comment{
    padding: 8.33vw 2.78vw 0 2.78vw;
    .comment-title{
      span:nth-child(2){
        color: #aaa;
        margin-left: 2.78vw;
      }
    }
    .commentMyinfo{
      padding: 2.78vw 0;
      display: flex;
      img{
        height: 8.33vw;
        width: 8.33vw;
        border-radius: 50%;
      }
      input{
        outline: none;
        border: 0;
        background: #f4f4f4;
        border-radius: 3.61vw;
        font-size: 3.33vw;
        padding: 0 5.56vw 0 4.17vw;
        margin-left: 2.78vw;
        width: 55%;
      }
      button{
        margin-left: 2.78vw;
        outline: none;
        border: 0;
        border-radius: 3.33vw;
        background: #fb7299;
        color: #fff;
        font-size: 3.33vw;
        padding: 0 4.17vw;
      }
    }
  }
</style>