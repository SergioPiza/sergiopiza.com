<script lang="ts" setup>
import { navigation, extraLinks, profile } from '~/data/profile'

const isOpen = ref(false)
const isScrolled = ref(false)
const activeHref = ref('')
const isExtraOpen = ref(false)
const extraDropdownRef = ref<HTMLElement | null>(null)
const router = useRouter()
const sectionElements = new Map<string, HTMLElement>()

const sectionHrefs = navigation.map((link) => link.href).filter((href) => href.startsWith('#'))

const updateScrolled = () => {
  isScrolled.value = window.scrollY > 18
  updateActiveSection()
}

const goToRoot = async () => {
  isOpen.value = false
  await router.push({ path: '/', hash: '' })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const updateActiveSection = () => {
  const thresholdLine = window.innerHeight * 0.35
  let current = ''

  for (const href of sectionHrefs) {
    const section = sectionElements.get(href)
    if (!section) {
      continue
    }

    if (section.getBoundingClientRect().top <= thresholdLine) {
      current = href
    } else {
      break
    }
  }

  activeHref.value = current
}

const setupSections = () => {
  sectionElements.clear()
  for (const href of sectionHrefs) {
    const section = document.querySelector<HTMLElement>(href)
    if (section) {
      sectionElements.set(href, section)
    }
  }
  updateActiveSection()
}

const route = useRoute()

const isExtraActive = computed(() => extraLinks.some((link) => route.path === link.href))

const closeExtraOnOutside = (e: MouseEvent) => {
  if (extraDropdownRef.value && !extraDropdownRef.value.contains(e.target as Node)) {
    isExtraOpen.value = false
  }
}

watch(
  () => route.path,
  (path) => {
    if (path === '/') {
      nextTick(() => {
        setupSections()
        updateScrolled()
      })
    } else {
      sectionElements.clear()
      activeHref.value = ''
    }
  },
)

onMounted(() => {
  setupSections()
  updateScrolled()
  window.addEventListener('scroll', updateScrolled, { passive: true })
  document.addEventListener('click', closeExtraOnOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrolled)
  document.removeEventListener('click', closeExtraOnOutside)
})
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50">
    <nav
      class="site-nav"
      :class="isScrolled ? 'site-nav--detached' : 'site-nav--attached'"
      aria-label="Main"
    >
      <NuxtLink to="/" class="flex items-center gap-3 text-white" @click.prevent="goToRoot">
        <img
          src="/assets/pfp.png"
          alt="Sergio Piza"
          class="site-avatar rounded-full border border-cyan-300/25 object-cover shadow-[0_0_40px_rgba(34,211,238,0.16)]"
          :class="{ 'site-avatar--attached': !isScrolled }"
        />
        <span class="leading-tight sm:block">
          <span class="block text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100/80">
            {{ profile.firstName }} {{ profile.lastName }}
          </span>
          <span class="block text-xs text-slate-400"> data & software engineer </span>
        </span>
      </NuxtLink>

      <ul class="hidden items-center gap-6 text-sm font-medium text-slate-300 lg:flex">
        <li v-for="link in navigation" :key="link.href">
          <NuxtLink
            class="nav-link"
            :class="{ 'nav-link--active': activeHref === link.href }"
            :to="{ path: '/', hash: link.href }"
            :aria-current="activeHref === link.href ? 'page' : undefined"
          >
            {{ link.label }}
          </NuxtLink>
        </li>

        <li ref="extraDropdownRef" class="relative">
          <button
            type="button"
            class="nav-link flex items-center gap-1"
            :class="{ 'nav-link--active': isExtraOpen || isExtraActive }"
            :aria-expanded="isExtraOpen"
            @click="isExtraOpen = !isExtraOpen"
          >
            Extra
            <Icon
              name="ph:caret-down-bold"
              class="text-xs transition-transform duration-200"
              :class="{ 'rotate-180': isExtraOpen }"
            />
          </button>

          <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 translate-y-1 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-1 scale-95"
          >
            <div v-if="isExtraOpen" class="nav-dropdown">
              <NuxtLink
                v-for="link in extraLinks"
                :key="link.href"
                :to="link.href"
                class="nav-dropdown-item"
                :class="{ 'nav-dropdown-item--active': route.path === link.href }"
                :aria-current="route.path === link.href ? 'page' : undefined"
                @click="isExtraOpen = false"
              >
                <Icon :name="link.icon" class="text-base text-cyan-400/70" />
                {{ link.label }}
              </NuxtLink>
            </div>
          </Transition>
        </li>
      </ul>

      <div class="hidden items-center gap-3 lg:flex">
        <a class="ghostButton" :href="profile.contact.github" target="_blank" rel="noreferrer">
          <Icon name="simple-icons:github" class="text-base" />
          GitHub
        </a>
        <a
          class="buttonLink gap-2.5"
          :href="profile.contact.linkedin"
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="simple-icons:linkedin" class="text-base" />
          LinkedIn
        </a>
      </div>

      <button
        type="button"
        class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-2xl text-white lg:hidden"
        :aria-expanded="isOpen"
        aria-label="Toggle navigation"
        @click="isOpen = !isOpen"
      >
        <Icon :name="isOpen ? 'ph:x-bold' : 'ph:list-bold'" />
      </button>
    </nav>

    <Transition
      enter-active-class="transition duration-250 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isOpen"
        class="site-nav-drawer"
        :class="isScrolled ? 'site-nav-drawer--detached' : 'site-nav-drawer--attached'"
      >
        <ul class="grid gap-3 text-lg text-white">
          <li v-for="link in navigation" :key="link.href">
            <NuxtLink
              class="mobile-nav-link"
              :class="{ 'mobile-nav-link--active': activeHref === link.href }"
              :to="{ path: '/', hash: link.href }"
              :aria-current="activeHref === link.href ? 'page' : undefined"
              @click="isOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>

        <div class="mt-4 border-t border-white/10 pt-4">
          <p
            class="mb-2 text-xs uppercase tracking-[0.22em] text-slate-500"
            style="font-family: 'IBM Plex Mono', monospace"
          >
            Extra
          </p>
          <ul class="grid gap-2">
            <li v-for="link in extraLinks" :key="link.href">
              <NuxtLink
                :to="link.href"
                class="mobile-nav-link flex items-center gap-2"
                :class="{ 'mobile-nav-link--active': route.path === link.href }"
                :aria-current="route.path === link.href ? 'page' : undefined"
                @click="isOpen = false"
              >
                <Icon :name="link.icon" class="text-base text-cyan-400/70" />
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="mt-6 flex flex-col gap-3">
          <a
            class="buttonLink justify-center gap-2.5"
            :href="profile.contact.linkedin"
            target="_blank"
            rel="noreferrer"
            @click="isOpen = false"
          >
            <Icon name="simple-icons:linkedin" class="text-base" />
            LinkedIn
          </a>
          <a
            class="ghostButton justify-center"
            :href="profile.contact.github"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="simple-icons:github" class="text-base" />
            GitHub
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>
