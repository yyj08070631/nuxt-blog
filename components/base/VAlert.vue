<template>
  <!-- 确认删除弹窗 -->
  <div class="modal fade" :id="id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$emit('on-close')">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title" id="myModalLabel">
            <slot name="alert-title"></slot>
          </h4>
        </div>
        <div class="modal-body">
          <slot name="alert-body"></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="$emit('on-close')">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String
    }
  }
}
</script>
<style lang="less" scoped>
</style>
