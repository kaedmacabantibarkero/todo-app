<script setup>
import Table from '../components/Table.vue'
import Sidenav from '../components/Sidenav.vue' 
import AddTaskModal from '../components/AddTaskModal.vue'
import Topnav from '../components/Topnav.vue' 
import { ref } from 'vue'

const showAddTaskModal = ref(false)

function handleToggleAddTaskModal(visible) {
  showAddTaskModal.value = visible
}

function handleCloseModal() {
  showAddTaskModal.value = false
}
</script>

<template>
  <main class="relative overflow-y-auto h-[full]">
    <Topnav/>
    <Sidenav @toggleAddTaskModal="handleToggleAddTaskModal" />
    <div class="section ml-[20rem] mt-[4rem] relative">
      <Table />
    </div>
  </main>
  <AddTaskModal v-if="showAddTaskModal" @close="handleCloseModal" />
</template>
