<template>
  <div class="user-article">
    <div>
      <span>动态</span>
      <span>视频</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "userArticle"
  }
</script>

<style lang="less" scoped>
.user-article{
  display: flex;
  align-items: center;
  background-color: #fff;
  height: 11.11vw;
  padding: 0 2.78vw;
  border-top: 0.278vw  solid #ddd;
  >div{
    color: #777;
    >span{
      margin: 2.78vw;
    }
  }
}
</style>