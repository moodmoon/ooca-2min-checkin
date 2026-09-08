<script setup>
import OocaButton from './ui/OocaButton.vue'

const emit = defineEmits(['start'])
</script>

<template>
  <main class="ooca-page ooca-screen bg-[#F6F6F6]">
    <div
      class="ooca-desktop-shell flex min-h-[100svh] items-center justify-center px-5 py-8 sm:px-8 lg:px-12"
    >
      <section
        class="flex w-full max-w-[520px] flex-col items-center text-center lg:max-w-[680px]"
      >
        <img
          src="/logo.svg"
          alt="mindf:ll"
          class="h-auto w-[138px] sm:w-[155px] lg:w-[175px]"
        />

        <img
          src="/img/mooca-summer.svg"
          alt=""
          aria-hidden="true"
          class="mt-20 w-[205px] object-contain sm:mt-20 sm:w-[225px] lg:mt-16 lg:w-[245px]"
        />

        <div class="mt-10 sm:mt-11 lg:mt-9">
          <h1
            class="font-prompt text-[26px] font-semibold leading-[1.35] tracking-tight text-black sm:text-[30px] lg:text-[34px]"
          >
            เช็กอินความรู้สึกใน 2 นาที
          </h1>
          <p
            class="font-gotham mt-2 text-[17px] font-semibold leading-[1.4] text-[#1F77DF] sm:text-lg lg:text-xl"
          >
            A 2-minute check-in with yourself
          </p>
          <p
            class="font-prompt mx-auto mt-3 max-w-[430px] text-[13px] leading-6 text-[#888] sm:text-sm lg:text-base"
          >
            หยุดพักสักนิด แล้วลองสำรวจว่า<br class="sm:hidden" />
            ตอนนี้คุณกำลังรู้สึกอย่างไร
          </p>
          <p
            class="font-gotham mx-auto mt-1 max-w-[450px] text-[12px] leading-5 text-[#999] sm:text-sm"
          >
            Pause for a moment and notice how you feel right now.
          </p>
        </div>

        <div class="mt-9 flex flex-col items-center sm:mt-10">
          <p class="font-prompt mb-3 text-xs text-[#888] sm:text-sm">
            เลือกภาษา / Choose your language
          </p>

          <div class="flex gap-3">
            <OocaButton
              class="font-prompt min-w-[104px] sm:min-w-[112px]"
              variant="secondary"
              @click="emit('start', 'th')"
            >
              ภาษาไทย
            </OocaButton>

            <OocaButton
              class="font-gotham min-w-[104px] sm:min-w-[112px]"
              variant="secondary"
              @click="emit('start', 'en')"
            >
              English
            </OocaButton>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
