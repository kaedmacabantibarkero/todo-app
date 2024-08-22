<script setup>
import axios from 'axios'
import { ref, defineEmits} from 'vue'

const emit = defineEmits(['closeAddTaskModal']);
 
const taskTitle = ref("")
const taskDescription = ref("")
const deadline = ref("")
const status = ref("Not started")

const addTask = async () => {
  const token = localStorage.getItem('accessToken'); // Get the token from localStorage
  const userId = localStorage.getItem('userId'); // Get the token from localStorage

  try {
    const response = await axios.post('http://localhost:3000/api/post/addTask', {
      taskTitle: taskTitle.value,
      taskDescription: taskDescription.value,
      deadline: deadline.value,  // Ensure the date format is YYYY-MM-DD
      status: status.value,
      user_id: userId  
    },    
    {  
      headers: {'Authorization': `Bearer ${token}`}
    }
    );
    alert("Task added successfully");
    console.log(response.data);
    closeModal();  // Close the modal on success
  } catch (error) {
    alert("Error occurred: " + error.message);
  }
}
</script>

<template>
  <div class="w-full h-[100vh] bg-gray-500 bg-opacity-50 absolute top-0 flex items-center justify-center">
    <div class="w-full max-w-[850px] h-full max-h-[500px] border bg-white my-[2rem] rounded-[10px] p-[20px]">
      <div class="header w-full flex justify-between items-center border-b pb-[12px]">
        <span class="text-[#484849]"><i class="fa-regular fa-pen-to-square px-[.2rem]"></i> Add task</span>
        <i class="fa-solid fa-xmark cursor-pointer"   @click="$emit('closeAddTaskModal')" ></i>
      </div>
      <div class="flex flex-col">
        <span>Task title</span>
        <input 
          v-model="taskTitle"
          type="text" 
          placeholder="Title" 
          class="border border-gray-300 w-full p-2 my-2"
        />
        <span>Description</span>
        <textarea 
          v-model="taskDescription"
          class="border border-gray-300 w-full p-2 my-2"
          cols="30"
          rows="6"
          placeholder="Agenda description"
        ></textarea>
        <span class="pb-[.4rem]">Deadline</span>
        <input 
          v-model="deadline"
          type="date" 
          class="border border-gray-300 w-full p-2 mb-4"
          placeholder="Pick a date"
        />
      </div>
      <footer class="flex justify-end mt-[20px] gap-[1rem] "> 
        <button @click="addTask" class="h-[32px] px-[1rem] text-white rounded-[5px] bg-[#e04c3c] hover:bg-[#c83c2c]">Add task</button>
      </footer>
    </div>
  </div>
</template>

<style>
/* Add additional styles here if needed */
</style>
