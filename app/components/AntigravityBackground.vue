<script setup lang="ts">
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

type ParticleShape = 'capsule' | 'sphere' | 'box' | 'tetrahedron'

interface Particle {
  t: number
  speed: number
  mx: number
  my: number
  mz: number
  cx: number
  cy: number
  cz: number
  randomRadiusOffset: number
}

const props = withDefaults(
  defineProps<{
    count?: number
    magnetRadius?: number
    ringRadius?: number
    waveSpeed?: number
    waveAmplitude?: number
    particleSize?: number
    lerpSpeed?: number
    color?: string
    autoAnimate?: boolean
    particleVariance?: number
    rotationSpeed?: number
    depthFactor?: number
    pulseSpeed?: number
    particleShape?: ParticleShape
    fieldStrength?: number
  }>(),
  {
    count: 3220,
    magnetRadius: 8,
    ringRadius: 15,
    waveSpeed: 0.45,
    waveAmplitude: 0.8,
    particleSize: 1.15,
    lerpSpeed: 0.06,
    color: '#5eead4',
    autoAnimate: true,
    particleVariance: 0.8,
    rotationSpeed: 0.08,
    depthFactor: 1.2,
    pulseSpeed: 2.6,
    particleShape: 'capsule',
    fieldStrength: 12,
  },
)

const containerRef = ref<HTMLDivElement | null>(null)

let renderer: THREE.WebGLRenderer | null = null
let composer: EffectComposer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let mesh: THREE.InstancedMesh | null = null
let animationFrameId = 0
let particles: Particle[] = []
let dummy: THREE.Object3D | null = null
let lastMousePos = { x: 0, y: 0 }
let lastMouseMoveTime = 0
let virtualMouse = { x: 0, y: 0 }
const pointer = { x: 0, y: 0 }
let clock: THREE.Clock | null = null

function createGeometry(shape: ParticleShape): THREE.BufferGeometry {
  switch (shape) {
    case 'sphere':
      return new THREE.SphereGeometry(0.2, 16, 16)
    case 'box':
      return new THREE.BoxGeometry(0.3, 0.3, 0.3)
    case 'tetrahedron':
      return new THREE.TetrahedronGeometry(0.3)
    case 'capsule':
    default:
      return new THREE.CapsuleGeometry(0.1, 0.4, 4, 8)
  }
}

function getViewportAtDepth(activeCamera: THREE.PerspectiveCamera, depth: number) {
  const fovInRadians = (activeCamera.fov * Math.PI) / 180
  const height = 2 * Math.tan(fovInRadians / 2) * depth
  const width = height * activeCamera.aspect
  return { width, height }
}

function initParticles(viewportWidth: number, viewportHeight: number) {
  particles = []

  for (let i = 0; i < props.count; i += 1) {
    const t = Math.random() * 100
    const speed = 0.01 + Math.random() / 200
    const x = (Math.random() - 0.5) * viewportWidth
    const y = (Math.random() - 0.5) * viewportHeight
    const z = (Math.random() - 0.5) * 20

    particles.push({
      t,
      speed,
      mx: x,
      my: y,
      mz: z,
      cx: x,
      cy: y,
      cz: z,
      randomRadiusOffset: (Math.random() - 0.5) * 2,
    })
  }
}

function onPointerMove(event: PointerEvent) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
}

function onResize() {
  const container = containerRef.value
  if (!container || !renderer || !camera) return

  const { clientWidth, clientHeight } = container
  camera.aspect = clientWidth / clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(clientWidth, clientHeight)
  composer?.setSize(clientWidth, clientHeight)
}

function animate() {
  animationFrameId = window.requestAnimationFrame(animate)

  if (!mesh || !camera || !renderer || !scene || !dummy || !clock) return

  const viewport = getViewportAtDepth(camera, camera.position.z)
  const elapsedTime = clock.getElapsedTime()
  const mouseDist = Math.hypot(pointer.x - lastMousePos.x, pointer.y - lastMousePos.y)

  if (mouseDist > 0.001) {
    lastMouseMoveTime = Date.now()
    lastMousePos = { x: pointer.x, y: pointer.y }
  }

  let destX = (pointer.x * viewport.width) / 2
  let destY = (pointer.y * viewport.height) / 2

  if (props.autoAnimate && Date.now() - lastMouseMoveTime > 1800) {
    destX = Math.sin(elapsedTime * 0.45) * (viewport.width / 4.5)
    destY = Math.cos(elapsedTime * 0.8) * (viewport.height / 5)
  }

  virtualMouse.x += (destX - virtualMouse.x) * 0.05
  virtualMouse.y += (destY - virtualMouse.y) * 0.05

  const targetX = virtualMouse.x
  const targetY = virtualMouse.y
  const globalRotation = elapsedTime * props.rotationSpeed

  particles.forEach((particle, index) => {
    particle.t += particle.speed / 2

    const projectionFactor = 1 - particle.cz / 50
    const projectedTargetX = targetX * projectionFactor
    const projectedTargetY = targetY * projectionFactor
    const dx = particle.mx - projectedTargetX
    const dy = particle.my - projectedTargetY
    const dist = Math.hypot(dx, dy)

    let targetPos = {
      x: particle.mx,
      y: particle.my,
      z: particle.mz * props.depthFactor,
    }

    if (dist < props.magnetRadius) {
      const angle = Math.atan2(dy, dx) + globalRotation
      const wave = Math.sin(particle.t * props.waveSpeed + angle) * (0.5 * props.waveAmplitude)
      const deviation = particle.randomRadiusOffset * (5 / (props.fieldStrength + 0.1))
      const currentRingRadius = props.ringRadius + wave + deviation

      targetPos = {
        x: projectedTargetX + currentRingRadius * Math.cos(angle),
        y: projectedTargetY + currentRingRadius * Math.sin(angle),
        z:
          particle.mz * props.depthFactor +
          Math.sin(particle.t) * props.waveAmplitude * props.depthFactor,
      }
    }

    particle.cx += (targetPos.x - particle.cx) * props.lerpSpeed
    particle.cy += (targetPos.y - particle.cy) * props.lerpSpeed
    particle.cz += (targetPos.z - particle.cz) * props.lerpSpeed

    dummy.position.set(particle.cx, particle.cy, particle.cz)
    dummy.lookAt(projectedTargetX, projectedTargetY, particle.cz)
    dummy.rotateX(Math.PI / 2)

    const currentDistToMouse = Math.hypot(
      particle.cx - projectedTargetX,
      particle.cy - projectedTargetY,
    )
    const distFromRing = Math.abs(currentDistToMouse - props.ringRadius)
    const scaleFactor = Math.max(0, Math.min(1, 1 - distFromRing / 10))
    const finalScale =
      scaleFactor *
      (0.8 + Math.sin(particle.t * props.pulseSpeed) * 0.2 * props.particleVariance) *
      props.particleSize

    dummy.scale.set(finalScale, finalScale, finalScale)
    dummy.updateMatrix()
    mesh.setMatrixAt(index, dummy.matrix)
  })

  mesh.instanceMatrix.needsUpdate = true
  composer.render()
}

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

function setupScene() {
  const container = containerRef.value
  if (!container || !isWebGLAvailable()) return

  const { clientWidth, clientHeight } = container

  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(clientWidth, clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  container.appendChild(renderer.domElement)

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(35, clientWidth / clientHeight, 0.1, 1000)
  camera.position.z = 50

  const renderPass = new RenderPass(scene, camera)
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(clientWidth, clientHeight),
    0.3,  // strength
    0.2,  // radius
    0.1   // threshold
  )
  composer = new EffectComposer(renderer)
  composer.addPass(renderPass)
  composer.addPass(bloomPass)

  const viewport = getViewportAtDepth(camera, camera.position.z)
  initParticles(viewport.width, viewport.height)

  const geometry = createGeometry(props.particleShape)
  const material = new THREE.MeshBasicMaterial({
    color: props.color,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  mesh = new THREE.InstancedMesh(geometry, material, props.count)
  scene.add(mesh)

  dummy = new THREE.Object3D()
  clock = new THREE.Clock()

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('resize', onResize)
  animate()
  } catch {
    cleanup()
  }
}

function cleanup() {
  if (animationFrameId) {
    window.cancelAnimationFrame(animationFrameId)
  }

  const container = containerRef.value
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('resize', onResize)

  if (mesh) {
    mesh.geometry.dispose()
    ;(mesh.material as THREE.Material).dispose()
  }

  if (renderer) {
    renderer.dispose()
    if (container && renderer.domElement.parentNode === container) {
      container.removeChild(renderer.domElement)
    }
  }

  composer?.dispose()
  renderer = null
  composer = null
  scene = null
  camera = null
  mesh = null
  dummy = null
  clock = null
}

onMounted(setupScene)
onBeforeUnmount(cleanup)

watch(
  () => ({ ...props }),
  () => {
    cleanup()
    nextTick(setupScene)
  },
  { deep: true },
)
</script>

<template>
  <div ref="containerRef" class="antigravity-canvas" />
</template>
