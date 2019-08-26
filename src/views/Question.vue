<template>
  <v-container>
    <v-slider v-model="step" min="0" :max="questions.length-1" color="primary lighten-3" readonly></v-slider>

    <v-card class="mx-auto" max-width="500">
      <v-toolbar dark color="purple">
        <v-toolbar-title>{{ questions[step].Index }}</v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-toolbar-items>
          <v-btn text>{{questions[step].Department}}</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-window v-model="step">
        <v-window-item v-for="item in questions" :key="item.Id">
          <v-card-text style="height:5em" class="headline">{{ item.Content }}</v-card-text>
        </v-window-item>
      </v-window>
      <v-card-text>
        <v-row>
          <v-col cols="3" class="text-center" align-self="center">
            <span class="subtitle-2">不满意</span>
          </v-col>
          <v-col cols="6" class="text-center" align-self="start">
            <v-rating
              hover
              dense
              length="4"
              v-model="rating"
              empty-icon="mdi-thumb-down-outline"
              full-icon="mdi-thumb-up"
            ></v-rating>
          </v-col>
          <v-col cols="3" class="text-center" align-self="center">
            <span align="center" class="subtitle-2">非常满意</span>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card class="mx-auto" max-width="500" v-if="rating == 1" flat>
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
      <v-card-actions>
        <v-btn :disabled="step === 0" depressed color="light-blue lighten-3" dark @click="back()">
          <v-icon>mdi-chevron-double-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="step === questions.length-1" color="primary" depressed @click="next()">
          <v-icon>mdi-chevron-double-right</v-icon>
        </v-btn>
      </v-card-actions>
      <v-row justify="end">
        <v-btn
          class="my-6 mr-6"
          color="pink lighten-2"
          width="40%"
          @click="submit()"
          v-if="step==questions.length-1"
        >提交</v-btn>
      </v-row>
    </v-card>
    <v-overlay :value="overlay">
      <v-card height="100" width="250" >
        <v-card-title primary-title>
          感谢参与问卷调查！此页面即将关闭
        </v-card-title>
      <v-row justify="center">
        <!-- <v-btn
          color="success"
          class="mt-4"
          @click="quitOverlay"
        >
          退出
        </v-btn> -->
      </v-row>
    </v-card>
    </v-overlay>
  </v-container>
</template>
<script>
import { constants } from "crypto";
export default {
  methods: {
    quitOverlay(){
       this.overlay = false;
    },
    submit() {
      let self = this;
      this.result[this.step] = {
        QuestionId: this.step+1,
        Select: this.mapRating(this.rating),
        Text: this.reason,
        StudentId: this.$store.state.id
      };

      this.$axios.post("/api/v1/answers", {
        Answers: self.result
      }).then(res=>{
        if (res.data.Data){
          self.overlay = true;
          self.$store.commit('ResetState');
          localStorage.clear();
          window.setTimeout(function(){
                window.location.href='about:blank'; 
          },2000)          
        }
      });
    },
    next: function() {
      if (!this.result[this.step]) {
        this.result.push({
          QuestionId: ++this.step,
          Select: this.mapRating(this.rating),
          Text: this.reason,
          StudentId: this.$store.state.id
        });
      } else {
        this.result[this.step] = {
          QuestionId: ++this.step,
          Select: this.mapRating(this.rating),
          Text: this.reason,
          StudentId: this.$store.state.id
        };
      }
      if (this.step == this.questions.length) {
        this.buttonNextText = "提交";
      }
      if (!this.result[this.step]) {
        this.rating = 3;
        this.reason = "";
      } else {
        this.rating =
          ["不满意", "基本满意", "满意", "非常满意"].indexOf(
            this.result[this.step].Select
          ) + 1;
        this.reason = this.result[this.step].Text;
      }
    },
    back: function() {
      this.step--;
      if (!this.result[this.step]) {
        this.rating = 3;
        this.reason = "";
      } else {
        this.rating =
          ["不满意", "基本满意", "满意", "非常满意"].indexOf(
            this.result[this.step].Select
          ) + 1;
        this.reason = this.result[this.step].Text;
      }
    },
    mapRating: function(rating) {
      let rateStr = ["不满意", "基本满意", "满意", "非常满意"];
      return rateStr[rating - 1];
    }
  },
  data() {
    return {
      step: 0,
      rating: 3,
      result: [],
      questions: "",
      reason:'',
      overlay:false,
    };
  },

  mounted() {
    let token = localStorage.token;
    if (!token) {
      this.$store.commit("ShowErrorBanner", {
        message: "登录已失效,请重新登录"
      });
      this.$router.push("/login");
      return;
    }
    let self = this;
    (async function() {
      try {
        let res = await self.$axios.get("/api/v1/questions");
        if (res) {
          self.questions = res.data.Data.Questions;
        }
      } catch (error) {
        self.$store.commit("ShowErrorBanner", { message: error });
      }
    })();
  }
};
</script>