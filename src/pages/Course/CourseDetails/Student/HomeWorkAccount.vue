<template>
    <div class="base">
        <el-container>
            <el-header height="55px">
                <el-row>
                    <div class="position">作业情况</div>
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
                    <el-table :data="tableData" style="width: 100%"  size="small">
                        <el-table-column sortable label="姓名" align="center" prop="studentName" width="150px">
                        </el-table-column>
                        <el-table-column v-for="item in workList" :key="item.name" :label="item.name" :prop="item.name" min-width="100px">
                        </el-table-column>
                    </el-table>
                    <el-pagination small layout="prev, pager, next" :total="total"  :page-size="pagesize" :current-page.sync="currentPage">
                    </el-pagination>
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
            total: 0, //默认数据总数
            pagesize: 15, //每页的数据条数
            currentPage: 1, //默认开始页面
            workList: [
                {
                    name: "work1"
                },
                {
                    name: "work2"
                },
                {
                    name: "work3"
                },
                {
                    name: "work4"
                },
                {
                    name: "work5"
                },
                {
                    name: "work6"
                }
            ],
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
            tableData: [{ studentId: "1", studentName: "1" }], //显示数据
            tabs: [{ studentId: "", studentName: "" }] //原始数据
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
    methods: {
        ...mapActions(["GetStudentsWorkSubmissionAction"]),
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
            this.$notify.success("添加成功");
            this.addStaffDialog.dialogVisible = false;
        },
        async GetStudentsWorkSubmission() {
            try {
                let object = {
                    courseId: this.$router.params.courseId
                };
                this.tabs = await this.GetStudentsWorkSubmissionAction(object);
            } catch (error) {
                this.$notify.error("服务器繁忙");
            }
        },
        Init() {
            this.GetStudentsWorkSubmission();
        },
        current_change() {}
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
