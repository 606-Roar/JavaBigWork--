<template>
    <div class="base">
        <el-container>
            <el-header height="55px">
                <el-row>
                    <div class="title">学生点名</div>
                </el-row>
            </el-header>
            <el-container>
                <el-main>
                    <el-row>
                        <div class="tools">
                            <el-col :span="6">
                                <el-input class="search" size="medium" :placeholder="placeholder" prefix-icon="el-icon-search" v-model="searchKey">
                                </el-input>
                            </el-col>
                            <el-col :span="14" style=" float: right;">
                                <el-button class="button" type="primary" size="small" @click="CreateNewSingeleAttendance">今天要点名</el-button>
                                <el-button class="button" type="primary" size="small" @click="AttendanceAccountDialog.dialogVisible=true">缺课统计</el-button>
                                <!-- <el-button class="button" size="small" @click="managerCategoryDialog.dialogVisible=true">报表类别</el-button> -->
                            </el-col>
                        </div>
                    </el-row>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column label="考勤名单" align='left'>
                            <template slot-scope="scope">
                                <router-link :to="{ name: 'SingleAttendance',
                                params: {
                                    name: scope.row.name,
                                    attendanceId:scope.row.attendanceId}}">
                                    <i class="el-icon-document"></i>
                                    <span style="margin-left: 10px;">{{ scope.row.name }}</span>
                                </router-link>
                            </template>
                        </el-table-column>
                        <el-table-column label="最后更新时间" align="left" prop="updateTime">
                        </el-table-column>
                        <el-table-column label="应到人数" align="left" prop="updateTime">
                        </el-table-column>
                        <el-table-column label="实到人数" align="left" prop="updateTime">
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </el-container>
        <el-dialog title="缺课统计" :visible.sync="AttendanceAccountDialog.dialogVisible" width="" :before-close="handleClose">
            <el-table :data="absentTable" stripe style="width: 100%">
                <el-table-column prop="studentId" label="学号" align="left">
                </el-table-column>
                <el-table-column prop="StudentName" label="姓名" align="left">
                </el-table-column>
                <el-table-column prop="count" label="缺课次数" align="left">
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="AttendanceAccountDialog.dialogVisible = false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import LineChart from "../../../../components/Chart/LineChart.js";
// import Chart from 'chart.js';
export default {
    data() {
        return {
            placeholder: "搜索考勤报表",
            searchKey: "",
            AttendanceAccountDialog: {
                dialogVisible: false
            },
            tableData: [
                {
                    name: "2018-04-13 考勤记录",
                    updateTime: "2018-04-13 21:00",
                    urlName: "SingleAttendance"
                },
                {
                    name: "2018-04-12 考勤记录",
                    updateTime: "2018-04-12 21:00",
                    urlName: "SingleAttendance"
                }
            ],
            tables: [
                {
                    attendanceId: "",
                    name: "2018-04-13 考勤记录",
                    updateTime: "2018-04-13 21:00",
                    urlName: "SingleAttendance"
                },
                {
                    attendanceId: "",
                    name: "2018-04-12 考勤记录",
                    updateTime: "2018-04-12 21:00",
                    urlName: "SingleAttendance"
                }
            ],
            absentTable: [
                {
                    studentId: "31501397",
                    StudentName: "你",
                    count: 1
                }
            ]
        };
    },
    components: {},
    mounted() {},
    watch: {
        searchKey: function(curval, oldval) {
            if (curval === "") {
                this.tableData = this.tables;
                return;
            }
            this.tableData = this.tables.filter(object => {
                return object.name.indexOf(curval) >= 0;
            });
        }
    },
    methods: {
        CreateNewSingeleAttendance() {
            this.$router.push({ name: "SingleAttendance" });
        },
        CourseListListAction({ state, commit, rootState }, keys) {
            return new Promise((resolve, reject) => {
                Vue.http
                    .get(MYURL.URL_GETCOURSELIST, { teacherId: keys.teacherId })
                    .then(response => {
                        if (response.status === 200) {
                            console.log(
                                "AttendanceListAction:" + "获取课程列表成功"
                            );
                            commit("SaveCourseList", response.body.courseList);
                            resolve("200 OK");
                        } else {
                            console.log(
                                "AttendanceListAction:" + "获取课程列表失败"
                            );
                            reject("reject");
                        }
                    });
            });
        },
        ShowAbsentList() {
            this.FromServers.GetAbsentList(keys)
                .then(function(result) {
                    console.log("成功：" + result);
                })
                .catch(function(reason) {
                    console.log("失败：" + reason);
                });
        },
        GetAbsentList(keys) {
            return new Promise((resolve, reject) => {
                this.$http
                    .get(MYURL.GETABSENTLIST, { CourseId: keys.CourseId })
                    .then(response => {
                        if (response.status === 200) {
                            resolve(this.response.absentList);
                        } else {
                            reject(new Error(this.statusText));
                        }
                    });
            });
        }
    }
};
</script>
<style scoped>
.small {
    width: 100%;
    /*eight: 520px;*/
}

.context_tabs {
    text-align: right;
    margin-right: 10px;
    margin-top: 5px;
    /*background: */
}

.dialog {
    text-align: left;
}

.dialog p {
    font-size: 16px;
    margin-left: 5px;
    margin-bottom: 5px;
}

.dialog .el-select {
    width: 100%;
    margin-bottom: 5px;
}

.search {
    width: 200px;
    float: left;
    margin-bottom: 5px;
}

.el-icon-search {
    font-weight: bold;
}

.tools {
    margin-left: 10px;
    margin-top: 5px;
}

.button {
    float: right;
    margin-right: 20px;
}

.el-icon-document {
    color: blue;
}

.op1 {
    /* text-align: start; */
    margin-left: 15px;
    margin-top: 5px;
    margin-bottom: 5px;
}

.op {
    display: flex;
    justify-content: flex-start;
}

.base {
    box-shadow: 0 4px 6px 0 rgba(31, 31, 31, 0.05),
        0 0 2px 0 rgba(31, 31, 31, 0.2);
    /* margin: 10px; */
}

.el-row {
    background-color: white;
    border-bottom: 1px solid #dedede;
}

.title {
    /* min-height: 40px; */
    height: 44px;
    font-size: 25px;
    text-align: start;
    margin-top: 10px;
    margin-left: 15px;
}

.el-aside {
    background-color: white;
    margin-left: 5px;
}

.el-container {
    /*height: 100%;*/
    min-height: 600px;
    padding-top: 0px;
}

.el-main {
    padding: 0px;
    background-color: white;
}

.el-header {
    padding: 0px;
}
</style>
