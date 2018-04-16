<template>
  <ul class="article-list">
    <li class="article-item" v-for="(item, index) in articleList" :key="index">
      <div class="title">{{item.title}}</div>
      <div class="time">{{item.time}}</div>
      <div class="content">{{item.content}}</div>
      <router-link :to="`/Index/ArticleDetail?articleId=${item.id}`" tag="div" class="view-all">阅读全文&nbsp;<i class="fa fa-angle-double-down" aria-hidden="true"></i></router-link>
    </li>
  </ul>
</template>
<script>
export default {
  async asyncData ({ query, env }) {
    let { data } = await axios.get(`${env.baseUrl}/article/listF`)
    console.log(env.baseUrl)
    return { articleList: data.data }
  },
  data () {
    return {
    }
  },
  methods: {
    // 初始化文章列表
    initArticleList () {
      axios.get('/article/listF').then((response) => {
        var res = response.data
        if (res.code === 200) {
          this.articleList = res.data
        } else {
          console.log(res.msg)
        }
      })
    }
  },
  created () {
    // this.initArticleList()
  }
}
</script>
<style lang="less" scoped>
.article-list {
  .article-item {
    margin: 55px 0 24px;
    .title {
      margin-bottom: 20px;
      font-size: 21px;
      font-weight: 400;
      color: #1f2f3d;
    }
    .time {
      margin: 1em 0;
      color: #5e6d82;
      line-height: 1.5em;
    }
    .content {
      padding: 24px;
      color: #333;
      border: 1px solid #ebebeb;
      border-bottom: 0;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }
    .view-all {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 44px;
      border: 1px solid #ebebeb;
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
      cursor: pointer;
      transition: all .2s;
    }
    .view-all:hover {
      color: #409eff;
      background-color: #f9fafc;
      box-shadow: 0 0 2px #ddd;
    }
  }
  .article-item:first-child {
    margin-top: 0;
  }
}
</style>
