<template>
  <v-container>
    <v-card class="mx-auto mt-6" max-width="900px">
      <v-card-title>
        <v-select :items="items" label="问卷提交情况" @change="selectChange" v-model="selection"></v-select>
      </v-card-title>
      <component :is="selected"></component>
    </v-card>
  </v-container>
</template>
<script>
export default {
  components: {
    CollegeStatistics: () => import("./CollegeStatistics"),
    FacultyStatistics: () => import("./FacultyStatistics"),
    FacultyDetails:() => import("./FacultyDetails"),
    AnswerStatistics:()=>import ("./AnswerStatistics"),
  },
  name: "Statistics",
  data: () => ({
    selected: "FacultyDetails",
    items: ["学院汇总", "系部汇总"],
    selection: "系部汇总",
    College: [
      {
        total: 5000,
        submit: 2300
      },
      {
        total: 6000,
        submit: 5000
      }
    ]
  }),
  methods: {
    selectChange() {
      if (this.selection == this.items[0]) {
        this.selected = "CollegeStatistics";
      } else {
        this.selected = "FacultyStatistics";
      }
    }
  }
};
</script>