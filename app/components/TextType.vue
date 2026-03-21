<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text: string | readonly string[]
    as?: string
    className?: string
    showCursor?: boolean
    hideCursorWhileTyping?: boolean
    cursorCharacter?: string
    cursorClassName?: string
    typingSpeed?: number
    deletingSpeed?: number
    pauseDuration?: number
    initialDelay?: number
    loop?: boolean
    variableSpeed?: { min: number; max: number }
  }>(),
  {
    as: 'span',
    className: '',
    showCursor: true,
    hideCursorWhileTyping: false,
    cursorCharacter: '|',
    cursorClassName: '',
    typingSpeed: 50,
    deletingSpeed: 30,
    pauseDuration: 2000,
    initialDelay: 0,
    loop: true,
    variableSpeed: undefined,
  },
)

const texts = computed(() => (Array.isArray(props.text) ? props.text : [props.text]))
const displayedText = ref('')
const textIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)
const isMounted = ref(false)

let timer: ReturnType<typeof setTimeout> | null = null

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

const getTypingDelay = () => {
  if (!props.variableSpeed) return props.typingSpeed
  const { min, max } = props.variableSpeed
  return Math.round(Math.random() * (max - min) + min)
}

const tick = () => {
  const currentText = texts.value[textIndex.value] ?? ''

  if (!isDeleting.value) {
    if (charIndex.value < currentText.length) {
      displayedText.value = currentText.slice(0, charIndex.value + 1)
      charIndex.value += 1
      timer = setTimeout(tick, getTypingDelay())
      return
    }

    if (texts.value.length === 1 && !props.loop) {
      return
    }

    timer = setTimeout(() => {
      isDeleting.value = true
      tick()
    }, props.pauseDuration)
    return
  }

  if (charIndex.value > 0) {
    displayedText.value = currentText.slice(0, charIndex.value - 1)
    charIndex.value -= 1
    timer = setTimeout(tick, props.deletingSpeed)
    return
  }

  isDeleting.value = false

  if (!props.loop && textIndex.value === texts.value.length - 1) {
    return
  }

  textIndex.value = (textIndex.value + 1) % texts.value.length
  timer = setTimeout(tick, 180)
}

onMounted(() => {
  isMounted.value = true
  clearTimer()
  timer = setTimeout(tick, props.initialDelay)
})

onBeforeUnmount(() => {
  clearTimer()
})

watch(
  () => props.text,
  () => {
    if (!isMounted.value) return
    clearTimer()
    displayedText.value = ''
    textIndex.value = 0
    charIndex.value = 0
    isDeleting.value = false
    timer = setTimeout(tick, props.initialDelay)
  },
)
</script>

<template>
  <component :is="as" :class="`inline ${className}`">
    <span>{{ displayedText }}</span>
    <span
      v-if="showCursor"
      :class="[
        'text-type-cursor',
        hideCursorWhileTyping && !isDeleting && charIndex < (texts[textIndex]?.length ?? 0)
          ? 'opacity-0'
          : '',
        cursorClassName,
      ]"
    >
      {{ cursorCharacter }}
    </span>
  </component>
</template>

<style scoped>
.text-type-cursor {
  animation: text-type-blink 0.9s steps(1) infinite;
  vertical-align: baseline;
}

@keyframes text-type-blink {
  0%,
  49% {
    opacity: 1;
  }

  50%,
  100% {
    opacity: 0;
  }
}
</style>
