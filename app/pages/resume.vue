<script setup lang="ts">
import { resumeData } from '~/data/resume'

const showModal = ref(false)

useSeoMeta({
  title: `Resume — ${resumeData.name}`,
  description: `Resume and CV for ${resumeData.name}, ${resumeData.role}.`,
  ogTitle: `Resume — ${resumeData.name}`,
  ogDescription: `Resume and CV for ${resumeData.name}, ${resumeData.role}.`,
  ogType: 'profile',
  ogUrl: 'https://sergiopiza.com/resume',
  ogImage: 'https://sergiopiza.com/assets/pfp.png',
  twitterCard: 'summary',
  twitterTitle: `Resume — ${resumeData.name}`,
  twitterDescription: `Resume and CV for ${resumeData.name}, ${resumeData.role}.`,
})

useHead({
  link: [{ rel: 'canonical', href: 'https://sergiopiza.com/resume' }],
})
</script>

<template>
  <main class="mx-auto max-w-5xl px-4 pb-24 pt-40 md:px-8">
  <article class="content-card" style="backdrop-filter: blur(80px) saturate(75%);">
    <!-- Page header -->
    <div class="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="section-eyebrow mb-3">Curriculum Vitae</p>
        <h1 class="text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
          {{ resumeData.name }}
        </h1>
        <p class="mt-2 text-lg text-cyan-300/80">{{ resumeData.role }}</p>
      </div>
      <div class="flex flex-col items-start gap-4 md:items-end">
        <div class="flex flex-col gap-1.5 text-sm text-slate-400 md:text-right">
          <a :href="resumeData.contact.emailHref" class="transition hover:text-cyan-300">{{ resumeData.contact.email }}</a>
          <a :href="resumeData.contact.githubHref" target="_blank" rel="noreferrer" class="transition hover:text-cyan-300">{{ resumeData.contact.github }}</a>
          <a :href="resumeData.contact.linkedinHref" target="_blank" rel="noreferrer" class="transition hover:text-cyan-300">{{ resumeData.contact.linkedin }}</a>
        </div>
        <button class="buttonLink gap-2" @click="showModal = true">
          <Icon name="ph:file-pdf-bold" class="text-base" />
          Download PDF
        </button>
      </div>
    </div>

    <!-- Summary -->
    <section class="resume-section">
      <h2 class="resume-section-title">Professional Summary</h2>
      <div class="resume-card">
        <ul class="grid gap-2">
          <li v-for="item in resumeData.summary" :key="item" class="flex gap-2.5 text-sm text-slate-300">
            <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/60" />
            {{ item }}
          </li>
        </ul>
      </div>
    </section>

    <!-- Education -->
    <section class="resume-section">
      <h2 class="resume-section-title">Education</h2>
      <div v-for="edu in resumeData.education" :key="edu.degree" class="resume-card">
        <div class="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 class="text-base font-semibold text-white">{{ edu.degree }}</h3>
            <p class="text-sm text-cyan-300/80">{{ edu.institution }}</p>
          </div>
          <span class="resume-period">{{ edu.period }}</span>
        </div>
      </div>
    </section>

    <!-- Work Experience -->
    <section class="resume-section">
      <h2 class="resume-section-title">Work Experience</h2>
      <div class="grid gap-6">
        <div v-for="job in resumeData.experience" :key="job.company + job.period" class="resume-card">
          <div class="mb-3 flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 class="text-base font-semibold text-white">{{ job.role }}</h3>
              <p class="text-sm text-cyan-300/80">{{ job.company }}</p>
            </div>
            <span class="resume-period">{{ job.period }}</span>
          </div>
          <ul class="grid gap-1.5">
            <li v-for="bullet in job.bullets" :key="bullet" class="flex gap-2.5 text-sm text-slate-300">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/60" />
              {{ bullet }}
            </li>
          </ul>
          <ul class="mt-6 flex flex-wrap gap-3">
            <li v-for="tech in job.stack" :key="tech.label" class="tag tag--muted gap-2">
              <Icon :key="`${tech.label}-${tech.icon}`" :name="tech.icon" class="text-sm text-cyan-100/90" />
              {{ tech.label }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section class="resume-section">
      <h2 class="resume-section-title">Projects</h2>
      <div class="grid gap-6">
        <div v-for="project in resumeData.projects" :key="project.name" class="resume-card">
          <div class="mb-3 flex flex-wrap items-start justify-between gap-2">
            <h3 class="text-base font-semibold text-white">{{ project.name }}</h3>
            <span class="resume-period">{{ project.period }}</span>
          </div>
          <ul class="grid gap-1.5">
            <li v-for="bullet in project.bullets" :key="bullet" class="flex gap-2.5 text-sm text-slate-300">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/60" />
              {{ bullet }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Certifications -->
    <section class="resume-section">
      <h2 class="resume-section-title">Certifications</h2>
      <div class="resume-card">
        <div class="grid gap-3">
          <div
            v-for="cert in resumeData.certifications"
            :key="cert.name"
            class="flex flex-wrap items-start justify-between gap-x-4 gap-y-1"
          >
            <div class="flex gap-2.5 text-sm text-slate-300">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/60" />
              {{ cert.name }}
            </div>
            <span class="resume-period shrink-0">{{ cert.date }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Technologies -->
    <section class="resume-section">
      <h2 class="resume-section-title">Programming Languages and Technologies</h2>
      <div class="resume-card">
        <ul class="grid gap-2">
          <li v-for="tech in resumeData.technologies" :key="tech.category" class="flex gap-2.5 text-sm">
            <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/60" />
            <span>
              <span class="font-semibold text-white">{{ tech.category }}: </span>
              <span class="text-slate-300">{{ tech.items }}</span>
            </span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Languages -->
    <section class="resume-section">
      <h2 class="resume-section-title">Languages</h2>
      <div class="resume-card">
        <div class="grid grid-cols-3 gap-4">
          <div v-for="lang in resumeData.languages" :key="lang.language" class="text-center">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/60" style="font-family: 'IBM Plex Mono', monospace;">
              {{ lang.level }}
            </p>
            <p class="mt-1 text-sm text-white">{{ lang.language }}</p>
          </div>
        </div>
      </div>
    </section>
    </article>
  </main>

  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <ResumeModal v-if="showModal" @close="showModal = false" />
  </Transition>
</template>

<style scoped>
.resume-section {
  @apply mb-12;
}

.resume-section-title {
  @apply mb-5 border-b border-white/10 pb-3 text-xs uppercase tracking-[0.32em] text-cyan-100/60;
  font-family: 'IBM Plex Mono', monospace;
}

.resume-card {
  @apply rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm;
}

.resume-period {
  @apply rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400;
  font-family: 'IBM Plex Mono', monospace;
}
</style>
