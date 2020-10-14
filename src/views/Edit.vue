<template>
  <div v-if="model" class="editViews">
    <div style="margin-bottom: 10px"><nav-bar></nav-bar></div>
    <div class="uploadfile">
      <van-uploader class="uploadimg" preview-size="100vw" :after-read="afterRead" />
        <edit-banner left="头像">
          <img :src="model.user_img" slot="right" alt="头像" v-if="model.user_img">
          <img src="@/assets/default_img.jpg" slot="right" alt="头像" v-else>
        </edit-banner>
    </div>
    <edit-banner left="昵称" @bannerClick="show = true">
      <a href="javascript:;" slot="right">{{model.name}}</a>
    </edit-banner>
    <edit-banner left="账号">
      <a href="javascript:;" slot="right">{{model.username}}</a>
    </edit-banner>
    <edit-banner left="性别" @bannerClick="gendershow = true">
      <a href="javascript:;" slot="right">{{model.gender == 1 ? '男' : '女'}}</a>
    </edit-banner>
    <edit-banner left="个性签名" @bannerClick="textshow = true">
      <a href="javascript:;" slot="right">{{model.user_desc}}</a>
    </edit-banner>

    <div class="editback" @click="$router.back()">返回个人中心</div>

    <van-dialog v-model="show"
                title="昵称"
                show-cancel-button
                @confirm="confirmClick"
                @cancel="content = ''"
    >
      <van-field v-model="content" autofocus />
    </van-dialog>

    <van-dialog v-model="textshow"
                title="个性签名"
                show-cancel-button
                @confirm="textareaClick"
                @cancel="content = ''"
    >
      <van-field v-model="content" type="textarea" autofocus />
    </van-dialog>

    <van-action-sheet v-model="gendershow"
                      cancel-text="取消"
                      :actions="actions"
                      @select="onSelect"
    />

  </div>
</template>

<script>
  import NavBar from "../components/common/NavBar";
  import editBanner from "../components/common/editBanner";
  export default {
    data() {
      return {
        model: {},
        content: '',
        show: false,
        textshow: false,
        gendershow: false,
        actions: [
            { name: '男',val: 1},
            { name: '女',val: 0}
          ],
      }
    },
    components: {
      NavBar,
      editBanner
    },
    methods: {
      async selectUser() {
        const res = await this.$http.get('/user/' + localStorage.getItem('id'))
        this.model = res.data[0]
      },
      async afterRead(file) {
        const formData = new FormData();
        formData.append('file',file.file);
        // console.log(file);
        const res = await this.$http.post('/upload',formData)
        this.model.user_img = res.data.url
        this.UserUpdate()
      },
      async UserUpdate() {
        const res = await this.$http.post('/update/' + localStorage.getItem('id'),this.model)
        if(res.data.code == 200) {
          this.$msg.fail('修改成功')
        }
      },
      confirmClick() {
        this.model.name = this.content
        this.UserUpdate()
        this.content = ''
      },
      textareaClick() {
        this.model.user_desc = this.content
        this.UserUpdate()
        this.content = ''
      },
      onSelect(data) {
        this.model.gender = data.val
        this.gendershow =  false
        this.UserUpdate()
      }
    },
    created() {
      this.selectUser()
    }
  }
</script>

<style lang="less" scoped>
.editViews a{
  color: #333;
}
.editViews img{
  height: 12.78vw;
  width: 12.78vw;
  border-radius: 50%;
}
.uploadfile{
  position: relative;
  overflow: hidden;
  .uploadimg{
    opacity: 0;
    position: absolute;
  }
}
.editback{
  margin-top: 5.56vw;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  padding: 4.17vw 0;
  font-size: 4.44vw;
}
</style>