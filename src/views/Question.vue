<template>
  <v-container>
    <v-slider v-model="step" min="0" :max="questions.length-1" readonly></v-slider>

    <v-card class="mx-auto" max-width="500">
      <v-card-title class="title font-weight-regular justify-space-between">
        <span class="display-1">{{ questions[step].Index }}</span>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item v-for="item in questions" :key="item.Id">
          <v-card-text class="headline">{{ item.Content }}</v-card-text>
        </v-window-item>
      </v-window>
      <v-card-text>
        <v-row cols="12">
          <v-col xs="1" class="text-center" align-self="center">
            <span class="subtitle-2">不满意</span>
          </v-col>
          <v-col xs="10" class="text-center" align-self="start">
            <v-rating v-model="rating" empty-icon="mdi-thumb-up-outline" full-icon="mdi-thumb-up"></v-rating>
          </v-col>
          <v-col xs="1" class="text-center" align-self="center">
            <span align="center" class="subtitle-2">非常满意</span>
          </v-col>
        </v-row>
        <v-card class="mx-auto" max-width="500" v-if="rating == 1">
          <v-card-title class="subtitle-2">不满意的原因以及意见或建议</v-card-title>
          <v-col cols="12">
            <v-textarea required outlined name="input-7-4" label="不满意原因、意见或建议" v-model="reason"></v-textarea>
          </v-col>
        </v-card>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="step === 0" text @click="back()">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="step === questions.length-1"
          color="primary"
          depressed
          @click="next()"
        >Next</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  methods: {
    next: function() {
      this.result[this.step] = {
        questionId: this.step,
        rating: this.rating,
        reason: this.reason
      };
      this.step++;
      if (!this.result[this.step]) {
        this.rating = 3;
        this.reason = "";
      } else {
        this.rating = this.result[this.step].rating;
        this.reason = this.result[this.step].reason;
      }
    },
    back: function() {
      this.step--;
      if (!this.result[this.step]) {
        this.rating = 3;
        this.reason = "";
      } else {
        this.rating = this.result[this.step].rating;
        this.reason = this.result[this.step].reason;
      }
    }
  },
  data() {
    return {
      currentTitle: "后勤服务",
      step: 0,
      rating: 3,
      result: [],
      questions: [
        {
          Id: 1,
          Index: "课堂育人",
          Content: "课堂教育教学的育人活动",
          Department: null,
          CreatedAt: "2019-08-16 09:37:53",
          UpdatedAt: "2019-08-16 09:37:53",
          QuestionnaireId: 1
        },
        {
          Id: 2,
          Index: "课外育人",
          Content: "学校开展的课堂教育教学以外的育人活动",
          Department: null,
          CreatedAt: "2019-08-16 09:37:53",
          UpdatedAt: "2019-08-16 09:37:53",
          QuestionnaireId: 1
        },
        {
          Id: 3,
          Index: "思想政治课",
          Content: "学校开设的思想政治理论课程的教材、教师、教学等方面",
          Department: null,
          CreatedAt: "2019-08-16 09:37:53",
          UpdatedAt: "2019-08-16 09:37:53",
          QuestionnaireId: 1
        },
        {
          Id: 4,
          Index: "公共基础课",
          Content: "不含思想政治课的其它公共课程",
          Department: null,
          CreatedAt: "2019-08-16 09:37:53",
          UpdatedAt: "2019-08-16 09:37:53",
          QuestionnaireId: 1
        }
      ]
    };
  }
};
</script>