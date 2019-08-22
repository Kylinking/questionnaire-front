<template>
  <v-container >
    <v-slider v-model="step" min="0" :max="questions.length-1" color="primary lighten-3" readonly></v-slider>

    <v-card class="mx-auto" max-width="500">
      <v-card-title class="title font-weight-regular justify-space-between">
        <span class="display-1">{{ questions[step].Index }}</span>
        <span small>{{questions[step].Department}}</span>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item v-for="item in questions" :key="item.Id">
          <v-card-text class="headline">{{ item.Content }}</v-card-text>
        </v-window-item>
      </v-window>
      <v-card-text>
        <v-row>
          <v-col cols="3" class="text-center" align-self="center">
            <span class="subtitle-2">不满意</span>
          </v-col>
          <v-col  cols="6" class="text-center" align-self="start">
            <v-rating hover dense v-model="rating" empty-icon="mdi-thumb-down-outline" full-icon="mdi-thumb-up"></v-rating>
          </v-col>
          <v-col cols="3" class="text-center" align-self="center">
            <span align="center" class="subtitle-2">非常满意</span>
          </v-col>
        </v-row>
        <v-card class="mx-auto" max-width="500" v-if="rating == 1">
          <v-card-title class="subtitle-2">不满意的原因以及意见或建议</v-card-title>
          <v-col cols="12">
            <v-textarea
              required
              outlined
              name="input-7-4"
              label="不满意原因、意见或建议"
              v-model="reason"
              counter
            ></v-textarea>
          </v-col>
        </v-card>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="step === 0" depressed color="light-blue lighten-3" dark @click="back()">
          <v-icon>mdi-chevron-double-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="step === questions.length-1" color="primary" depressed @click="next()">
          <v-icon>mdi-chevron-double-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-btn color="primary" width="100%" @click="submit()" v-if="step==questions.length-1">提交</v-btn>
  </v-container>
</template>
<script>
export default {
  methods: {
    submit(){
       this.result.push({
        questionId: ++this.step,
        rating: this.rating,
        reason: this.reason
      });
    },
    next: function() {
      this.result.push({
        questionId: ++this.step,
        rating: this.rating,
        reason: this.reason
      });
      if (this.step == this.questions.length) {
        this.buttonNextText = "提交";
      }
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
      buttonNextText: "Next",
      step: 0,
      rating: 3,
      result: [],
      questions: ""
    };
  },
  mounted() {
    let self = this;
    (async function() {
      try {
        let res = await self.$axios.get("/api/v1/questions");
        console.log(res);
        if (res) {
          self.questions = res.data.Data.Questions;
        }
      } catch (error) {}
    })();
  }
};
</script>