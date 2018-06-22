<template>
  <div id="app" class="page">
    <top-header></top-header>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import TopHeader from "../components/Headr/Topheadr.vue";
import SideBar from "../components/Nav/SideBar.vue";
import { mapState } from "vuex";
export default {
    data() {
        return {};
    },
    components: {
        TopHeader
    },
    computed: {},
    mounted() {},
    created(){
        
    }
};
</script>
<style>
a {
    color: #303030;
}
.main {
}
</style>
