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
                                <el-button v-if="pageState==='edit'" class="add-button" type="primary" size="small" @click="addStudentDialog.dialogVisible = true">添加学生</el-button>
                    
                            </el-col>
                        </div>
                    </el-row>
                    <el-table :data=" tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" size="small" style="width: 100% ;" height="490px" @selection-change="handleSelectionChange">
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
                    </el-table>
                    <el-pagination small layout="prev, pager, next" :total="total" @current-change="current_change">
                    </el-pagination>
                    <el-button size="small" type="primary" v-if="pageState==='edit'" class="delete-button" @click="DeleteStudent()">删除</el-button>
                    <el-button type="primary" class="save-button" @click="ShiftModel()"> {{editButton}}</el-button>
                </el-main>
            </el-container>
        </el-container>
        <!--管理成员  -->
        <el-dialog class="dialog" title="管理成员" :visible.sync="addStudentDialog.dialogVisible" width="30%">
            <p>学生Id</p>
            <el-input v-model="addStudentDialog.input" placeholder="请输入内容"></el-input>
            <p>学生姓名</p>
            <el-input v-model="addStudentDialog.input" placeholder="请输入内容"></el-input>
            <span slot="footer" class="addStudentDialog-footer">
                <el-button @click="addStudentDialog.dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="AddStaff()">确 定</el-button>
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
            pagesize: 10, //每页的数据条数
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
            addStudentDialog: {
                value: "",
                input: "",
                dialogVisible: false
            },
            TabsValue: "项目成员",
            placeholder: "搜索项目成员",
            searchKey: "",
            tabPosition: "left",
            tableData: [
               
            ],
            tabs: [
               
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
    computed: {
        ...mapState({
          
        })
    },
    methods: {
        ...mapActions(["AddStudentListAction"]),
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
        },
        async AddStudent(){
            try {
                await this.AddStudentListAction();
            } catch (error) {
                
            }
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