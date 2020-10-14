<template>
  <div class="commentitems">
    <div class="commentItem" v-for="(item,index) in commentChild" :key="index">
      <div class="userImg">
        <img v-if="item.userinfo.user_img" :src="item.userinfo.user_img" alt="">
        <img v-else src="@/assets/default_img.jpg" alt="">
        <p>
          <span v-if="item.userinfo.name">{{item.userinfo.name}}</span>
          <span v-else>此用户姓名为空</span>
          <span>{{item.comment_date}}</span>
        </p>
      </div>
      <div class="commentContent">
        <div v-if="!temp">{{item.comment_content}}<span class="publish" @click="PostItemcomment(item.comment_id)">回复</span></div>
        <div v-else>回复<span style="color: #478ef0">{{item.parent_user_info.name}}</span>:{{item.comment_content}}<span class="publish" @click="PostItemcomment(item.comment_id)">回复</span></div>
      </div>
      <comment-child-item :comment-child="item.child" @postChild="postChild" :temp="true"></comment-child-item>
    </div>
  </div>
</template>

<script>
  export default {
    name: "commentChildItem",
    props: ['commentChild','temp'],
    methods: {
      PostItemcomment(id) {
        this.$emit('postChild',id)
        this.$emit('PostPublish',id)
      },
      postChild(id) {
        this.PostItemcomment(id)
        this.$emit('PostPublish',id)
      }
    }
  }
</script>

<style lang="less" scoped>
.commentitems{
  .commentItem {
    display: flex;
    flex-direction: column;
    .userImg {
      display: flex;
      p{
        flex: 1;
        font-size: 3.33vw;
        color: #555;
        display: flex;
        justify-content: space-between;
        margin-bottom: 2.22vw;
      }
      img{
        margin: 0 1.39vw 2.78vw 0;
        width: 9.72vw;
        height: 9.72vw;
        border-radius: 50%;
      }
    }
    .commentContent{
      position: relative;
      margin-bottom: 3.33vw;
      padding: 0 8.33vw 0 0;
      .publish{
        position: absolute;
        font-size: 3.89vw;
        right: 0.83vw;
        color: red;
      }
    }
  }
}
</style>