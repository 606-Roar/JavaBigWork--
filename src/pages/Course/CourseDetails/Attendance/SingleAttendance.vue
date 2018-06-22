<template>
    <div class="base">
        <el-container>
            <el-header height="55px">
                <el-row>
                    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ name:'Attendance' }">考勤</el-breadcrumb-item>
                        <el-breadcrumb-item style="font-size:18px;  margin-top: 5px;">{{reportName}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-row>
            </el-header>
            <el-container>
                <el-main>
                    <el-row>
                        <el-col :span="24">
                            <el-card shadow="never">
                                <div>
                                    <p class="second-title">
                                        {{tableData[tableIndex].studentId}} {{tableData[tableIndex].studentName}}
                                    </p>
                                    <el-radio-group v-model="tableData[tableIndex].attendanceDetail" :change="HandleChange(tableData[tableIndex].attendanceDetail)">
                                        <el-radio label='迟到'>迟到</el-radio>
                                        <el-radio label="到课">到课</el-radio>
                                        <el-radio label="旷课">旷课</el-radio>
                                        <el-radio label="请假">请假</el-radio>
                                    </el-radio-group>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" sortable size="mini">
                        <el-table-column label="学号" align="left">
                            <template slot-scope="scope">
                                <span style="margin-left: 0px">{{ scope.row.studentId }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="成员名" align="left">
                            <template slot-scope="scope">
                                <span style="margin-left: 0px">{{ scope.row.studentName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="考勤" align="left">
                            <template slot-scope="scope">
                                <el-select v-model=" scope.row.attendanceDetail" placeholder="请选择" size="small">
                                    <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                                <!-- <span style="margin-left: 0px">{{ scope.row.state }}</span> -->
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination small layout="prev, pager, next" :total="total" :page-size="pagesize" :current-page.sync="currentPage">
                    </el-pagination>
                    <el-button type="primary" class="save-button" @click="SaveAttendance">保存</el-button>
                </el-main>
            </el-container>
        </el-container>
        <el-dialog title="本次未到统计" :visible.sync="absentDialog.dialogVisible" width="">
            <el-table :data="singleAbsentTableData" stripe style="width: 100%">
                <el-table-column prop="state" label="状态" align="left">
                </el-table-column>
                <el-table-column prop="studentsName" label="姓名" align="left">
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="" @click="absentDialog.dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="HandleSave()">确定保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {
            total: 0, //默认数据总数
            pagesize: 15, //每页的数据条数
            currentPage: 1, //默认开始页面
            reportName: "123",
            tableIndex: 0,
            radioState: "",
            attendanceId: null,
            absentDialog: {
                dialogVisible: false
            },
            stateOptions: [
                {
                    value: "到课",
                    label: "到课"
                },
                {
                    value: "迟到",
                    label: "迟到"
                },
                {
                    value: "旷课",
                    label: "旷课"
                },
                {
                    value: "请假",
                    label: "请假"
                }
            ],
            tableData: [{}],
            singleAbsentTableData: [
                {
                    state: "迟到",
                    studentsName: "无"
                },
                {
                    state: "旷课",
                    studentsName: "无"
                },
                {
                    state: "请假",
                    studentsName: "无"
                }
            ]
        };
    },
    created() {
        this.Init();
    },
    watch: {
        tableData() {
            this.total = this.tableData.length;
        }
    },
    computed: {
        ...mapState({
            attendance: state => state.attendance,
            userInfo: "userInfo"
        })
    },
    methods: {
        ...mapActions([
            "GetAttendanceDetailListAction",
            "UpLoadAttendanceDetailsAction"
        ]),
        async Init() {
            try {
                this.reportName = this.$route.params.attendanceName;
                this.attendanceId = this.$route.params.attendanceId;
                await this.GetAttendanceDetailListAction({
                    attendanceId: this.attendanceId
                });
            } catch (error) {
                this.$notify.error("获取学生列表失败");
                console.log(error);
            } finally {
                this.tableData = this.attendance.attendanceDetailList;
            }
        },
        HandleChange(value) {
            // console.log(value);
            if (value != "undefined") {
                console.log(value != "undefined");
                this.NextStudent();
            }
        },
        RadioChange(label) {
            console.log(label);
        },
        BeforeStudent() {
            this.tableIndex === 0 ? 0 : (this.tableIndex = this.tableIndex - 1);
        },
        NextStudent() {
            if (this.tableIndex === this.tableData.length - 1) {
                this.tableIndex = this.tableData.length - 1;
            } else {
                this.tableIndex = this.tableIndex + 1;
            }
        },
        filterHandler(value, row, column) {
            const property = column["property"];
            return row[property] === value;
        },
        async HandleSave() {
            //上传
            try {
                await this.UpLoadAttendanceDetailsAction({
                    mylist: this.tableData
                });
                this.$notify.success("上传成功");
                this.absentDialog.dialogVisible = false;
            } catch (error) {
                this.$notify.error("上传失败");
            } finally {
            }
        },
        handleClose() {},
        SaveAttendance() {
            let lateList = this.tableData.filter(item => {
                return item.attendanceDetail === "迟到";
            });
            let leaveList = this.tableData.filter(item => {
                return item.attendanceDetail === "请假";
            });
            let truantList = this.tableData.filter(item => {
                return item.attendanceDetail === "旷课";
            });
            console.log(lateList);
            console.log(leaveList);
            console.log(truantList);
            //1
            let temp = [];

            for (let i = 0; i < lateList.length; i++) {
                temp.push(lateList[i].studentName);
            }
            this.singleAbsentTableData[0].studentsName = temp.join(",");
            //2
            temp = [];
            for (let i = 0; i < leaveList.length; i++) {
                temp.push(leaveList[i].studentName);
            }
            this.singleAbsentTableData[1].studentsName = temp.join(",");
            //3
            temp = [];
            for (let i = 0; i < truantList.length; i++) {
                temp.push(truantList[i].studentName);
            }
            this.singleAbsentTableData[2].studentsName = temp.join(",");

            this.absentDialog.dialogVisible = true;
        }
    }
};
</script>
<style scoped>
.save-button {
    width: 100px;
    float: right;
    /* margin-top: 0.5%; */
    margin-bottom: 1%;
    margin-right: 1%;
}
.row {
    text-align: left;
    margin-left: 15px;
}

.base {
    box-shadow: 0 4px 6px 0 rgba(31, 31, 31, 0.05),
        0 0 2px 0 rgba(31, 31, 31, 0.2);
    /* margin: 10px; */
    /*min-width:1200px;*/
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

.second-title {
    font-size: 24px;
    margin-bottom: 3px;
}

.el-container {
    height: 100%;
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
