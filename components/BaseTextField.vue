<template>
  <div>
    <el-input
      v-model="value"
      :class="[classes]"
      :type="type"
      @input="$emit('input', { value: $event.target.value })"
    />
  </div>
</template>

<script>
export default {
  props: {
    classes: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  data: () => {
    return {
      value: '',
    }
  },
}
</script>

