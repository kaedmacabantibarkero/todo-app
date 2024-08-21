<!-- https://dribbble.com/shots/23726833-Jets-Productivity-Website  -->
<script setup>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import EditModal from '../components/EditModal.vue';
 
const showEditModal = ref(false);
const modalId= ref("")
const modalTitle = ref("");
const modalTaskDescription = ref("");
const modalDate = ref("");
const modalStatus = ref("");

// Method to select a task and show the modal
function selectTask(id, title, description, date, status) {
  showEditModal.value = true;
  if (title && date && status) { 
    modalId.value = id
    modalTitle.value = title;
    modalTaskDescription.value = description;
    modalDate.value = date;
    modalStatus.value = status;
  } else {
    alert('Invalid task details');
  }
}

// Reactive data to hold tasks
const tableData = ref([]);

// Function to fetch tasks from the API
const getTask = async () => {
  try {
    const token = localStorage.getItem('accessToken'); // Get the token from localStorage

    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await axios.get(`http://localhost:3000/api/get/getTask`, {
      headers: {'Authorization': `Bearer ${token}`}});
    tableData.value = response.data.map(task => ({
      ...task,
      date: new Date(task.deadline).toLocaleDateString() // Format the date
    }));
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
  }
};

// Call getTask when the component is mounted
onMounted(() => {
  getTask();
});

// Search query
const searchQuery = ref('');

// Filter data based on search query
const filteredData = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return tableData.value.filter(item =>  
    item.taskTitle.toLowerCase().includes(query) ||
    item.date.toLowerCase().includes(query) ||
    item.status.toLowerCase().includes(query)
  );
});

// Return status class based on the status
const statusClass = (status) => {
  switch (status) {
    case 'Not started':
      return 'status-not-started';
    case 'In progress':
      return 'status-in-progress';
    case 'Done':
      return 'status-done';
    default:
      return '';
  }
};

// Handle radio button click
const handleRadioClick = (item) => {
  if (window.confetti) {
    window.confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
    });
  }
};

const statuses = ["All", "Current", "In progress", "Complete"]
const selectedStatus = ref("All")
const selectStatus = (status) =>{
  selectedStatus.value = status
}
</script>


<template>
  <div class="container flex flex-col gap-[1rem] default:px-[1rem] sm-tablet:px-[4rem]">
    <EditModal v-if="showEditModal" :id="modalId" :title="modalTitle" :taskDescription="modalTaskDescription" :status="modalStatus" @closeEditModal="showEditModal=false"/>
    
    <div class="main-header flex flex justify-between items-center">
      <div class="flex flex-col gap-[1rem]">
        <span class="text-[26px] font-medium">Today, 22 April</span>
        <ul class="flex ">
          <li
            v-for="(status, index) in statuses"
            :key="index"
            class="cursor-pointer p-[.5rem] px-[.6rem] hover:bg-gray-100 rounded-[5px] "
            :class="{'text-red-500 border-b border-red-500': selectedStatus === status }"
            @click="selectStatus(status)"
            >
            {{ status }}
          </li>
        </ul>
      </div>
      <div>
        <button class="default:hidden sm-tablet:block h-[38px] text-white px-[1rem] flex items-center justify-center gap-[.5rem] rounded-[5px] bg-[#e04c3c] hover:bg-[#c83c2c]">
          <span class="inline-block"><i class="fa-solid fa-plus pr-2"></i>New task</span>
        </button>
      </div>
    </div>
    <div class="search-container">
      <input type="text" class="search-input" placeholder="Search..." v-model="searchQuery">
    </div>
    <div class="body flex flex-col gap-[1rem]">
      <div class="row border rounded-[5px] cell flex  justify-between  " v-for="(item, index) in filteredData" :key="index" @click="selectTask(item._id, item.taskTitle, item.taskDescription, item.date, item.status)">
        <div class="flex items-start  gap-[1rem]">
          <input class="my-[.3rem]" type="radio" name="task" :id="`task-${index}`" @change="handleRadioClick(item)" />
          <div class=" ">
            <div class="">{{ item.taskTitle }}</div>
            <div class="">{{ item.date }}</div>
            <div class="" :class="statusClass(item.status)">{{ item.status }}</div>
          </div>
        </div>
        <span class="flex gap-[1rem] text-[#575757] ellipsis-container ">
          <i class="fa-regular fa-pen-to-square"></i>
          <i class="fa-regular fa-calendar"></i>
          <i class="fa-regular fa-comment"></i>
        </span>
      </div>
      <button class="h-[38px] text-white px-[1rem]  rounded-[5px] bg-[#e04c3c] hover:bg-[#c83c2c] default:block sm-tablet:hidden">
        <span class="inline-block"><i class="fa-solid fa-plus pr-2"></i>New task</span>
      </button>

    </div>
  </div>
</template>


<style scoped>
.container {
  @apply w-full max-w-[850px];
}

.header, .body {
  @apply w-full;
}

.header {
  @apply flex bg-[#f8f9fa]   ;
}
 
.header-item.empty {
  @apply flex-none;
}

.search-container {
  @apply w-full;
}

.search-input {
  @apply w-full px-4 py-2 border border-[#dbddec] rounded-md;
}

.body {
  @apply flex flex-col;
}

.row {
  @apply flex border-b border-[#dbddec] cursor-pointer hover:bg-gray-100;
}

.cell {
  @apply flex-1 px-4 py-2;
}

.status-not-started {
  @apply text-red-500;
}

.status-in-progress {
  @apply text-orange-500;
}

.status-done {
  @apply text-green-500;
}

.ellipsis-container {
  @apply relative;
  opacity: 0; /* Initially hide the icon */
  transition: opacity 0.2s; /* Smooth transition */
}

.row:hover .ellipsis-container {
  opacity: 1; /* Show the icon on row hover */
}

</style>
