import Vue from 'vue'
import MYURL from '../../const/MYURL.js'
const StudentModule = {
    state: {
        studentList: [],
    },
    mutations: {
        SaveStudentList(state, studentList) {
            state.studentList = studentList
        },
    },
    actions: {
        //获取学生列表
        GetStudentListAction({ state, commit, rootState }, courseId) {
            return new Promise((resolve, reject) => {
                Vue.http.post("123", { courseId: courseId },{withCredentials: true, emulateJSON: true }).then(response => {
                    if (response.status === 200) {
                        console.log("StudentListAction:", 'resolve')
                        commit('SaveStudentList', response.body.studentList);
                        resolve();
                    } else {
                        console.log("StudentListAction:", 'reject');
                        reject();
                    }
                }).catch(error => {
                    console.log("StudentListAction:", error);
                    reject();
                })
            })
        },
        //添加学生
        AddStudentListAction({ state, commit, rootState }, keys) {
            return new Promise((resolve, reject) => {
                Vue.http.post("123", { courseId: keys.courseId, studentList: keys.studentList },{withCredentials: true, emulateJSON: true }).then(response => {
                    if (response.status === 200) {
                        console.log("AddStudentListAction:", 'resolve')
                    
                        resolve();
                    } else {
                        console.log("AddStudentListAction:", 'reject');
                        reject();
                    }
                }).catch(error => {
                    console.log("AddStudentListAction:", error);
                    reject();
                })
            })
        },

    },
    getters: {
        
    }
}
export default StudentModule
