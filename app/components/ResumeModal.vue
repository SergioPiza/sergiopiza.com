<script setup lang="ts">
import { resumeData } from '~/data/resume'
import { buildResumeDocDef } from '~/utils/resumePdfConfig'

const emit = defineEmits<{ close: [] }>()

const pdfUrl = ref<string | null>(null)
const isLoading = ref(true)
const hasError = ref(false)

const download = () => {
  if (!pdfUrl.value) return
  const a = document.createElement('a')
  a.href = pdfUrl.value
  a.download = 'sergio-piza-resume.pdf'
  a.click()
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

onMounted(async () => {
  document.addEventListener('keydown', onKeydown)
  try {
    const pdfMakeModule = await import('pdfmake/build/pdfmake')
    const vfsModule = await import('pdfmake/build/vfs_fonts')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfMake = (pdfMakeModule as any).default ?? pdfMakeModule
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const vfs = (vfsModule as any).default ?? vfsModule

    for (const [key, val] of Object.entries(vfs as Record<string, string>)) {
      const binary = atob(val)
      const bytes = new Uint8Array(binary.length)
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
      pdfMake.virtualfs.writeFileSync(key, bytes)
    }

    const docDef = buildResumeDocDef(structuredClone(resumeData))
    const doc = pdfMake.createPdf(docDef)
    const blob: Blob = await doc.getBlob()
    pdfUrl.value = URL.createObjectURL(blob)
  }
  catch {
    hasError.value = true
  }
  finally {
    isLoading.value = false
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  if (pdfUrl.value) URL.revokeObjectURL(pdfUrl.value)
})
</script>

<template>
  <Teleport to="body">
    <div class="resume-modal-overlay" @click.self="emit('close')">
      <div class="resume-modal-panel">
        <!-- Header -->
        <div class="resume-modal-header">
          <div class="flex items-center gap-2.5">
            <Icon name="ph:file-pdf-bold" class="text-lg text-cyan-400" />
            <span class="text-sm font-medium text-slate-100">sergio-piza-resume.pdf</span>
            <span v-if="isLoading" class="text-xs text-slate-500">Generating…</span>
          </div>
          <div class="flex items-center gap-2">
            <button
              v-if="!isLoading && !hasError"
              class="ghostButton h-9 gap-1.5 px-4 text-xs"
              @click="download"
            >
              <Icon name="ph:download-simple-bold" class="text-sm" />
              Download
            </button>
            <button
              type="button"
              aria-label="Close"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-white/20 hover:text-white"
              @click="emit('close')"
            >
              <Icon name="ph:x-bold" class="text-sm" />
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="resume-modal-body">
          <div v-if="isLoading" class="flex h-full flex-col items-center justify-center gap-4">
            <div class="h-9 w-9 animate-spin rounded-full border-2 border-cyan-400/20 border-t-cyan-400" />
            <p class="text-sm text-slate-400">Generating PDF…</p>
          </div>
          <div v-else-if="hasError" class="flex h-full flex-col items-center justify-center gap-3">
            <Icon name="ph:warning-circle-bold" class="text-3xl text-red-400/70" />
            <p class="text-sm text-slate-400">Failed to generate PDF. Try downloading directly.</p>
          </div>
          <iframe
            v-else
            :src="pdfUrl!"
            class="h-full w-full rounded-b-2xl"
            title="Resume PDF Preview"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>
