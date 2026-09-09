<script setup>
import { computed } from 'vue'
import OocaHeader from './OocaHeader.vue'

const props = defineProps({
  lang: { type: String, default: 'th' },
  mood: { type: Object, default: null },
  reflection: { type: Object, default: null },
})

const emit = defineEmits(['home'])

const copy = computed(() => props.lang === 'en' ? {
  title: 'What We Noticed',
  accent: ' Together',
  subtitle: 'From what you chose, let’s take a gentle look at what stood out.',
  fromSelection: 'From what you chose',
  insightLabel: 'What we noticed',
  nextLabel: 'One small step to try',
  tryButton: 'Try this',
  homeButton: 'Explore again',
} : {
  title: 'เราสังเกต',
  accent: 'อะไรบางอย่างด้วยกัน',
  subtitle: 'จากสิ่งที่คุณเลือก ลองมาดูสิ่งที่เราเห็นด้วยกันนะ',
  fromSelection: 'จากสิ่งที่คุณเลือก',
  insightLabel: 'สิ่งที่เราเห็น',
  nextLabel: 'ก้าวเล็ก ๆ ที่ลองได้',
  tryButton: 'ลองทำดู',
  homeButton: 'สำรวจใจอีกรอบ',
})

const reflectionId = computed(() => props.reflection?.id || 'explore')
const moodColor = computed(() => props.mood?.color || '#00C4B3')
const moodSoft = computed(() => props.mood?.soft || '#DBF0EE')
const mascotSrc = computed(() => props.mood?.image || '/img/mooca-neutral.svg')

const hero = computed(() => {
  const id = reflectionId.value
  const th = {
    rest: {
      lead: 'วันนี้ใจของคุณอาจกำลังต้องการพื้นที่ให้พัก',
      caveat: 'การอยากพักไม่ได้แปลว่าคุณอ่อนแอ บางทีใจก็กำลังขอจังหวะที่เบาลง',
    },
    space: {
      lead: 'วันนี้ใจของคุณอาจกำลังอยากให้ความคิดเบาลง',
      caveat: 'ไม่ต้องรีบจัดการทุกความคิดพร้อมกัน บางเรื่องวางไว้ก่อนได้',
    },
    manage: {
      lead: 'วันนี้ใจของคุณอาจกำลังอยากค่อย ๆ จัดการทีละอย่าง',
      caveat: 'ไม่ต้องทำทุกอย่างให้เสร็จในวันเดียว ค่อย ๆ ไปทีละก้าวก็พอ',
    },
    listen: {
      lead: 'วันนี้ใจของคุณอาจกำลังอยากมีใครสักคนรับฟัง',
      caveat: 'การอยากให้ใครสักคนรับฟัง ไม่ใช่เรื่องที่ต้องเกรงใจเลย',
    },
    explore: {
      lead: 'วันนี้ใจของคุณอาจกำลังยังไม่แน่ใจว่าต้องการอะไร',
      caveat: 'ไม่ต้องรีบหาคำตอบตอนนี้ แค่ค่อย ๆ สังเกตก็เป็นจุดเริ่มต้นแล้ว',
    },
  }

  const en = {
    rest: {
      lead: 'Today your mind may be\nasking for a little room to rest.',
      caveat: 'Needing rest does not mean you are weak. Sometimes your mind simply needs a softer pace.',
    },
    space: {
      lead: 'Today your mind may be\nlooking for things to feel lighter.',
      caveat: 'You do not have to sort every thought at once. Some things can wait.',
    },
    manage: {
      lead: 'Today your mind may want to\ntake things one small step at a time.',
      caveat: 'You do not need to finish everything today. One step at a time is enough.',
    },
    listen: {
      lead: 'Today your mind may be\nhoping for someone to listen.',
      caveat: 'Wanting to be heard is never something to feel bad about.',
    },
    explore: {
      lead: 'Today your mind may simply\nnot be sure yet — and that is okay.',
      caveat: 'There is no need to find the answer right now. Noticing is already a start.',
    },
  }

  return (props.lang === 'en' ? en : th)[id] || (props.lang === 'en' ? en.explore : th.explore)
})

const insight = computed(() => {
  const id = reflectionId.value

  if (props.lang === 'en') {
    if (id === 'rest') return 'Your choice may be a gentle reminder that rest deserves some space today.'
    if (id === 'space') return 'There may be a lot moving through your mind right now. You can let one thing wait.'
    if (id === 'manage') return 'Making things smaller can make the next step feel a little easier.'
    if (id === 'listen') return 'Sometimes, being heard can make what is on your mind feel a little less heavy.'
    return 'You do not need the perfect label for how you feel. Noticing that something is there is already a start.'
  }

  if (id === 'rest') return 'บางทีสิ่งที่ใจต้องการตอนนี้อาจเป็นการได้หยุดพัก โดยไม่ต้องรู้สึกผิดกับมัน'
  if (id === 'space') return 'ตอนนี้อาจมีหลายอย่างกำลังวิ่งอยู่ในหัว ไม่เป็นไรถ้าจะวางบางเรื่องไว้ก่อน'
  if (id === 'manage') return 'การทำเรื่องที่อยู่ตรงหน้าให้เล็กลง อาจทำให้ก้าวต่อไปดูง่ายขึ้น'
  if (id === 'listen') return 'บางครั้งการได้มีใครสักคนรับฟัง ก็ทำให้สิ่งที่อยู่ในใจรู้สึกเบาลงได้'
  return 'คุณไม่จำเป็นต้องหาคำที่ถูกต้องให้ความรู้สึก แค่สังเกตว่ามีบางอย่างอยู่ในใจก็เป็นจุดเริ่มต้นแล้ว'
})

const nextStep = computed(() => {
  const id = reflectionId.value

  if (props.lang === 'en') {
    if (id === 'rest') return 'Put down what you are doing for 5 minutes and let yourself rest.'
    if (id === 'space') return 'Write down one thought and let the rest wait for now.'
    if (id === 'manage') return 'Choose one tiny thing you can finish today. Let the rest wait.'
    if (id === 'listen') return 'Send one message to someone you feel safe talking to.'
    return 'Take one slow breath and notice what is happening around you right now.'
  }

  if (id === 'rest') return 'วางสิ่งที่กำลังทำอยู่ลง 5 นาที แล้วให้ตัวเองได้พักจริง ๆ'
  if (id === 'space') return 'ลองเขียนสิ่งที่วนอยู่ในหัวออกมา 1 เรื่อง แล้ววางเรื่องอื่นไว้ก่อน'
  if (id === 'manage') return 'เลือกเรื่องเล็ก ๆ 1 อย่างที่ทำให้เสร็จได้วันนี้ เรื่องที่เหลือค่อยว่ากัน'
  if (id === 'listen') return 'ลองส่งข้อความหาใครสักคนที่คุณรู้สึกปลอดภัยที่จะคุยด้วย'
  return 'ลองหายใจช้า ๆ หนึ่งครั้ง แล้วสังเกตสิ่งที่กำลังเกิดขึ้นรอบตัวตอนนี้'
})
</script>

<template>
  <main class="ooca-page ooca-screen takeaway-screen">
    <div class="experience-shell">
      <OocaHeader :lang="lang" @home="emit('home')" />

      <section
        class="takeaway-content"
        :style="{
          '--takeaway-color': moodColor,
          '--takeaway-soft': moodSoft
        }"
      >
        <div
          class="experience-intro takeaway-intro reveal reveal-1"
          :class="lang === 'en' ? 'font-gotham' : 'font-prompt'"
        >
          <h1>{{ copy.title }}<span>{{ copy.accent }}</span></h1>
          <p>{{ copy.subtitle }}</p>
        </div>

        <!-- Personalised reflection -->
        <article
          class="takeaway-hero reveal reveal-2"
          :class="lang === 'en' ? 'font-gotham' : 'font-prompt'"
        >
          <div class="takeaway-hero__mascot" aria-hidden="true">
            <img :src="mascotSrc" alt="" />
          </div>

          <p class="takeaway-hero__label">{{ copy.fromSelection }}</p>
          <h2 class="takeaway-hero__text">{{ hero.lead }}</h2>
          <p class="takeaway-hero__caveat">{{ hero.caveat }}</p>
        </article>

        <!-- Insight -->
        <article
          class="takeaway-section takeaway-section--insight reveal reveal-3"
          :class="lang === 'en' ? 'font-gotham' : 'font-prompt'"
        >
          <div class="takeaway-section__icon takeaway-section__icon--blue" aria-hidden="true">
            <img src="/img/icon/view-on.svg" alt="" />
          </div>
          <div class="takeaway-section__body">
            <h2>{{ copy.insightLabel }}</h2>
            <p>{{ insight }}</p>
          </div>
        </article>

        <!-- Future next step: visible, but intentionally disabled -->
        <article
          class="takeaway-section takeaway-section--next reveal reveal-4"
          :class="lang === 'en' ? 'font-gotham' : 'font-prompt'"
        >
          <div class="takeaway-section__icon takeaway-section__icon--green" aria-hidden="true">
            <img src="/img/icon/star.svg" alt="" />
          </div>

          <div class="takeaway-section__body">
            <h2>{{ copy.nextLabel }}</h2>
            <p>{{ nextStep }}</p>

            <button
              class="takeaway-try takeaway-try--disabled"
              type="button"
              disabled
              :aria-label="`${copy.tryButton}`"
            >
              {{ copy.tryButton }}
            </button>
          </div>
        </article>

        <!-- Current MVP ends here. Start again = return to Home. -->
        <div
          class="takeaway-final reveal reveal-5"
          :class="lang === 'en' ? 'font-gotham' : 'font-prompt'"
        >
          <button
            class="takeaway-home-button"
            type="button"
            @click="emit('home')"
          >
            {{ copy.homeButton }}
          </button>
        </div>
      </section>
    </div>
  </main>
</template>
