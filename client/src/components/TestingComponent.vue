 <!--
<script setup>
import { ref, reactive } from 'vue'

const mainTitle ="hatdog" //none reactive
const counter = ref(0), counterTitle = ref("Counterman")
const counterObject = reactive({
    counter: 0, counterTitle: "something"
})

const incrementCounter = () => {
    // counter.value++
    counterObject.counter++
}

const decrementCounter = () => {
    // counter.value--
    counterObject.counter--
}
 
</script>  

<template>
<div>
    {{mainTitle}}
    <div >{{counterObject.counterTitle}}</div>{{ counterObject.counter }}
    <button @click="incrementCounter">Increment</button>
    <button @click="decrementCounter">Decrement</button>
    <input type="text" v-model="counterObject.counterTitle">
</div> 
</template>

<style>
/* Add your styles here */
</style>
 -->

 <script setup>
import { ref, reactive } from 'vue'

const mainTitle ="hatdog" //none reactive 
const counterObject = reactive({
    counter: 0, counterTitle: "something"
})

const incrementCounter = () => { 
    counterObject.counter++
}

const decrementCounter = () => { 
    counterObject.counter--
}
 
</script>  

<template>
<div>
    {{mainTitle}}
    <div >{{counterObject.counterTitle}}</div>{{ counterObject.counter }}
    <button @click="incrementCounter">Increment</button>
    <button @click="decrementCounter">Decrement</button>
    <input type="text" v-model="counterObject.counterTitle">
</div> 
</template>

<style>
/* Add your styles here */
</style>

 