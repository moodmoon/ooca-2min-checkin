<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Home from './components/Home.vue'
import WeatherCheckin from './components/WeatherCheckin.vue'
import GuidedReflection from './components/Screen2.vue'
import PersonalTakeaway from './components/Screen3.vue'

const screen = ref('home')
const lang = ref('th')
const selectedMood = ref(null)
const selectedReflection = ref(null)

function pushScreen(nextScreen) {
  const state = { ...(window.history.state || {}), oocaScreen: nextScreen }
  window.history.pushState(state, '', window.location.pathname + window.location.search)
  screen.value = nextScreen
}

function start(selectedLang) {
  lang.value = selectedLang
  selectedMood.value = null
  selectedReflection.value = null
  pushScreen('weather')
}

function goToReflection(mood) {
  selectedMood.value = mood
  selectedReflection.value = null
  pushScreen('reflection')
}

function goToTakeaway(reflection) {
  selectedReflection.value = reflection
  pushScreen('takeaway')
}

function restart() {
  selectedMood.value = null
  selectedReflection.value = null
  pushScreen('weather')
}

function backHome() {
  selectedMood.value = null
  selectedReflection.value = null
  screen.value = 'home'

  // Logo = a true home navigation. Replace the current experience state
  // so Browser Back returns to the previous website/page, not to the old step.
  window.history.replaceState(
    { oocaScreen: 'home' },
    '',
    window.location.pathname + window.location.search
  )
}

function handlePopState(event) {
  const nextScreen = event.state?.oocaScreen

  if (!nextScreen || nextScreen === 'home') {
    screen.value = 'home'
    return
  }

  // Browser Back is the only back control in the experience.
  // Preserve selections when navigating back from a later step.
  if (nextScreen === 'weather') {
    screen.value = 'weather'
  } else if (nextScreen === 'reflection' && selectedMood.value) {
    screen.value = 'reflection'
  } else if (nextScreen === 'takeaway' && selectedMood.value && selectedReflection.value) {
    screen.value = 'takeaway'
  } else {
    screen.value = 'home'
  }
}

onMounted(() => {
  window.history.replaceState({ oocaScreen: 'home' }, '', window.location.pathname + window.location.search)
  window.addEventListener('popstate', handlePopState)
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', handlePopState)
})
</script>

<template>
  <Home v-if="screen === 'home'" @start="start" />

  <WeatherCheckin
    v-else-if="screen === 'weather'"
    :lang="lang"
    @home="backHome"
    @next="goToReflection"
  />

  <GuidedReflection
    v-else-if="screen === 'reflection'"
    :lang="lang"
    :mood="selectedMood"
    @home="backHome"
    @next="goToTakeaway"
  />

  <PersonalTakeaway
    v-else
    :lang="lang"
    :mood="selectedMood"
    :reflection="selectedReflection"
    @home="backHome"
    @restart="restart"
  />
</template>
