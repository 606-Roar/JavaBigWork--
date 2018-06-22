<template>
    <div class="base">
        <input type="file" @change="importFile(this)" id="myimFile" style="display: none" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
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
                                <el-input class="search" size="small" placeholder="请输入学号" prefix-icon="el-icon-search" v-model="searchKey">
                                </el-input>
                            </el-col>
                            <el-col :span="10" style=" float: right;">
                                <el-button v-if="pageState==='edit'" class="add-button" type="primary" size="small" @click="ShowDiaglog()">添加学生</el-button>
                            </el-col>
                        </div>
                    </el-row>
                    <el-table :data=" tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" size="small" @selection-change="handleSelectionChange" @row-click="HandleRowClick">
                        <el-table-column v-if="pageState==='edit'" type="selection" align="center">
                        </el-table-column>
                        <el-table-column label="学号" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.studentId }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="姓名" align="center" prop="studentName">
                        </el-table-column>
                        <!-- <el-table-column label="性别" align="center" prop="sex">
                        </el-table-column>
                        <el-table-column label="班级" align="center" prop="class">
                        </el-table-column> -->

                    </el-table>
                    <el-pagination small layout="prev, pager, next" :current-page.sync="currentPage" :total="total" :page-size="pagesize">
                    </el-pagination>
                    <el-button size="small" type="primary" v-if="pageState==='edit'" class="delete-button" @click="DeleteStudent()">删除</el-button>
                    <el-button v-if="pageState==='edit'" class="cancel-button" @click="Cancel()">取消</el-button>
                    <el-button type="primary" class="save-button" @click="ShiftModel()"> {{editButton}}</el-button>

                </el-main>
            </el-container>
        </el-container>
        <!--管理成员  -->
        <el-dialog class="dialog" title="添加学生" :visible.sync="addStudentDialog.dialogVisible" width="50%">
            <el-tabs type="border-card">
                <el-tab-pane label="单个学生">
                    <el-form label-position="right" label-width="80px" :model="singleStudent">
                        <el-form-item label="学生Id">
                            <el-input v-model="singleStudent.studentId" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item label="学生姓名">
                            <el-input v-model="singleStudent.studentName" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" @click="addSingleStudent()">添加</el-button>
                </el-tab-pane>
                <el-tab-pane label="导入">
                    <el-button class="button" @click="uploadFile()">导入</el-button>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
        <el-dialog class="dialog" title="编辑学生" :visible.sync="editStudentDialog.dialogVisible" width="50%">
            <el-form label-position="right" label-width="80px" :model="editStudentDialog.singleStudent">
                <el-form-item label="学生Id">
                    <el-input v-model="editStudentDialog.singleStudent.studentId" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="学生姓名">
                    <el-input v-model="editStudentDialog.singleStudent.studentName" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="editStudentDialog.dialogVisible=false">完成</el-button>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
var XLSX = require("xlsx");
export default {
    data() {
        return {
            loading: "",
            //主界面
            total: 0, //默认数据总数
            pagesize: 15, //每页的数据条数
            currentPage: 1, //默认开始页面
            pageState: "show",
            editButton: "编辑",
            searchKey: "",
            tableData: [],
            multipleSelection: [],
            //dialog
            imFile: "", // 导入文件el
            singleStudent: {
                studentId: "",
                studentName: "",
                sex: "",
                class: ""
            },
            addStudentDialog: {
                dialogVisible: false
            },
            editStudentDialog: {
                singleStudent: {
                    studentId: "",
                    studentName: "",
                    sex: "",
                    class: ""
                },
                dialogVisible: false
            }
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
    mounted() {
        this.imFile = document.getElementById("myimFile");
    },
    computed: {
        ...mapState({
            student: state => state.student
        })
    },
    watch: {
        tableData: function(newQuestion, oldQuestion) {
            this.total = this.tableData.length;
        }
    },
    created() {
        this.Init();
    },
    methods: {
        ...mapActions([
            "AddStudentListAction",
            "UpStudentAction",
            "GetStudentListAction"
        ]),
        HandleRowClick(row, event, column) {
            if (this.pageState === "edit") {

                console.log(row);
                console.log(column);
                
                this.editStudentDialog.singleStudent=row;
                this.editStudentDialog.dialogVisible = true;
            }
        },
        Init() {
            this.GetStudentList();
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
                    this.GetStudentList();
                })
                .catch(() => {
                    this.GetStudentList();
                });
        },
        async GetStudentList() {
            try {
                let keys = {
                    courseId: parseInt(this.$route.params.courseId)
                };
                this.tableData = await this.GetStudentListAction(keys);
            } catch (error) {
                console.log("网络出错");
                this.$notify.error("网络出错");
            } finally {
                this.tableData = this.student.studentList;
            }
        },
        ShowDiaglog() {
            this.addStudentDialog.dialogVisible = true;
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
                    var object = {
                        List: this.tableData,
                        courseId: this.$route.params.courseId
                    };
                    await this.UpStudentAction(object);
                    this.pageState = "show";
                    this.editButton = "编辑";
                } catch (error) {
                    this.$notify.error("保存失败");
                } finally {
                }
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        addSingleStudent() {
            let object = {
                studentId: this.singleStudent.studentId,
                studentName: this.singleStudent.studentName,
                sex: this.singleStudent.sex,
                class: this.singleStudent.class
            };
            this.tableData.push(object);
            this.singleStudent = {
                studentId: "",
                studentName: "",
                sex: "",
                class: ""
            };
            this.$notify.success("添加成功");
        },
        DeleteStudent() {
            if (this.multipleSelection.length === 0) {
                this.$notify.error("请先选择学生");
            } else {
                this.tableData = this.tableData.filter(
                    item => !this.multipleSelection.includes(item)
                );
                // this.delteList.concat(multipleSelection);
            }
        },
        async AddStudent() {
            try {
                await this.AddStudentListAction();
            } catch (error) {}
        },
        uploadFile: function() {
            // 点击导入按钮
            // this.loading = this.$loading({
            //     lock: true,
            //     text: "Loading",
            //     spinner: "el-icon-loading",
            //     background: "rgba(0, 0, 0, 0.7)"
            // });
            this.imFile.click();
        },
        downloadFile: function(rs) {
            // 点击导出按钮
            let data = [{}];
            for (let k in rs[0]) {
                data[0][k] = k;
            }
            data = data.concat(rs);
            this.downloadExl(data, "菜单");
        },
        importFile: function() {
            // 导入excel
            // this.fullscreenLoading = true;
            let obj = this.imFile;
            if (!obj.files) {
                this.fullscreenLoading = false;
                return;
            }
            var f = obj.files[0];
            var reader = new FileReader();
            let $t = this;
            reader.onload = function(e) {
                var data = e.target.result;
                if ($t.rABS) {
                    $t.wb = XLSX.read(btoa(this.fixdata(data)), {
                        // 手动转化
                        type: "base64"
                    });
                } else {
                    $t.wb = XLSX.read(data, {
                        type: "binary"
                    });
                }
                let json = XLSX.utils.sheet_to_json(
                    $t.wb.Sheets[$t.wb.SheetNames[0]]
                );
                console.log(typeof json);
                $t.dealFile($t.analyzeData(json)); // analyzeData: 解析导入数据
            };
            if (this.rABS) {
                reader.readAsArrayBuffer(f);
            } else {
                reader.readAsBinaryString(f);
            }
        },
        analyzeData: function(data) {
            // 此处可以解析导入数据
            console.log(data);
            data.forEach(element => {
                element["studentName"] = element["姓名"];
                delete element["姓名"];
                element["studentId"] = element["学号"];
                delete element["学号"];
                element["sex"] = element["性别"];
                delete element["性别"];
                element["class"] = element["班级"];
                delete element["班级"];
            });
            return data;
        },
        dealFile: function(data) {
            // 处理导入的数据
            // console.log(data);
            this.imFile.value = "";
            this.fullscreenLoading = false;
            if (data.length <= 0) {
                this.$notify.error("请导入正确信息");
                // this.errorDialog = true;
                // this.errorMsg = "请导入正确信息";
            } else {
                this.tableData = this.tableData.concat(data);

                // this.excelData = data;
            }
            this.addStudentDialog.dialogVisible = false;
            // this.loading.close();
        },
        s2ab: function(s) {
            // 字符串转字符流
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i !== s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xff;
            }
            return buf;
        },
        getCharCol: function(n) {
            // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
            let s = "";
            let m = 0;
            while (n > 0) {
                m = n % 26 + 1;
                s = String.fromCharCode(m + 64) + s;
                n = (n - m) / 26;
            }
            return s;
        },
        fixdata: function(data) {
            // 文件流转BinaryString
            var o = "";
            var l = 0;
            var w = 10240;
            for (; l < data.byteLength / w; ++l) {
                o += String.fromCharCode.apply(
                    null,
                    new Uint8Array(data.slice(l * w, l * w + w))
                );
            }
            o += String.fromCharCode.apply(
                null,
                new Uint8Array(data.slice(l * w))
            );
            return o;
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