<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

const username = ref('');
const password = ref(''); 
 

const login = async() =>{
  if(username.value !== '' && password.value !== ''){
    try {
      const response = await axios.post('http://localhost:3000/api/post/login', {
        username: username.value,
        password: password.value,
      });
      alert("Success");
      console.log(response.data);
    } catch (error) {
      alert("Error occurred: " + error.message);
    }
  }else{
    alert("empty")
  }
}
</script>

<template>
  <div  class="h-[540px] w-[400px] bg-white fading-box-shadow">
    <div class="w-full h-[200px] p-[40px] flex flex-col items-center justify-center gap-[1rem]">
      <img class="h-[80px] mt-[4rem]" src="../assets/todoist.jpg" alt="">
      <h2 class="text-[25px]">Welcome</h2>
    </div>
    <div class="w-full h-full flex flex-col p-[40px]">
      <div class="flex flex-col gap-[1rem]">
        <input v-model="username"
          class="border border-[#686868] h-[52px] px-[16px]"
          placeholder="Email address*"
          type="text"
        />
        <div class="relative">
          <input
            v-model="password"
            :type="passwordVisible ? 'text' : 'password'"
            class="border border-[#686868] h-[52px] px-[16px] w-full pr-10"
            placeholder="Password*"
          />
          <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600">
            <svg v-if="passwordVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825a5.001 5.001 0 01-3.75-1.825m0 0a5.001 5.001 0 01-3.75 1.825M4 8.13C4.418 5.802 6.734 4 10 4s5.582 1.802 6 4.13M4 8.13c.418-2.328 2.734-4.13 6-4.13s5.582 1.802 6 4.13M4 8.13c.418 2.328 2.734 4.13 6 4.13s5.582-1.802 6-4.13m-6 4.13c3.266 0 5.582-1.802 6-4.13" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.98 8.99A10.025 10.025 0 0112 5c3.24 0 6.057 1.589 7.877 3.99M21 21l-1.415-1.415A9.969 9.969 0 0112 19c-3.24 0-6.057-1.589-7.877-3.99m16.898 0A10.025 10.025 0 0112 19c-3.24 0-6.057-1.589-7.877-3.99M3 3l18 18" />
            </svg>
          </button>
        </div>
 
      </div>
      <button @click="login" class="h-[52px] px-[16px] bg-black text-white mt-[24px]">Continue</button>
      <span class="flex gap-[.5rem] mt-[1rem]">
        <p>Already have an account?</p>
        <router-link to="/signup" class="text-[#047cb0] font-medium">
          Sign up
        </router-link>
      </span>
    </div>
  </div>
</template>
 
  
  <style>
  .fading-box-shadow {
  box-shadow: 
  0 0 20px rgba(0, 0, 0, 0.08), 
  0 0 40px rgba(0, 0, 0, 0.03),
  0 0 60px rgba(0, 0, 0, 0.02), 
  0 0 80px rgba(0, 0, 0, 0.01);
}
  </style>
  