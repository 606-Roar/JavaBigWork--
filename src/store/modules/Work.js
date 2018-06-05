import Vue from 'vue'
import MYURL from '../../const/MYURL.js'
const WorkModule = {
    state: {
        workList: [],
        currentWorkId: null,//记录最近访问的课程号
    },
    mutations: {
        SaveWorkList(state, workList) {
            state.workList = workList
        },
    },
    actions: {
        GetWorkListAction({ state, commit, rootState }) {
            return new Promise((resolve, reject) => {
                Vue.http.post("123", { courseId: rootState.course.currentCourseId }).then(response => {
                    if (response.status === 200) {
                        console.log("WorkListAction:" + '获取当前考勤列表成功')
                        commit('SaveWorkList', response.body.workList);
                        resolve();
                    } else {
                        console.log("WorkListAction:" + '获取当前考勤列表失败');
                        reject();
                    }
                }).catch(error => {
                    console.log("WorkListAction:", error);
                    reject();
                })
            })
        },
    },
    getters: {}
}
export default WorkModule
