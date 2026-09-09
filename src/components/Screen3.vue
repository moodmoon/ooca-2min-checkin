<script setup>
import { computed, ref } from 'vue'
import OocaButton from './ui/OocaButton.vue'
import OocaHeader from './OocaHeader.vue'

const props = defineProps({
  lang: { type: String, default: 'th' },
  mood: { type: Object, default: null },
  reflection: { type: Object, default: null },
})

const emit = defineEmits(['restart', 'home'])
const triedStep = ref(false)
const saved = ref(false)
const showExplore = ref(false)
const closed = ref(false)

const copy = computed(() => props.lang === 'en' ? {
  title: 'What We Noticed', accent: ' Together',
  subtitle: 'Based on what you chose, let’s look at what might be on your mind.',
  fromSelection: 'From what you chose',
  insightLabel: 'What we noticed',
  nextLabel: 'One small step you can try',
  tryButton: 'Try this', tryDone: 'Nice — however small, that counts.',
  whatNext: 'What would you like to do next?',
  save: 'Save this', saved: 'Saved',
  explore: 'Explore', later: 'Maybe later',
  exploreTitle: 'A little more to explore',
  exploreItems: [
    { title: 'Rest isn’t laziness', body: 'Taking a pause is one way of taking care of yourself.' },
    { title: 'Try writing it down', body: 'Putting a thought into words can make it feel a little lighter.' },
    { title: 'Slow breathing helps', body: 'A few slow breaths can gently bring you back to the present.' },
  ],
  exploreClose: 'Close',
  goodbye: 'Thanks for pausing to notice yourself today.',
  home: 'Back to home',
  back: 'Back',
} : {
  title: 'เราสังเกต', accent: 'อะไรบางอย่างด้วยกัน',
  subtitle: 'จากสิ่งที่คุณเลือก ลองมาดูสิ่งที่อาจกำลังอยู่ในใจกัน',
  fromSelection: 'จากสิ่งที่คุณเลือก',
  insightLabel: 'สิ่งที่เราเห็น',
  nextLabel: 'ก้าวเล็ก ๆ ที่ลองได้',
  tryButton: 'ลองทำสิ่งนี้', tryDone: 'เก่งมากที่ลองนะ ไม่ว่าจะเล็กแค่ไหนก็มีความหมาย',
  whatNext: 'อยากทำอะไรต่อดี?',
  save: 'เก็บสิ่งนี้ไว้', saved: 'เก็บไว้แล้ว',
  explore: 'สำรวจต่อ', later: 'ไว้ก่อนก็ได้',
  exploreTitle: 'ลองอ่านเพิ่มเติมได้ที่นี่',
  exploreItems: [
    { title: 'การพักไม่ใช่ความขี้เกียจ', body: 'การหยุดพักก็เป็นวิธีหนึ่งในการดูแลตัวเองเหมือนกันนะ' },
    { title: 'ลองเขียนสิ่งที่อยู่ในใจ', body: 'การเขียนความคิดออกมาอาจช่วยให้รู้สึกเบาลงได้บ้าง' },
    { title: 'หายใจช้า ๆ ช่วยได้จริง', body: 'การหายใจช้า ๆ สักไม่กี่ครั้งช่วยพาใจกลับมาอยู่กับปัจจุบันได้' },
  ],
  exploreClose: 'ปิด',
  goodbye: 'ขอบคุณที่แวะมาสังเกตใจตัวเองนะ',
  home: 'กลับหน้าหลัก',
  back: 'ย้อนกลับ',
})

const reflectionId = computed(() => props.reflection?.id || 'explore')
const moodColor = computed(() => props.mood?.color || '#00C4B3')
const moodSoft = computed(() => props.mood?.soft || '#DBF0EE')
const mascotSrc = computed(() => props.mood?.image || '/img/mooca-summer.svg')

const hero = computed(() => {
  const id = reflectionId.value
  const th = {
    rest: { lead: 'วันนี้ใจของคุณอาจกำลัง\nต้องการพื้นที่ให้พัก', caveat: 'การอยากพักไม่ได้แปลว่าคุณอ่อนแอนะ บางทีใจอาจกำลังขอจังหวะที่เบาลง' },
    space: { lead: 'วันนี้ใจของคุณอาจกำลัง\nอยากให้ความคิดเบาลงสักหน่อย', caveat: 'ไม่ต้องรีบจัดการทุกความคิดพร้อมกันก็ได้ ลองปล่อยบางเรื่องไว้ก่อนนะ' },
    manage: { lead: 'วันนี้ใจของคุณอาจกำลัง\nอยากจัดการทีละเรื่องเบา ๆ', caveat: 'ไม่ต้องทำให้เสร็จทุกอย่างในวันเดียว ค่อย ๆ ไปทีละก้าวก็พอ' },
    listen: { lead: 'วันนี้ใจของคุณอาจกำลัง\nอยากมีใครสักคนรับฟัง', caveat: 'การอยากให้ใครสักคนรับฟัง ไม่ใช่เรื่องที่ต้องเกรงใจเลย' },
    explore: { lead: 'วันนี้ใจของคุณอาจกำลัง\nยังไม่แน่ใจว่าต้องการอะไร', caveat: 'ไม่ต้องรีบหาคำตอบตอนนี้ก็ได้ แค่ลองสังเกตไปเรื่อย ๆ ก่อนนะ' },
  }
  const en = {
    rest: { lead: 'Today your mind may be\nasking for a little room to rest.', caveat: 'Needing rest doesn’t mean you’re weak — sometimes your mind is just asking for a softer pace.' },
    space: { lead: 'Today your mind may be\nlooking for things to feel a little lighter.', caveat: 'You don’t have to sort every thought at once — it’s okay to let some things wait.' },
    manage: { lead: 'Today your mind may want to\ntake things one small step at a time.', caveat: 'You don’t need to finish everything today. One step at a time is enough.' },
    listen: { lead: 'Today your mind may be\nhoping for someone to listen.', caveat: 'Wanting to be heard is never something to feel bad about.' },
    explore: { lead: 'Today your mind may simply\nnot be sure yet — and that’s okay.', caveat: 'There’s no need to find the answer right now. Noticing is already a start.' },
  }
  return (props.lang === 'en' ? en : th)[id] || (props.lang === 'en' ? en.explore : th.explore)
})

const insight = computed(() => {
  const id = reflectionId.value
  if (props.lang === 'en') {
    if (id === 'rest') return 'It sounds like your mind may be asking for a little more space and rest today.'
    if (id === 'space') return 'There may be a lot moving through your mind right now. You don’t have to sort it all at once.'
    if (id === 'manage') return 'You may feel better when you can make things a little smaller and handle them one step at a time.'
    if (id === 'listen') return 'Sometimes, being heard can make what is on your mind feel a little less heavy.'
    return 'You don’t need a perfect label for what you feel. Noticing that something is there is already a start.'
  }
  if (id === 'rest') return 'การพักอาจเป็นสิ่งที่ใจของคุณกำลังต้องการอยู่ ไม่จำเป็นต้องรีบจัดการทุกอย่างในตอนนี้ก็ได้'
  if (id === 'space') return 'ดูเหมือนว่าตอนนี้อาจมีหลายอย่างกำลังวิ่งอยู่ในหัว คุณไม่จำเป็นต้องจัดการทุกอย่างพร้อมกัน'
  if (id === 'manage') return 'บางทีการทำเรื่องที่อยู่ตรงหน้าให้เล็กลง แล้วค่อย ๆ จัดการทีละอย่าง อาจช่วยให้ใจเบาขึ้น'
  if (id === 'listen') return 'บางครั้งการได้มีใครสักคนรับฟัง ก็ช่วยให้สิ่งที่อยู่ในใจรู้สึกเบาลงได้'
  return 'คุณไม่จำเป็นต้องหาคำที่ถูกต้องให้ความรู้สึกตอนนี้ แค่สังเกตว่ามีบางอย่างอยู่ในใจก็เป็นจุดเริ่มต้นแล้ว'
})

const nextStep = computed(() => {
  const id = reflectionId.value
  if (props.lang === 'en') {
    if (id === 'rest') return 'Put down what you’re doing for 5 minutes, and let yourself actually rest.'
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

function tryStep() {
  triedStep.value = true
}

function toggleSave() {
  saved.value = !saved.value
}

function closeExperience() {
  showExplore.value = false
  closed.value = true
}
</script>

<template>
  <main class="ooca-page ooca-screen takeaway-screen">
    <div class="experience-shell">
      <OocaHeader :lang="lang" @home="emit('home')" />

      <section v-if="!closed" class="takeaway-content" :style="{ '--takeaway-color': moodColor, '--takeaway-soft': moodSoft }">
        <div class="takeaway-mascot-wrap reveal reveal-0">
          <img :src="mascotSrc" alt="" class="takeaway-mascot" />
        </div>

        <div class="experience-intro takeaway-intro reveal reveal-1" :class="lang === 'en' ? 'font-gotham' : 'font-prompt'">
          <h1>{{ copy.title }}<span>{{ copy.accent }}</span></h1>
          <p>{{ copy.subtitle }}</p>
        </div>

        <div class="takeaway-hero reveal reveal-2" :class="lang === 'en' ? 'font-gotham' : 'font-prompt'">
          <p class="takeaway-hero__label">{{ copy.fromSelection }}</p>
          <p class="takeaway-hero__text" style="white-space: pre-line;">{{ hero.lead }}</p>
          <p class="takeaway-hero__caveat">{{ hero.caveat }}</p>
        </div>

        <div class="takeaway-section reveal reveal-3" :class="lang === 'en' ? 'font-gotham' : 'font-prompt'">
          <h2><img alt="" aria-hidden="true" />{{ copy.insightLabel }}</h2>
          <p>{{ insight }}</p>
        </div>

        <div class="takeaway-section takeaway-section--next reveal reveal-4" :class="lang === 'en' ? 'font-gotham' : 'font-prompt'">
          <h2><img alt="" aria-hidden="true" />{{ copy.nextLabel }}</h2>
          <p>{{ nextStep }}</p>
          <button v-if="!triedStep" class="takeaway-try" type="button" @click="tryStep">{{ copy.tryButton }}</button>
          <Transition name="action-pop">
            <p v-if="triedStep" class="takeaway-try-done">{{ copy.tryDone }}</p>
          </Transition>
        </div>

        <div class="takeaway-whatnext reveal reveal-5" :class="lang === 'en' ? 'font-gotham' : 'font-prompt'">
          <p class="takeaway-whatnext__label">{{ copy.whatNext }}</p>
          <div class="takeaway-actions-row">
            <button
              class="takeaway-save"
              :class="{ 'takeaway-save--done': saved }"
              type="button"
              :aria-pressed="saved"
              @click="toggleSave"
            >
              <img :src="saved ? '/img/icon/check.svg' : '/img/icon/bookmark.svg'" alt="" aria-hidden="true" />{{ saved ? copy.saved : copy.save }}
            </button>
            <button class="takeaway-explore" type="button" @click="showExplore = true">
              {{ copy.explore }}<img src="/img/icon/arrow-next.svg" alt="" aria-hidden="true" />
            </button>
          </div>
          <button class="takeaway-later" type="button" @click="closeExperience">{{ copy.later }}</button>
        </div>
      </section>

      <section v-else class="takeaway-closing" :class="lang === 'en' ? 'font-gotham' : 'font-prompt'">
        <img :src="mascotSrc" alt="" />
        <p>{{ copy.goodbye }}</p>
        <OocaButton class="experience-button" @click="emit('home')">{{ copy.home }}</OocaButton>
      </section>

      <Transition name="sheet">
        <div v-if="showExplore" class="explore-sheet-backdrop" @click.self="showExplore = false">
          <div class="explore-sheet" :class="lang === 'en' ? 'font-gotham' : 'font-prompt'" role="dialog" aria-modal="true" :aria-label="copy.exploreTitle">
            <div class="explore-sheet__handle" aria-hidden="true"></div>
            <h3>{{ copy.exploreTitle }}</h3>
            <ul>
              <li v-for="item in copy.exploreItems" :key="item.title">
                <strong>{{ item.title }}</strong>
                <span>{{ item.body }}</span>
              </li>
            </ul>
            <button class="explore-sheet__close" type="button" @click="showExplore = false">{{ copy.exploreClose }}</button>
          </div>
        </div>
      </Transition>
    </div>
  </main>
</template>