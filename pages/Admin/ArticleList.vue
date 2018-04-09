<template>
  <div id="article-list">
    <!-- 标题 -->
    <v-admin-title>文章列表</v-admin-title>
    <!-- 新增 -->
    <el-button type="primary" @click="$router.push('/Admin/ArticleCreate')" style="margin-bottom:20px">新 增</el-button>
    <!-- 列表 -->
    <el-table :data="articleList" border style="width: 100%">
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="time" label="创建时间"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <el-button type="info" @click="handleCheck(scope.row)">查 看</el-button>
          <el-button type="primary" @click="handleEdit(scope.row)">编 辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import VAdminTitle from '~/components/base/VAdminTitle'
export default {
  components: {
    VAdminTitle
  },
  /* async asyncData ({ params, env, error }) {
    try {
      let { data } = await axios.get(`${env.baseUrl}/article/list`)
      return { articleList: data.data }
    } catch (err) {
      if (err.response.statusText === 'Unauthorized') return { articleList: [] }
    }
  }, */
  data () {
    return {
      deleteArticleId: '', // 要删除的文章id
      deleteTxt: '', // 删除文案
      articleList: [] // 文章列表
    }
  },
  methods: {
    // 初始化文章列表
    initArticleList () {
      axios.get(`/article/list`)
        .then((response) => {
          var res = response.data
          if (res.code === 200) {
            this.articleList = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(err => {
          if (err.response.data === 'Unauthorized') {
            // 弹窗提示
            this.$message('登录已过期')
          } else {
            // 弹窗提示
            this.$message.error('未知错误')
          }
        })
    },
    // 删除文章
    deleteArticle () {
      axios.post('/article/deleteArticle', { articleId: this.deleteArticleId })
        .then((response) => {
          var res = response.data
          if (res.code === 200) {
            console.log(res.msg)
            this.deleteTxt = res.msg
            $('#del').modal('show')
            this.initArticleList()
          } else {
            console.log(res.msg)
            this.deleteTxt = res.msg
            $('#del').modal('show')
          }
        })
    },
    // 获取列表下标的方法
    indexMethod (index) { return index },
    // 查看回调
    handleCheck (item) { this.$router.push(`/Index/ArticleDetail?articleId=${item.id}`) },
    // 编辑回调
    handleEdit (item) { this.$router.push(`/Admin/ArticleEdit?articleId=${item.id}`) },
    // 删除回调
    handleDelete (item) {
      axios.post('/article/deleteArticle', { articleId: item.id })
        .then(response => {
          let res = response.data
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.initArticleList()
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
    }
  },
  created () {
    this.initArticleList()
  }
}
</script>
<style lang="less" scoped>
#article-list {
  .table {
    width: 90%;
    tbody tr td:first-child {
      width: 10%;
    }
    tbody tr td:nth-child(2) {
      width: 20%;
    }
    tbody tr td:nth-child(3) {
      width: 40%;
    }
    tbody tr td:last-child {
      width: 30%;
    }
  }
}
</style>
