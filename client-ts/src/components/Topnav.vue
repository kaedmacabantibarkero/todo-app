<template>
  <div class="sidenav-wrapper fixed top-0 right-0 h-[3rem] w-full default:w-full tablet:max-w-custom border-b br-red-200 flex justify-between items-center">
 
    <span class="pl-[2rem]"> 
      <img class="logo h-[30px] w-[30px] rounded-[50%] " src="../assets/profile.jpg" alt="Logo" draggable="false">
    </span>    
     
    <ul class="h-full flex items-center justify-end px-[2rem] gap-[1rem] text-[#575757]">
      <li>
        <i class="fa-solid fa-bell cursor-pointer"></i>
      </li>
      <li>
        <i class="fa-solid fa-gear cursor-pointer"></i>
      </li>
    </ul>
  </div>
</template>

<script setup>
 
</script>

<style>
.max-w-custom {
  max-width: calc(100vw - 15rem);
}
</style>