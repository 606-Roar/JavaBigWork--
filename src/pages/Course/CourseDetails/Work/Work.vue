<template>
  <div class="base" v-loading="loading">
    <el-container>
      <el-header height="55px">
        <el-row>
          <div class="title">作业</div>
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
                <el-button class="button" type="primary" size="small" @click="addDataDialog.dialogVisible = true">新建作业</el-button>
              </el-col>
            </div>
          </el-row>
          <el-tabs v-model="TabsValue" :tab-position="tabPosition" style="height: 90% " @tab-click="HandleClick">
            <el-tab-pane v-for="(item, index) in MyTabs" :key="item.name" :label="item.position" :name="item.name">
              <el-table :data="tableData">
                <el-table-column label="作业名" align="left" width="200px">
                  <template slot-scope="scope">
                    <i v-if="scope.row.type==='文档'" class="el-icon-document"></i>
                    <span @click="HandleFolder( scope.row.needpower)" style="margin-left: 0px;cursor:pointer">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                  <el-table-column label="详情" align="left" prop="updateTime">
                </el-table-column>
                <el-table-column label="开始时间" align="left" prop="updateTime" width="150px">
                </el-table-column>
                <el-table-column label="关闭时间" align="left" prop="updateTime" width="150px">
                </el-table-column>
              
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
    <!--新建作业  -->
    <el-dialog class="dialog" title="新建作业" :visible.sync="addDataDialog.dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="作业名称" size="medium">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="开放时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="补充说明">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
    data() {
        return {
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
            loading: false,
            myheaders: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            TabsValue: "进行中作业",
            placeholder: "搜索当前作业",
            searchKey: "",
            tabPosition: "left",
            MyTabs: [
                {
                    position: "进行中作业",
                    name: "进行中作业"
                },
                {
                    position: "以往作业",
                    name: "以往作业"
                },
                {
                    position: "未开始作业",
                    name: "未开始作业"
                }
            ],
            tableData: [],
            allTableData: [
                [
                    {
                        name: "说明",
                        userName: "spongebob",
                        updateTime: "2018-04-13",
                        type: "文档",
                        needpower: 1
                    }
                ],
                [
                    {
                        name: "重要资料",
                        userName: "spongebob",
                        updateTime: "2018-04-12",
                        type: "文档",
                        needpower: 2
                    }
                ],
                [
                    {
                        name: "机密文件",
                        userName: "spongebob",
                        updateTime: "2018-04-11",
                        type: "文档",
                        needpower: 3
                    }
                ]
            ],
            normalData: [
                [
                    {
                        name: "person#001.jpg",
                        userName: "tom",
                        updateTime: "2018-03-29",
                        type: "文档"
                    },
                    {
                        name: "person#002.jpg",
                        userName: "tom",
                        updateTime: "2018-03-29",
                        type: "文档"
                    }
                ]
            ],
            addDataDialog: {
                value: "普通资料",
                input: "",
                dialogVisible: false
            },
            fileList: [],
            addstate: true
        };
    },
    mounted() {},
    watch: {},
    created() {
        this.tableData = this.allTableData[0];
    },
    created() {
        this.tableData = this.allTableData[0];
    },
    computed: {
        AddConfirm: function() {
            if (
                this.addDataDialog.input.length > 0 &&
                this.fileList.length === 1
            ) {
                // console.log(false)
                this.addstate = false;
            } else {
                // console.log(true)
                this.addstate = true;
            }
        }
    },
    methods: {
        FilterPower(mypower, needpower) {
            if (mypower >= needpower) {
                return "true";
            } else if (mypower < needpower) {
                this.$alert("抱歉你的权限不够", "提示", {
                    confirmButtonText: "确定",
                    callback: action => {}
                });
                return "false";
            }
        },
        HandleSave() {
            this.loading = true;
            var self = this;

            setTimeout(function() {
                self.$message.success("保存成功");
                self.loading = false;
            }, 1000);
        },
        HandleFolder(needpower) {
            this.$router.push({ name: "SingleWork" });
            // let mypower = 1
            // let res = this.FilterPower(mypower, needpower)
            // console.log("1" + res + "1")
            // if (res === 'true') {
            //   this.tableData = this.normalData[0]
            // }
        },
        handleChange(file, fileList) {
            this.fileList = fileList;
        },
        HandleClick() {
            this.placeholder = "搜索" + this.TabsValue;
            if (this.TabsValue === "普通资料") {
                this.tableData = this.allTableData[0];
            } else if (this.TabsValue === "重要资料") {
                this.tableData = this.allTableData[1];
            } else if (this.TabsValue === "机密资料") {
                this.tableData = this.allTableData[2];
            }
        },
        AddStaff() {
            // console.log(fileList);
            if (this.addDataDialog.value === "普通资料") {
                this.allTableData[0].push({
                    name: this.addDataDialog.input,
                    userName: "spongebob",
                    updateTime: "2018-03-29",
                    type: "文件"
                });
            } else if (this.addDataDialog.value === "重要资料") {
                this.allTableData[1].push({
                    name: this.addDataDialog.input,
                    userName: "spongebob",
                    updateTime: "2018-03-29",
                    type: "文件"
                });
            } else if (this.addDataDialog.value === "机密资料") {
                this.allTableData[2].push({
                    name: this.addDataDialog.input,
                    userName: "spongebob",
                    updateTime: "2018-03-29",
                    type: "文件"
                });
            }
            this.$message.success("添加成功");
            this.addDataDialog.dialogVisible = false;
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 1 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        }
    }
};
</script>
<style scoped>
.upload-demo {
    padding-top: 10px;
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

.tools {
    margin-left: 10px;
    margin-top: 5px;
}

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
