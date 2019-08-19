<template>
  <v-container>
    <v-card v-for="(item,index) in grades" :key="index" class="mb-4">
      <v-toolbar dark color="purple">
        <v-toolbar-title>电信系{{item}}级调查指标情况</v-toolbar-title>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="questions.filter((e)=>e.Grade == item)"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: function() {
    return {
      grades: ["2018", "2019"],
      headers: [
        { text: "调查指标", value: "Index" },
        { text: "非常满意", value: "ExtremelySatisfied" },
        { text: "满意", value: "Satisfied" },
        { text: "基本满意", value: "Unsatisfied" },
        { text: "不满意", value: "ExtremelyUnsatisfied" }
      ],
      questions: [
        {
          Id: 1,
          Index: "课堂育人",
          ExtremelySatisfied: 100,
          Satisfied: 200,
          Unsatisfied: 200,
          ExtremelyUnsatisfied: 10,
          Grade: 2019
        },
        {
          Id: 2,
          Index: "课外育人",
          ExtremelySatisfied: 10,
          Satisfied: 20,
          Unsatisfied: 120,
          ExtremelyUnsatisfied: 5,
          Grade: 2019
        },
        {
          Id: 3,
          Index: "思想政治课",
          ExtremelySatisfied: 40,
          Satisfied: 20,
          Unsatisfied: 12,
          ExtremelyUnsatisfied: 2,
          Grade: 2019
        },
        {
          Id: 4,
          Index: "公共基础课",
          ExtremelySatisfied: 300,
          Satisfied: 240,
          Unsatisfied: 10,
          ExtremelyUnsatisfied: 1,
          Grade: 2019
        },
        {
          Id: 5,
          Index: "课堂育人",
          ExtremelySatisfied: 100,
          Satisfied: 20,
          Unsatisfied: 200,
          ExtremelyUnsatisfied: 20,
          Grade: 2018
        },
        {
          Id: 6,
          Index: "课外育人",
          ExtremelySatisfied: 10,
          Satisfied: 320,
          Unsatisfied: 120,
          ExtremelyUnsatisfied: 5,
          Grade: 2018
        },
        {
          Id: 7,
          Index: "思想政治课",
          ExtremelySatisfied: 140,
          Satisfied: 220,
          Unsatisfied: 12,
          ExtremelyUnsatisfied: 2,
          Grade: 2018
        },
        {
          Id: 8,
          Index: "公共基础课",
          ExtremelySatisfied: 300,
          Satisfied: 240,
          Unsatisfied: 10,
          ExtremelyUnsatisfied: 1,
          Grade: 2018
        }
      ]
    };
  }
};
</script>