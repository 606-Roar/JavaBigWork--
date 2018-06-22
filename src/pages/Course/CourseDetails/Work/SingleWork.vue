<template>
    <div class="base">
        <el-container>
            <el-header height="55px">
                <el-row>
                    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ name:'Work' }">作业详情</el-breadcrumb-item>
                        <el-breadcrumb-item style="font-size:18px;  margin-top: 5px;">{{workDetail.workName}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-row>
            </el-header>
            <p>1</p>
            <!-- <el-main> -->
            <el-tabs type="border-card" style="">
                <el-tab-pane label="作业内容">
                    <el-form ref="form" :model="workDetail" label-width="80px">
                        <el-form-item label="作业名称" size="medium">
                            <el-input v-model="workDetail.workName"></el-input>
                        </el-form-item>
                        <el-form-item label="开放时间">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="workDetail.startTime" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择时间" v-model="workDetail.closeTime" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-col>
                        </el-form-item>
                        
                        <el-form-item label="补充说明">
                            <el-input type="textarea" v-model="workDetail.explain"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button class="save-button" type="primary" @click="SaveWorkDetail()">保存</el-button>

                </el-tab-pane>
                <el-tab-pane label="提交情况">
                    <el-table :data=" tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" size="small" @selection-change="handleSelectionChange">

                        <el-table-column label="学号" align="left">
                            <template slot-scope="scope">
                                <span style="margin-left: 0px">{{ scope.row.studentId }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="姓名" align="left" prop="studentName">
                        </el-table-column>
                        <el-table-column label="成绩" align="left" prop="grade">
                            <template slot-scope="scope">
                                <el-input type="number" :disabled="isEdit" size="mini" style="width:100px" v-model="scope.row.grade" placeholder="请输入成绩"></el-input>

                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination small layout="prev, pager, next" :total="total" @current-change="current_change">
                    </el-pagination>
                    <el-button v-if="!isShow" class="save-button" @click="Cancel()">取消</el-button>
                    <el-button class="save-button" type="primary" @click="SubmissionEdit()">{{word}}</el-button>

                </el-tab-pane>

            </el-tabs>
            <!-- </el-main> -->
        </el-container>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {
            total: 2, //默认数据总数
            pagesize: 11, //每页的数据条数
            currentPage: 1, //默认开始页面
            isEdit: true,
            isShow: true,
            word: "编辑",
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            },
            fileList: [],
            value6: "123",
            tabPosition: "left",
            radio2: 0,
            tableData: [],
            workDetail: {
                workId: "",
                workName: "",
                startTime: "",
                closeTime: "",
                type: "",
                workState: "",
                explain: ""
            }
        };
    },
    created() {
        this.InitData();
    },
    computed: {
        ...mapState({ work: state => state.work })
    },
    watch: {
        tableData: function(newQuestion, oldQuestion) {
            this.total = this.tableData.length;
        }
    },
    methods: {
        ...mapActions([
            "GetWorkByIdAction", //获取作业详情
            "UpDateWorkDetailAction", //更新作业详情
            "UpDateWorkSubmissionAction", //更新作业提交情况
            "GetWorkSubmissionAction" //获取作业提交详情
        ]),
        async GetWorkSubmission() {
            try {
                await this.GetWorkSubmissionAction({
                    workId: parseInt(this.$route.params.workId)
                });
            } catch (error) {
                console.log(error);
            } finally {
                console.log("GetWorkSubmission");
                this.tableData = this.work.workSubmissionList;
            }
        },
        async GetWorkById() {
            try {
                await this.GetWorkByIdAction({
                    workId: this.$route.params.workId
                });
            } catch (error) {
            } finally {
                console.log("GetWorkById");
                // console.log(this.workDetail,this.work.workDetail)
                this.workDetail = this.work.workDetail;
            }
        },
        InitData() {
            this.GetWorkSubmission();
            this.GetWorkById();
        },
        //save detail
        async SaveWorkDetail() {
            let loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            try {
                await this.UpDateWorkDetailAction({
                    workDetail: this.workDetail
                });
            } catch (error) {
                this.$notify.error("保存失败😫");
            } finally {
                loading.close();
            }
        },

        // 作业
        Cancel() {
            this.$confirm("继续将放弃修改,是否继续", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$notify.info("已取消编辑");
                    this.isShow = true;
                    this.isEdit = true;
                    this.word = "编辑";

                    this.GetWorkSubmission();
                })
                .catch(() => {
                    this.GetWorkSubmission();
                });
        },
        SubmissionEdit() {
            if (this.word === "编辑") {
                //点击了编辑
                this.word = "保存";
                this.isShow = false;
                this.isEdit = false;
            } else {
                //点击了保存
                this.SaveWorkSubmission();
            }
            this.GetWorkSubmission();
        },
        async SaveWorkSubmission() {
            try {
                await this.UpDateWorkSubmissionAction({
                    tableData: this.tableData
                });
                this.word = "编辑";
                this.isShow = true;
                this.isEdit = true;
            } catch (error) {
                this.$notify.error("保存失败😫");
            }
        },
        current_change() {},
        handleSelectionChange() {},
        handleExceed() {},
        handlePreview() {},
        handleRemove() {},
        beforeRemove() {}
    }
};
</script>
<style scoped>
.el-tabs {
    /* margin-top: 5px; */
    min-height: 550px;
}
.el-form {
    margin-top: 50px;
    margin-right: 20%;
    margin-left: 10%;
}
.save-button {
    width: 100px;
    margin: 3vh;
    /* top: 80%; */
    /* left: 90%; */
    /* margin-bottom: 15px;
  margin-right: 15px; */
}
.title2 {
    -webkit-flex: 1 1 auto;
    flex: 1 1 auto;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
    border-bottom: 1px solid #dedede;
    margin-left: 15px;
    margin-top: 15px;
    margin-right: 15px;
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
    margin-bottom: 10px;
}

.second-title {
    font-size: 24px;
    margin-bottom: 3px;
}

.el-container {
    /* height: 100%; */
    min-height: 600px;
    /* padding-top: 0px; */
}

.el-main {
    /* padding: 0px; */
    background-color: white;
    /* position: absolute; */
}

.el-header {
    padding: 0px;
}
</style>
