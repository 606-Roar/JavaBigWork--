<template>
    <div class="base">
        <el-container>
            <el-aside width="180px">
                <asidenav :title="title" :data="data"></asidenav>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Asidenav from "../../components/Nav/nav.vue";
import { mapActions } from "vuex";
import Swiper from "swiper";
export default {
    data() {
        return {
            media: document.body.clientWidth, //如果屏幕大于700像素　就认为是pc端　，不然就是移动段了
            title: "用户管理",
            data: [
                // 里面设置了按照 命名路由，所以url只需要是router name就ok
                [
                    { type: 1, menuname: "筛选器" },
                    { type: 1, menuname: "默认", url: "教师管理" },
                    { type: 3, menuname: "用户", url: "TeacherList" },
                ],
            ]
        };
    },
    created: function() {
        
        // this.IntoProjectDetailsAction(this.$route.params.projectId);
    },
    methods: {
        // ...mapActions([""])
    },
    components: {
        Asidenav
    },
    mounted: function() {
        // console.log('width'+width);
    }
};
</script>
<style scoped>
.base {
    /*height: 95%;*/
}

.el-header {
    height: 500px !important;
}

.el-container {
    width: 100%;
    /*height: 100%;*/
}

.el-main {
    width: 100%;
    /*height: 100%;*/
}
</style>

