<script setup>
import OocaHeader from './OocaHeader.vue'

const emit = defineEmits(['start'])
</script>

<template>
  <main class="ooca-page home-screen">
    <div class="home-shell">
      <OocaHeader :show-sound="false" lang="th" @home="() => {}" />

      <section class="home-content" aria-labelledby="home-title">
        <div class="home-mascot-wrap">
          <span class="home-spark" aria-hidden="true">
            <img src="/img/icon/sunny.svg" alt="" />
          </span>
          <img src="/img/mooca-summer.svg" alt="" class="home-mascot" />
        </div>

        <div class="home-copy font-prompt">
          <h1 id="home-title">เช็กอินความรู้สึก<br /><span>ของคุณกันดีกว่า</span></h1>
          <p>หยุดพักสักนิด แล้วลองสังเกตตัวเอง<br />ไปด้วยกันนะ</p>
        </div>

        <div class="home-language" aria-label="Choose language">
          <p class="font-prompt">เลือกภาษาที่อยากใช้</p>
          <div class="home-language-buttons">
            <button class="language-button language-button--th font-prompt" type="button" @click="emit('start', 'th')">
              ภาษาไทย
            </button>
            <button class="language-button language-button--en font-gotham" type="button" @click="emit('start', 'en')">
              English
            </button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
