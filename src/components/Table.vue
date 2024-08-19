
<script setup>
import { ref, computed } from 'vue';
import EditModal from '../components/EditModal.vue'

const showEditModal = ref(false)
 
// Method to close the modal
function closeEditModal(){
  showEditModal.value = false;
};

const modalTitle = ref("") 
const modalTaskDescription = ref("")
const modalDate = ref("")
const modalStatus = ref("")
function selectTask(title, description, date, status) {
  showEditModal.value = true
  if (title && date && status) { 
    modalTitle.value = title;
    modalTaskDescription.value = description;
    modalDate.value = date;
    modalStatus.value = status
  } else {
    alert('Invalid task details');
  }
}

// sampol data
const tableData = ref([
  { taskTitle: 'Create a sequence', taskDescription: 'nothing much',  date: '11/20/2024', status: 'Not started' },
  { taskTitle: 'Execute call and email task', taskDescription: 'cook food', date: '11/20/2024', status: 'Not started' },
  { taskTitle: 'Execute call and email task', taskDescription: 'feed cat', date: '11/20/2024', status: 'In progress' },
  { taskTitle: 'Account research', taskDescription: 'feed dog', date: '11/20/2024', status: 'In progress' },
  { taskTitle: 'Execute call and email task', taskDescription: 'cafe with friends', date: '11/20/2024', status: 'In progress' },
  { taskTitle: 'Account research', taskDescription: 'nothing much', date: '11/20/2024', status: 'In progress' },
]);

// search query
const searchQuery = ref('');

// filter data based on search query
const filteredData = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return tableData.value.filter(item =>  
    item.taskTitle.toLowerCase().includes(query) ||
    item.date.toLowerCase().includes(query) ||
    item.status.toLowerCase().includes(query)
  );
});

// return status class based on the status
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
</script>

<template>
  <div class="container">
    <EditModal v-if="showEditModal" :title="modalTitle" :taskDescription="modalTaskDescription" :status="modalStatus" @close="closeEditModal"/>
    <table class="table">
      <thead>
        <tr class="bg-white">
          <th>Current</th>
          <th>Completed</th>
          <th colspan="5"></th>
        </tr>
        <tr class="bg-white">
          <th colspan="7">
            <div class="search">
              <input type="text" class="search-input" placeholder="Search..." v-model="searchQuery">
            </div>
          </th>
        </tr>
        <tr>
          <th class="w-[10px] "></th>
          <th class="w-[40%]">Task Name</th>
          <th>Date</th>
          <th class="w-[20%]">Status</th>   
        </tr>
      </thead>
      <tbody>
        <tr class="cursor-pointer" v-for="(item, index) in filteredData" :key="index" @click="selectTask(item.taskTitle, item.taskDescription, item.date, item.status)">
          <td ><input type="radio" name="" id=""></td>
          <td  >{{ item.taskTitle }}</td>
          <td >{{ item.date }}</td>
          <td  :class="statusClass(item.status)">{{ item.status }}</td>
          <td class="ellipsis-container">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </td>
        </tr>
      </tbody>

    </table>
  </div>
</template>
 
<style>
.container {
  @apply w-full max-w-[850px]      ;
}

.table {
  @apply w-full;
}

thead {
  @apply w-full bg-[#f8f9fa] text-left;
}

th, td {
  @apply px-4 py-2;
}

th {
  @apply font-medium text-[#8c949f];
}

td {
  @apply text-[#484849];
}

tr {
  @apply border-b border-[#dbddec]  ; 
}

.last-tr {
  @apply border-none;
}

.search {
  @apply w-full;
}

.search-input {
  @apply w-full px-4 py-2 border border-[#dbddec] rounded-md;
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

.view-details {
  @apply cursor-pointer text-blue-500 hover:underline;
}

.ellipsis-container {
  @apply relative;
  opacity: 0; /* Initially hide the icon */
  transition: opacity 0.2s; /* Smooth transition */
}

tr:hover .ellipsis-container {
  opacity: 1; /* Show the icon on row hover */
}

</style>
