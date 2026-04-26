<template>
  <div 
    v-if="isVisible"
    class="top-banner fixed top-0 left-0 right-0 flex items-center justify-center px-12 box-border"
    style="z-index: 30; height: var(--vp-layout-top-height);"
  >
    <a 
      href="https://api.misakamoe.com/app/" 
      target="_blank"
      class="banner-link flex items-center gap-2 no-underline transition-opacity hover:opacity-80"
    >
      <svg class="banner-icon hidden md:inline" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 20h20L12 2zm0 4l7 13H5l7-13z" fill="currentColor"/>
        <path d="M11 10h2v5h-2v-5zm0 6h2v2h-2v-2z" fill="currentColor"/>
      </svg>
      <span class="flex items-center gap-2 text-[13px] md:text-sm flex-wrap justify-center">
        <span class="font-semibold">注意：</span>
        <span class="font-normal">该项目已停止发布产物，详见 BILIBILIAS 官网</span>
      </span>
    </a>
    <div 
      @click.stop.prevent="closeBanner"
      class="banner-close absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer px-2 py-1 transition-opacity"
    >
      <span class="text-2xl leading-none">&times;</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(true)

const closeBanner = () => {
  isVisible.value = false
  // 关闭横幅时，移除顶部高度，让导航栏回到顶部
  document.documentElement.classList.add('banner-dismissed')
}
</script>

<style>
/* 全局样式：当横幅显示时，设置顶部高度 */
html:not(.banner-dismissed) {
  --vp-layout-top-height: 40px;
}

@media (min-width: 768px) {
  html:not(.banner-dismissed) {
    --vp-layout-top-height: 48px;
  }
}

/* 关闭横幅后，重置顶部高度为 0 */
html.banner-dismissed {
  --vp-layout-top-height: 0px;
}
</style>

<style scoped>
/* 浅色模式样式 */
.top-banner {
  background-color: #fefce8;
  border-bottom: 1px solid #fde047;
  color: #854d0e;
}

.banner-link {
  color: #854d0e;
}

.banner-icon {
  color: #ca8a04;
}

.banner-close {
  color: #854d0e;
  opacity: 0.6;
}

.banner-close:hover {
  opacity: 1;
}

/* 夜间模式样式 */
.dark .top-banner {
  background-color: rgba(113, 63, 18, 0.2);
  border-bottom: 1px solid rgba(161, 98, 7, 0.3);
  color: #fde047;
}

.dark .banner-link {
  color: #fde047;
}

.dark .banner-icon {
  color: #facc15;
}

.dark .banner-close {
  color: #fde047;
  opacity: 0.6;
}

.dark .banner-close:hover {
  opacity: 1;
}
</style>