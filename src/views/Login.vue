<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center" class="grey lighten-5" style="height:420px">
          <v-card class="ma-3" elevation="8" width="480" height="300">
            <v-text-field
              v-model="id"
              :rules="nameRules"
              :counter="12"
              label="学号"
              required
              class="mx-12 mt-12"
            ></v-text-field>
            <v-text-field class="mx-12" v-model="name" :rules="nameRules" label="姓名" required></v-text-field>
            <v-btn width="200" absolute bottom right rounded color="#00B0FF">登录</v-btn>
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