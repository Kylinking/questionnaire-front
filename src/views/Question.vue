<template>
  <v-container>
    <v-slider v-model="step" min="0" :max="questions.length-1" readonly></v-slider>

    <v-card class="mx-auto" max-width="500">
      <v-card-title class="title font-weight-regular justify-space-between">
        <span>{{ questions[step].Title }}</span>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item v-for="(item,index) in questions" :key="index">
          <v-card-text>{{ item.Content }}</v-card-text>
        </v-window-item>
        <v-card-text>
          <div class="text-center">
            <v-rating v-model="rating" empty-icon="mdi-thumb-up-outline" full-icon="mdi-thumb-up"></v-rating>
          </div>
        </v-card-text>
      </v-window>

      <v-card-actions>
        <v-btn :disabled="step === 0" text @click="step--">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="step === questions.length-1"
          color="primary"
          depressed
          @click="step++"
        >Next</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      currentTitle: "后勤服务",
      step: 0,
      rating: 3,
      questions: [
        {
          Title: "标题一",
          Content: "这是描述1，这是描述1，这是描述1"
        },
        {
          Title: "标题二",
          Content: "这是描述2，这是描述2，这是描述2"
        },
        {
          Title: "标题三",
          Content: "这是描述3，这是描述3，这是描述3"
        },
        {
          Title: "标题四",
          Content: "这是描述4，这是描述4，这是描述4"
        }
      ]
    };
  }
};
</script>