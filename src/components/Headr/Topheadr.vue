<template>
    <!-- <div class="header_"> -->
    <div class="header">
        <Menu mode="horizontal" theme="dark" style="menu">
            <div class="myheader">
                <div class="header_myleft" @click="toIndex">
                    <!-- <router-link :to="{ name: 'Home'}"> -->
                        <span class="topbar-product-name">平时成绩管理系统</span>
                    <!-- </router-link> -->
                </div>
                <div class="header_right">
                    <!-- <Dropdown>
                        <a href="javascript:void(0)">
                            <img src="../../static/help.png" />
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem>联系我们</DropdownItem>
                        </DropdownMenu>
                    </Dropdown> -->
                    <!-- <Dropdown>
            <a href="javascript:void(0)">
              <img src="../../static/tool.png"  />
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>生当为人杰</DropdownItem>
             
            </DropdownMenu>
          </Dropdown> -->
                    <Dropdown @on-click="HandlePersonCommand">
                        <Avatar icon="person" />
                        <DropdownMenu slot="list">
                            <!-- <DropdownItem name='个人中心'>个人中心</DropdownItem> -->
                            <DropdownItem v-if="userInfo.userPower===1" name='教师管理'>教师管理</DropdownItem>
                            <DropdownItem name='登出'>登出</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </Menu>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
    data() {
        return {
            input: ""
        };
    },
    computed: {
        ...mapState(["userInfo"])
    },
    methods: {
        ...mapActions(["ResetStateAction"]),
        toIndex() {
            this.$router.push({ name: "Home"  ,params: { teacherId: this.$route.params.teacherId }});
        },
        HandlePersonCommand(command) {
            if (command === "登出") {
                this.loginOut();
            } else if (command === "个人中心") {
                this.$router.push({ name: "个人中心" });
            } else if (command === "教师管理") {
                this.$router.push({ name: "TeacherManager" });
            }
        },
        loginOut: function(event) {
            console.log("loginOut");
            this.ResetStateAction();
            localStorage.removeItem("userInfo");
            // this.$store.commit('ResetState')
            this.$router.push({ name: "登录" });
        }
    }
};
</script>
<style scoped>
@media only screen and (max-width: 700px) {
    .header_right {
        padding: 0px !important;
    }
}
.myheader {
    flex: 0 0 auto;
}

.header > ul div {
    padding-left: 20px;
    /*width: 100%;*/
}

.header_myleft {
    padding-left: 15px;
    float: left;
    line-height: 50px;
    /*display: -webkit-flex;*/
    /*display: flex;*/
    /*-webkit-align-items: center;*/
    /*align-items: center;*/
}

.header_right {
    float: right;
    height: 100%;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    /*display: flex;*/
    /*float: right;*/
    /*width: 40%;*/
    padding-right: 35px;
}

.topbar-product-name {
    font-size: 24px;
    color: #fff;
    margin-right: 20px;
    /*vertical-align: middle;*/
    font-family: markprolight;
    margin-top: 10px;
}

a > img {
    text-align: center;
    vertical-align: middle;
    width: 24px;
    height: 24px;
}

.header > ul {
    /*display:*/
}
</style>
