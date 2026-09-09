<script setup>
import { computed, ref } from 'vue'
import { toggleAmbientMusic, isAmbientPlaying } from '../utils/ambientMusic'

const props = defineProps({
  lang: { type: String, default: 'th' },
  showSound: { type: Boolean, default: true },
})

const emit = defineEmits(['home'])

const isSoundOn = ref(isAmbientPlaying())

const soundLabel = computed(() =>
  isSoundOn.value
    ? (props.lang === 'th' ? 'ปิดเสียง' : 'Turn sound off')
    : (props.lang === 'th' ? 'เปิดเสียง' : 'Turn sound on')
)

async function toggleSound() {
  isSoundOn.value = await toggleAmbientMusic()
}

function goHome() {
  emit('home')
}
</script>

<template>
  <header class="ooca-header">
    <div class="ooca-header__inner">
      <button
        class="ooca-header__logo-button"
        type="button"
        :aria-label="lang === 'th' ? 'กลับหน้าแรก' : 'Go to home'"
        @click="goHome"
      >
        <img src="/logo.svg" alt="mindf:ll" class="ooca-header__logo" />
      </button>

      <button
        v-if="showSound"
        class="ooca-header__sound"
        :class="{ 'ooca-header__sound--active': isSoundOn }"
        type="button"
        :aria-pressed="isSoundOn"
        :aria-label="soundLabel"
        @click="toggleSound"
      >
        <span
          class="ooca-icon-mask ooca-icon-mask--volume"
          :style="{ '--icon-url': `url(${isSoundOn ? '/img/icon/volume-on.svg' : '/img/icon/volume-off.svg'})` }"
          aria-hidden="true"
        ></span>
      </button>
    </div>
  </header>
</template>
