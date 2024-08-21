<template>
  <div class="sidenav-wrapper fixed top-0 right-0 flex flex-col h-[3rem] w-full default:w-full tablet:max-w-custom  border-b">
    <ul class="w-full h-full flex items-center justify-end px-[2rem] gap-[1rem] text-[#575757]">
      <li>
        <i class="fa-solid fa-bell cursor-pointer"></i>
      </li>
      <li>
          <i class="fa-solid fa-gear cursor-pointer"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.max-w-custom {
  max-width: calc(100vw - 15rem);
}
</style>