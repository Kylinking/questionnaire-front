<template>
  <v-app>
    <v-app-bar app class="py-1">
      <v-toolbar-title class="headline text-uppercase">
        <v-container>
          <v-row no-gutters>
            <v-col cols="12" xs="12" sm="6" :align="$vuetify.breakpoint.xsOnly?'center':'left'">
              <span>乐山职业技术学院</span>
            </v-col>
            <v-col cols="12" xs="12" sm="6" :align="$vuetify.breakpoint.xsOnly?'center':'left'">
              <span class="font-weight-light d-block">{{" 学生满意度调查问卷"}}</span>
            </v-col>
          </v-row>
        </v-container>
      </v-toolbar-title>
    </v-app-bar>
    <v-content class="my-6">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data: () => ({
    //
  })
};
</script>
