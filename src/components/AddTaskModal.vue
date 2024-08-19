<template>
  <div class="w-full h-[100vh] bg-gray-500 bg-opacity-50 absolute top-0 flex items-center justify-center">
    <div class="w-full max-w-[850px] h-[500px] border bg-white my-[2rem] rounded-[10px] p-[12px]">
      <div class="header w-full flex justify-between items-center">
        <span>Add task</span>
        <i class="fa-solid fa-xmark cursor-pointer" @click="closeModal"></i>
      </div>
      <div class="   ">
        <input 
        type="text" 
        placeholder="Title" 
        class="border border-gray-300 w-full p-2 my-2"
      />
      <textarea 
        class="border border-gray-300 w-full p-2 my-2 "
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="Agenda description"
      ></textarea>
      <input 
        type="date" 
        class="border border-gray-300 w-full p-2 mb-4"
        placeholder="Pick a date"
      />
      </div>
 
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['close'])

function closeModal() {
  emit('close') // Emit a close event
}
</script>

<style>
/* Add additional styles here if needed */
</style>
