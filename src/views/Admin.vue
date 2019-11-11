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
      <v-card-title>问卷回收统计</v-card-title>
      <v-data-table :headers="countHeaders" :items="counts" :items-per-page="5"></v-data-table>
      <v-card-title>问卷调查统计</v-card-title>
      <v-select placeholder="2018" class="mx-4" :items="grades" label="年级" v-model="gradeSelect"></v-select>
      <v-data-table :headers="answerHeaders" :items="answers" :items-per-page="5"></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      answerHeaders: [
        { text: "调查指标", value: "Index" },
        { text: "调查部门", value: "Department" },
        { text: "非常满意", value: "ExtremelySatisfied" },
        { text: "满意", value: "Satisfied" },
        { text: "基本满意", value: "Unsatisfied" },
        { text: "不满意", value: "ExtremelyUnsatisfied" }
      ],
      countHeaders: [
        { text: "部门", value: "Department" },
        { text: "总人数", value: "Total" },
        { text: "已提交人数", value: "Submit" },
        { text: "完成率", value: "rate" }
      ],
      facultyNames: [],
      faculties: [],
      counts: [],
      answers: [],
      selection: "学院",
      grades: ["2018", "2019"],
      gradeSelect: "2018"
    };
  },
  watch: {
    selection: function() {
      this.selectChange();
    },
    gradeSelect: function() {
      this.selectChange();
    }
  },
  mounted() {
    this.loadTotal();
  },
  methods: {
    selectChange: async function() {
      this.answers.splice(0);
      this.counts.splice(0);
      let self = this;
      let faculty = this.faculties.find(v => v.Name == self.selection);
      if (!faculty) {
        this.loadTotal();
        return;
      }
      let url = `/api/v1/statistics/${faculty.Id}?grade=${self.gradeSelect}`;
      (async function() {
        try {
          let res = await self.$axios.get(url);
          if (res) {
            let count = res.data.Data.TotalCount;
            let classCount = res.data.Data.ClassCount;
            for (let fc of classCount) {
              self.counts.push({
                ...fc,
                Department: fc.Name,
                rate: ((fc.Submit / fc.Total) * 100).toFixed(2) + "%"
              });
            }
            self.counts = self.counts.sort((a, b) => {
              return -a.Submit + b.Submit;
            });
            self.counts.unshift({
              ...count,
              rate: ((count.Submit / count.Total) * 100).toFixed(2) + "%",
              Department: "合计"
            });
            let ansStat = res.data.Data.TotalAnswers;
            for (let ans of ansStat) {
              let sum =
                parseInt(ans.ExtremelySatisfied) +
                parseInt(ans.Satisfied) +
                parseInt(ans.ExtremelyUnsatisfied) +
                parseInt(ans.Unsatisfied);
              console.log(sum);
              ans.ExtremelySatisfied +=
                "/" +
                ((parseInt(ans.ExtremelySatisfied) / sum) * 100).toFixed(2) +
                "%";
              ans.Satisfied +=
                "/" + ((parseInt(ans.Satisfied) / sum) * 100).toFixed(2) + "%";
              ans.ExtremelyUnsatisfied +=
                "/" +
                ((parseInt(ans.ExtremelyUnsatisfied) / sum) * 100).toFixed(2) +
                "%";
              ans.Unsatisfied +=
                "/" +
                ((parseInt(ans.Unsatisfied) / sum) * 100).toFixed(2) +
                "%";
              self.answers.push({
                ...ans,
                Index: ans.Question.Index,
                Department: ans.Question.Department
              });
            }
          }
        } catch (error) {
          self.$store.commit("ShowErrorBanner", { message: error });
        }
      })();
    },

    loadTotal: async function() {
      let self = this;
      try {
        let res = await self.$axios.get(
          `/api/v1/statistics?grade=${self.gradeSelect}`
        );
        if (res) {
          let count = res.data.Data.TotalCount;
          let facultyCount = res.data.Data.FacultyCount;
          for (let fc of facultyCount) {
            self.counts.push({
              ...fc,
              Department: fc.Faculty.Name,
              rate: ((fc.Submit / fc.Total) * 100).toFixed(2) + "%"
            });
            self.facultyNames.push(fc.Faculty.Name);
            self.faculties.push(fc.Faculty);
          }
          self.facultyNames.unshift("学院");
          self.counts = self.counts.sort((a, b) => {
            return -a.Submit + b.Submit;
          });
          self.counts.unshift({
            ...count,
            rate: ((count.Submit / count.Total) * 100).toFixed(2) + "%",
            Department: "合计"
          });
          let ansStat = res.data.Data.TotalAnswers;
          for (let ans of ansStat) {
            let sum =
              parseInt(ans.ExtremelySatisfied) +
              parseInt(ans.Satisfied) +
              parseInt(ans.ExtremelyUnsatisfied) +
              parseInt(ans.Unsatisfied);
            console.log(sum);
            ans.ExtremelySatisfied +=
              "/" +
              ((parseInt(ans.ExtremelySatisfied) / sum) * 100).toFixed(2) +
              "%";
            ans.Satisfied +=
              "/" + ((parseInt(ans.Satisfied) / sum) * 100).toFixed(2) + "%";
            ans.ExtremelyUnsatisfied +=
              "/" +
              ((parseInt(ans.ExtremelyUnsatisfied) / sum) * 100).toFixed(2) +
              "%";
            ans.Unsatisfied +=
              "/" + ((parseInt(ans.Unsatisfied) / sum) * 100).toFixed(2) + "%";

            self.answers.push({
              ...ans,
              Index: ans.Question.Index,
              Department: ans.Question.Department
            });
          }
        }
      } catch (error) {
        console.error(error);
        self.$store.commit("ShowErrorBanner", { message: error });
      }
    }
  }
};
</script>