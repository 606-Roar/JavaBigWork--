<template>
    <div class="base">
        <el-container>
            <el-header height="55px">
                <el-row>
                    <div class="position">老师</div>
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
                            <el-col :span="10" style=" float: right;">
                                <el-button v-if="pageState==='edit'" class="add-button" type="primary" size="small" @click="ShowDiaglog()">添加教师</el-button>
                            </el-col>
                            <!-- <el-col class="buttons" :span="14" style=" float: right;">
                <el-button class="button" type="primary" size="small" @click="addStaffDialog.dialogVisible = true">管理成员</el-button>
                <el-button class="button" size="small" @click="managerDialog.dialogVisible = true">管理角色</el-button>
              </el-col> -->
                        </div>
                    </el-row>
                    <el-table :data=" tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" size="small" @selection-change="handleSelectionChange">
                        <el-table-column v-if="pageState==='edit'" type="selection" align="center">
                        </el-table-column>
                        <el-table-column label="工号" align="center">
                            <template slot-scope="scope">
                                <span style="margin-left: 0px">{{ scope.row.teacherId }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="姓名" align="center" prop="teacherName">
                        </el-table-column>
                        <el-table-column label="权限等级" align="center" prop="type">
                        </el-table-column>
                    </el-table>
                    <el-pagination small layout="prev, pager, next" :current-page.sync="currentPage" :total="total" :page-size="pagesize">
                    </el-pagination>
                    <el-button size="small" type="primary" v-if="pageState==='edit'" class="delete-button" @click="DeleteTeacher()">删除</el-button>
                    <el-button v-if="pageState==='edit'" class="cancel-button" @click="Cancel()">取消</el-button>
                    <el-button type="primary" class="save-button" @click="ShiftModel()"> {{editButton}}</el-button>
                </el-main>
            </el-container>
        </el-container>
        <!--管理成员  -->
        <el-dialog class="dialog" title="添加" :visible.sync="addTeacherDialog.dialogVisible" width="50%">
            <el-tabs type="border-card">
                <el-tab-pane label="单个教师">
                    <el-form label-position="right" label-width="80px" :model="singleTeacher">
                        <el-form-item label="教师Id">
                            <el-input v-model="singleTeacher.teacherId" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item label="教师姓名">
                            <el-input v-model="singleTeacher.teacherName" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" @click="addSingleTeacher()">添加</el-button>
                </el-tab-pane>
                <el-tab-pane label="导入">
                    <el-button class="button" @click="uploadFile()">导入</el-button>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            pageState: "show",
            editButton: "编辑",
            total: 0, //默认数据总数
            pagesize: 15, //每页的数据条数
            currentPage: 1, //默认开始页面

            addTeacherDialog: {
                dialogVisible: false
            },
            singleTeacher: {
                teacherId: "",
                teacherName: "",
                sex: "",
                class: ""
            },
            multipleSelection: [],
            TabsValue: "项目成员",
            placeholder: "搜索项目成员",
            searchKey: "",
            tabPosition: "left",
            tableData: [{ teacherId: "1", teacherName: "1" }],
            tabs: [{ teacherId: "", teacherName: "" }]
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
    computed: {
        ...mapState({
            teacher: state => state.teacher
        })
    },
    created() {
        this.Init();
    },
    methods: {
        ...mapActions(["GetTeacherListAction"]),
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        Init() {
            this.GetTeacherList();
        },
        async GetTeacherList() {
            try {
                await this.GetTeacherListAction();
                this.tableData = this.teacher.teacherList;
            } catch (error) {}
        },
        ShowDiaglog() {
            this.addTeacherDialog.dialogVisible = true;
        },
        addSingleTeacher(){
            this.tableData.push(this.singleTeacher);
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
                    this.GetTeacherList();
                })
                .catch(() => {
                    this.GetTeacherList();
                });
        },
        DeleteTeacher() {
            if (this.multipleSelection.length === 0) {
                this.$notify.error("请先选择");
            } else {
                this.tableData = this.tableData.filter(
                    item => !this.multipleSelection.includes(item)
                );
                // this.delteList.concat(multipleSelection);
            }
        },
        async ShiftModel() {
            // console.log(this.pageState === "show");

            if (this.pageState === "show") {
                //show=>edit
                this.pageState = "edit";
                this.editButton = "完成编辑";
            } else {
                //edit=>show

                try {
                    this.pageState = "show";
                    this.editButton = "编辑";
                } catch (error) {
                    this.$notify.error("保存失败");
                } finally {
                }
            }
        },
        HandleClick(tab, event) {
            // console.log(tab, event);
            // console.log(this.TabsValue);
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
        },
        RemoveTab() {
            let temp;
            let i;
            for (i = 0; i < this.MyTabs.length; i++) {
                if (this.MyTabs[i].position === this.innerDialog.position) {
                    temp = this.MyTabs[i];
                    break;
                }
            }
            if (temp.number === 0) {
                //success
                this.MyTabs.splice(i, 1);
                this.$message({
                    message: "删除成功",
                    type: "success"
                });
                this.innerDialog.innerVisible = false;
            } else {
                //fail
                this.$message.error("抱歉，请先清空人数");
                this.innerDialog.innerVisible = false;
            }
        },
        AddPostion() {
            let isExist = false;
            for (let i = 0; i < this.MyTabs.length; i++) {
                if (this.MyTabs[i].position === this.managerDialog.newpostion) {
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                this.MyTabs.push({
                    position: this.managerDialog.newpostion,
                    name: this.managerDialog.newpostion,
                    number: 0
                });
                this.$message.success("添加成功");
            } else {
                this.$message.error("添加失败：角色名已存在");
            }
        },
        ConfirmDelete(position) {
            this.innerDialog.position = position;
            this.innerDialog.innerVisible = true;
        },
        AddStaff() {
            if (this.addStaffDialog.value === "项目成员") {
                this.tabs.push({
                    name: this.addStaffDialog.input,
                    email: this.addStaffDialog.input + "@163.com",
                    position: "无"
                });
                this.MyTabs[0].number++;
            } else if (this.addStaffDialog.value === "负责人") {
                this.tabs.push({
                    name: this.addStaffDialog.input,
                    email: this.addStaffDialog.input + "@163.com",
                    position: "负责人"
                });
                this.MyTabs[0].number++;
                this.MyTabs[1].number++;
            }
            this.HandleClick({}, {});
            this.$message.success("添加成功");
            this.addStaffDialog.dialogVisible = false;
        },
        RemoveStaff(row) {
            // console.log(row)
            let i;
            for (i = 0; i < this.tabs.length; i++) {
                if (this.tabs[i].position === row.position) {
                    break;
                }
            }
            this.$confirm("此操作将删除该成员, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.tabs.splice(i, 1);
                    this.$message({
                        type: "success",
                        message: "删除成功!请处理后续事情"
                    });
                    this.HandleClick({}, {});
                    this.UpNumber();
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                    this.HandleClick({}, {});
                    this.UpNumber();
                });
        },
        UpNumber() {
            this.MyTabs[0].number = this.tabs.length;
            for (var i = 1; i < this.MyTabs.length; i++) {
                this.MyTabs[i].number = this.tabs.filter(object => {
                    return object.position === this.MyTabs[i].position;
                }).length;
            }
        }
    }
};
</script>
<style scoped>
@media only screen and (max-width: 700px) {
    .tools {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
    }
    .buttons {
        display: flex;
    }
}
.add-button {
    float: right;
    margin-right: 1%;
    /* margin-right: 20px; */
}
.delete-button {
    width: 80px;
    float: left;
    /* margin-top: 0.8%; */
    margin-left: 2%;
}
.cancel-button {
    width: 100px;
    float: right;
    /* margin-top: 0.5%; */
    margin-bottom: 1%;
    margin-right: 1%;
}
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
