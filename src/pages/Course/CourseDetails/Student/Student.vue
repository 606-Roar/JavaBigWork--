<template>
    <div class="base">
        <el-container>
            <el-header height="55px">
                <el-row>
                    <div class="position">学生</div>
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
                            <el-col class="buttons" :span="14" style=" float: right;">
                                <el-button v-if="pageState==='edit'" class="add-button" type="primary" size="small" @click="addStaffDialog.dialogVisible = true">添加学生</el-button>
                                <!-- <el-button class="button" size="small" @click="managerDialog.dialogVisible = true">添加学生</el-button> -->
                            </el-col>
                        </div>
                    </el-row>
                    <el-table :data=" tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" size="small" style="width: 100% ;" height="480px" @selection-change="handleSelectionChange">
                        <el-table-column v-if="pageState==='edit'" type="selection" width="55" align="center">
                        </el-table-column>
                        
                        <el-table-column label="学号" align="left">
                            <template slot-scope="scope">
                                <span style="margin-left: 0px">{{ scope.row.studentId }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="姓名" align="left" prop="studentName">
                        </el-table-column>
                        <el-table-column label="性别" align="left" prop="studentName">
                        </el-table-column>
                        <el-table-column label="班级" align="left" prop="studentName">
                        </el-table-column>
                        <!-- <el-table-column v-if="pageState==='edit'" label="操作" align="center">
              <template slot-scope="scope">
                <div @click="RemoveStaff(scope.row)">
                  <i class="el-icon-close"></i>
                </div>
              </template>
            </el-table-column> -->
                    </el-table>
                    <el-pagination small layout="prev, pager, next" :total="total" @current-change="current_change">
                    </el-pagination>
                    <el-button size="small" type="primary" v-if="pageState==='edit'" class="delete-button" @click="DeleteStudent()">删除</el-button>
                    <el-button type="primary" class="save-button" @click="ShiftModel()"> {{editButton}}</el-button>
                </el-main>
            </el-container>
        </el-container>
        <!--管理成员  -->
        <el-dialog class="dialog" title="管理成员" :visible.sync="addStaffDialog.dialogVisible" width="30%">
            <p>项目角色</p>
            <el-select v-model="addStaffDialog.value" placeholder="请选择">
                <el-option v-for="item in MyTabs" :key="item.position" :label="item.position" :value="item.position">
                </el-option>
            </el-select>
            <p>项目成员</p>
            <el-input v-model="addStaffDialog.input" placeholder="请输入内容"></el-input>
            <span slot="footer" class="addStaffDialog-footer">
                <el-button @click="addStaffDialog.dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="AddStaff()">确 定</el-button>
            </span>
        </el-dialog>
        <!--管理角色  -->
        <el-dialog class="dialog" title="管理角色" :visible.sync="managerDialog.dialogVisible" width="40%">
            <el-dialog width="30%" title="删除角色" :visible.sync="innerDialog.innerVisible" append-to-body top="25vh">
                <p>当前角色[{{innerDialog.position}}]会被删除，此操作不可撤销，是否确定删除？</p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="innerDialog.innerVisible = false">取 消</el-button>
                    <el-button type="primary" @click="RemoveTab">确 定</el-button>
                </span>
            </el-dialog>
            <div>
                <el-input v-model="managerDialog.newpostion" placeholder="输入新的角色名" style="width:150px;margin-right:10px;" size="small"></el-input>
                <el-button type="text" @click="AddPostion">添加</el-button>
            </div>
            <el-table :data="MyTabs">
                <el-table-column property="position" label="角色"></el-table-column>
                <el-table-column property="number" label="人数"></el-table-column>
                <el-table-column label="操作" align="left">
                    <template slot-scope="scope">
                        <div @click="ConfirmDelete(scope.row.position)">
                            <i v-if="scope.row.position!='项目成员'" class="el-icon-close"></i>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="managerDialog.dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="managerDialog.dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            total: 15, //默认数据总数
            pagesize: 11, //每页的数据条数
            currentPage: 1, //默认开始页面
            pageState: "show",
            editButton: "编辑",
            managerDialog: {
                input: "",
                dialogVisible: false,
                newpostion: ""
            },
            innerDialog: {
                innerVisible: false,
                position: ""
            },
            addStaffDialog: {
                value: "",
                input: "",
                dialogVisible: false
            },
            TabsValue: "项目成员",
            placeholder: "搜索项目成员",
            searchKey: "",
            tabPosition: "left",
            tableData: [
                { studentId: "1", studentName: "2" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" }
            ],
            tabs: [
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" },
                { studentId: "1", studentName: "1" }
            ],
            multipleSelection: []
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
    created() {},
    methods: {
        /*
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
        },*/
        UpNumber() {
            this.MyTabs[0].number = this.tabs.length;
            for (var i = 1; i < this.MyTabs.length; i++) {
                this.MyTabs[i].number = this.tabs.filter(object => {
                    return object.position === this.MyTabs[i].position;
                }).length;
            }
        },
        ShiftModel() {
            console.log(this.pageState === "show");
            if (this.pageState === "show") {
                this.pageState = "edit";
                this.editButton = "完成编辑";
            } else {
                this.pageState = "show";
                this.editButton = "编辑";
            }
        },
        handleSelectionChange(val) {
            console.log(this.multipleSelection.length === 0);
            this.multipleSelection = val;
        },
        DeleteStudent() {
            if (this.multipleSelection.length === 0) {
                this.$message.error("请先选择学生");
            } else {
            }
        },
        current_change(currentPage) {
            this.currentPage = currentPage;
        }
    }
};
</script>
<style scoped>
.delete-button {
    width: 80px;
    float: left;
    /* margin-top: 0.8%; */
    margin-left: 2%;
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
    margin-top: 10px;
}

.add-button {
    float: right;
    margin-right: 1%;
    /* margin-right: 20px; */
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