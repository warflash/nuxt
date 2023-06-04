<template>
  <div>
    <NuxtLink to="/">
      GOTO home
    </NuxtLink>
    <div>
      {{ data }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { data, pending } = await useFetch('https://jsonplaceholder.typicode.com/todos/1')
console.log('loading')
</script>
