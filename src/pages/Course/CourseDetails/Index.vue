<template>
	<div class="base">
		<el-container>
			<el-header height="55px">
				<el-row>
					<div class="position">首页</div>
				</el-row>
			</el-header>
			<el-container>
				<el-main>
					<p>老师你好</p>
					
					<h1>快速导航</h1>
					
					<div class="quick-nav">
						<el-button type="primary">今天点名</el-button>
						<el-button type="primary">成绩录入</el-button>
						<el-button type="primary">导入学生</el-button>
					</div>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {};
    },
    created() {},
    computed: {
        ...mapState({})
    },
    methods: {
        ...mapActions([""])
    }
};
</script>
<style scoped>
.quick-nav{
	
}
.el-button {
    width: 240px;
    height: 180px;
    font-size: 50px;
}
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