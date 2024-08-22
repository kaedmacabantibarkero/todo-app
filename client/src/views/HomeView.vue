<script setup>
import Table from '../components/Table.vue'
import Sidenav from '../components/Sidenav.vue' 
import AddTaskModal from '../components/AddTaskModal.vue'
import Topnav from '../components/Topnav.vue' 
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
 
const route = useRoute();
 
onMounted(() => {
  const userId = route.params.id; 
});

</script>

<template>
  <main class="home-view relative overflow-y-auto h-[full]">
    <Topnav/>
    <Sidenav  />
    <div class="section tablet:ml-[15rem] default:ml-[0rem] mt-[4rem] relative">
      <Table />
    </div>
  </main>
  
</template>
