<template>
  <div class="w-full max-w-[25rem] h-[100vh] px-[1rem] fixed top-0 right-0 border z-40 bg-white">
    <div class="header w-full flex py-[1rem] justify-between items-center">
      <button class="flex gap-[.5rem] px-[.3rem] border border-gray-200 items-center">
        <input type="radio" class="flex-shrink-0" name="" id="">
        <p>Complete</p>
      </button>
      <i class="fa-solid fa-xmark" @click="closeModal"></i>
    </div>

    <input 
      type="text" 
      placeholder="Title" 
      class="border border-gray-300 w-full p-2 my-2" 
      :value="title"
    />

    <textarea 
      class="border border-gray-300 w-full p-2 my-2" 
      name="" 
      id="" 
      cols="30" 
      rows="10" 
      placeholder="Agenda description"
      :value="taskDescription"> 
    </textarea>

    <input 
      type="date" 
      class="border border-gray-300 w-full p-2 mb-4"
      placeholder="Pick a date"
    />

    <div>Selected: {{ selected }}</div>

    <select v-model="selected">
      <option disabled value="">Please select one</option>
      <option>Not started</option>
      <option>In progress</option>
      <option>Done</option>
    </select>
    <footer class="flex justify-end mt-[20px] gap-[1rem] items-center"> 
        <button class="h-[32px] w-[128px] bg-red-500 text-white rounded-[5px]">
          Save changes
  
        </button>
        <Loading/>
    </footer>
  </div>
  
</template>

<script setup>
import { ref, watch, defineEmits } from "vue";

import Loading from '../components/Loading.vue'
// Define props
const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
  status: {
    type: String,
    default: "In progress",
  },
  taskDescription: {
    type: String,
    default: " ",
  },
});

// Define emits
const emit = defineEmits(['close']);

// Create a ref for the selected status
const selected = ref(props.status);

// Watch for changes in the status prop and update selected
watch(() => props.status, (newStatus) => {
  selected.value = newStatus;
});

// Method to emit the close event
const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
/* Additional styles can be added here */
</style>
