import Vue from 'vue'
import MYURL from '../../const/MYURL.js'
const AttendanceModule = {
    state: {
        attendanceList: [],
        attendanceDetails: [
            {
                attendanceDetailId: null,
                attendanceDetailList: [

                ]
            }
        ],
        currentAttendanceId: null,//记录最近访问的课程号
    },
    mutations: {
        SaveAttendanceList(state, attendanceList) {
            state.attendanceList = attendanceList
        },
        AddAttendanceDetailList(state, attendanceDetailId, attendanceDetailList) {
            attendanceDetails.push({
                attendanceDetailId: attendanceDetailId,
                attendanceDetailList: attendanceDetailList,
            })
        }
    },
    actions: {
        //获取考勤详情
        GetAttendanceDetailListAction({ state, commit, rootState }, attendanceDetailId) {
            return new Promise((resolve, reject) => {
                Vue.http.post("123", { attendanceDetailId: attendanceDetailId }).then(response => {
                    if (response.status === 200) {
                        console.log("AttendanceDetailListAction:" + '考勤详情列表获取成功')
                        commit('AddAttendanceDetailList', attendanceDetailId, response.body.attendanceDetailList);
                        resolve();
                    } else {
                        console.log("AttendanceDetailListAction:" + '考勤详情列表获取失败');
                        reject();
                    }
                }).catch(error => {
                    console.log("AttendanceDetailListAction:", error);
                    reject();
                })
            })
        },
        //获取考勤列表
        GetAttendanceListAction({ state, commit, rootState }, CourseId) {
            return new Promise((resolve, reject) => {
                Vue.http.post("123", { courseId: CourseId }).then(response => {
                    if (response.status === 200) {
                        console.log("AttendanceListAction:" + '获取当前考勤列表成功')
                        commit('SaveAttendanceList', response.body.attendanceList);
                        resolve();
                    } else {
                        console.log("AttendanceListAction:" + '获取当前考勤列表失败');
                        reject();
                    }
                }).catch(error => {
                    console.log("AttendanceListAction:", error);
                    reject();
                })
            })
        },
        //新建考勤
        AddNewAttendanceDetailsAction({ state, commit, rootState }, CourseId) {
            return new Promise((resolve, reject) => {
                Vue.http.post("123", {}).then(response => {
                    if (response.status === 200) {
                        console.log("AttendanceListAction:", 'resolve')
                        commit('AddAttendanceDetailList', response.body.attendanceDetailId, response.body.attendanceDetailList);
                        resolve();
                    } else {
                        console.log("AttendanceListAction:", 'reject');
                        reject();
                    }
                }).catch(error => {
                    console.log("AttendanceListAction:", error);
                    reject();
                })
            })
        },
        //上传更新考勤列表
        UpLoadAttendanceDetailsAction({ state, commit, rootState }, attendanceDetailId,attendanceDetailList) {
            return new Promise((resolve, reject) => {
                Vue.http.post("123", {}).then(response => {
                    if (response.status === 200) {
                        console.log("AttendanceListAction:", 'resolve')
                        resolve();
                    } else {
                        console.log("AttendanceListAction:", 'reject');
                        reject();
                    }
                }).catch(error => {
                    console.log("AttendanceListAction:", error);
                    reject();
                })
            })
        }
    },
    getters: {}
}
export default AttendanceModule
