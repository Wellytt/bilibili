<template>
  <div @click="pathPush" v-if="detailitem">
    <div class="detailItem">
      <div class="imgparent">
        <img :src="detailitem.img" alt="" style="width: 100%;height: 27.78vw"/>
        <div  class="bottom">
          <div class="icon-play2"><span class="video">1206</span></div>
          <div class="icon-file-text"><span class="comment">{{detailitem.commentlen ? detailitem.commentlen: 566}}</span></div>
        </div>
      </div>
      <p>{{detailitem.name}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['detailitem'],
    methods: {
      pathPush() {
        if(this.$route.path != `/article/${this.detailitem.id}`){
          this.$router.push(`/article/${this.detailitem.id}`)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.detailItem{
  p{
    font-size: 3.33vw;
    padding: 0.83vw 0;
  }
}
  .imgparent{
    position: relative;
    .bottom{
      position: absolute;
      margin-bottom: 1.39vw;
      padding: 0.56vw 2.78vw;
      bottom: 0.16vw;
      background: linear-gradient(0deg,rgba(0,0,0,.85),transparent);
      color: #fff;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
    }
  }
</style>