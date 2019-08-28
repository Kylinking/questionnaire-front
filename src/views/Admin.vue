<template>
  <v-container>
      <v-card min-width="900" max-width="1024" class="mx-auto">
          
        <v-select
          placeholder="学院"
          class="mx-4"
          :items="facultyNames"
          label="统计范围"
          v-model="selection"
        ></v-select>
       <v-card-title> 问卷回收统计 </v-card-title>
       <v-data-table
    :headers="countHeaders"
    :items="counts"
    :items-per-page="5"
  ></v-data-table>
  <v-card-title> 问卷调查统计 </v-card-title>
      
      <v-data-table
    :headers="answerHeaders"
    :items="answers"
    :items-per-page="5"
  ></v-data-table>
  </v-card>
  </v-container>
</template>

<script>
export default {
  components: {
    statistics: () => import("../components/Statistics.vue"),
    about: () => import("../components/HelloWorld.vue")
  },
  data() {
    return {
     answerHeaders: [
        { text: "调查指标", value: "Index" },
        { text: '调查部门',value: "Department"},
        { text: "非常满意", value: "ExtremelySatisfied" },
        { text: "满意", value: "Satisfied" },
        { text: "基本满意", value: "Unsatisfied" },
        { text: "不满意", value: "ExtremelyUnsatisfied" }
      ],
      countHeaders: [
        { text: "部门", value: "Department" },
        { text: "总人数", value: "Total" },
        { text: "已提交人数", value: "Submit" },
        { text: "完成率", value: "rate" },
      ],
      facultyNames:[],
      faculties:[],
      counts:[],
      answers:[],
      selection:'学院'
    };
  },
  watch:{
    selection:function(){
      let self = this;
      let facultyId = this.faculties.findIndex((v)=>v.Name == self.selection)+1;
      let url = `/api/v1/statistics/${facultyId}`;
      if (facultyId  == 0) {
        this.loadTotal();
        return;
      }
      this.answers.splice(0);
      this.counts.splice(0);
      (async function() {
      try{
      let res = await self.$axios.get(url);
      if (res){
         let count = res.data.Data.TotalCount;
         let classCount = res.data.Data.ClassCount;
         for (let fc of classCount){
           self.counts.push({
             ...fc,Department:fc.Name,rate:(fc.Submit/fc.Total*100).toFixed(2)+'%'
           });
         }
         self.counts = self.counts.sort((a,b)=>{return -a.Submit+b.Submit});
         self.counts.unshift({...count,rate:(count.Submit/count.Total*100).toFixed(2)+'%',Department:'合计'});
        let ansStat = res.data.Data.TotalAnswers;
        for (let ans of ansStat){
          self.answers.push({
            ...ans,
            Index:ans.Question.Index,
            Department:ans.Question.Department
          })
        }

      }        
      }catch(error){
        self.$store.commit("ShowErrorBanner", { message: error });
      }
    })();
    }
  },
  mounted(){
    
    this.loadTotal();

  },
  methods:{
  loadTotal:async function(){
      let self = this;
      try{
      let res = await self.$axios.get("/api/v1/statistics");
      if (res){
         let count = res.data.Data.TotalCount;
         let facultyCount = res.data.Data.FacultyCount;
         for (let fc of facultyCount){
           self.counts.push({
             ...fc,Department:fc.Faculty.Name,rate:(fc.Submit/fc.Total*100).toFixed(2)+'%'
           });
           self.facultyNames.push(fc.Faculty.Name);
           self.faculties.push(fc.Faculty);
         }
         self.facultyNames.unshift('学院');
         self.counts = self.counts.sort((a,b)=>{return -a.Submit+b.Submit});
         self.counts.unshift({...count,rate:(count.Submit/count.Total*100).toFixed(2)+'%',Department:'合计'});
        let ansStat = res.data.Data.TotalAnswers;
        for (let ans of ansStat){
          self.answers.push({
            ...ans,
            Index:ans.Question.Index,
            Department:ans.Question.Department
          })
        }

      }        
      }catch(error){
        self.$store.commit("ShowErrorBanner", { message: error });
      }
    }
  }
};
</script>