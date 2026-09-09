<script setup>
import { computed } from 'vue'

const props = defineProps({
  mood: { type: Object, required: true },
  selected: { type: Boolean, default: false },
  focused: { type: Boolean, default: false },
  lang: { type: String, default: 'th' },
  changing: { type: Boolean, default: false },
  selectedLabel: { type: String, default: 'เลือกแล้ว' },
})

const title = computed(() => props.lang === 'en' ? props.mood.en : props.mood.th)
const description = computed(() =>
  props.lang === 'en' ? props.mood.descriptionEn : props.mood.descriptionTh
)
</script>

<template>
  <article
    class="mood-card"
    :class="{
      'mood-card--focused': focused,
      'mood-card--selected': selected,
      'mood-card--changing': changing,
    }"
    :style="{ '--mood-primary': mood.color, '--mood-soft': mood.soft }"
  >
    <div class="mood-card__image">
      <img :src="mood.image" :alt="title" draggable="false" />

      <span v-if="selected" class="mood-card__selected">
        <img src="/img/icon/check.svg" alt="" aria-hidden="true" />
        <span>{{ selectedLabel }}</span>
      </span>
    </div>

    <div class="mood-card__content" :class="lang === 'en' ? 'font-gotham' : 'font-prompt'">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </article>
</template>

<style scoped>
.mood-card {
  --card-border: transparent;
  --card-shadow: 0 4px 14px rgb(0 0 0 / 6%);
  width: 244px;
  border: 1.5px solid var(--card-border);
  border-radius: 12px;
  background: #fff;
  box-shadow: var(--card-shadow);
  transition:
    border-color 240ms ease,
    box-shadow 300ms ease,
    transform 300ms cubic-bezier(.22, 1, .36, 1);
  will-change: box-shadow, transform;
}

/* Focus is where the carousel is currently looking.
   It is intentionally not the same as selected. */
.mood-card--focused {
  box-shadow: 0 6px 18px rgb(0 0 0 / 7%);
}

/* The card frame never changes size.
   Only the mascot gets a playful visual response. */
.mood-card:hover,
.mood-card:focus-within {
  --card-border: color-mix(in srgb, var(--mood-primary) 38%, transparent);
  --card-shadow: 0 12px 28px color-mix(in srgb, var(--mood-primary) 13%, transparent);
  transform: translateY(-3px);
}

.mood-card--selected {
  --card-border: var(--mood-primary);
  --card-shadow: 0 12px 30px color-mix(in srgb, var(--mood-primary) 16%, transparent);
  transform: translateY(-3px);
}

.mood-card__image {
  position: relative;
  display: flex;
  width: 100%;
  height: 194px;
  align-items: center;
  justify-content: center;
  overflow: visible;
  border-radius: 10px 10px 0 0;
  background: var(--mood-soft);
  isolation: isolate;
}

/* Background stays inside the image panel while the mascot is allowed
   to visually breathe outside its normal box. */
.mood-card__image::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 10px 10px 0 0;
  background: var(--mood-soft);
}

.mood-card__image > img:first-child {
  position: relative;
  z-index: 2;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
  transform: scale(1);
  transform-origin: center 58%;
  transition:
    transform 460ms cubic-bezier(.22, 1, .36, 1),
    filter 320ms ease;
}

/* Hover / keyboard focus: mascot comes a little closer to the user. */
.mood-card:hover .mood-card__image > img:first-child,
.mood-card:focus-within .mood-card__image > img:first-child {
  transform: scale(1.10) translateY(-2px);
  animation: mascot-hover-bob 2.8s ease-in-out 460ms infinite;
}

/* Selected: same card dimensions, bigger mascot + gentle breathing. */
.mood-card--selected .mood-card__image > img:first-child {
  transform: scale(1.12) translateY(-3px);
  animation: mascot-selected-bob 3.2s ease-in-out 460ms infinite;
}

.mood-card__selected {
  position: absolute;
  z-index: 5;
  right: 10px;
  bottom: 10px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 28px;
  padding: 0 10px 0 7px;
  border-radius: 999px;
  color: #fff;
  background: var(--mood-primary);
  box-shadow: 0 5px 14px color-mix(in srgb, var(--mood-primary) 20%, transparent);
  font-size: 11px;
  font-weight: 500;
  animation: selected-in 280ms cubic-bezier(.22, 1, .36, 1);
}

.mood-card__selected img {
  width: 16px;
  height: 16px;
}

.mood-card__content {
  min-height: 78px;
  padding: 12px 12px 14px;
  text-align: center;
  background: #fff;
  border-radius: 0 0 10px 10px;
}

.mood-card__content h2 {
  margin: 0;
  color: var(--mood-primary);
  font-size: 17px;
  font-weight: 600;
  line-height: 1.35;
}

.mood-card__content p {
  margin: 4px 0 0;
  color: var(--mood-primary);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.45;
  opacity: .9;
}

.mood-card--changing .mood-card__image > img:first-child {
  animation: mascot-arrive 460ms cubic-bezier(.22, 1, .36, 1);
}

@keyframes mascot-arrive {
  0% { transform: scale(.96); opacity: .75; }
  55% { transform: scale(1.12) translateY(-3px); opacity: 1; }
  100% { transform: scale(1.10) translateY(-2px); opacity: 1; }
}

@keyframes mascot-hover-bob {
  0%, 100% { transform: scale(1.10) translateY(-2px); }
  50% { transform: scale(1.12) translateY(-5px); }
}

@keyframes mascot-selected-bob {
  0%, 100% { transform: scale(1.12) translateY(-3px); }
  50% { transform: scale(1.145) translateY(-6px); }
}

@keyframes selected-in {
  from { opacity: 0; transform: translateY(4px) scale(.94); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@media (max-width: 639px) {
  .mood-card {
    width: 230px;
    border-radius: 10px;
  }

  .mood-card__image {
    height: 182px;
  }

  .mood-card__content {
    min-height: 76px;
    padding: 11px 10px 13px;
  }

  .mood-card__content h2 {
    font-size: 17px;
  }

  .mood-card__content p {
    font-size: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mood-card,
  .mood-card__image > img,
  .mood-card__selected {
    animation: none !important;
    transition: none !important;
  }
}
</style>
