<script setup>
import { computed, ref } from 'vue'
import OocaButton from './ui/OocaButton.vue'

const props = defineProps({
  lang: {
    type: String,
    default: 'th',
  },
})

const emit = defineEmits(['back', 'next'])

const moods = [
  {
    id: 'summer',
    image: '/img/mooca-summer.svg',
    th: 'สดใส',
    en: 'Bright',
    descriptionTh: 'มีพลังและรู้สึกดี',
    descriptionEn: 'Feeling light and energized',
  },
  {
    id: 'spring',
    image: '/img/mooca-spring.svg',
    th: 'สบาย ๆ',
    en: 'Calm',
    descriptionTh: 'เรื่อย ๆ สบายใจ',
    descriptionEn: 'Feeling calm and steady',
  },
  {
    id: 'autumn',
    image: '/img/mooca-autumn.svg',
    th: 'หม่น ๆ',
    en: 'Cloudy',
    descriptionTh: 'มีเรื่องให้คิดอยู่บ้าง',
    descriptionEn: 'A little heavy or thoughtful',
  },
  {
    id: 'winter',
    image: '/img/mooca-winter.svg',
    th: 'เหนื่อย',
    en: 'Low',
    descriptionTh: 'อยากพักและอยู่กับตัวเอง',
    descriptionEn: 'Needing rest and space',
  },
]

const selected = ref(0)

const content = computed(() =>
  props.lang === 'en'
    ? {
        title: 'How are you feeling',
        accent: 'right now?',
        subtitle: 'There is no right or wrong answer. Choose what feels closest to you.',
        next: 'Next',
        back: 'Back',
      }
    : {
        title: 'วันนี้ใจคุณเหมือน',
        accent: 'อากาศแบบไหน',
        subtitle: 'ไม่มีคำตอบที่ถูกหรือผิด เลือกตามความรู้สึกแรกได้เลย',
        next: 'ต่อไป',
        back: 'ย้อนกลับ',
      },
)

const trackStyle = computed(() => ({
  '--mobile-shift': `calc(50vw - 95px - ${selected.value} * 206px)`,
}))

function selectMood(index) {
  selected.value = index
}

function next() {
  emit('next', moods[selected.value])
}

function prev() {
  selected.value = (selected.value - 1 + moods.length) % moods.length
}

function nextMood() {
  selected.value = (selected.value + 1) % moods.length
}
</script>

<template>
  <main class="ooca-page ooca-screen bg-[#F6F6F6]">
    <div class="ooca-desktop-shell flex min-h-[100svh] flex-col">
      <header class="flex items-center justify-center px-5 pt-7 sm:pt-9 lg:pt-8">
        <img src="/logo.svg" alt="mindf:ll" class="h-auto w-[105px] sm:w-[120px] lg:w-[128px]" />
      </header>

      <section class="flex flex-1 flex-col items-center px-0 pb-5 pt-10 sm:pt-12 lg:justify-center lg:pt-5">
        <div class="w-full max-w-[760px] px-5 text-center sm:px-8">
          <h1
            :class="[lang === 'en' ? 'font-gotham' : 'font-prompt']"
            class="text-[27px] font-semibold leading-[1.35] tracking-tight text-black sm:text-[32px] lg:text-[38px]"
          >
            {{ content.title }}
            <span class="block text-[#1F77DF]">{{ content.accent }}</span>
          </h1>

          <p
            :class="[lang === 'en' ? 'font-gotham' : 'font-prompt']"
            class="mx-auto mt-3 max-w-[600px] text-[13px] leading-6 text-[#8A8A8A] sm:text-sm lg:text-base"
          >
            {{ content.subtitle }}
          </p>
        </div>

        <div class="relative mt-9 w-full overflow-hidden sm:mt-11 lg:mt-9">
          <div
            class="mood-track flex w-max items-start gap-4 lg:mx-auto lg:w-auto lg:max-w-[1000px] lg:justify-center lg:gap-5"
            :style="trackStyle"
          >
            <button
              v-for="(mood, index) in moods"
              :key="mood.id"
              type="button"
              class="mood-card group shrink-0 text-center transition-all duration-300 lg:w-[215px]"
              :class="index === selected
                ? 'w-[190px] scale-100 opacity-100'
                : 'w-[190px] scale-[.88] opacity-45 lg:scale-95 lg:opacity-70'"
              @click="selectMood(index)"
            >
              <div
                class="mx-auto flex aspect-square w-full items-center justify-center rounded-[28px] bg-white transition-all duration-300 sm:rounded-[32px]"
                :class="index === selected
                  ? 'shadow-[0_8px_30px_rgba(31,119,223,0.12)] ring-2 ring-[#1F77DF]/15'
                  : 'shadow-sm'"
              >
                <img
                  :src="mood.image"
                  :alt="lang === 'en' ? mood.en : mood.th"
                  class="w-[88%] object-contain"
                />
              </div>

              <div
                :class="[lang === 'en' ? 'font-gotham' : 'font-prompt']"
                class="mt-4 text-[18px] font-semibold sm:text-xl lg:text-[21px]"
              >
                {{ lang === 'en' ? mood.en : mood.th }}
              </div>

              <div
                v-if="index === selected"
                :class="[lang === 'en' ? 'font-gotham' : 'font-prompt']"
                class="mt-1 text-xs text-[#888] sm:text-sm"
              >
                {{ lang === 'en' ? mood.descriptionEn : mood.descriptionTh }}
              </div>
            </button>
          </div>

          <div class="mt-5 flex items-center justify-center gap-3 lg:hidden">
            <button
              type="button"
              aria-label="Previous mood"
              class="grid h-9 w-9 place-items-center rounded-full bg-white text-xl leading-none text-[#1F77DF] shadow-sm"
              @click="prev"
            >
              ‹
            </button>
            <div class="flex items-center gap-1.5">
              <span
                v-for="(_, index) in moods"
                :key="index"
                class="h-1.5 rounded-full transition-all"
                :class="index === selected ? 'w-5 bg-[#1F77DF]' : 'w-1.5 bg-[#C8C8C8]'"
              />
            </div>
            <button
              type="button"
              aria-label="Next mood"
              class="grid h-9 w-9 place-items-center rounded-full bg-white text-xl leading-none text-[#1F77DF] shadow-sm"
              @click="nextMood"
            >
              ›
            </button>
          </div>
        </div>

        <div class="mt-auto w-full max-w-[360px] px-5 pt-6 sm:pt-7 lg:mt-9 lg:px-0">
          <OocaButton
            :class="[lang === 'en' ? 'font-gotham' : 'font-prompt']"
            class="h-11 sm:h-12"
            block
            @click="next"
          >
            {{ content.next }}
          </OocaButton>

          <button
            type="button"
            :class="[lang === 'en' ? 'font-gotham' : 'font-prompt']"
            class="mx-auto mt-2 block px-4 py-2 text-sm text-[#777]"
            @click="emit('back')"
          >
            {{ content.back }}
          </button>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.mood-track {
  transform: translateX(var(--mobile-shift));
}

@media (min-width: 1024px) {
  .mood-track {
    transform: none;
  }
}

</style>
