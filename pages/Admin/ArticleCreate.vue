<template>
  <div class="article-create">
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
      <el-button class="submit-btn" type="primary" @click="postArticle">发布文章</el-button>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  data () {
    return {
      form: {
        articleTitle: '', // 文章标题
        articleContent: '' // 文章内容
      }
    }
  },
  methods: {
    // 发布文章
    postArticle () {
      axios.post('/article/increaseArticle', this.form)
        .then((response) => {
          var res = response.data
          if (res.code === 200) {
            this.$message.success('新增成功')
            this.$router.push('/Admin/ArticleList')
          } else if (res.code === 202) {
            this.$message.error('用户未登录')
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
    // mde config
    update: _.debounce(function (e) {
      this.form.articleContent = e.target.value
    }, 300)
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.form.articleContent, { sanitize: true })
    }
  }
}
</script>
<style lang="less" scoped>
.article-create {
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
