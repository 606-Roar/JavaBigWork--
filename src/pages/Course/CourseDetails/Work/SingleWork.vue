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
            <el-tabs type="border-card" style="">
                <el-tab-pane label="作业内容">
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
                        <el-form-item label="文件资源">
                            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="补充说明">
                            <el-input type="textarea" v-model="form.desc"></el-input>
                        </el-form-item>
                    </el-form>

                    <el-button class="save-button" type="primary">编辑</el-button>
                </el-tab-pane>
                <el-tab-pane label="提交情况">
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
                        <el-table-column label="成绩" align="left" prop="studentName">
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
                </el-tab-pane>

            </el-tabs>

        </el-container>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {
            total: 15, //默认数据总数
            pagesize: 11, //每页的数据条数
            currentPage: 1, //默认开始页面
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
            value6: "123",
            tabPosition: "left",
            radio2: 0,
            tableData: [],
            workDetail: {
                workName: ".."
            }
        };
    },
    created() {
        this.InitData();
    },
    methods: {
        ...mapActions(["GetWorkByIdAction"]),
        filterHandler(value, row, column) {
            const property = column["property"];
            return row[property] === value;
        },
        async InitData() {
            try {
                this.workDetail = await GetWorkByIdAction(this.$route.params.workId);
            } catch (error) {
                this.$message.error("请求失败了😫")
            }
        },
        
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
