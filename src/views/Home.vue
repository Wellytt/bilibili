<template>
  <div class="home" v-if="category">
    <nav-bar></nav-bar>
    <div class="categorytab">
      <div class="category-ico" @click="$router.push('/editcategory')">
        <van-icon name="setting-o" />
      </div>
    </div>
      <van-tabs v-model="active" swipeable sticky>
        <van-tab v-for="(item,index) in category" :key="index" :title="item.title">
          <van-list
                  v-model="item.loading"
                  :immediate-check="false"
                  :finished="item.finished"
                  finished-text="我也是有底线的"
                  @load="onLoad"
          >
        <div class="detailparent">
          <cover class="detailitem"
                  v-if="active == index"
                  :detailitem="categoryitem"
                  v-for="(categoryitem,categoryindex) in item.list"
                  :key="categoryindex"></cover>
        </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import NavBar from "../components/common/NavBar";
  import cover from "./cover";
  export default {
    name: "Home",
    data() {
      return {
        category: [],
        active: 0
      }
    },
    components: {
      cover,
      NavBar,
    },
    activated() {
      if(localStorage.getItem('newCat')) {
        let newCat = JSON.parse(localStorage.getItem('newCat'));
        this.category = this.changeCategory(newCat);
        this.selectArticle();
      }
    },
    methods: {
      async selectCategory() {
        if(localStorage.getItem('newCat')){
          return
        }
        const res = await this.$http.get('/category');
        this.category = this.changeCategory(res.data);
        this.selectArticle();
      },
      changeCategory(data) {
        const category1 = data.map((item,index) => {
          item.list = [];
          item.page = 0;
          item.finished = false;
          item.loading = true;
          item.pagesize = 10;
          return item
        });
        // this.category = category1;
        // this.selectArticle()
        return category1
      },
      async selectArticle() {
        const categoryitem = this.categoryItem();
        const res = await this.$http.get('/detail/' + categoryitem._id,{
          params: {
            page: categoryitem.page,
            pagesize: categoryitem.pagesize
          }
        });
        categoryitem.list.push(...res.data);
        categoryitem.loading = false;
        if(res.data.length < categoryitem.pagesize) {
          categoryitem.finished = true;
        }
      },
      onLoad() {
        const categoryitem = this.categoryItem();
        setTimeout(() => {
          categoryitem.page += 1;
          this.selectArticle()
        },1000)
      },
      categoryItem() {
        const categoryitem = this.category[this.active];
        return categoryitem
      }
    },
    watch: {
      active() {
        const categoryitem = this.categoryItem();
        if(!categoryitem.list.length) {
          this.selectArticle();
        }
      }
    },
    created() {
      this.selectCategory()
    }
  }
</script>

<style lang="less" scoped>
  .home{
    background-color: #fff;
  }
  .detailparent{
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    .detailitem{
      margin: 5px 0;
      width: 45%;
    }
  }
  .categorytab{
    position: relative;
    .category-ico{
      position: absolute;
      z-index: 5;
      right: 0;
      top: 1.94vw;
      padding: 1.39vw 2.78vw;
      background-color: #fff;
    }
  }
</style>