<script setup lang="ts">
const props = withDefaults(defineProps<{
  countDesktop?: number
  countMobile?: number
  ringRadius?: number
  magnetRadius?: number
  lerp?: number
  waveSpeed?: number
  waveAmp?: number
  spread?: number
  floatSpeedX?: number
  floatSpeedY?: number
  floatRangeX?: number
  floatRangeY?: number
  gravity?: number
  glowColor?: string
}>(), {
  countDesktop: 1800,
  countMobile: 600,
  ringRadius: 140,
  magnetRadius: 220,
  lerp: 0.04,
  waveSpeed: 0.004,
  waveAmp: 40,
  spread: 2.2,
  floatSpeedX: 0.18,
  floatSpeedY: 0.28,
  floatRangeX: 0.28,
  floatRangeY: 0.22,
  gravity: 0.012,
  glowColor: '94,234,212',
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const SPRITE_SIZE = 24

interface Particle {
  x: number; y: number
  cx: number; cy: number
  t: number; speed: number
  offset: number
}

let particles: Particle[] = []
let virtualMouse = { x: 0, y: 0 }
let rafId = 0
let elapsed = 0
let sprite: HTMLCanvasElement | null = null

function isMobile() {
  return window.innerWidth < 768 || navigator.maxTouchPoints > 0
}

function buildSprite(color: string) {
  const s = document.createElement('canvas')
  s.width = SPRITE_SIZE * 2
  s.height = SPRITE_SIZE * 2
  const ctx = s.getContext('2d')!
  const grad = ctx.createRadialGradient(SPRITE_SIZE, SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE, SPRITE_SIZE)
  grad.addColorStop(0,   `rgba(${color},0.9)`)
  grad.addColorStop(0.3, `rgba(${color},0.4)`)
  grad.addColorStop(1,   `rgba(${color},0)`)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, s.width, s.height)
  return s
}

function initParticles(w: number, h: number) {
  const count = isMobile() ? props.countMobile : props.countDesktop
  virtualMouse = { x: w / 2, y: h / 2 }
  particles = Array.from({ length: count }, () => {
    const x = (Math.random() - 0.5) * w * props.spread + w / 2
    const y = (Math.random() - 0.5) * h * props.spread + h / 2
    return {
      x, y, cx: x, cy: y,
      t: Math.random() * 100,
      speed: 0.008 + Math.random() * 0.012,
      offset: Math.random() * Math.PI * 2,
    }
  })
}

function draw(ctx: CanvasRenderingContext2D, w: number, h: number) {
  elapsed += 0.016

  virtualMouse.x = w / 2 + Math.sin(elapsed * props.floatSpeedX) * w * props.floatRangeX
  virtualMouse.y = h / 2 + Math.cos(elapsed * props.floatSpeedY) * h * props.floatRangeY

  const mx = virtualMouse.x
  const my = virtualMouse.y

  ctx.clearRect(0, 0, w, h)
  if (!sprite) return

  for (const p of particles) {
    p.t += p.speed

    const dx = p.x - mx
    const dy = p.y - my
    const dist = Math.hypot(dx, dy)

    let tx = p.x
    let ty = p.y

    if (dist < props.magnetRadius) {
      const angle = Math.atan2(dy, dx) + elapsed * 0.08
      const wave = Math.sin(p.t * props.waveSpeed * 300 + angle) * props.waveAmp
      const r = props.ringRadius + wave + (p.offset - Math.PI) * 8
      tx = mx + r * Math.cos(angle)
      ty = my + r * Math.sin(angle)
    } else {
      ty += props.gravity * 60
      if (p.cy > h * 1.1) { p.y = -20; p.cy = -20 }
    }

    p.cx += (tx - p.cx) * props.lerp
    p.cy += (ty - p.cy) * props.lerp

    const distFromRing = Math.abs(Math.hypot(p.cx - mx, p.cy - my) - props.ringRadius)
    const glow = Math.max(0, 1 - distFromRing / 60)
    const scale = 0.4 + glow * 0.9

    ctx.globalAlpha = 0.2 + glow * 0.7
    ctx.drawImage(sprite, p.cx - SPRITE_SIZE * scale, p.cy - SPRITE_SIZE * scale, SPRITE_SIZE * 2 * scale, SPRITE_SIZE * 2 * scale)
  }

  ctx.globalAlpha = 1
}

function loop(ctx: CanvasRenderingContext2D, w: number, h: number) {
  draw(ctx, w, h)
  rafId = requestAnimationFrame(() => loop(ctx, w, h))
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  sprite = buildSprite(props.glowColor)

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initParticles(canvas.width, canvas.height)
  }

  resize()
  window.addEventListener('resize', resize, { passive: true })
  loop(ctx, canvas.width, canvas.height)

  onBeforeUnmount(() => {
    cancelAnimationFrame(rafId)
    window.removeEventListener('resize', resize)
  })
})
</script>

<template>
  <canvas ref="canvasRef" class="particles-canvas" />
</template>

<style scoped>
.particles-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
