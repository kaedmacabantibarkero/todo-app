 

<script setup>
import { ref } from 'vue'; 
import { useRouter } from 'vue-router';
import axios from 'axios';
const router = useRouter();

const getJWT = async () => {
  try {
    const token = localStorage.getItem('accessToken'); // Get the token from localStorage

    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    // Fetch the JWT from the endpoint
    const response = await axios.get('http://localhost:3000/api/get/jwt', {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    const jwt = response.data.jwt; // Extract the JWT from the response
    return jwt;
  } catch (error) {
    console.error('Error fetching JWT:', error.message);
    throw error; // Rethrow the error to handle it in the calling function if needed
  }
};

const logout = async () => {
  try {
    const jwt = await getJWT(); // Fetch the JWT using getJWT function

    // Send a request to delete the JWT
    await axios.delete('http://localhost:3000/auth/logout', {
      headers: { 'Authorization': `Bearer ${jwt}` },
      data: { jwt }, // Include the JWT in the request body
    });

    // Optionally, clear the local storage token or handle post-logout behavior
    localStorage.removeItem('accessToken');
    router.push({
        name: 'login', 
      });
  } catch (error) {
    console.error('Error during logout:', error.message);
  }
};
</script>
<template>
  <section class="sidenav-wrapper bg-[#fcfaf8] fixed flex flex-col h-[100vh] w-[15rem] border-r default:hidden tablet:block ">
    <div class="sidenav m-[1rem] top-0 left-0 text-white flex flex-col justify-between h-full ">
       <ul>
        <router-link class="cursor-pointer flex items-center gap-5 p-2 rounded-md text-inherit no-underline max-h-[32px]" :to="`/`">
           <img class="logo h-[30px] w-[30px] rounded-[50%]" src="../assets/profile.jpg" alt="Logo" draggable="false">
          <label class="text-[#575757]">Kaed Macabanti</label>
        </router-link>

        <br>
        <router-link class="menu-item max-h-[32px]" :to="`/`">
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
