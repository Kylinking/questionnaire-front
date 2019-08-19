<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card mx-auto class="mt-2" max-width="900px">
          <v-card-title class="justify-center" v-show="!$vuetify.breakpoint.xsOnly">2018</v-card-title>
          <v-row>
            <v-col
              cols="12"
              xs="6"
              sm="4"
              md="3"
              v-for="(item,index) in Faculties.filter(e=>e.Grade=='2018').sort((a,b)=>a.Submit/a.Total-b.Submit/b.Total)"
              :key="index"
            >
              <v-card mx-2>
                <v-card-title class="justify-center">
                  {{item.Name}}
                  <span v-show="$vuetify.breakpoint.xsOnly">2018级</span>
                </v-card-title>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <div class="text-center pb-2" v-on="on">
                      <v-progress-circular
                        :rotate="-90"
                        :size="160"
                        :width="15"
                        :value="item.Submit/item.Total*100"
                        :color="colors[index%colors.length]"
                      >{{ item.Submit }}</v-progress-circular>
                    </div>
                  </template>
                  <span>
                    总人数：{{ item.Total}}人
                    <br />
                    已提交：{{item.Submit}}人
                    <br />
                    提交率：{{Math.round(item.Submit/item.Total*100)}}%
                  </span>
                </v-tooltip>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card mx-auto max-width="900px" class="mt-2">
          <v-card-title class="justify-center" v-show="!$vuetify.breakpoint.xsOnly">2019</v-card-title>
          <v-row>
            <v-col
              cols="12"
              xs="6"
              sm="4"
              md="3"
              v-for="(item,index) in Faculties.filter(e=>e.Grade=='2019').sort((a,b)=>a.Total-b.Submit/b.Total)"
              :key="index"
            >
              <v-card mx-2>
                <v-card-title class="justify-center">
                  {{item.Name}}
                  <span v-show="$vuetify.breakpoint.xsOnly">2019级</span>
                </v-card-title>
                <v-tooltip right>
                  <template v-slot:activator="{on}">
                    <div class="text-center pb-2" v-on="on">
                      <v-progress-circular
                        :rotate="-90"
                        :size="160"
                        :width="15"
                        :value="item.Submit/item.Total*100"
                        :color="colors[index%colors.length]"
                      >{{ item.Submit }}</v-progress-circular>
                    </div>
                  </template>
                  <span>
                    总人数：{{ item.Total}}人
                    <br />
                    已提交：{{item.Submit}}人
                    <br />
                    提交率：{{Math.round(item.Submit/item.Total*100)}}%
                  </span>
                </v-tooltip>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "FacultyStatistics",
  data: () => {
    return {
        colors:['#7CB342','#512DA8','#1DE9B6','#F4511E','#1E88E5','#00796B','#546E7A'],
      Faculties: [
        {
          Name: "电信系",
          Total: 400,
          Grade: "2018",
          Submit: "300"
        },
        {
          Name: "电信系",
          Total: 500,
          Grade: "2019",
          Submit: "430"
        },
        {
          Name: "机电系",
          Total: 500,
          Grade: "2019",
          Submit: "120"
        },
        {
          Name: "机电系",
          Total: 340,
          Grade: "2018",
          Submit: "120"
        },
        {
          Name: "护理系",
          Total: 800,
          Grade: "2018",
          Submit: "790"
        },
        {
          Name: "经管系",
          Total: 500,
          Grade: "2019",
          Submit: "120"
        },
        {
          Name: "药学系",
          Total: 340,
          Grade: "2018",
          Submit: "120"
        },
        {
          Name: "新能源系",
          Total: 800,
          Grade: "2018",
          Submit: "790"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped>
</style>