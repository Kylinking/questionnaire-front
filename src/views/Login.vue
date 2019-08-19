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
              :rules="nameRules"
              :counter="12"
              label="学号"
              required
              class="mx-12 mt-12"
            ></v-text-field>

            <v-text-field prepend-icon="mdi-account" class="mx-12" v-model="name" :rules="nameRules" label="姓名" required></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer> 
            <v-btn  dark color="pink" width="120px">登录</v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
</style>