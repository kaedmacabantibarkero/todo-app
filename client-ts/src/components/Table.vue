<script setup lang="ts">
import axios from 'axios';
import { ref, reactive, onMounted, computed } from 'vue';
import EditModal from './EditModal.vue';
import AddTaskModal from './AddTaskModal.vue';
import { Task } from '../types/Tasks';
onMounted(() => {
  getTask();
});

const refreshTasks = () => {
  getTask();
};

const showEditModal = ref(false);
const showAddTaskModal = ref(false);
    
function clickNewTask() {
  showAddTaskModal.value = true
  showEditModal.value = false;
}

interface ModalData {id: string;title: string;description: string;deadline: string;status: string;}
const modalData = reactive<ModalData>({id: "",title: "",description: "",deadline: "",status: ""});

// function to slct a task and show the modal
function selectTask(id:string, title:string, description:string, date:string, status:string) {
  showEditModal.value = true;
  if (title && date && status) {
    modalData.id= id;
    modalData.title= title;
    modalData.description= description;
    modalData.deadline= date;
    modalData.status = status;
  } else {
    alert('Invalid task details');
  }
}

// holds the data for task
const tableData = ref<Task[]>([]);
const getTask = async () => {
  try {
    const token = localStorage.getItem('accessToken');  
    if (!token) {
      throw new Error('No token found. Please log in.');
    }
    const response = await axios.get('http://localhost:3000/api/get/getTask', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    tableData.value = response.data.map((task:Task) => ({
      ...task,
      date: new Date(task.deadline).toLocaleDateString(),  
    }));
    console.log(tableData.value)
  } catch (error: any) {
    console.error('Error fetching tasks:', error.message);
  }
};

// Search query
const searchQuery = ref('');

// Filter and sort data based on search query and selected status
const filteredData = computed(() => {
  const query = searchQuery.value.toLowerCase();
  let filtered = tableData.value.filter((item) =>
    item.taskTitle.toLowerCase().includes(query) ||
    item.deadline.toLowerCase().includes(query) ||
    item.status.toLowerCase().includes(query)
  );

  if (selectedStatus.value === 'Current') {
    filtered = filtered.filter(item => item.status === 'Not started' || item.status === 'In progress');
  } else{
    filtered = filtered.filter(item => item.status === selectedStatus.value);
  }

  return filtered;
});

// Returns a true value depending on the filteredData if there are no current tasks
const showNoPendingTask = computed(() => {
  return filteredData.value.length === 0;
});


// Return status class based on the status
const statusClass = (status:string) => {
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
 

const statuses = ['Current', 'Not started', 'In progress', 'Done'];
const selectedStatus = ref('Current');
const selectStatus = (status:string) => {
  selectedStatus.value = status;
};

// Handle radio button click
const handleRadioClick = async (item:any) => {
  showEditModal.value = false;
  if (window.confetti) {
    window.confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
    });
  }
  try {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await axios.put(
      `http://localhost:3000/api/put/updateTask/${modalData.id}`, 
      {  
        taskTitle: modalData.title,
        taskDescription: modalData.description,
        deadline: modalData.deadline,
        status:  "Done",
        user: userId 
      },
      {  
        headers: {'Authorization': `Bearer ${token}`}
      }
    );
    refreshTasks()
  } catch (error: any) {
    alert("Error occurred: " + error.message);
  }
};

</script>

<template>
  <div class="container flex flex-col gap-[1rem] default:px-[1rem] sm-tablet:px-[4rem]">
    <EditModal v-if="showEditModal" :id="modalData.id" :title="modalData.title" :taskDescription="modalData.description" :status="modalData.status" @closeEditModal="showEditModal=false ; refreshTasks()"/>
    <teleport to="body">
      <AddTaskModal v-if="showAddTaskModal" @closeAddTaskModal="showAddTaskModal=false ; refreshTasks()" />
    </teleport>
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
        <button @click="clickNewTask"   class="default:hidden sm-tablet:block h-[38px] text-white px-[1rem] flex items-center justify-center gap-[.5rem] rounded-[5px] bg-[#e04c3c] hover:bg-[#c83c2c]">
          <span  class="inline-block"><i class="fa-solid fa-plus pr-2"></i>New task</span>
        </button>
      </div>
    </div>
    <div class="search-container">
      <input type="text" class="search-input" placeholder="Search..." v-model="searchQuery">
    </div>
    <div class="body flex flex-col gap-[1rem] pb-[2rem]">
      <div v-if="showNoPendingTask" class="row border rounded-[5px] p-[1rem]">
        No pending task
      </div>
      <div
        class="row border rounded-[5px] cell flex justify-between"
        v-for="(item, index) in filteredData"
        :key="index"
        @click="selectTask(item._id, item.taskTitle, item.taskDescription, item.deadline, item.status)"
      >
        <div class="flex items-start gap-[1rem]">
          <input
            v-if="item.status !== 'Done'"
            class="my-[.3rem]"
            type="radio"
            name="task"
            :id="`task-${index}`"
            @change="handleRadioClick(item)"
          />
          <div>
            <div class="">{{ item.taskTitle }}</div>
            <div class="">{{ item.deadline }}</div>
            <div :class="statusClass(item.status)">{{ item.status }}</div>
          </div>
        </div>
        <span class="flex gap-[1rem] text-[#575757] ellipsis-container">
          <i class="fa-regular fa-pen-to-square"></i>
          <i class="fa-regular fa-calendar"></i>
          <i class="fa-regular fa-comment"></i>
        </span>
      </div>
      <button
        @click="clickNewTask"
        class="h-[38px] text-white px-[1rem] rounded-[5px] bg-[#e04c3c] hover:bg-[#c83c2c] default:block sm-tablet:hidden"
      >
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
