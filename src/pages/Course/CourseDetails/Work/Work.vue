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
                        <el-tab-pane v-for="item in MyTabs" :key="item.name" :label="item.position" :name="item.name">
                            <el-table :data="tableData">
                                <el-table-column label="作业名" align="left" min-width="100px">
                                    <template slot-scope="scope">
                                        <i v-if="scope.row.type==='文档'" class="el-icon-document"></i>
                                        <span @click="HandleFolder( scope.row.workId)" style="margin-left: 0px;cursor:pointer">{{ scope.row.workName }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="详情" align="left" prop="explain">
                                </el-table-column>
                                <el-table-column label="开始时间" align="left" prop="startTime" width="150px">
                                </el-table-column>
                                <el-table-column label="关闭时间" align="left" prop="closeTime" width="150px">
                                </el-table-column>

                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </el-main>
            </el-container>
        </el-container>
        <!--新建作业  -->
        <el-dialog class="dialog" title="新建作业" :visible.sync="addDataDialog.dialogVisible" width="30%">
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
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button @click="addDataDialog.dialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import MYURL from "../../../../const/MYURL";
export default {
    data() {
        return {
            workDetail: {
                workName: "",
                startTime: "",
                closeTime: "",
                explain: "",
                resource: "asd"
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
            tableData: [{}],
            addDataDialog: {
                value: "普通资料",
                input: "",
                dialogVisible: false
            },
            fileList: [
                {
                    name: "food.jpeg",
                    url:
                        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                },
                {
                    name: "food2.jpeg",
                    url:
                        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                }
            ],
            addstate: true
        };
    },

    created() {
        this.Init();
    },
    computed: {
        ...mapGetters(["GetWorkListByState"]),
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
        ...mapActions(["AddNewWorkAction", "GetWorkListAction"]),
        Init() {
            this.GetWorkList();
        },
        HandleSave() {
            this.loading = true;
            var self = this;
            setTimeout(function() {
                self.$notify.success("保存成功");
                self.loading = false;
            }, 1000);
        },
        HandleFolder(workId) {
            this.$router.push({
                name: "SingleWork",
                params: { workId: workId }
            });
        },
        handleChange(file, fileList) {
            this.fileList = fileList;
        },
        HandleClick() {
            this.placeholder = "搜索" + this.TabsValue;
            if (this.TabsValue === "进行中作业") {
                this.tableData = this.GetWorkListByState("1");
            } else if (this.TabsValue === "以往作业") {
                this.tableData = this.GetWorkListByState("2");
            } else if (this.TabsValue === "未开始作业") {
                this.tableData = this.GetWorkListByState("3");
            }
        },
        AddStaff() {
            this.addDataDialog.dialogVisible = false;
        },
        handleExceed(files, fileList) {
            this.$notify.warning(
                `当前限制选择 1 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        handlePreview() {},
        handleRemove() {},
        onSubmit() {
            this.AddNewWork();
           
        },
        async AddNewWork() {
            let loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            try {
                await this.AddNewWorkAction({
                    workDetail: this.workDetail,
                    courseId: parseInt(this.$route.params.courseId)
                });
                this.addDataDialog.dialogVisible = false
                 this.GetWorkList();
            } catch (error) {
                console.log(error);
                this.$notify.error("添加失败");
            } finally {
                loading.close();

            }
        },
        async GetWorkList() {
            try {
                await this.GetWorkListAction({
                    courseId: parseInt(this.$route.params.courseId)
                });
            } catch (error) {
                console.log(error);
                this.$notify.error("获取列表失败");
            } finally {
                this.HandleClick();
            }
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
