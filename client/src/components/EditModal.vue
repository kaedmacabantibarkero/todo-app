<template>
  <div 
    :class="['w-full max-w-[25rem] h-[100vh] px-[1rem] fixed top-0 right-0 border z-40 bg-white', 'slide-in', { 'slide-in-active': isActive }]"
    :style="{ transform: isActive ? 'translateX(0)' : 'translateX(100%)' }"
  >
    <div class="header w-full flex py-[1rem] justify-between items-center">
      <button class="flex gap-[.5rem] px-[.3rem] border border-gray-200 items-center">
        <input type="radio" class="flex-shrink-0" name="" id="">
        <p>Complete</p>
      </button>
      <i class="fa-solid fa-xmark" @click="$emit('closeEditModal')"></i>
    </div>

    <input 
      type="text" 
      placeholder="Title" 
      class="border border-gray-300 w-full p-2 my-2" 
      v-model="localTitle"
    />

    <textarea 
      class="border border-gray-300 w-full p-2 my-2" 
      name="" 
      id="" 
      cols="30" 
      rows="10" 
      placeholder="Agenda description"
      v-model="localTaskDescription"> 
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
        <button @click="updateTask" class="h-[32px] px-[1rem] text-white rounded-[5px] bg-[#e04c3c] hover:bg-[#c83c2c]">
          Save changes
        </button>
        <!-- <Loading/> -->
    </footer>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, watch, defineEmits , onMounted } from "vue";
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

// Local state variables bound to input fields
const localTitle = ref(props.title);
const localTaskDescription = ref(props.taskDescription);

// Create a ref for the selected status
const selected = ref(props.status);

// Define emits
const emit = defineEmits(['closeEditModal']);

// Watch for changes in the props and update local state
watch(() => props.title, (newTitle) => {
  localTitle.value = newTitle;
});
watch(() => props.taskDescription, (newTaskDescription) => {
  localTaskDescription.value = newTaskDescription;
});
watch(() => props.status, (newStatus) => {
  selected.value = newStatus;
});

 
// Method to update the task
const updateTask = async() => {
  try {
    const response = await axios.put('http://localhost:3000/api/put/updateTask/66c46818715962e3f681abd6', { 
      taskTitle: localTitle.value,
      taskDescription: localTaskDescription.value,
      deadline: "2024-08-20T00:00:00.000+00:00",
      status: selected.value,
      user: "66c43a572a607f077c59e31f"
    });
    alert("Success update");
    console.log(response.data);
  } catch (error) {
    alert("Error occurred: " + error.message);
  }
}

const isActive = ref(false);

onMounted(() => {
  // Activate the animation slightly after the component is mounted
  setTimeout(() => {
    isActive.value = true;
  }, 10); // A small delay, e.g., 10ms
});
</script>

<style scoped>
.slide-in {
  transition: transform 0.5s ease-in-out; /* Only transition the transform */
}
</style>
