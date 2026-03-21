<script lang="ts" setup>
defineProps<{ as?: string }>()
</script>

<template>
  <Component :is="as || 'section'" class="px-4 py-10 first:!pt-8 md:px-6 lg:py-14">
    <div class="mx-auto w-full max-w-6xl flex flex-col items-center">
      <slot />
    </div>
  </Component>
</template>
