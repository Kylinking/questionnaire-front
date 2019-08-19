<template>
<v-container>
  <v-card >
      <v-toolbar dark color="blue">
          <v-toolbar-title>{{ $store.state.currentFaculty.Name }}问卷提交情况</v-toolbar-title>
        </v-toolbar>
    <v-row v-for="item in Class" :key="item.Id">
      <v-col
        cols="12"
        xs="12"
        sm="3"
        color="colors[item.Id]"
        class="body-2"
        :class="$vuetify.breakpoint.xsOnly?'text-center':'text-right'"
        align-self="center"
      >{{item.Name}}</v-col>
      <v-col cols="12" xs="12" sm="9">
        <v-progress-linear
          :color="colors[item.Id]"
          height="25"
          reactive
          :value="(item.Submit/item.Total*100)"
        >
          <template>
            <strong>{{ item.Submit }}/{{item.Total}}</strong>
          </template>
        </v-progress-linear>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        xs="12"
        sm="3"
        class="body-2"
        :class="$vuetify.breakpoint.xsOnly?'text-center':'text-right'"
        align-self="center"
      >{{$store.state.currentFaculty.Name}}总体情况</v-col>
      <v-col>
        <v-progress-linear
          color="#00796B"
          height="25"
          reactive
          :value="FacultySubmit/FacultyTotal*100"
        >
          <template>
            <strong>{{ FacultySubmit }}/{{FacultyTotal}}</strong>
          </template>
        </v-progress-linear>
      </v-col>
    </v-row>
  </v-card>
</v-container>
</template>

<script>
export default {
  computed: {
    FacultySubmit: function() {
      return this.Class.reduce((accumulator, current) => {
        return accumulator + current.Submit;
      },0);
    },
    FacultyTotal: function() {
      return this.Class.reduce((accumulator, current) => {
        return accumulator + current.Total;
      },0);
    }
  },
  data: () => {
    return {
      colors: [
        "#7CB342",
        "#512DA8",
        "#1E88E5",
        "#F4511E",
        "#546E7A",
        "#00796B",
        "#1DE9B6"
      ],
      Class: [
        {
          Id: 1,
          Name: "移动应用开发19-1",
          Grade: "2019",
          Total: 50,
          Submit: 23
        },
        {
          Id: 2,
          Name: "移动应用开发18-1",
          Grade: "2018",
          Total: 43,
          Submit: 32
        },
        {
          Id: 3,
          Name: "移动通信18-1",
          Grade: "2018",
          Total: 38,
          Submit: 32
        },
        {
          Id: 4,
          Name: "物联网18-1",
          Grade: "2018",
          Total: 33,
          Submit: 1
        }
      ]
    };
  }
};
</script>