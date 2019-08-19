<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6">
        <v-card elevation="1" class="mx-auto mt-2">
          <v-card-title>2018级</v-card-title>
          <v-row>
            <v-col xs="6" align-self="center" class="text-right">
              <p>总人数:{{ College[0].total}}人</p>
              <p>已提交人数:{{ College[0].submit}}人</p>
            </v-col>
            <v-col xs="6" align-self="start" class>
              <v-progress-circular
                :rotate="-90"
                :size="160"
                :width="15"
                :value="College[0].submit/College[0].total*100"
                color="purple"
              >{{ College[0].submit }}</v-progress-circular>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6">
        <v-card elevation="1" class="mx-auto mt-2">
          <v-card-title>2019级</v-card-title>
          <v-row>
            <v-col xs="6" class="text-right" align-self="center">
              <p>总人数:{{ College[1].total}}人</p>
              <p>已提交人数:{{ College[1].submit}}人</p>
            </v-col>
            <v-col xs="6" align-self="start" class>
              <v-progress-circular
                :rotate="-90"
                :size="160"
                :width="15"
                :value="College[1].submit/College[1].total*100"
                color="teal"
              >{{ College[1].submit }}</v-progress-circular>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
      <p class="text-right font-weight-thin">截止时间：{{ (new Date()).toLocaleString() }}</p>

  </v-container>
</template>

<script>
export default {
  name: "CollegeStatistics",
  data: () => {
    return {
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
    };
  }
};
</script>