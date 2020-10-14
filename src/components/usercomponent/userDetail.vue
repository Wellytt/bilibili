<template>
  <div class="userdetail">
    <div>
      <div class="user_img">
        <img :src="userInfo.user_img" alt="头像" v-if="userInfo.user_img" />
        <img src="@/assets/default_img.jpg" alt="头像" v-else />
      </div>
      <div class="user_edit">
        <div>
          <p>
            <span>0</span>
            <span class="user_text">粉丝</span>
          </p>
          <p>
            <span>22</span>
            <span class="user_text">关注</span>
          </p>
          <p>
            <span>0</span>
            <span class="user_text">获赞</span>
          </p>
        </div>
        <div @click="$router.push('/edit')">
          <div class="user_editBtn">编辑资料</div>
        </div>
      </div>
    </div>
    <div>
      <h2>{{userInfo.name}}</h2>
      <p v-if="userInfo.user_desc">{{userInfo.user_desc}}</p>
      <p v-else>这个人很懒,什么都没有留下...</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "userDetail",
    props: ['userInfo']
  }
</script>

<style lang="less" scoped>
.userdetail{
  background-color: #fff;
  padding: 0vw 3.33vw;
  >div:nth-child(1){
    display: flex;
    .user_img{
      margin-right: 5.56vw;
      img{
        height: 23.61vw;
        width: 23.61vw;
        border-radius: 50%;
      }
    }
    .user_edit{
      flex: 1;
      div:nth-child(1) {
        margin-top: 2.78vw;
        display: flex;
        p{
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-size: 3.61vw;
          .user_text{
            color: #aaa;
          }
        }
        p:nth-child(1),p:nth-child(2){
          border-right: 0.28vw solid #ccc;
        }
      }
      div:nth-child(2) {
        padding: 0.56vw 2.78vw;
        .user_editBtn{
          border: 0.28vw solid #fb7a9f;
          padding: 0.83vw;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fb7a9f;
          border-radius: 1.11vw;
          font-size: 3.61vw;
        }
      }
    }
  }
  >div:nth-child(2){
    h2{
      margin: 2.78vw 0 0.83vw 0;
      font-weight: 400;
    }
    p{
      padding-bottom: 1.39vw;
      margin: 2.78vw 0;
      color: #999;
    }
  }
}
</style>