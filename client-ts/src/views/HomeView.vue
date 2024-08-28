<script setup lang="ts">
import Table from '../components/Table.vue'
import Sidenav from '../components/Sidenav.vue'  
import Topnav from '../components/Topnav.vue' 
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
 
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
