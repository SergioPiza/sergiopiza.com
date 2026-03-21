<script setup lang="ts">
const webGLAvailable = ref(true)

onMounted(() => {
  try {
    const canvas = document.createElement('canvas')
    const gl = (canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) {
      webGLAvailable.value = false
      return
    }
    const precision = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT)
    webGLAvailable.value = precision !== null
  } catch {
    webGLAvailable.value = false
  }
})

const antigravityOpacityDefault = 0
const antigravityOpacity = ref(antigravityOpacityDefault)

const fadeSize = 25
const colorBendsMask = ref(`linear-gradient(to top, transparent ${-fadeSize}%, black 0%)`)

const scrollThreshold = 90
const showBackToTop = ref(false)

const onScroll = () => {
  const scrollTop = Math.max(window.scrollY, document.documentElement.scrollTop)
  const progress = Math.min(1, scrollTop / window.innerHeight)
  const eraseAmount = progress * 120
  colorBendsMask.value = `linear-gradient(to top, transparent ${eraseAmount - fadeSize}%, black ${eraseAmount}%)`
  antigravityOpacity.value = Math.max(antigravityOpacityDefault, scrollTop / window.innerHeight)
  showBackToTop.value = scrollTop > scrollThreshold
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="site-shell">
    <div class="site-background" aria-hidden="true">
      <ClientOnly>
        <template v-if="webGLAvailable">
          <LazyAntigravityBackground
            class="site-antigravity"
            :style="{ opacity: antigravityOpacity }"
          />
          <div
            class="absolute inset-0"
            :style="{ maskImage: colorBendsMask, WebkitMaskImage: colorBendsMask }"
          >
            <ColorBends
              :colors="['#0e7490', '#0891b2', '#164e63', '#083344', '#0c4a6e', '#1e3a5f']"
              :rotation="0"
              :auto-rotate="0"
              :speed="0.5"
              :scale="1.2"
              :frequency="1"
              :warp-strength="1"
              :mouse-influence="1"
              :parallax="0.5"
              :noise="0"
              :transparent="true"
            />
          </div>
        </template>
        <ParticlesBackground
          v-else
          :ring-radius="120"
          :spread="2"
          :gravity="0.35"
          :float-range-x="0.35"
          :float-speed-x="0.7"
          :float-speed-y="1.3"
          :float-range-y="0.28"
          :count-mobile="800"
        />
      </ClientOnly>
      <div class="site-backdrop" />
      <div class="site-grid" />
      <div class="site-vignette" />
    </div>
    <AppHeader />
    <slot />
    <AppFooter />
    <button
      type="button"
      aria-label="Scroll back to top"
      class="back-to-top fixed bottom-6 right-6 z-[100] flex h-12 w-12 items-center justify-center rounded-full border p-0 text-slate-100 hover:text-white active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      :class="{ 'back-to-top--visible': showBackToTop }"
      :aria-hidden="!showBackToTop"
      :tabindex="showBackToTop ? 0 : -1"
      @click="scrollToTop"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-5 w-5"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  </div>
</template>
