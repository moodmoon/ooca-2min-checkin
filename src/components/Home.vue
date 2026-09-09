<script setup>
import { ref } from 'vue'

const emit = defineEmits(['start'])
const activeLanguage = ref(null)

const languageOptions = [
  { id: 'th', label: 'ภาษาไทย', className: 'font-prompt' },
  { id: 'en', label: 'English', className: 'font-gotham' }
]

function start(lang) {
  activeLanguage.value = lang
  window.setTimeout(() => emit('start', lang), 140)
}
</script>

<template>
  <main class="ooca-page ooca-screen home-screen home-screen--landing">
    <section class="home-landing" aria-labelledby="home-title">
      <div class="home-top">
        <button
          type="button"
          class="home-logo-button"
          aria-label="mindfull"
          @click="activeLanguage = null"
        >
          <img src="/logo.svg" alt="mindfull" class="home-logo" />
        </button>
      </div>

      <div class="home-landing__content">
        <div class="home-hero-art" aria-hidden="true">
          <div class="home-hero-glow"></div>
          <span class="home-hero-spark home-hero-spark--one">✦</span>
          <span class="home-hero-spark home-hero-spark--two">✦</span>
          <img src="/img/icon/sunny.svg" alt="" class="home-hero-sun" />
          <img src="/img/mooca-summer.svg" alt="" class="home-hero-mascot" />
        </div>

        <div class="home-landing__copy font-prompt">
          <p class="home-greeting">สวัสดี วันนี้เป็นอย่างไรบ้าง?</p>

          <h1 id="home-title">ลองแวะมาดูใจตัวเอง <span>สักครู่ไหม</span></h1>

          <p class="home-lead">ใช้เวลาแค่ 2 นาที เพื่อฟังสิ่งที่อยู่ข้างใน</p>
        </div>

        <div class="home-language font-prompt">
          <div
            class="home-language-buttons"
            role="group"
            aria-label="เลือกภาษา"
          >
            <button
              v-for="option in languageOptions"
              :key="option.id"
              type="button"
              class="home-language-button"
              :class="[
                option.className,
                { 'home-language-button--active': activeLanguage === option.id }
              ]"
              @click="start(option.id)"
            >
              <span>{{ option.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
