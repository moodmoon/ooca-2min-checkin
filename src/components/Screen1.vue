<script setup>
import WeatherCheckin from './WeatherCheckin.vue'
defineProps({ lang: { type: String, default: 'th' } })
const emit = defineEmits(['back', 'next'])
</script>
<template><WeatherCheckin :lang="lang" @back="emit('back')" @next="emit('next', $event)" /></template>
