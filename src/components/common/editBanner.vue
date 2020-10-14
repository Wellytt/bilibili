<template>
  <div @click="bannerClick">
    <div class="editbanner">
      <span>{{left}}</span>
      <span><slot name="right"></slot></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "editBanner",
    props: ['left'],
    methods: {
      bannerClick() {
        this.$emit('bannerClick')
      }
    }
  }
</script>

<style scoped>
.editbanner{
  background-color: #fff;
  padding: 4.17vw;
  color: #333;
  font-size: 4.44vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #fafafa;
}
</style>