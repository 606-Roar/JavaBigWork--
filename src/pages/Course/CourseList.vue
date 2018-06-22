<template>
    <div class="page">
        <div>
            <el-container>
                <el-main>
                    <div>
                        <div class="container-header">
                            <div class="title">我的课程</div>
                            <div class="right-content">
                                <router-link :to="{name: 'CourseCreate'}">
                                    <i class="el-icon-plus"></i>
                                </router-link>
                                <span class="item-title">新建课程</span>
                            </div>
                        </div>
                        <div class="projectlist">
                            <div class="projectitem" v-for="item in course.courseList" :key="item.courseId">
                                <router-link :to="{name: 'CourseDetails', params: {courseId: item.courseId,courseName:item.courseName}}">
                                    <projectItem :courseName="item.courseName" :img="item.img" :courseId="item.courseId" :state="item.projectState">
                                    </projectItem>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <!-- <div>
                        <div class="container-header">
                            <div class="title">已完结的课程</div>
                        </div>
                        <div class="projectlist">
                            <div class="projectitem" v-for="item in course.finishCourseList" :key="item.courseId">
                                <router-link :to="{name: 'CourseDetails', params: {courseId: item.courseId,courseName:item.courseName}}">
                                    <projectItem :courseName="item.courseName" :img="item.projectLogo" :courseId="item.courseId" :state="item.projectState"></projectItem>
                                </router-link>
                            </div>
                        </div>
                    </div> -->
                </el-main>
            </el-container>
        </div>
    </div>
</template>
<script>
import ProjectItem from "../../components/Project/projectItem.vue";
import { mapState, mapGetters, mapActions } from "vuex";
import MYURL from "../../const/MYURL.js";
import Swiper from "swiper";
export default {
    data() {
        return {};
    },
    components: {
        ProjectItem
        // Asidenav
    },
    created: function() {
     
        this.GetCourseList();
    },
    mounted: function() {},

    computed: {
        ...mapState({
            course: state => state.course,
            userInfo: "userInfo"
        })
    },
    methods: {
        ...mapActions(["GetCourseListAction"]),
        async GetCourseList() {
            try {
                let keys={
                    teacherId:this.$route.params.teacherId
                };
                await this.GetCourseListAction(keys);
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>
<style scoped>
.right-content {
    z-index: 10;
}

.page {
    min-height: 500px;
    height: 100%;
    margin-left: 30px;
    /*width: 100%;*/
}

.el-icon-plus {
    padding: 0;
    border: 0;
    font-size: 15px;
    font-weight: bold;
}

.item-title {
    line-height: 15px;
    padding-left: 1px;
    font-size: 15px;
}

.container-header {
    width: 100%;
    padding-top: 2vh;
    padding-left: 2vh;
    padding-bottom: 5px;
    border-bottom: 1px solid #dedede;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
}

.title {
    -webkit-flex: 1 1 auto;
    flex: 1 1 auto;
    font-size: 18px;
    font-weight: 500;
    text-align: left;
}

.right-content {
    -webkit-align-self: center;
    align-self: center;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    padding-right: 3vh;
}

span {
    margin-left: 2vh;
    display: block;
    width: 95%;
    text-align: start;
    font-size: 25px;
}

.projectlist {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
}

.el-card {
    /*
  width: 35vh;
  height: 26vh;*/
    /*overflow: hidden;*/
    /*margin: 2vh;*/
    /* 设置子DIV居中 */
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
}
</style>
