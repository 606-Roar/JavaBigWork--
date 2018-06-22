<template>
    <div class="base">
        <el-container>
            <el-aside width="180px">
                <asidenav :title="title" :data="data"></asidenav>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import Asidenav from "../../components/Nav/nav.vue";
import { mapActions } from "vuex";
import Swiper from "swiper";
export default {
    data() {
        return {
            media: document.body.clientWidth, //如果屏幕大于700像素　就认为是pc端　，不然就是移动段了
            title: "XXX课程",
            data: [
                // 里面设置了按照 命名路由，所以url只需要是router name就ok
                [
                    // { type: , menuname: '任务' },
                    // { type: 2, menuname: '任务总览', url: '任务总览' },
                    { type: 1, menuname: "筛选器" },
                    { type: 1, menuname: "默认", url: "课程相关" },
                    { type: 3, menuname: "首页", url: "CourseDetailsIndex" },
                    { type: 3, menuname: "考勤", url: "Attendance" },
                    { type: 3, menuname: "作业", url: "Work" }
                ],
                [
                    { type: 1, menuname: "筛选器" },
                    { type: 1, menuname: "默认", url: "统计数据" },
                    { type: 3, menuname: "学生", url: "Student" },
                    // { type: 3, menuname: "作业情况", url: "HomeWorkAccount" },
                    { type: 3, menuname: "成绩", url: "GradeAccount" }
                ],
                [
                    { type: 1, menuname: "筛选器" },
                    { type: 1, menuname: "默认", url: "课程设置" },
                    { type: 3, menuname: "设置", url: "Setting" }
                ]
            ]
        };
    },
    created: function() {
    
        this.title = this.$route.params.courseName;
        if(this.title===undefined){
            this.Init();
        }
    },
    methods: {
        ...mapActions(["GetCourseAction"])
    },
    components: {
        Asidenav
    },
    mounted: function() {
        // console.log('width'+width);
    },
    methods: {
        async Init() {
            try {
                let course = await this.GetCourseAction(
                    this.$route.params.courseId
                );
                this.title = course.courseName;
            } catch (error) {
                this.$notify.error("获取课程信息网络请求失败😭");
            } finally {
            }
        }
    }
};
</script>
<style scoped>
.base {
    /*height: 95%;*/
}

.el-header {
    height: 500px !important;
}

.el-container {
    width: 100%;
    height: 100%;
}

.el-main {
    width: 100%;
    /* height: 100%; */
}
</style>
