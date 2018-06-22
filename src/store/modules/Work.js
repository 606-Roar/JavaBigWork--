import Vue from 'vue'
import MYURL from '../../const/MYURL.js'
import { tmpdir } from 'os';
const WorkModule = {
    state: {
        workList: [
          
        ],
        workSubmissionList: [
           
        ],
        workDetail: {
           
        },
        currentWorkId: null,//记录最近访问的课程号
    },
    mutations: {
        SaveWorkList(state, workList) {
            state.workList = workList;
        },
        SaveWorkSubmissionList(state, workSubmissionList) {
            state.workSubmissionList = workSubmissionList;
        },
        SaveWorkDetail(state, workDetail) {
            state.workDetail = workDetail;
        },
    },
    actions: {
        GetWorkListAction({ state, commit, rootState }, keys) {
            var data = {
                courseid: keys.courseId,
            };
            return new Promise((resolve, reject) => {
                Vue.http.post(MYURL.WorkList, JSON.stringify(data), { withCredentials: true }).then(response => {
                    if (response.status === 200 && response.body.code === 1) {
                        console.log("WorkListAction:" + '获取当前考勤列表成功')

                        var myDate = new Date();
                        var month = (myDate.getMonth() + 1) > 9 ? (myDate.getMonth() + 1) : ('0' + (myDate.getMonth() + 1));
                        var today = myDate.getFullYear() + "-" + month + "-" + myDate.getDate();

                        var workList = response.body.myBody;
                        workList.forEach(element => {
                            element.workId = element.homeworkid;
                            element.closeTime = element.homeworkenddate;
                            element.startTime = element.homeworkstartdate;
                            element.explain = element.homeworkbody;
                            element.workName = element.homeworkname;
                            console.log("today", today);
                            if (element.closeTime >= today) {
                                element.workState = "1";
                            } else if (element.closeTime < today) {
                                element.workState = "2";
                            } else if (element.startTime > today) {
                                element.workState = "3";
                            }

                        });
                        commit('SaveWorkList', workList);
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
        AddNewWorkAction({ state, commit, rootState }, keys) {
            var data = keys.workDetail;
            data.homeworkenddate = data.closeTime;
            data.homeworkstartdate = data.startTime;
            data.homeworkbody = data.explain;
            data.homeworkname = data.workName;
            data.courseid = keys.courseId;
            delete data.closeTime;
            delete data.workName;
            delete data.explain;
            delete data.startTime;
            return new Promise((resolve, reject) => {
                Vue.http.post(MYURL.WorkCreate, JSON.stringify(data), { withCredentials: true }).then(response => {
                    if (response.status === 200 && response.body.code === 1) {

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
        //获取作业详情
        GetWorkByIdAction({ state, commit, rootState }, keys) {
            var data = {
                homeworkid: keys.workId,
            };

            return new Promise((resolve, reject) => {
                Vue.http.post(MYURL.WorkDetail, JSON.stringify(data), { withCredentials: true }).then(response => {
                    if (response.status === 200 && response.body.code === 1) {
                        var workDetail = response.body.myBody;

                        workDetail.workId = workDetail.homeworkid;
                        workDetail.closeTime = workDetail.homeworkenddate;
                        workDetail.startTime = workDetail.homeworkstartdate;
                        workDetail.explain = workDetail.homeworkbody;
                        workDetail.workName = workDetail.homeworkname;

                        commit('SaveWorkDetail', workDetail);
                        resolve();
                    } else {
                        reject();
                    }
                }).catch(error => {
                    console.log(error);
                    reject();
                });
            });
        },
        //获取作业提交情况
        GetWorkSubmissionAction({ state, commit, rootState }, keys) {
            var data = {
                homeworkid: keys.workId,
            };

            return new Promise((resolve, reject) => {
                Vue.http.post(MYURL.WorkSubmission, JSON.stringify(data), { withCredentials: true }).then(response => {
                    if (response.status === 200 && response.body.code === 1) {
                        var workSubmissionList = response.body.myBody;

                        workSubmissionList.forEach(element => {
                            element.studentId = element.studentid;
                            element.studentName = element.studentname;
                        });

                        commit('SaveWorkSubmissionList', workSubmissionList);
                        resolve();
                    } else {
                        reject();
                    }
                }).catch(error => {
                    console.log(error);
                    reject();
                });
            });
        },
        //更新作业详情
        UpDateWorkDetailAction({ state, commit, rootState }, keys) {
            var data = keys.workDetail;
            return new Promise((resolve, reject) => {
                Vue.http.post(MYURL.WorkCreate, JSON.stringify(data), { withCredentials: true }).then(response => {
                    if (response.status === 200 && response.body.code === 1) {
                        resolve();
                    } else {
                        reject();
                    }
                }).catch(error => {
                    reject();
                });
            });
        },
        //更新作业提交情况
        UpDateWorkSubmissionAction({ state, commit, rootState }, keys) {
            var data = keys.tableData;
            return new Promise((resolve, reject) => {
                Vue.http.post(MYURL.WorkSubmissionUp, JSON.stringify(data), { withCredentials: true }).then(response => {
                    if (response.status === 200 && response.body.code === 1) {

                        resolve();
                    } else {
                        reject();
                    }
                }).catch(error => {
                    reject();
                });
            });
        },
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
