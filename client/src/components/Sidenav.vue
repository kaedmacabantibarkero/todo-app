 

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['toggleAddTaskModal'])

function showAddTaskModal() {
  emit('toggleAddTaskModal', true)  // Emit the event with a payload to show the modal
}
</script>
<template>
  <section class="sidenav-wrapper bg-[#fcfaf8] fixed flex flex-col h-[100vh] w-[15rem] border-r default:hidden tablet:block ">
    <div class="sidenav m-[1rem] top-0 left-0 text-white flex flex-col justify-between h-full ">
       <ul>
        <router-link class="cursor-pointer flex items-center gap-5 p-2 rounded-md text-inherit no-underline max-h-[32px]" :to="`/`">
           <img class="logo h-[30px] w-[30px] rounded-[50%]" src="../assets/profile.jpg" alt="Logo" draggable="false">
          <label class="text-[#575757]">Kaed Macabanti</label>
        </router-link>

        <br>
        <router-link class="menu-item max-h-[32px]" :to="`/`">
            <i class="fa-solid fa-list-check"></i>
            <label>Task List</label>
        </router-link>

        <div class="menu-item max-h-[32px] cursor-pointer" to="#" id="qsLogoutBtn" @click="showAddTaskModal"  >
          <i class="fa-solid fa-plus"></i>
          <label class="cursor-pointer">Add Task</label>
        </div>

        <div class="menu-item max-h-[32px]" to="#" id="qsLogoutBtn"  >
          <i class="fa-regular fa-calendar"></i>
          <label class="cursor-pointer">Calendar</label>
        </div>

        <div class="menu-item max-h-[32px]" to="#" id="qsLogoutBtn"   >
            <i class="fa-solid fa-right-from-bracket"></i>
            <label class="cursor-pointer">Logout</label>
        </div> 
      </ul>
      <ul class="text-[#575757]">
        <li class="menu-item max-h-[32px]" to="#" id="qsLogoutBtn"   >
          <i class="fa-solid fa-diamond"></i>
          <label class="cursor-pointer">Upgrade plan</label>
        </li> 
      </ul>
    </div>
  </section>
</template>

<style scoped>
.menu-item { @apply cursor-pointer flex items-center gap-5 p-2 rounded-md text-inherit no-underline}
.menu-item:hover { @apply bg-[#e0e0e0]; }
.menu-item i,.menu-item label { @apply text-[#575757] }
</style>
