<script setup lang="ts">
import TextType from '~/components/TextType.vue'
import {
  // certifications,
  // education,
  profile,
  // projects,
  selectedWins,
  skillGroups,
} from '~/data/profile'
import { resumeData } from '~/data/resume';

useSeoMeta({
  title: `${profile.firstName} ${profile.lastName} | Data Engineer`,
  description: profile.heroSummary,
  ogTitle: `${profile.firstName} ${profile.lastName} | Data Engineer`,
  ogDescription: profile.heroSummary,
  ogType: 'website',
  ogUrl: 'https://sergiopiza.com',
  ogImage: 'https://sergiopiza.com/assets/pfp.png',
  twitterCard: 'summary_large_image',
  twitterTitle: `${profile.firstName} ${profile.lastName} | Data Engineer`,
  twitterDescription: profile.heroSummary,
  twitterImage: 'https://sergiopiza.com/assets/pfp.png',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://sergiopiza.com' }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: `${profile.firstName} ${profile.lastName}`,
        url: 'https://sergiopiza.com',
        jobTitle: profile.role,
        email: profile.contact.emailLabel,
        sameAs: [
          profile.contact.github,
          profile.contact.linkedin,
        ],
      }),
    },
  ],
})

const emailCopied = ref(false)

const copyEmailToClipboard = async () => {
  const rawEmail = profile.contact.email.replace('mailto:', '')

  try {
    await navigator.clipboard.writeText(rawEmail)
    emailCopied.value = true
    window.setTimeout(() => {
      emailCopied.value = false
    }, 1800)
  } catch {
    emailCopied.value = false
  }
}
</script>

<template>
  <main>
    <section class="hero-stage">
      <div class="relative z-10 mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
        <div class="max-w-3xl hero-copy">
          <div class="section-kicker">
            <span class="status-dot" />
            <TextType
              :text="profile.helloMessages"
              as="span"
              :typing-speed="32"
              :deleting-speed="10"
              :pause-duration="2500"
              cursor-character="|"
              cursor-class-name="section-kicker__cursor"
            />
          </div>

          <h1 class="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-white md:text-7xl">
            {{ profile.heroTitle }}
          </h1>

          <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            {{ profile.heroSummary }}
          </p>

          <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a class="buttonLink justify-center gap-2.5" :href="profile.contact.linkedin" target="_blank" rel="noreferrer">
              <Icon name="simple-icons:linkedin" class="text-base" />
              LinkedIn
            </a>
            <button type="button" class="ghostButton ghostButton--emerald justify-center" @click="copyEmailToClipboard">
              <Icon name="ph:copy-bold" class="text-base" />
              {{ emailCopied ? 'Email copied' : 'Copy email' }}
            </button>
            <NuxtLink class="ghostButton ghostButton--violet justify-center" to="/resume">
              <Icon name="ph:file-text-bold" class="text-base" />
              Resume
            </NuxtLink>
            <a class="ghostButton ghostButton--black justify-center" :href="profile.contact.github" target="_blank" rel="noreferrer">
              <Icon name="simple-icons:github" class="text-base" />
              GitHub
            </a>
          </div>
        </div>

        <!-- <div class="hero-panel hero-panel--compact">
          Maybe add this in the future
          <div class="hero-panel-header">
            <span class="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100/80">
              Current signal
            </span>
            <span class="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
              <span class="status-dot status-dot--green" />
              shipping
            </span>
          </div>

          <p class="mt-4 text-sm leading-7 text-slate-300">
            I enjoy engineering work where scale, compliance, and maintainability all have to coexist without compromising reliability.
          </p>

          <div class="mt-6 grid gap-4">
            <div class="mini-glass-card">
              <p class="text-xs uppercase tracking-[0.28em] text-cyan-100/60">
                Current focus
              </p>
              <p class="mt-3 text-sm leading-7 text-slate-300">
                Lakehouse engineering, governance-by-default, backend integrations, and reliable compliance reporting.
              </p>
            </div>
          </div>
        </div> -->

      </div>

      <div class="hero-scroll">
        <span class="hero-scroll-line" />
        (There's more stuff down here btw 👇)
      </div>
    </section>

    <Bounded id="about" as="section" class="section-anchor">
      <div class="section-heading">
        <p class="section-eyebrow">About</p>
        <h2 class="section-title">I like building systems that are practical, scalable, and easy for teams to work with.</h2>
      </div>

      <div class="mt-10 grid gap-6 w-full xl:grid-cols-[0.9fr_1.1fr]">
        <article class="content-card">
          <p class="section-eyebrow">Snapshot</p>
          <p class="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            {{ profile.quickIntro }}
          </p>

          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <div v-for="stat in profile.stats" :key="stat.label" class="stat-card">
              <p class="text-3xl font-semibold tracking-[-0.04em] text-white">
                {{ stat.value }}
              </p>
              <p class="mt-2 text-sm leading-6 text-slate-400">
                {{ stat.label }}
              </p>
            </div>
          </div>
        </article>

        <article class="content-card">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="section-eyebrow">Core Stack</p>
              <h2 class="mt-4 text-2xl font-semibold text-white">
                The tools I use most often.
              </h2>
            </div>
            <Icon name="ph:brackets-curly-bold" class="text-3xl text-cyan-200" />
          </div>

          <ul class="mt-6 grid gap-3 sm:grid-cols-3 grid-cols-2">
            <li v-for="badge in profile.badges" :key="badge.label" class="stack-badge">
              <span class="stack-badge__icon">
                <Icon :name="badge.icon" class="text-lg text-cyan-100" />
              </span>
              <span class="stack-badge__label">{{ badge.label }}</span>
            </li>
          </ul>

          <div class="panel-note mt-6 text-center">
            You can find more of my skills in the
            <a href="#skills" class="ml-1 inline-flex items-center gap-1.5 text-cyan-100 underline decoration-cyan-300/70 underline-offset-4 transition hover:text-white">
              Skills
              <Icon name="ph:arrow-down-bold" class="text-sm" />
            </a>
            section.
          </div>
        </article>
      </div>


      <div class="mt-10 grid gap-6 w-full xl:grid-cols-3 sm:grid-cols-3">
        <article v-for="item in profile.principles" :key="item.title" class="content-card">
          <div class="icon-chip">
            <Icon :name="item.icon" />
          </div>
          <h3 class="mt-6 text-2xl font-semibold text-white">
            {{ item.title }}
          </h3>
          <p class="mt-4 text-base leading-7 text-slate-400">
            {{ item.description }}
          </p>
        </article>
      </div>
    </Bounded>

    <Bounded id="experience" as="section" class="section-anchor">
      <div class="section-heading">
        <p class="section-eyebrow">Experience</p>
        <h2 class="section-title">Most of my work has been in backend engineering, data platforms, and internal tooling.</h2>
      </div>

      <div class="mt-10 grid gap-6">
        <article v-for="item in resumeData.experience" :key="`${item.company}-${item.role}`" class="timeline-card">
          <div class="timeline-meta">
            <p class="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-100/70">
              {{ item.company }}
            </p>
            <p class="mt-2 text-sm text-slate-500">
              {{ item.period }}
            </p>
          </div>

          <div>
            <h3 class="text-2xl font-semibold text-white">
              {{ item.role }}
            </h3>
            <p class="mt-4 max-w-3xl text-base leading-7 text-slate-300">
              {{ item.summary }}
            </p>

            <ul class="mt-6 grid gap-3 text-sm leading-7 text-slate-400">
              <li v-for="achievement in item.bullets" :key="achievement" class="list-item">
                {{ achievement }}
              </li>
            </ul>

            <ul class="mt-6 flex flex-wrap gap-3">
              <li v-for="tech in item.stack" :key="tech.label" class="tag tag--muted gap-2">
                <Icon :key="`${tech.label}-${tech.icon}`" :name="tech.icon" class="text-sm text-cyan-100/90" />
                {{ tech.label }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </Bounded>

    <Bounded id="wins" as="section" class="section-anchor">
      <div class="section-heading">
        <p class="section-eyebrow">Selected Wins</p>
        <h2 class="section-title">A few examples of the kinds of problems I have worked on.</h2>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-2">
        <article v-for="item in selectedWins" :key="item.title" class="content-card">
          <div class="icon-chip">
            <Icon :name="item.icon" />
          </div>
          <h3 class="mt-6 text-2xl font-semibold text-white">
            {{ item.title }}
          </h3>
          <p class="mt-4 text-base leading-7 text-slate-400">
            {{ item.description }}
          </p>
          <p class="mt-6 text-sm font-medium text-cyan-100">
            {{ item.impact }}
          </p>
        </article>
      </div>
    </Bounded>

    <Bounded id="skills" as="section" class="section-anchor">
      <div class="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div class="section-heading">
          <p class="section-eyebrow">Toolbox</p>
          <h2 class="section-title">This is the stack behind most of the work I've done.</h2>
          <p class="toolbox-learning-line mt-4 max-w-lg text-base leading-7 text-slate-300">
            Not an old dog, though - I can learn new tricks!
          </p>
        </div>

        <div class="grid-cols-2 grid gap-6 lg:grid-cols-1">
          <article v-for="group in skillGroups" :key="group.title" class="skill-card">
            <div class="flex items-center justify-between gap-4">
              <h3 class="text-xl font-semibold text-white">
                {{ group.title }}
              </h3>
              <Icon :name="group.icon" class="text-xl text-cyan-200" />
            </div>
            <ul class="mt-5 flex flex-wrap gap-3">
              <li v-for="item in group.items" :key="item.label" class="tag gap-2">
                <Icon :key="`${group.title}-${item.label}-${item.icon}`" :name="item.icon" class="text-sm text-cyan-100/90" />
                {{ item.label }}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </Bounded>
<!-- also saved for the future:
    <Bounded as="section" class="section-anchor">
      <div class="section-heading">
        <p class="section-eyebrow">Credentials</p>
        <h2 class="section-title">A bit more background on my work, education, and formal training.</h2>
      </div>

      <div class="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article class="content-card credentials-project">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="section-eyebrow">Featured Project</p>
              <h2 class="mt-4 text-3xl font-semibold text-white md:text-4xl">
                {{ projects[0].title }}
              </h2>
            </div>
            <Icon name="ph:terminal-window-bold" class="text-3xl text-cyan-200" />
          </div>

          <p class="mt-3 text-sm text-slate-500">
            {{ projects[0].period }}
          </p>

          <p class="mt-6 max-w-3xl text-base leading-7 text-slate-300">
            {{ projects[0].description }}
          </p>

          <div class="panel-note mt-8">
            Built with Node.js and Express, with task flows and PDF reporting as part of the product.
          </div>
        </article>

        <div class="grid gap-6">
          <article class="content-card credentials-education">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="section-eyebrow">Education</p>
                <h2 class="mt-4 text-2xl font-semibold text-white">
                  {{ education.degree }}
                </h2>
              </div>
              <Icon name="ph:graduation-cap-bold" class="text-3xl text-cyan-200" />
            </div>

            <p class="mt-4 text-base text-slate-300">
              {{ education.school }}
            </p>
            <p class="mt-2 text-sm text-slate-500">
              {{ education.period }}
            </p>
          </article>

          <article class="content-card">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="section-eyebrow">Certifications</p>
                <h2 class="mt-4 text-2xl font-semibold text-white">
                  Formal study that complements my hands-on work in data and platform engineering.
                </h2>
              </div>
              <Icon name="ph:certificate-bold" class="text-3xl text-cyan-200" />
            </div>

            <ul class="mt-8 grid gap-4 text-sm leading-7 text-slate-300">
              <li v-for="item in certifications" :key="item" class="list-item">
                {{ item }}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </Bounded> -->

    <Bounded id="contact" as="section" class="section-anchor !pb-12">
      <div class="contact-card contact-card--split">
        <div class="contact-copy">
          <p class="section-eyebrow">Contact</p>
          <h2 class="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
            Have a data platform challenge, a backend project, or just a good engineering problem?
          </h2>
          <p class="mt-5 max-w-2xl text-base leading-7 text-slate-300">
            Send me a note. I like talking about why things break and how we can make them easier to live with.
          </p>
        </div>

        <aside class="contact-meta" style="text-align: center;">
          <p class="section-eyebrow">Reach Out</p>

          <button
            type="button"
            class="contact-email-copy mt-5"
            style="text-align: center;"
            @click="copyEmailToClipboard"
          >
            <span class="contact-email-copy__label">Email</span>
            <span class="contact-email-copy__value">{{ profile.contact.emailLabel }}</span>
            <span class="contact-email-copy__status">
              {{ emailCopied ? 'Copied' : 'Click to copy' }}
            </span>
          </button>

          <div class="contact-link-grid mt-5">
            <a class="buttonLink justify-center" :href="profile.contact.email">
              Open email app
            </a>
            <a class="ghostButton justify-center" :href="profile.contact.linkedin" target="_blank" rel="noreferrer">
              <Icon name="simple-icons:linkedin" class="text-base" />
              LinkedIn
            </a>
            <a class="ghostButton justify-center" :href="profile.contact.github" target="_blank" rel="noreferrer">
              <Icon name="simple-icons:github" class="text-base" />
              GitHub
            </a>
          </div>
        </aside>
      </div>
    </Bounded>
  </main>
</template>
