<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  block: Boolean,
  disabled: Boolean,
})

const sizeClasses = {
  sm: 'min-h-10 px-5 text-sm',
  md: 'min-h-11 px-6 text-base',
  lg: 'min-h-12 px-7 text-base',
}

const classes = computed(() => [
  'ooca-btn',
  `ooca-btn-${props.variant}`,
  sizeClasses[props.size],
  props.block ? 'w-full' : '',
])
</script>

<template>
  <button type="button" :class="classes" :disabled="disabled">
    <slot />
  </button>
</template>
