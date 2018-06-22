import Vue from 'vue'
import MYURL from '../../const/MYURL.js'
const AttendanceModule = {
    state: {
        attendanceList: [{
          
        }],
        attendanceDetailList: [
            {
               
            }
        ],
        currentAttendanceId: null,//记录最近访问的课程号
    },
    mutations: {
        SaveAttendanceList(state, attendanceList) {
            state.attendanceList = attendanceList
        },
        SaveAttendanceDetailList(state, attendanceDetailList) {
            state.attendanceDetailList = attendanceDetailList
        }
    },
    actions: {
        //获取考勤详情
        GetAttendanceDetailListAction({ state, commit, rootState }, keys) {
            var data = {
                attendanceid: keys.attendanceId
            };
            return new Promise((resolve, reject) => {
                Vue.http.post(MYURL.AttendanceDetails, JSON.stringify(data), { withCredentials: true }).then(response => {
                    if (response.status === 200 && response.body.code === 1) {
                        var attendanceDetailList = response.body.myBody;
                        attendanceDetailList.forEach(element => {
                            element.attendanceId = element.attendanceid;
                            element.studentId = element.studentid;
                            element.attendanceDetail = element.attendancedetail;
                            element.studentName = element.studentname;
                            delete element.attendanceid;
                            delete element.studentid;
                            delete element.attendancedetail;
                            delete element.studentname;
                        });
                        commit('SaveAttendanceDetailList', attendanceDetailList);
                        resolve();
                    } else {
                        console.log("AttendanceDetailListAction:" + '考勤详情列表获取失败');
                        reject(response.body.meesage);
                    }
                }).catch(error => {
                    console.log("AttendanceDetailListAction:", error);
                    reject(error);
                })
            })
        },
        //获取考勤列表
        GetAttendanceListAction({ state, commit, rootState }, keys) {
            var data = {
                courseid: keys.courseId
            };
            return new Promise((resolve, reject) => {
                Vue.http.post(MYURL.AttendanceList, JSON.stringify(data), { withCredentials: true }).then(response => {
                    if (response.status === 200 && response.body.code === 1) {

                        var attendanceList = response.body.myBody;
                        attendanceList.forEach(element => {
                            element.name = element.attendancedate + "考勤记录";
                            element.attendanceId = element.attendanceid;
                            element.attendanceDate = element.attendancedate;
                            delete element.attendancedate;
                            delete element.attendanceid;
                        });
                        commit('SaveAttendanceList', attendanceList);

                        resolve();
                    } else {
                        reject(response.body.meesage);
                    }
                }).catch(error => {
                    console.log("AttendanceListAction:", error);
                    reject();
                })
            })
        },
        //新建考勤
        AddNewAttendanceDetailsAction({ state, commit, rootState }, keys) {
            var myDate = new Date();
            var today = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
            var data = {
                attendancedate: today,
                courseid: keys.courseId,
            };
            return new Promise((resolve, reject) => {
                Vue.http.post(MYURL.AttendanceCreate,
                    JSON.stringify(data), { withCredentials: true }).then(response => {
                        if (response.status === 200 && response.body.code === 1) {
                            console.log("AttendanceListAction:", 'resolve')
                            commit('AddAttendanceDetailList', response.body.attendanceDetailId, response.body.attendanceDetailList);
                            resolve(response.body.myBody);
                        } else {
                            console.log("AttendanceListAction:", 'reject');
                            reject(response.body.meesage);
                        }
                    }).catch(error => {
                        console.log("AttendanceListAction:", error);
                        reject("sorry");
                    })
            })
        },
        //上传更新考勤列表
        UpLoadAttendanceDetailsAction({ state, commit, rootState }, keys) {
            
            keys.mylist.forEach(element => {
                element.attendancedetail=element.attendanceDetail;
                element.attendanceid=element.attendanceId;
                element.studentid=element.studentId;
                element.studentname=element.studentName
               
            });
            var data =keys.mylist
            return new Promise((resolve, reject) => {
                Vue.http.post(MYURL.AttendanceUp, JSON.stringify(data), { withCredentials: true }).then(response => {
                    if (response.status === 200 && response.body.code === 1) {
                        console.log("AttendanceListAction:", 'resolve')
                        resolve();
                    } else {
                        console.log("AttendanceListAction:", 'reject');
                        reject(response.body.meesage);
                    }
                }).catch(error => {
                    console.log("AttendanceListAction:", error);
                    reject();
                })
            })
        },
        GetAbsentStaticsAction({ state, commit, rootState }, keys) {
            var data = {
                courseId: courseId
            };
            return new Promise((resolve, reject) => {
                Vue.http.post("1234", JSON.stringify(data), { withCredentials: true }).then(response => {
                    if (response.status === 200 && response.body.code === 1) {
                        console.log("AttendanceListAction:", 'resolve')
                        resolve(response.body.absentStatics);
                    } else {
                        console.log("AttendanceListAction:", 'reject');
                        reject(response.body.meesage);
                    }
                }).catch(error => {
                    console.log("AttendanceListAction:", error);
                    reject();
                })
            })
        }
    },
    getters: {
    }
}
export default AttendanceModule
