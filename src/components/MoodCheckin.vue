<script setup>
import { computed, nextTick, ref } from 'vue'
import MoodCard from './MoodCard.vue'
import OocaButton from './ui/OocaButton.vue'
import OocaHeader from './OocaHeader.vue'

const props = defineProps({
  lang: { type: String, default: 'th' },
})

const emit = defineEmits(['next', 'home'])

const moods = [
  {
    id: 'summer',
    image: '/img/mooca-summer.svg',
    th: 'แดดแรงหน่อย',
    en: 'Sunny',
    descriptionTh: 'วันนี้มีหลายอย่างเข้ามาพร้อมกัน',
    descriptionEn: 'A lot is happening at once',
    color: '#F9A000',
    soft: '#F8E4B3',
  },
  {
    id: 'winter',
    image: '/img/mooca-winter.svg',
    th: 'ขอพักก่อน',
    en: 'Resting',
    descriptionTh: 'วันนี้อยากพักสักหน่อย',
    descriptionEn: 'I could use some rest today',
    color: '#1F77DF',
    soft: '#E4EFFB',
  },
  {
    id: 'spring',
    image: '/img/mooca-spring.svg',
    th: 'อากาศกำลังดี',
    en: 'Feeling Good',
    descriptionTh: 'วันนี้รู้สึกเบา ๆ สบาย ๆ',
    descriptionEn: 'Feeling light and at ease',
    color: '#00C4B3',
    soft: '#DBF0EE',
  },
  {
    id: 'autumn',
    image: '/img/mooca-autumn.svg',
    th: 'ลมเย็น ๆ',
    en: 'A Little Quiet',
    descriptionTh: 'วันนี้อยากอยู่เงียบ ๆ สักหน่อย',
    descriptionEn: 'I feel like being a little quiet',
    color: '#528984',
    soft: '#F1F5F4',
  },
  {
    id: 'not-sure',
    image: '/img/mooca-notsure.svg',
    th: 'ยังบอกไม่ถูก',
    en: 'Not Sure',
    descriptionTh: 'วันนี้ยังบอกไม่ถูก',
    descriptionEn: "I can't quite tell today",
    color: '#7A8A89',
    soft: '#F1F4F4',
  },
]

// carouselIndex = the card currently being viewed/focused.
// selectedIndex = the card the user has explicitly chosen.
// Keeping these separate prevents the first card from looking selected on first load.
const carouselIndex = ref(0)
const selectedIndex = ref(null)
const isChanging = ref(false)
const direction = ref('next')
const touchStartX = ref(null)

const content = computed(() => props.lang === 'en' ? {
  title: 'How does your inner',
  accent: ' weather feel today?',
  subtitle: 'No right or wrong answer. Pick what feels closest.',
  next: 'Continue',
  helper: 'Choose the weather that feels closest to you right now.',
  selectedLabel: 'Selected',
} : {
  title: 'วันนี้ใจเหมือน',
  accent: 'อากาศแบบไหนนะ?',
  subtitle: 'ไม่มีคำตอบถูกหรือผิด เลือกอันที่ใกล้กับใจตอนนี้ที่สุดได้เลย',
  next: 'ไปต่อ',
  helper: 'เลือกสภาพอากาศที่ใกล้กับความรู้สึกตอนนี้ที่สุด',
  selectedLabel: 'เลือกแล้ว',
})

const selectedMood = computed(() => selectedIndex.value === null ? null : moods[selectedIndex.value])
const hasSelection = computed(() => selectedIndex.value !== null)

async function moveTo(index) {
  const nextIndex = Math.max(0, Math.min(moods.length - 1, index))
  if (nextIndex === carouselIndex.value) return

  direction.value = nextIndex > carouselIndex.value ? 'next' : 'prev'
  isChanging.value = true
  carouselIndex.value = nextIndex
  await nextTick()
  window.setTimeout(() => {
    isChanging.value = false
  }, 420)
}

function chooseMood(index) {
  selectedIndex.value = index
  // Keep the chosen card centered so the feedback is immediate and unambiguous.
  if (carouselIndex.value !== index) {
    moveTo(index)
  }
}

function move(step) {
  moveTo(carouselIndex.value + step)
}

function handleTouchStart(event) {
  touchStartX.value = event.touches[0]?.clientX ?? null
}

function handleTouchEnd(event) {
  if (touchStartX.value === null) return

  const endX = event.changedTouches[0]?.clientX ?? touchStartX.value
  const delta = endX - touchStartX.value
  touchStartX.value = null

  if (Math.abs(delta) < 45) return
  move(delta < 0 ? 1 : -1)
}

function next() {
  if (!selectedMood.value) return
  emit('next', selectedMood.value)
}
</script>

<template>
  <main class="ooca-page ooca-screen mood-checkin">
    <div class="experience-shell">
      <OocaHeader :lang="lang" @home="emit('home')" />

      <section class="weather-content">
        <div class="experience-intro" :class="lang === 'en' ? 'font-gotham' : 'font-prompt'">
          <div class="experience-symbol" aria-hidden="true"><img src="/img/icon/sunny.svg" alt="" /></div>
          <h1>
            {{ content.title }}<span>{{ content.accent }}</span>
          </h1>
          <p>{{ content.subtitle }}</p>
        </div>

        <div
          class="weather-carousel"
          role="region"
          :aria-label="lang === 'en' ? 'Inner weather choices' : 'ตัวเลือกสภาพอากาศของใจ'"
          @touchstart.passive="handleTouchStart"
          @touchend.passive="handleTouchEnd"
        >
          <div
            class="weather-carousel__track"
            :style="{ '--selected-index': carouselIndex }"
          >
            <button
              v-for="(mood, index) in moods"
              :key="mood.id"
              type="button"
              class="weather-carousel__item"
              :class="{
                'weather-carousel__item--focused': index === carouselIndex,
                'weather-carousel__item--selected': index === selectedIndex,
              }"
              :aria-label="`${lang === 'en' ? mood.en : mood.th}. ${index === selectedIndex ? content.selectedLabel : (lang === 'en' ? 'Tap to select' : 'แตะเพื่อเลือก')}`"
              :aria-pressed="index === selectedIndex"
              @click="chooseMood(index)"
            >
              <MoodCard
                :mood="mood"
                :selected="index === selectedIndex"
                :focused="index === carouselIndex"
                :lang="lang"
                :changing="isChanging && index === carouselIndex"
                :selected-label="content.selectedLabel"
              />
            </button>
          </div>

          <button
            class="carousel-arrow carousel-arrow--left"
            type="button"
            :disabled="carouselIndex === 0"
            :aria-label="lang === 'en' ? 'Previous weather' : 'สภาพอากาศก่อนหน้า'"
            @click="move(-1)"
          >
            <span class="ooca-icon-mask ooca-icon-mask--arrow" style="--icon-url: url('/img/icon/arrow-back.svg')" aria-hidden="true"></span>
          </button>

          <button
            class="carousel-arrow carousel-arrow--right"
            type="button"
            :disabled="carouselIndex === moods.length - 1"
            :aria-label="lang === 'en' ? 'Next weather' : 'สภาพอากาศถัดไป'"
            @click="move(1)"
          >
            <span class="ooca-icon-mask ooca-icon-mask--arrow" style="--icon-url: url('/img/icon/arrow-next.svg')" aria-hidden="true"></span>
          </button>
        </div>

        <div
          class="weather-dots"
          role="tablist"
          :aria-label="lang === 'en' ? `Showing weather ${carouselIndex + 1} of ${moods.length}` : `กำลังดูตัวเลือกที่ ${carouselIndex + 1} จาก ${moods.length}`"
        >
          <button
            v-for="(mood, index) in moods"
            :key="mood.id"
            class="weather-dot"
            :class="{ 'weather-dot--active': index === carouselIndex }"
            :style="index === carouselIndex ? { backgroundColor: mood.color } : {}"
            type="button"
            :aria-label="lang === 'en' ? `View ${mood.en}` : `ดู ${mood.th}`"
            :aria-current="index === carouselIndex ? 'true' : undefined"
            @click="moveTo(index)"
          />
        </div>

        <div class="experience-actions">
          <OocaButton
            :disabled="!hasSelection"
            :class="lang === 'en' ? 'font-gotham' : 'font-prompt'"
            class="experience-button"
            block
            @click="next"
          >
            {{ content.next }}
          </OocaButton>
        </div>
      </section>
    </div>
  </main>
</template>
