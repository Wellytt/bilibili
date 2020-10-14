<template>
  <div class="btnparent" @click="registerClick">
    <div class="loginbtn">{{btntext}}</div>
  </div>
</template>

<script>
  export default {
    props: ['btntext'],
    methods: {
      registerClick() {
        this.$emit('registerSubmit')
      }
    }
  }
</script>

<style scoped>
.btnparent{
  padding: 4.17vw 2.78vw;
}
.loginbtn{
  height: 45px;
  background-color: #ff9db5;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4.44vw;
  border-radius: 6.25vw;
}

</style>