<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Home from './components/Home.vue'
import MoodCheckin from './components/MoodCheckin.vue'
import GuidedReflection from './components/GuidedReflection.vue'
import ReflectionTakeaway from './components/ReflectionTakeaway.vue'

const currentView = ref('home')
const lang = ref('th')
const selectedMood = ref(null)
const selectedReflection = ref(null)

function pushView(nextView) {
  const state = { ...(window.history.state || {}), oocaView: nextView }
  window.history.pushState(state, '', window.location.pathname + window.location.search)
  currentView.value = nextView
}

function start(selectedLang) {
  lang.value = selectedLang
  selectedMood.value = null
  selectedReflection.value = null
  pushView('mood')
}

function goToReflection(mood) {
  selectedMood.value = mood
  selectedReflection.value = null
  pushView('reflection')
}

function goToTakeaway(reflection) {
  selectedReflection.value = reflection
  pushView('takeaway')
}

function backHome() {
  selectedMood.value = null
  selectedReflection.value = null
  currentView.value = 'home'

  // Logo = a true home navigation. Replace the current experience state
  // so Browser Back returns to the previous website/page, not to the old step.
  window.history.replaceState(
    { oocaView: 'home' },
    '',
    window.location.pathname + window.location.search
  )
}

function handlePopState(event) {
  const nextView = event.state?.oocaView

  if (!nextView || nextView === 'home') {
    currentView.value = 'home'
    return
  }

  // Browser Back is the only back control in the experience.
  // Preserve selections when navigating back from a later step.
  if (nextView === 'mood') {
    currentView.value = 'mood'
  } else if (nextView === 'reflection' && selectedMood.value) {
    currentView.value = 'reflection'
  } else if (nextView === 'takeaway' && selectedMood.value && selectedReflection.value) {
    currentView.value = 'takeaway'
  } else {
    currentView.value = 'home'
  }
}

onMounted(() => {
  window.history.replaceState({ oocaView: 'home' }, '', window.location.pathname + window.location.search)
  window.addEventListener('popstate', handlePopState)
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', handlePopState)
})
</script>

<template>
  <Home v-if="currentView === 'home'" @start="start" />

  <MoodCheckin
    v-else-if="currentView === 'mood'"
    :lang="lang"
    @home="backHome"
    @next="goToReflection"
  />

  <GuidedReflection
    v-else-if="currentView === 'reflection'"
    :lang="lang"
    :mood="selectedMood"
    @home="backHome"
    @next="goToTakeaway"
  />

  <ReflectionTakeaway
    v-else
    :lang="lang"
    :mood="selectedMood"
    :reflection="selectedReflection"
    @home="backHome"
  />
</template>
