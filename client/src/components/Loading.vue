<script setup>
const loaderStyle = defineProps({
  height: {
    type: String,
    default: "18px",
  },
  width: {
    type: String,
    default:"18px"   
  }
})
</script>

<template>
  <span class="loader" :style="{ width: loaderStyle.width, height: loaderStyle.height }"></span>
</template>

<style scoped>
.loader {
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite;
}

.loader::before, .loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  inset: 0px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  animation: prixClipFix 2s linear infinite;
}

.loader::after {
  transform: rotate3d(90, 90, 0, 180deg);
  border-color: #c5c5c5;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes prixClipFix {
  0% { clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0); }
  50% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0); }
  75%, 100% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%); }
}
</style>
