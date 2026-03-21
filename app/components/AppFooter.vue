<script lang="ts" setup>
import { navigation, profile } from '~/data/profile'
</script>

<template>
  <footer class="px-4 pb-8 pt-6 md:px-6">
    <div class="mx-auto flex max-w-6xl flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-6 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100/70">
          {{ profile.firstName }} {{ profile.lastName }}
        </p>
        <p class="mt-2 max-w-xl text-sm text-slate-400">
          Built with Nuxt, Tailwind and Claude Code CLI.
        </p>
      </div>

      <div class="flex flex-col gap-4 md:items-end">
        <ul class="flex flex-wrap gap-4 text-sm text-slate-300">
          <li v-for="link in navigation" :key="link.href">
            <a class="hover:text-white transition" :href="link.href">{{ link.label }}</a>
          </li>
        </ul>
        <div class="flex flex-wrap gap-4 text-sm text-slate-400">
          <a class="hover:text-white transition" :href="profile.contact.email">{{ profile.contact.emailLabel }}</a>
          <a class="hover:text-white transition" :href="profile.contact.github" target="_blank" rel="noreferrer">GitHub</a>
          <a class="hover:text-white transition" :href="profile.contact.linkedin" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </div>
  </footer>
</template>
