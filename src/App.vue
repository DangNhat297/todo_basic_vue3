<template>
  <home-screen />
</template>

<script>
import HomeScreen from './components/HomeScreen.vue';
export default {
  components: {
    HomeScreen
  },
  data() {
    return {
      form: {
        title: 'test title',
        description: 'test description',
        due: '2022-20-20',
        status: 1
      }
    }
  }
}
</script>