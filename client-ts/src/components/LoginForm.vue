<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';
import axios from 'axios'; 
const router = useRouter();
const username = ref('');
const password = ref('');  
const errorMessage = ref('');
const showErrorMessage = ref(false);
const passwordVisible = ref(false);

const login = async () => {  
  const auth = getAuth();
  signInWithEmailAndPassword(auth, username.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const authenticatedUser = userCredential.user;
      console.log(authenticatedUser)
      router.push('/feed') 
    })
    .catch((error) => {
    // error.code; // error.message; // these are the error codes
    switch (error.code) {
      case "auth/invalid-credential":
        errorMessage.value = "Invalid credentials. Please try again.";
        showErrorMessage.value = true;
        break;
      case "auth/invalid-email":
        errorMessage.value = "Please enter a valid email address.";
        showErrorMessage.value = true;
        break;
      case "auth/missing-password":
        errorMessage.value = "Please enter your password.";
        showErrorMessage.value = true;
        break;
      case "auth/user-not-found":
        errorMessage.value = "No account found with this email.";
        showErrorMessage.value = true;
        break;
      case "auth/wrong-password":
        errorMessage.value = "Incorrect password. Please try again.";
        showErrorMessage.value = true;
        break;
      default:
        errorMessage.value = "An unknown error occurred. Please try again later.";
        showErrorMessage.value = true;
        break;
    }
  });
}  

// Function to toggle the visibility of the password
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
</script>

<template>
  <div class=" w-[400px] bg-white default:box-shadow-none sm-tablet:shadow-fading">
    <div class="w-full h-[200px] p-[40px] flex flex-col items-center justify-center gap-[1rem]">
      <img class="h-[80px] mt-[4rem]" src="../assets/Todoist_logo.png" alt="">
      <h2 class="text-[25px]">Welcome back</h2>
    </div>
    <div :class="[showErrorMessage ? 'p-[40px] pb-[40px] pt-[20px]': 'p-[40px]']" class="w-full h-full flex flex-col  ">
      <div class="flex flex-col gap-[1rem]">
        <span v-if="showErrorMessage" class="bg-yellow-400 text-white px-[1rem] py-[.5rem]"> {{ errorMessage }}</span>
        <input v-model="username"
          class="border border-[#686868] h-[52px] px-[16px]"
          placeholder="Email address*"
          type="text"
          @keyup.enter="login"
        />
        <div class="relative">
          <input
            v-model="password"
            :type="passwordVisible ? 'text' : 'password'"
            class="border border-[#686868] h-[52px] px-[16px] w-full pr-10"
            placeholder="Password*"
            @keyup.enter="login"
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
      <button @click="login" class="h-[52px] px-[16px] bg-[#e04c3c] hover:bg-[#c83c2c] text-white mt-[24px]">Continue</button>
      <span class="flex gap-[.5rem] mt-[1rem]">
        <p>Already have an account?</p>
        <router-link to="/signup" class="text-[#047cb0] font-medium">
          Sign up
        </router-link>
      </span>
    </div>
  </div>
</template>
 