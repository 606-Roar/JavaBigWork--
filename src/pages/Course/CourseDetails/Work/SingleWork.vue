<template>
    <div class="base">
        <el-container>
            <el-header height="55px">
                <el-row>
                    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ name:'Work' }">作业详情</el-breadcrumb-item>
                        <el-breadcrumb-item style="font-size:18px;  margin-top: 5px;">{{reportName}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-row>
            </el-header>
            <el-main>

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
                    <!-- <el-form-item label="活动性质">

                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                            <el-checkbox label="地推活动" name="type"></el-checkbox>
                            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item> -->
                    <el-form-item label="特殊资源">
                        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="补充说明">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <!-- <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item> -->
                </el-form>

                <el-button class="save-button" type="primary">保存</el-button>
            </el-main>

        </el-container>
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
            value6: "123",
            tabPosition: "left",
            radio2: 0,
            reportName: "创建新作业",
            tableData: [
                {
                    name: "zhuyunwu",
                    email: "zhuyunwu@163.com",
                    state: "到",
                    recordTime: "12:00",
                    nowstate: "在线"
                },
                {
                    name: "wanghoulun",
                    email: "wanghoulun@163.com",
                    state: "缺席",
                    recordTime: "12:00",
                    nowstate: "离线"
                },
                {
                    name: "fanping",
                    email: "fanping@163.com",
                    state: "到",
                    recordTime: "14:01",
                    nowstate: "在线"
                },
                {
                    name: "spongebob ",
                    email: "fanping@163.com",
                    state: "到",
                    recordTime: "17:02",
                    nowstate: "离线"
                }
            ]
        };
    },
    created() {
        this.InitData();
    },
    methods: {
        filterHandler(value, row, column) {
            const property = column["property"];
            return row[property] === value;
        },
        InitData() {
            this.reportName = this.$route.params.name;
            // let now=new Date();
            // this.reportName=myDate.getFullYear()+myDate.getMonth()+myDate.getDate();
        }
    }
};
</script>
<style scoped>
.el-form {
    margin-top: 50px;
    margin-right: 20%;
    margin-left: 10%;
}
.save-button {
    width: 100px;
    position: absolute;
    right: 2%;
    bottom: 15%;
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
