<template>
    <div class="base">
        <el-container>
            <el-header height="55px">
                <el-row>
                    <div class="position">成绩</div>
                </el-row>
            </el-header>
            <el-container>
                <el-main>
                    <el-row>
                        <div class="tools">
                            <el-col :span="6">
                                <el-input class="search" size="small" :placeholder="placeholder" prefix-icon="el-icon-search" v-model="searchKey">
                                </el-input>
                            </el-col>

                        </div>
                    </el-row>
                    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" size="small">

                        <el-table-column label="学号" align="center">
                            <template slot-scope="scope">
                                <span style="margin-left: 0px">{{ scope.row.studentId }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column sortable label="姓名" align="center" prop="studentName">
                        </el-table-column>
                        <!-- <el-table-column label="平时成绩" align="center">
                            <template slot-scope="scope">
                                <el-input type="number" :disabled="isEdit" size="mini" style="width:100px" v-model="scope.row.usualgrade" placeholder="请输入成绩"></el-input>
                            </template>
                        </el-table-column> -->
                        <el-table-column label="期中成绩" align="center">
                            <template slot-scope="scope">
                                <el-input  :disabled="isEdit" size="mini" style="width:100px" v-model="scope.row.midtermresults" placeholder="请输入成绩"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="期末成绩" align="center">
                            <template slot-scope="scope">
                                <el-input  :disabled="isEdit" size="mini" style="width:100px" v-model="scope.row.finalgrade" placeholder="请输入成绩"></el-input>
                            </template>
                        </el-table-column>
                       
                    </el-table>
                    <el-pagination small layout="prev, pager, next" :total="total" :page-size="pagesize" :current-page.sync="currentPage">
                    </el-pagination>
                    <el-button v-if="pageState==='edit'" class="save-button" @click="Cancel()">取消</el-button>
                    <el-button type="primary" class="save-button" @click="ShiftModel()"> {{editButton}}</el-button>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {
            isEdit: true,
            total: 0, //默认数据总数
            pagesize: 15, //每页的数据条数
            currentPage: 1, //默认开始页面
            TabsValue: "项目成员",
            placeholder: "搜索项目成员",
            searchKey: "",
            tabPosition: "left",
            tableData: [],
            pageState: "show",
            editButton: "编辑"
        };
    },
    watch: {
        searchKey: function(curval, oldval) {
            if (curval === "") {
                this.HandleClick();
                return;
            }
            this.tableData = this.tableData.filter(object => {
                return object.name.indexOf(curval) >= 0;
            });
        }
    },
    created() {
        this.Init();
    },
    watch: {
        tableData: function(newQuestion, oldQuestion) {
            this.total = this.tableData.length;
        }
    },
    computed: {
        ...mapState({
            student: state => state.student
        })
    },
    methods: {
        ...mapActions([
            "UpGradeListAction",
            "GetGradeListAction",
            "UpStudentAction",
            "GetStudentListAction"
        ]),
        Init() {
            this.GetGradeList();
        },
        async GetGradeList() {
            try {
                var keys = {
                    courseId: this.$route.params.courseId
                };
                await this.GetStudentListAction(keys);
            } catch (error) {
                console.log("网络出错");
                this.$notify.error("网络出错");
            } finally {
                this.tableData = this.student.studentList;
            }
        },
        Cancel() {
            this.$confirm("继续将放弃修改,是否继续", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$notify.info("已取消编辑");
                    this.pageState = "show";
                    this.editButton = "编辑";
                    this.isEdit = true;
                    this.GetGradeList();
                })
                .catch(() => {
                    this.GetGradeList();
                });
        },
        ShiftModel() {
            // console.log(this.pageState === "show");
            if (this.pageState === "show") {
                //show=>edit
                this.isEdit = false;
                this.pageState = "edit";
                this.editButton = "完成编辑";
            } else {
                //edit=>show
                this.SaveEdit();
            }
        },
        async SaveEdit() {
            try {
                var object = {  
                    List: this.tableData,
                    courseId: this.$route.params.courseId
                };
                await this.UpStudentAction(object);

                this.pageState = "show";
                this.editButton = "编辑";
                this.isEdit = true;
            } catch (error) {
                console.log("保存失败");
                this.$notify.error("保存失败");
            } finally {
                this.GetGradeList();
            }
        },
        HandleClick(tab, event) {
            if (this.TabsValue === "项目成员") {
                //项目成
                this.tableData = [].concat(this.tabs);
                this.placeholder = "搜索" + this.TabsValue;
            } else {
                //负责人
                this.placeholder = "搜索" + this.TabsValue;
                this.tableData = [].concat(
                    this.tabs.filter(object => {
                        return object.position === this.TabsValue;
                    })
                );
            }
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

.el-icon-close {
    font-weight: bold;
    cursor: pointer;
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
    /*margin: 10px;*/
    /*height: 90%;*/
    /*min-width:1200px;*/
    /* margin: 10px; */
}

.el-row {
    background-color: white;
    border-bottom: 1px solid #dedede;
}

.position {
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
