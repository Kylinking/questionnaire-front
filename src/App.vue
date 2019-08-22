<template>
  <v-app>
    <v-snackbar v-model="$store.state.showAlertBanner" :color="$store.state.alertType" elevation="12" icon="mdi-alert-circle-outline" dark :timeout="2500">
        <v-icon dark> mdi-alert </v-icon>{{ $store.state.alertBannerMessage }}
  </v-snackbar>
    <aside-Bar></aside-Bar>
    <v-app-bar app class="py-1">
      <v-toolbar-items>
        <v-icon large @click="menuClick()" v-show="$store.state.showMenu">mdi-menu</v-icon>
      </v-toolbar-items>
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

  <v-content>
      
    <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AsideBar from "./components/AsideBar";
import Login from "./views/Login";
export default {
  name: "App",
  components: {
    AsideBar,
    Login
  },
  data: () => ({
    //
  }),
  methods: {
    menuClick() {
      this.$store.state.showAsideBar
        ? this.$store.commit("HideAsideBar")
        : this.$store.commit("DisplayAsideBar");
    }
  }
};
</script>
