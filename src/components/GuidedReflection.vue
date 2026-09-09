<script setup>
import { computed, ref } from 'vue'
import OocaButton from './ui/OocaButton.vue'
import OocaHeader from './OocaHeader.vue'

const props = defineProps({
  lang: { type: String, default: 'th' },
})

const emit = defineEmits(['next', 'home'])
const selected = ref(null)

const options = [
  {
    id: 'rest', th: 'อยากพักสักหน่อย', en: 'I want a little rest',
    followTh: 'ขอพื้นที่ให้ตัวเองได้พัก', followEn: 'Give myself some room to rest',
  },
  {
    id: 'space', th: 'อยากให้ความคิดเบาลง', en: 'I want my thoughts to feel lighter',
    followTh: 'อยากวางบางอย่างลงสักพัก', followEn: 'Put something down for a while',
  },
  {
    id: 'manage', th: 'อยากค่อย ๆ จัดการทีละอย่าง', en: 'I want to take things one step at a time',
    followTh: 'ค่อย ๆ จัดการสิ่งที่อยู่ตรงหน้า', followEn: 'Take things one step at a time',
  },
  {
    id: 'listen', th: 'อยากมีใครสักคนรับฟัง', en: 'I want someone to listen',
    followTh: 'ลองเล่าให้ใครสักคนฟัง', followEn: 'Share it with someone you trust',
  },
  {
    id: 'explore', th: 'ยังบอกไม่ถูก ขอค่อย ๆ สำรวจ', en: "I’m not sure. I want to explore it slowly",
    followTh: 'ยังไม่ต้องรีบหาคำตอบ', followEn: 'There is no need to find an answer yet',
  },
]

const content = computed(() => props.lang === 'en' ? {
  title: 'What does your mind', accent: 'need most right now?',
  subtitle: 'You don’t need to know. Pick what feels closest.',
  cta: 'Let’s look at it together',
} : {
  title: 'ตอนนี้ใจของคุณ', accent: 'ต้องการอะไรที่สุด?',
  subtitle: 'ไม่ต้องคิดนาน เลือกสิ่งที่สะดุดใจก่อนก็ได้เลย',
  cta: 'ค่อย ๆ ดูไปด้วยกัน',
})

function choose(option) {
  selected.value = option
}

function next() {
  if (!selected.value) return
  emit('next', selected.value)
}
</script>

<template>
  <main class="ooca-page ooca-screen reflection-screen">
    <div class="experience-shell">
      <OocaHeader :lang="lang" @home="emit('home')" />

      <section class="reflection-content">
        <div class="reflection-mascot-wrap" :class="{ 'reflection-mascot-wrap--selected': selected }">
          <img src="/img/icon/mooca-neutral.svg" alt="" class="reflection-mascot" aria-hidden="true" />
        </div>

        <div class="experience-intro reflection-intro" :class="lang === 'en' ? 'font-gotham' : 'font-prompt'">
          <h1>{{ content.title }}<span>{{ content.accent }}</span></h1>
          <p>{{ content.subtitle }}</p>
        </div>

        <div class="reflection-options" :class="lang === 'en' ? 'font-gotham' : 'font-prompt'">
          <button
            v-for="option in options"
            :key="option.id"
            type="button"
            class="reflection-option"
            :class="{ 'reflection-option--selected': selected?.id === option.id }"
            :aria-pressed="selected?.id === option.id"
            @click="choose(option)"
          >
            <span>{{ lang === 'en' ? option.en : option.th }}</span>
            <img v-if="selected?.id === option.id" class="reflection-check" src="/img/icon/check-v2.svg" alt="" aria-hidden="true" />
          </button>
        </div>

        <div class="experience-actions reflection-actions">
          <OocaButton :disabled="!selected" :class="lang === 'en' ? 'font-gotham' : 'font-prompt'" class="experience-button" block @click="next">
            {{ content.cta }}
          </OocaButton>
        </div>
      </section>
    </div>
  </main>
</template>
