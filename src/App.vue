<script setup>
import { ref } from 'vue'
import Home from './components/Home.vue'
import Screen1 from './components/Screen1.vue'

const screen = ref('home')
const lang = ref('th')

function start(selectedLang) {
  lang.value = selectedLang
  screen.value = 'screen1'
}

function backHome() {
  screen.value = 'home'
}
</script>

<template>
  <Home v-if="screen === 'home'" :lang="lang" @start="start" />
  <Screen1 v-else :lang="lang" @back="backHome" />
</template>
