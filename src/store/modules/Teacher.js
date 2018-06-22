import Vue from 'vue'
import MYURL from '../../const/MYURL.js'
import { tmpdir } from 'os';
const TeacherModule = {
    state: {
        teacherList: [

        ],
        teacherDetail: [],
    },
    mutations: {
        SaveTeacherList(state, teacherList) {
            state.teacherList = teacherList
        },
    },
    actions: {
        GetTeacherListAction({ state, commit, rootState }) {
            return new Promise((resolve, reject) => {
                Vue.http.post(MYURL.TeacherList, {}, { withCredentials: true }).then(response => {
                    if (response.status === 200 && response.body.code === 1) {
                        var teacherList = response.body.myBody;
                        teacherList.forEach(element => {
                            element.teacherId = element.teacherid;
                            element.teacherName = element.teachername;
                            delete element.teacherid;
                            delete element.teachername;
                        });
                        commit('SaveTeacherList', teacherList);
                        resolve();
                    } else {

                        reject();
                    }
                }).catch(error => {

                    reject();
                })
            })
        },
        AddNewTeacherAction({ state, commit, rootState }, keys) {
            var data = {
                teacherDetail: teacherDetail
            };
            return new Promise((resolve, reject) => {
                Vue.http.post(MYURL.TeacherCreate, JSON.stringify(data), { withCredentials: true }).then(response => {
                    if (response.status === 200 && response.body.code === 1) {

                        resolve();
                    } else {
                        reject();
                    }
                }).catch(error => {
                    console.log("TeacherListAction:", error);
                    reject();
                })
            })
        },
        GetTeacherByIdAction({ state, commit, rootState }, keys) {
            var data = {
                teacherDetail: teacherDetail
            };
            return new Promise((resolve, reject) => {
                Vue.http.post(MYURL.TeacherDetail, JSON.stringify(data), { withCredentials: true }).then(response => {
                    if (response.status === 200 && response.body.code === 1) {
                        resolve(response.body.teacherDetail);
                    } else {
                        reject();
                    }
                })
                    .catch(error => {
                        reject();
                    });
            });
        },
    },
    getters: {
        GetTeacherListByState: (state) => (teacherState) => {
            return state.teacherList.filter(function (currentValue) {

                return currentValue.teacherState === teacherState
            });
        }
    }
}
export default TeacherModule
