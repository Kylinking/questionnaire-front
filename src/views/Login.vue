<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center" class="grey lighten-5" style="height:480px">
          <v-card class="ma-3" elevation="8" width="480" height="300">
            <v-toolbar dark color="purple">
              <v-toolbar-title>登录系统</v-toolbar-title>
            </v-toolbar>
            <v-text-field
              prepend-icon="mdi-numeric"
              v-model="id"
              :rules="[rules.id]"
              :counter="12"
              label="学号"
              required
              class="mx-12 mt-12"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-account"
              class="mx-12"
              v-model="name"
              :rules="[rules.name]"
              label="姓名"
              required
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark color="pink" width="120px" @click="Login">登录</v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      name: "",
      rules: {
        id: value => /^\d{12}$/.test(value) || "学号是12位数字",
        name: value =>
          /^[\u4e00-\u9fa5]{2,20}$/.test(this.name.trim()) || "姓名输入不正确"
      }
    };
  },
  methods: {
    Login() {
      let self = this;
      if (!this.CheckLoginData()) {
        return;
      }
      this.$axios
        .post("/login", {
          Id: this.id,
          Name: this.name
        })
        .then(function(response) {
          console.log(response);
          const res = response.data.Data;
          if (response.data.Data) {
            const res = response.data.Data;
            self.$store.commit("SetLoginInfo", {
              token: res.Token,
              name: self.name,
              id: self.id
            });
            self.$router.push({ path: "question" });
          } else {
            self.$store.commit("ShowErrorBanner", {
              message: response.data.Error.Message,
            });
          }
        });
    },
    CheckLoginData() {
      if (!/^\d{12}$/.test(this.id.trim())) {
        this.$store.commit("ShowErrorBanner", {
          message: "学号应是12位数字，请仔细核对！"
        });
        return false;
      } else if (!/^[\u4e00-\u9fa5]{2,20}$/.test(this.name.trim())) {
        this.$store.commit("ShowErrorBanner", {
          message: "请检查姓名是否输入正确！"
        });
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>
</style>