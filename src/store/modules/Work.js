import Vue from 'vue'
import MYURL from '../../const/MYURL.js'
import { tmpdir } from 'os';
const WorkModule = {
    state: {
        workList: [
            {
                workId: "1",
                name: "说明1",
                userName: "spongebob",
                updateTime: "2018-04-13",
                type: "文档",
                needpower: 1,
                workState: "1",
            },
            {
                workId: "1",
                name: "说明2",
                userName: "spongebob",
                updateTime: "2018-04-13",
                type: "文档",
                needpower: 1,
                workState: "2",
            }, {
                workId: "1",
                name: "说明3",
                userName: "spongebob",
                updateTime: "2018-04-13",
                type: "文档",
                workState: "3",
            }

        ],
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
                Vue.http.post("123", { courseId: rootState.course.currentCourseId }, { withCredentials: true, emulateJSON: true }).then(response => {
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
        AddNewWorkAction({ state, commit, rootState }) {
            return new Promise((resolve, reject) => {
                Vue.http.post("123", { courseId: rootState.course.currentCourseId }, { withCredentials: true, emulateJSON: true }).then(response => {
                    if (response.status === 200) {
                      
                        resolve();
                    } else {
                        reject();
                    }
                }).catch(error => {
                    console.log("WorkListAction:", error);
                    reject();
                })
            })
        },
        GetWorkByIdAction({ state, commit, rootState }, workId) {
            return new Promise((resolve, reject) => {
                Vue.http
                    .post(
                        "123",
                        { workId: workId },
                        { withCredentials: true, emulateJSON: true }
                    )
                    .then(response => {
                        if (response.status === 200) {
                            resolve(response.body.workDetail);
                        } else {
                            reject();
                        }
                    })
                    .catch(error => {
                        reject();
                    });
            });
        }
    },
    getters: {
        GetWorkListByState: (state) => (workState) => {
            return state.workList.filter(function (currentValue) {

                return currentValue.workState === workState
            });
        }
    }
}
export default WorkModule
