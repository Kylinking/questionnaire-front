<template>
  <v-navigation-drawer v-model="$store.state.showAsideBar" app>
    <v-list>
      <v-list-item @click="$store.commit('ChangeComponent',{component:'statistics'})">
        <v-list-item-icon>
          <v-icon large>mdi-chart-bell-curve-cumulative</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>统计数据</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item @click="$store.commit('ChangeComponent',{component:'about'})">
        <v-list-item-icon>
          <v-icon large>mdi-information-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>关于</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
    </v-list>
  </v-navigation-drawer>
</template>