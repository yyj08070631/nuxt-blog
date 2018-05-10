<template>
  <div class="article-edit">
    <div class="main">
      <!-- title -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章标题">
          <el-input v-model="form.articleTitle"></el-input>
        </el-form-item>
        <el-form-item label="文章内容">
          <div id="editor">
            <textarea :value="form.articleContent" @input="update"></textarea>
            <div v-html="compiledMarkdown"></div>
          </div>
        </el-form-item>
      </el-form>

      <!-- btn-group -->
      <el-button class="submit-btn" type="primary" @click="updateArticle">更新文章</el-button>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  /* async asyncData ({ query, env }) {
    let { data } = await axios.get(`${env.baseUrl}/article/singleArticle?articleId=${query.articleId}`)
    return {
      title: data.data.title,
      content: data.data.content,
      TITLE: data.data.title,
      CONTENT: data.data.content
    }
  }, */
  data () {
    return {
      form: {
        articleTitle: '',
        articleContent: ''
      }
    }
  },
  methods: {
    // 初始化文章信息
    initArticle () {
      axios.get(`/article/singleArticle?articleId=${this.articleIdParams}`)
        .then((response) => {
          var res = response.data
          if (res.code === 200) {
            this.form = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(err => {
          if (err.response.data === 'Unauthorized') {
            this.$message('登录已过期')
          } else {
            this.$message.error('未知错误')
          }
        })
    },
    // 更新文章
    updateArticle () {
      if (this.form.articleTitle === '' || this.form.articleContent === '') {
        this.$message('标题或内容不能为空')
      } else {
        axios.post('/article/updateArticle', Object.assign(this.form, { articleId: this.articleIdParams }))
          .then((response) => {
            var res = response.data
            if (res.code === 200) {
              this.$message.success('更新成功')
              this.$router.push('/Admin/ArticleList')
            } else {
              this.$message(res.msg)
            }
          })
          .catch(err => {
            if (err.response.data === 'Unauthorized') {
              this.$message('登录已过期')
            } else {
              this.$message.error('未知错误')
            }
          })
      }
    },
    // mde config
    update: _.debounce(function (e) {
      this.form.articleContent = e.target.value
    }, 300)
  },
  computed: {
    compiledMarkdown () {
      return marked(this.form.articleContent, { sanitize: true })
    },
    articleIdParams () { return this.$route.query.articleId || '' }
  },
  mounted () {
    this.initArticle()
  }
}
</script>
<style lang="less" scoped>
.article-edit {
  .main {
    width: 90%;
    #editor {
      height: 400px;
    }
    .submit-btn {
      margin-top: 15px
    }
  }
}

html, body, #editor {
  margin: 0;
  height: 100%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}

textarea, #editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
  white-space: normal;
  overflow-y: scroll;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>
