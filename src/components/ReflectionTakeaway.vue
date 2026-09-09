<script setup>
import { computed } from 'vue'
import OocaHeader from './OocaHeader.vue'

const props = defineProps({
  lang: { type: String, default: 'th' },
  mood: { type: Object, default: null },
  reflection: { type: Object, default: null },
})

const emit = defineEmits(['home'])

const copy = computed(() => props.lang === 'en'
  ? {
      title: 'What We Noticed',
      accent: ' Together',
      subtitle: 'A small reflection from what you chose.',
      insightLabel: 'What we noticed',
      reflectionBadge: 'Today, your mind may be',
      nextLabel: 'One small step to try',
      tryButton: 'Try this',
      homeButton: 'Explore again',
    }
  : {
      title: 'เราสังเกต',
      accent: 'อะไรบางอย่างด้วยกัน',
      subtitle: 'จากสิ่งที่คุณเลือก ลองมาดูสิ่งที่เราเห็นด้วยกันนะ',
      insightLabel: 'สิ่งที่เราเห็น',
      reflectionBadge: 'วันนี้ใจของคุณอาจจะกำลัง',
      nextLabel: 'ก้าวเล็ก ๆ ที่ลองได้',
      tryButton: 'ลองทำดู',
      homeButton: 'สำรวจใจอีกรอบ',
    })

const reflectionId = computed(() => props.reflection?.id || 'explore')
const moodColor = computed(() => props.mood?.color || '#00C4B3')
const moodSoft = computed(() => props.mood?.soft || '#DBF0EE')
const mascotSrc = computed(() => props.mood?.image || '/img/icon/mooca-neutral.svg')

const reflectionContent = {
  rest: {
    th: {
      need: 'อยากพักสักหน่อย',
      caveat: 'การอยากพักไม่ได้แปลว่าคุณอ่อนแอ บางทีใจก็กำลังขอจังหวะที่เบาลง',
      insight: 'บางทีสิ่งที่ใจต้องการตอนนี้อาจเป็นการได้หยุดพัก โดยไม่ต้องรู้สึกผิดกับมัน',
      next: 'วางสิ่งที่กำลังทำอยู่ลง 5 นาที แล้วให้ตัวเองได้พักจริง ๆ',
    },
    en: {
      need: 'a little room to rest',
      caveat: 'Needing rest does not mean you are weak. Sometimes your mind simply needs a softer pace.',
      insight: 'Your choice may be a gentle reminder that rest deserves some space today.',
      next: 'Put down what you are doing for 5 minutes and let yourself rest.',
    },
  },
  space: {
    th: {
      need: 'อยากให้ความคิดเบาลง',
      caveat: 'ไม่ต้องรีบจัดการทุกความคิดพร้อมกัน บางเรื่องวางไว้ก่อนได้',
      insight: 'ตอนนี้อาจมีหลายอย่างกำลังวิ่งอยู่ในหัว ไม่เป็นไรถ้าจะวางบางเรื่องไว้ก่อน',
      next: 'ลองเขียนสิ่งที่วนอยู่ในหัวออกมา 1 เรื่อง แล้ววางเรื่องอื่นไว้ก่อน',
    },
    en: {
      need: 'wanting your thoughts to feel lighter',
      caveat: 'You do not have to sort every thought at once. Some things can wait.',
      insight: 'There may be a lot moving through your mind right now. You can let one thing wait.',
      next: 'Write down one thought and let the rest wait for now.',
    },
  },
  manage: {
    th: {
      need: 'อยากค่อย ๆ จัดการทีละอย่าง',
      caveat: 'ไม่ต้องทำทุกอย่างให้เสร็จในวันเดียว ค่อย ๆ ไปทีละก้าวก็พอ',
      insight: 'การทำเรื่องที่อยู่ตรงหน้าให้เล็กลง อาจทำให้ก้าวต่อไปดูง่ายขึ้น',
      next: 'เลือกเรื่องเล็ก ๆ 1 อย่างที่ทำให้เสร็จได้วันนี้ เรื่องที่เหลือค่อยว่ากัน',
    },
    en: {
      need: 'want to take things one step at a time',
      caveat: 'You do not need to finish everything today. One step at a time is enough.',
      insight: 'Making things smaller can make the next step feel a little easier.',
      next: 'Choose one tiny thing you can finish today. Let the rest wait.',
    },
  },
  listen: {
    th: {
      need: 'อยากมีใครสักคนรับฟัง',
      caveat: 'การอยากให้ใครสักคนรับฟัง ไม่ใช่เรื่องที่ต้องเกรงใจเลย',
      insight: 'บางครั้งการได้มีใครสักคนรับฟัง ก็ทำให้สิ่งที่อยู่ในใจรู้สึกเบาลงได้',
      next: 'ลองส่งข้อความหาใครสักคนที่คุณรู้สึกปลอดภัยที่จะคุยด้วย',
    },
    en: {
      need: 'wanting someone to listen',
      caveat: 'Wanting to be heard is never something to feel bad about.',
      insight: 'Sometimes, being heard can make what is on your mind feel a little less heavy.',
      next: 'Send one message to someone you feel safe talking to.',
    },
  },
  explore: {
    th: {
      need: 'ยังไม่แน่ใจว่าต้องการอะไร',
      caveat: 'ไม่ต้องรีบหาคำตอบตอนนี้ แค่ค่อย ๆ สังเกตก็เป็นจุดเริ่มต้นแล้ว',
      insight: 'คุณไม่จำเป็นต้องหาคำที่ถูกต้องให้ความรู้สึก แค่สังเกตว่ามีบางอย่างอยู่ในใจก็เป็นจุดเริ่มต้นแล้ว',
      next: 'ลองหายใจช้า ๆ หนึ่งครั้ง แล้วสังเกตสิ่งที่กำลังเกิดขึ้นรอบตัวตอนนี้',
    },
    en: {
      need: 'not be sure what you need yet',
      caveat: 'There is no need to find the answer right now. Noticing is already a start.',
      insight: 'You do not need the perfect label for how you feel. Noticing that something is there is already a start.',
      next: 'Take one slow breath and notice what is happening around you right now.',
    },
  },
}

const reflection = computed(() => {
  const entry = reflectionContent[reflectionId.value] || reflectionContent.explore
  return entry[props.lang === 'en' ? 'en' : 'th']
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

        <article
          class="takeaway-hero reveal reveal-2"
          :class="lang === 'en' ? 'font-gotham' : 'font-prompt'"
        >
          <div class="takeaway-hero__mascot" aria-hidden="true">
            <img :src="mascotSrc" alt="" />
          </div>

          <span class="takeaway-hero__tag">
            {{ copy.reflectionBadge }}
          </span>

          <h2 class="takeaway-hero__text">
            <strong>{{ reflection.need }}</strong>
          </h2>

          <p class="takeaway-hero__caveat">{{ reflection.caveat }}</p>
        </article>

        <article
          class="takeaway-section takeaway-section--insight reveal reveal-3"
          :class="lang === 'en' ? 'font-gotham' : 'font-prompt'"
        >
          <div class="takeaway-section__icon takeaway-section__icon--blue" aria-hidden="true">
            <img src="/img/icon/view-on.svg" alt="" />
          </div>
          <div class="takeaway-section__body">
            <h2>{{ copy.insightLabel }}</h2>
            <p>{{ reflection.insight }}</p>
          </div>
        </article>

        <article
          class="takeaway-section takeaway-section--next reveal reveal-4"
          :class="lang === 'en' ? 'font-gotham' : 'font-prompt'"
        >
          <div class="takeaway-section__icon takeaway-section__icon--green" aria-hidden="true">
            <img src="/img/icon/star.svg" alt="" />
          </div>

          <div class="takeaway-section__body">
            <h2>{{ copy.nextLabel }}</h2>
            <p>{{ reflection.next }}</p>

            <button
              class="takeaway-try takeaway-try--disabled"
              type="button"
              disabled
              :aria-label="copy.tryButton"
            >
              {{ copy.tryButton }}
            </button>

            <p class="takeaway-try-note">
              {{ lang === 'en' ? 'This step will be available in a future version.' : 'ก้าวนี้จะเปิดให้ลองในเวอร์ชันถัดไป' }}
            </p>
          </div>
        </article>

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
