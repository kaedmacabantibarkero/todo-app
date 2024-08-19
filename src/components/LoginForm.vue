<template>
    <div class="h-[540px] w-[400px] bg-white fading-box-shadow ">
      <div class="w-full h-[40%] p-[40px] flex flex-col items-center justify-center gap-[1rem]">
        <img class="h-[80px] mt-[4rem]" src="../assets/todoist.jpg" alt="">
        <h2 class="text-[25px]">Welcome</h2>
      </div>
      <div class="w-full h-[60%] flex flex-col p-[40px]">
        <div class="flex flex-col gap-[1rem]">
          <input
            class="border border-[#686868] h-[52px] px-[16px]"
            placeholder="Email address*"
            type="text"
          />
          <input
            v-model="password"
            class="border border-[#686868] h-[52px] px-[16px]"
            placeholder="Password*"
            type="password"
          />
        </div>
        <button class="h-[52px] px-[16px] bg-black text-white mt-[24px]">Continue</button>
        <span class="flex gap-[.5rem] mt-[1rem]">
          <p>Don't have an account?</p>
          <a class="text-[#047cb0] font-medium">Sign up</a>
        </span>
      </div>
    </div>
  </template>
  
  <script>

  </script>
  
  <style>
  .fading-box-shadow {
  box-shadow: 
  0 0 20px rgba(0, 0, 0, 0.08), 
  0 0 40px rgba(0, 0, 0, 0.03),
  0 0 60px rgba(0, 0, 0, 0.02), 
  0 0 80px rgba(0, 0, 0, 0.01);
}
  </style>
  