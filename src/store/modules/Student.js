import Vue from 'vue'
import MYURL from '../../const/MYURL.js'
const StudentModule = {
    state: {
        studentList: [
            
        ],
        gradeList: [],
    },
    mutations: {
        SaveStudentList(state, studentList) {
            state.studentList = studentList
        },
        SaveGradeList(state, gradeList) {
            state.gradeList = gradeList;
        }
    },
    actions: {
        //获取学生列表
        GetStudentListAction({ state, commit, rootState }, keys) {
            var data = {
                courseid: keys.courseId
            };
            return new Promise((resolve, reject) => {
                Vue.http.post(MYURL.StudentList, JSON.stringify(data), { withCredentials: true }).then(response => {
                    if (response.status === 200 && response.body.code === 1) {
                        var studentList = response.body.myBody;
                        studentList.forEach(element => {
                            element.cId = element.cid;
                            element.courseId = element.courseid;
                            element.studentName = element.studentname;
                            element.studentId = element.studentid;
                            element.attendanceId = element.attendanceid;
                            element.attendanceDate = element.attendancedate;
                            delete element.attendancedate;
                            delete element.attendanceid;
                            delete element.studentname;
                            delete element.courseid;
                            delete element.cid;
                        });
                        commit('SaveStudentList', response.body.myBody);
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
            keys.studentList.forEach(element => {
                element.midtermresults=parseInt(element.midtermresults);
                element.finalgrade=parseInt(element.finalgrade);
            });
            var data = {
                courseId: keys.courseId, studentList: keys.studentList
            };

            return new Promise((resolve, reject) => {
                Vue.http.post(MYURL.StudentCreate, JSON.stringify(data), { withCredentials: true }).then(response => {
                    if (response.status === 200 && response.body.code === 1) {
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
        UpStudentAction({ state, commit, rootState }, keys) {
            keys.List.forEach(element => {
                element.cid = element.cId;
                element.courseid = keys.courseId;
                element.studentname = element.studentName;
                element.studentid = element.studentId;         
                element.midtermresults=parseInt(element.midtermresults);
                element.finalgrade=parseInt(element.finalgrade);       
            });

            var data = keys.List;
            return new Promise((resolve, reject) => {
                Vue.http.post(MYURL.StudentUp, JSON.stringify(data), { withCredentials: true }).then(response => {
                    if (response.status === 200 && response.body.code === 1) {
                        // console.log("AddStudentListAction:", 'resolve')

                        resolve();
                    } else {
                        // console.log("AddStudentListAction:", 'reject');
                        reject();
                    }
                }).catch(error => {
                    // console.log("AddStudentListAction:", error);
                    reject();
                })
            })
        },
        //获取成绩列表
        GetGradeListAction({ state, commit, rootState }, keys) {
            var data = {
                courseid: keys.courseId,
            };
            return new Promise((resolve, reject) => {
                Vue.http.post(MYURL.GradeList, JSON.stringify(data), { withCredentials: true }).then(response => {
                    if (response.status === 200 && response.body.code === 1) {
                        // console.log("AddStudentListAction:", 'resolve')
                        commit("SaveGradeList", response.body.gradelist);
                        resolve(response.body.gradelist);
                    } else {
                        // console.log("AddStudentListAction:", 'reject');
                        reject();
                    }
                }).catch(error => {
                    // console.log("AddStudentListAction:", error);
                    reject();
                })
            })
        },
        //上传成绩列表
        UpGradeListAction({ state, commit, rootState }, keys) {
            var data = {

            };
            return new Promise((resolve, reject) => {
                Vue.http.post(MYURL.GradeUp, JSON.stringify(data), { withCredentials: true }).then(response => {
                    if (response.status === 200 && response.body.code === 1) {
                        // console.log("AddStudentListAction:", 'resolve')
                        resolve();
                    } else {
                        // console.log("AddStudentListAction:", 'reject');
                        reject();
                    }
                }).catch(error => {
                    // console.log("AddStudentListAction:", error);
                    reject();
                })
            })
        }

    },
    getters: {

    }
}
export default StudentModule
