<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; message: string; stack?: string } }>()

const isUserError = computed(() => props.error.statusCode === 404 || props.error.statusCode === 403)

// ── Full layout state (404 / 403) ──────────────────────────────────────────
const webGLAvailable = ref(true)
const antigravityOpacity = ref(0)
const fadeSize = 25
const colorBendsMask = ref(`linear-gradient(to top, transparent ${-fadeSize}%, black 0%)`)

onMounted(() => {
  if (!isUserError.value) return

  try {
    const canvas = document.createElement('canvas')
    const gl = (canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) {
      webGLAvailable.value = false
    } else {
      const precision = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT)
      webGLAvailable.value = precision !== null
    }
  } catch {
    webGLAvailable.value = false
  }

  const onScroll = () => {
    const scrollTop = Math.max(window.scrollY, document.documentElement.scrollTop)
    const progress = Math.min(1, scrollTop / window.innerHeight)
    const eraseAmount = progress * 120
    colorBendsMask.value = `linear-gradient(to top, transparent ${eraseAmount - fadeSize}%, black ${eraseAmount}%)`
    antigravityOpacity.value = Math.max(0, scrollTop / window.innerHeight)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

// ── Copy error details (non-user errors) ───────────────────────────────────
const copied = ref(false)

const copyError = async () => {
  const text = [`Error ${props.error.statusCode}`, props.error.message, props.error.stack]
    .filter(Boolean)
    .join('\n\n')

  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    // clipboard not available — silently ignore
  }
}
</script>

<template>
  <!-- ── 404 / 403 — full site layout ──────────────────────────────────── -->
  <div v-if="isUserError" class="site-shell">
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

    <section class="hero-stage">
      <div class="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <div class="section-kicker">
          <span
            class="status-dot"
            style="background: #f87171; box-shadow: 0 0 18px rgba(248, 113, 113, 0.6)"
          />
          {{ error.statusCode === 404 ? 'Page not found' : 'Access denied' }}
        </div>

        <p
          class="mt-6 select-none font-semibold leading-none tracking-[-0.06em] text-white"
          style="font-size: clamp(6rem, 20vw, 14rem); opacity: 0.07"
          aria-hidden="true"
        >
          {{ error.statusCode }}
        </p>

        <h1
          class="-mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl"
        >
          {{
            error.statusCode === 404
              ? "This page doesn't exist."
              : "You don't have access to this page."
          }}
        </h1>

        <p class="mt-5 max-w-lg text-lg leading-8 text-slate-300">
          {{
            error.statusCode === 404
              ? "The page you're looking for may have been moved, renamed, or deleted."
              : "You don't have permission to view this resource."
          }}
        </p>

        <div class="mt-8">
          <button class="buttonLink gap-2.5" @click="clearError({ redirect: '/' })">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Go home
          </button>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>

  <!-- ── Other errors — simplified, no external dependencies ─────────────── -->
  <div
    v-else
    style="
      min-height: 100vh;
      background: #000;
      color: #e2e8f0;
      font-family: 'IBM Plex Sans', system-ui, sans-serif;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
    "
  >
    <p
      style="
        font-family: 'IBM Plex Mono', monospace;
        font-size: 0.7rem;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: rgba(103, 232, 249, 0.8);
      "
    >
      Server Error
    </p>

    <p
      style="
        font-family: 'Space Grotesk', sans-serif;
        font-size: clamp(5rem, 18vw, 12rem);
        font-weight: 600;
        line-height: 1;
        letter-spacing: -0.06em;
        color: white;
        opacity: 0.07;
        margin: 0.5rem 0 0;
        user-select: none;
      "
      aria-hidden="true"
    >
      {{ error.statusCode }}
    </p>

    <h1
      style="
        font-family: 'Space Grotesk', sans-serif;
        font-size: clamp(1.5rem, 4vw, 2.25rem);
        font-weight: 600;
        color: white;
        margin-top: -0.5rem;
        letter-spacing: -0.03em;
        max-width: 560px;
      "
    >
      Something went wrong on our end.
    </h1>

    <p
      style="
        color: #94a3b8;
        margin-top: 0.75rem;
        max-width: 500px;
        line-height: 1.75;
        font-size: 0.95rem;
        word-break: break-word;
      "
    >
      {{ error.message }}
    </p>

    <div
      style="
        display: flex;
        gap: 0.75rem;
        margin-top: 1.75rem;
        flex-wrap: wrap;
        justify-content: center;
      "
    >
      <button
        style="
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          height: 2.75rem;
          padding: 0 1.25rem;
          background: rgba(34, 211, 238, 0.1);
          border: 1px solid rgba(34, 211, 238, 0.25);
          border-radius: 9999px;
          color: #cffafe;
          font-size: 0.875rem;
          cursor: pointer;
          transition:
            background 200ms,
            border-color 200ms;
        "
        @click="copyError"
        @mouseover="
          ($event.currentTarget as HTMLElement).style.background = 'rgba(34,211,238,0.18)'
        "
        @mouseleave="
          ($event.currentTarget as HTMLElement).style.background = 'rgba(34,211,238,0.1)'
        "
      >
        <svg
          v-if="!copied"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="width: 1rem; height: 1rem"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="width: 1rem; height: 1rem"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        {{ copied ? 'Copied!' : 'Copy error details' }}
      </button>

      <a
        href="/"
        style="
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          height: 2.75rem;
          padding: 0 1.25rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
          color: #cbd5e1;
          font-size: 0.875rem;
          text-decoration: none;
          cursor: pointer;
          transition:
            border-color 200ms,
            color 200ms;
        "
        @mouseover="($event.currentTarget as HTMLElement).style.color = '#fff'"
        @mouseleave="($event.currentTarget as HTMLElement).style.color = '#cbd5e1'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="width: 1rem; height: 1rem"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        Go home
      </a>
    </div>

    <pre
      v-if="error.stack"
      style="
        margin-top: 2rem;
        padding: 1rem 1.25rem;
        background: rgba(15, 23, 42, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 1rem;
        overflow-x: auto;
        white-space: pre-wrap;
        word-break: break-word;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 0.7rem;
        color: #64748b;
        line-height: 1.75;
        max-width: min(90vw, 680px);
        text-align: left;
      "
      >{{ error.stack }}</pre
    >
  </div>
</template>
