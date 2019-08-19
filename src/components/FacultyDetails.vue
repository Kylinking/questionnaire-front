<template>
<v-container >
    <VotedStatistics />
    <AnswerStatistics />
</v-container>
    
</template>

<script>
import CollegeStatistics from "./CollegeStatistics";
import FacultyStatistics from "./FacultyStatistics";
import FacultyDetails from "./FacultyDetails";
import AnswerStatistics from "./AnswerStatistics";
import VotedStatistics from "./VotedStatistics";
export default {
components:{
    CollegeStatistics,FacultyStatistics,FacultyDetails,AnswerStatistics,VotedStatistics
}
};
</script>