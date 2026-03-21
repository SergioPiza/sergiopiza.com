<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; message: string; stack?: string } }>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div style="min-height:100vh;background:#0a0a0a;color:#e2e8f0;padding:2rem;font-family:monospace;box-sizing:border-box;">
    <h1 style="color:#f87171;font-size:1.5rem;margin-bottom:1rem;">
      {{ error.statusCode }} Error
    </h1>
    <p style="color:#94a3b8;margin-bottom:1.5rem;font-family:sans-serif;line-height:1.6;word-break:break-word;white-space:pre-wrap;">
      {{ error.message }}
    </p>
    <pre v-if="error.stack" style="background:#111;padding:1rem;border-radius:0.5rem;overflow-x:auto;white-space:pre-wrap;word-break:break-word;font-size:0.75rem;color:#94a3b8;line-height:1.6;">{{ error.stack }}</pre>
    <button
      style="margin-top:1.5rem;padding:0.6rem 1.2rem;background:#1e293b;color:#e2e8f0;border:1px solid #334155;border-radius:0.5rem;cursor:pointer;font-size:0.9rem;"
      @click="handleError"
    >
      Go home
    </button>
  </div>
</template>
