<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'; 
import { useRouter } from 'vue-router';
import axios from 'axios'; 
const router = useRouter();
import { useUserDetails } from '../composables/userDetails'; // Import the composable
import { getAuth, onAuthStateChanged , signOut} from "firebase/auth"; 
const { userDetails, error, loading, fetchUserDetails } = useUserDetails(); // Destructure the composable's properties

const username = ref('');
const id = ref('');

const isLoggedIn = ref(false)
let auth:any
onMounted( () => {
  auth = getAuth();
  onAuthStateChanged(auth, (user)=> {
    if (user){
      isLoggedIn.value = true
    }else{
      isLoggedIn.value = false
    }
  })
});
  
 const logout = () =>{
  signOut(auth).then(()=>{
    router.push("/")
  })
 }
</script>
<template>
  <section class="sidenav-wrapper bg-[#fcfaf8] fixed flex flex-col h-[100vh] w-[15rem] border-r default:hidden tablet:block ">
    <div class="sidenav m-[1rem] top-0 left-0 text-white flex flex-col justify-between h-full ">
       <ul>
        <div class="cursor-pointer flex items-center gap-5 p-2 rounded-md text-inherit no-underline max-h-[32px]   overflow-hidden">
          <img class="logo h-[30px] w-[30px] rounded-[50%]" src="../assets/profile.jpg" alt="Logo" draggable="false">
          <label class="text-[#575757] truncate whitespace-nowrap">{{ username }}</label>
        </div>
        
        <br>
        <router-link class="menu-item max-h-[32px]" :to="`/${id}`">
            <i class="fa-solid fa-list-check"></i>
            <label>Task List</label>
        </router-link>

        <router-link class="menu-item max-h-[32px]" :to="`/`">
            <i class="fa-solid fa-bullseye"></i>
            <label>Objectives</label>
        </router-link>

        <div class="menu-item max-h-[32px]" to="#" id="qsLogoutBtn"  >
          <i class="fa-regular fa-calendar"></i>
          <label class="cursor-pointer">Calendar</label>
        </div>

        <div @click="logout" class="menu-item max-h-[32px]" to="#" id="qsLogoutBtn"   >
            <i class="fa-solid fa-right-from-bracket"></i>
            <label class="cursor-pointer">Logout</label>
        </div> 
      </ul>
      <ul class="text-[#575757]">
        <li class="menu-item max-h-[32px]" to="#" id="qsLogoutBtn"   >
          <i class="fa-solid fa-diamond"></i>
          <label class="cursor-pointer">Upgrade plan</label>
        </li> 
      </ul>
    </div>
  </section>
</template>

<style scoped>
.menu-item { @apply cursor-pointer flex items-center gap-5 p-2 rounded-md text-inherit no-underline}
.menu-item:hover { @apply bg-[#e0e0e0]; }
.menu-item i,.menu-item label { @apply text-[#575757] }
</style>
