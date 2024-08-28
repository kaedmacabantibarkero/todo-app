<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

const router = useRouter()

const username = ref('');
const password = ref('');
const passwordVisible = ref(false);

// Check conditions for the password
const isMinLength = computed(() => password.value.length >= 8);
const hasLowerCase = computed(() => /[a-z]/.test(password.value));
const hasUpperCase = computed(() => /[A-Z]/.test(password.value));
const hasNumber = computed(() => /\d/.test(password.value));
const hasSpecialChar = computed(() => /[!@#$%^&*]/.test(password.value));

// Check if at least 3 conditions are met
const isValidThreeConditions = computed(() => {
  let conditionsMet = 0;
  if (hasLowerCase.value) conditionsMet++;
  if (hasUpperCase.value) conditionsMet++;
  if (hasNumber.value) conditionsMet++;
  if (hasSpecialChar.value) conditionsMet++;
  return conditionsMet >= 3;
});

const hasPassword = computed(() => password.value.length > 0);

// Function to toggle password visibility
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const errorMessage = ref("Please fill out email and password")
const showErrorMessage = ref(false)

// Function to handle login
const login = async () => { 
  if (username.value !== '' && password.value !== '') {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username: username.value,
        password: password.value,
      });
      const { accessToken, userId } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userId', userId);
      console.log("login success")
      router.push({
        name: 'home',
        params: { id: userId }
      });
    } catch (error:any) {
      if (error.response && error.response.data) { 
        showErrorMessage.value = true;
        errorMessage.value = error.response.data.msg;
        setTimeout(() => {
          showErrorMessage.value = false;
        }, 3000);
      } else { 
        console.log("Error occurred: " + error.message);
      }
    } 
  } else {
    showErrorMessage.value = true;
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 3000); 
  }
};


// Function to handle sign up
const signUp = async () => {
  if (isMinLength.value && isValidThreeConditions.value) {
    try {
      const response = await axios.post('http://localhost:3000/api/post/signup', {
        username: username.value,
        password: password.value,
      }); 
      await login();
    } catch (error:any) {
      // Check if the error has a response from the server
      if (error.response && error.response.data) { 
        showErrorMessage.value= true
        errorMessage.value = error.response.data.msg;
        setTimeout(() => {
          showErrorMessage.value = false;
        }, 3000);
      } else { 
        console.log("Error occurred: " + error.message);
      }
    }
  } else {
    showErrorMessage.value= true
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 3000);
  }
};
</script>


<template>
  <div :class="[hasPassword ? 'h-[760px]' : 'h-[540px]']" class="h-[540px] w-[400px] bg-white default:box-shadow-none sm-tablet:shadow-fading">
    <div class="w-full h-[200px] p-[40px] flex flex-col items-center justify-center gap-[1rem]">
      <img class="h-[80px] mt-[4rem]" src="../assets/Todoist_logo.png" alt="">
      <h2 class="text-[25px]">Sign up new account</h2>
    </div>
    <div :class="[showErrorMessage ? 'p-[40px] pb-[40px] pt-[20px]': 'p-[40px]']" class="w-full h-full flex flex-col">
      
      <div class="flex flex-col gap-[1rem]">
        <span v-if="showErrorMessage" class="bg-yellow-400 text-white px-[1rem] py-[.5rem]"> {{errorMessage}}</span>
        <input v-model="username"
          class="border border-[#686868] h-[52px] px-[16px]"
          placeholder="Email address*"
          type="text"
          @keyup.enter="signUp"
        />
        <div class="relative">
          <input
            v-model="password"
            :type="passwordVisible ? 'text' : 'password'"
            class="border border-[#686868] h-[52px] px-[16px] w-full pr-10"
            placeholder="Password*"
            @keyup.enter="signUp"
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
        <div :class="[hasPassword ? 'block border border-[#c4ccd4] px-[16px] py-[14px]' : 'hidden']">
          <span class="text-gray-600 font-medium">Your password must contain:</span>
          <ul class="list-disc ml-5 mt-2">
            <li :class="isMinLength ? 'text-green-600' : 'text-gray-600'">At least 8 characters</li>
            <li :class="isValidThreeConditions ? 'text-green-600' : 'text-gray-600'">
              At least 3 of the following:
              <ul class="list-disc ml-5">
                <li :class="hasLowerCase ? 'text-green-600' : 'text-gray-600'">Lower case letters (a-z)</li>
                <li :class="hasUpperCase ? 'text-green-600' : 'text-gray-600'">Upper case letters (A-Z)</li>
                <li :class="hasNumber ? 'text-green-600' : 'text-gray-600'">Numbers (0-9)</li>
                <li :class="hasSpecialChar ? 'text-green-600' : 'text-gray-600'">Special characters (e.g. !@#$%&*)</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <button @click="signUp" class="h-[52px] px-[16px] bg-[#e04c3c] hover:bg-[#c83c2c] text-white mt-[24px]">Continue</button>
      <span class="flex gap-[.5rem] mt-[1rem]">
        <p>Already have an account?</p>
        <router-link to="/login" class="text-[#047cb0] font-medium">
          Log in
        </router-link>
      </span>
    </div>
  </div>
</template>

<style scoped>
.text-green-600 {
  color: #047857;  
}

.text-gray-600 {
  color: #4B5563;  
}

 
</style>
