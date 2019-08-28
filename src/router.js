import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Question from './views/Question.vue'
import Admin from './views/Admin.vue'
import CollegeStatistics from "./components/CollegeStatistics";
import FacultyStatistics from "./components/FacultyStatistics";
import FacultyDetails from "./components/FacultyDetails";
import AnswerStatistics from "./components/AnswerStatistics";

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/question',
      name: 'question',
      component: Question
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})