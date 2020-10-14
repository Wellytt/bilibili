<template>
  <div class="commentParent">
    <div v-for="(item,index) in commentList" :key="index">
      <div class="commentItem">
        <div class="userImg">
          <img v-if="item.userinfo.user_img" :src="item.userinfo.user_img" alt="">
          <img v-else src="@/assets/default_img.jpg" alt="">
        </div>
        <div class="commentContent">
          <p>
            <span v-if="item.userinfo.name">{{item.userinfo.name}}</span>
            <span v-else>此用户姓名为空</span>
            <span>{{item.comment_date}}</span>
          </p>
          <div>
            {{item.comment_content}}
            <span class="publish" @click="publishClick(item.comment_id)">回复</span>
          </div>
        </div>
      </div>
      <div style="padding-left: 40px;padding-right: 20px">
        <commentitem @PostPublish="publishClick" :commentChild="item.child"></commentitem>
      </div>
    </div>
  </div>
</template>

<script>
  import commentitem from "./commentitem";
  export default {
    name: "comment",
    data() {
      return{
        commentList: null
      }
    },
    components:{
      commentitem
    },
    methods: {
      async commentData() {
        const res = await this.$http.get('/comment/' + this.$route.params.id);
        if(res.data){
          this.$emit('lengthselect',res.data.length)
        }
        this.commentList = this.changeCommentData(res.data);
      },
      changeCommentData(data) {
        function fn(temp) {
          let arr1 = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].parent_id == temp) {
              arr1.push(data[i])
              data[i].child = fn(data[i].comment_id)
            }
          }
          return arr1
        }
        return  fn(null)
      },
      publishClick(id) {
        this.$emit('publishClick',id)
      }
    },
    created() {
      this.commentData()
    }
  }
</script>

<style lang="less" scoped>
.commentParent{
  padding: 2.78vw 2.78vw;
  >div{
    border-bottom: 0.28vw solid #e7e7e7;
  }
  .commentItem{
    display: flex;
    padding: 2.78vw 0;
    .userImg{
      margin-right: 2.78vw;
      img{
        width: 9.72vw;
        height: 9.72vw;
        border-radius: 50%;;
      }
    }
    .commentContent{
      flex: 1;
      position: relative;
      p{
        font-size: 3.61vw;
        color: #555;
        display: flex;
        justify-content: space-between;
        margin-bottom: 2.22vw;
      }
      div{
        font-size: 3.89vw;
        width: 90%;
      }
      .publish{
        color: red;
        right: 0.83vw;
        position: absolute;
      }
    }
  }
}
</style>