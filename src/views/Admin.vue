<template>
  <v-content app>
      <component v-bind:is="$store.state.dynamicComponent"></component>
  </v-content>
</template>

<script>
export default {
  components: {
    statistics: () => import("../components/Statistics.vue"),
    about: () => import("../components/HelloWorld.vue")
  },
  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ]
    };
  }
};
</script>