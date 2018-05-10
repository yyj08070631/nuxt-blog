<template>
  <div class="article-detail">
    <h3>{{articleInfo.articleTitle}}</h3>
    <p>{{articleInfo.createTime | date}}</p>
    <div class="content" v-html="compiledMarkdown"></div>
  </div>
</template>
<script>
import formatDate from '~/util/util.js'

export default {
  async asyncData ({ query, env }) {
    let { data } = await axios.get(`${env.baseUrl}/article/singleArticle?articleId=${query.articleId}`)
    return { articleInfo: data.data }
  },
  data () {
    return {
    }
  },
  methods: {
    // 初始化文章信息
    initArticle () {
      axios(`/article/singleArticle?articleId=${this.articleId}`).then((response) => {
        var res = response.data
        if (res.code === 200) {
          this.articleInfo = res.data
        } else {
          console.log(res.msg)
        }
      })
    }
  },
  computed: {
    compiledMarkdown () {
      return marked(this.articleInfo.articleContent || '', { sanitize: true })
    },
    articleId () { return this.$route.query.articleId || '' }
  },
  filters: { date (val) { return formatDate(val) } },
  created () {
    // this.initArticle()
  }
}
</script>
<style lang="less" scoped>
.article-detail {
  width: 100%;
  h3 {
    margin-bottom: 20px;
    font-size: 21px;
    font-weight: 600;
    color: #1f2f3d;
  }
  p {
    margin-top: 14px;
    margin-bottom: 28px;
    color: #5e6d82;
    line-height: 1.5em;
  }
  .content {
    padding: 24px;
    color: #333;
    border: 1px solid #ebebeb;
    border-radius: 3px;
  }
}
</style>
