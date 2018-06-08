import Vue from 'vue'
import MYURL from '../../const/MYURL.js'
const CourseModule = {
  state: {
    nowCourseList: [{
      courseId: "test",
      courseName: "test",
    },
    {
      courseId: "test",
      courseName: "test",
    }],
    finishCourseList: [],
    currentCourseId: null,//记录最近访问的课程号
  },
  mutations: {
    SaveCourseList(state, courseList) {
      state.courseList = courseList
    },
    SaveNowCourseList(state, nowCourseList) {
      state.nowCourseList = nowCourseList;
    },
    SaveFinishCourseList(state, finishCourseList) {
      state.finishCourseList = finishCourseList;
    },
    SaveCurrentCourseId(state, currentCourseId) {
      state.currentCourseId = currentCourseId
    }
  },
  actions: {
    GetCourseListAction({ state, commit, rootState }) {
      return new Promise((resolve, reject) => {
        Vue.http.post(MYURL.CourseList, { teacherId: rootState.userInfo.userId }, { emulateJSON: true,withCredentials: true, emulateJSON: true }).then(response => {
          if (response.status === 200) {
            console.log("NowCourseListAction:" + '获取当前课程列表成功')
            var nowCourseList = response.body.courseList.filter(itenm => {
              return item.state === 'now';
            });
            var finishCourseList = response.body.courseList.filter(itenm => {
              return item.state === 'finish';
            });
            commit('SaveNowCourseList', nowCourseList)
            commit('SaveFinishCourseList', finishCourseList)
            resolve()
          } else {
            console.log("NowCourseListAction:" + '获取当前课程列表失败');
            reject('获取当前课程列表失败')
          }
        }).catch(error => {
          console.log("NowCourseListAction:", error);
          reject(error)
        })
      })
    },
    AddNewCourseAction({ state, commit, rootState }, keys) {
      return new Promise((resolve, reject) => {
        Vue.http.post(MYURL.CourseList, { teacherId: rootState.userInfo.userId, courseName: keys.courseName }, { emulateJSON: true,withCredentials: true, emulateJSON: true }).then(response => {
          if (response.status === 200) {
            console.log("AddNewCourseAction:")


            resolve();
          } else {
            console.log("AddNewCourseAction:" + '获取当前课程列表失败');
            reject('')
          }
        }).catch(error => {
          console.log("AddNewCourseAction:", error);
          reject(error)
        })
      })
    }
    // GetNowCourseListAction({ state, commit, rootState }) {
    //   return new Promise((resolve, reject) => {
    //     Vue.http.post("123", { teacherId: rootState.userInfo.userId },{ emulateJSON :true,withCredentials: true }).then(response => {
    //       if (response.status === 200) { 
    //         console.log("NowCourseListAction:" + '获取当前课程列表成功')
    //         commit('SaveNowCourseList', response.body.nowCourseList)
    //         resolve()
    //       } else {
    //         console.log("NowCourseListAction:" + '获取当前课程列表失败');
    //         reject("获取当前课程列表失败")
    //       }
    //     }).catch(error => {
    //       console.log("NowCourseListAction:", error);
    //       reject(error)
    //     })
    //   })
    // },
    // GetFinishCourseListAction({ state, commit, rootState }) {
    //   return new Promise((resolve, reject) => {
    //     Vue.http.post("123", { teacherId: rootState.userInfo.userId },{withCredentials: true, emulateJSON: true }).then(response => {
    //       if (response.status === 200) {
    //         console.log("FinishCourseListAction:" + '获取已完成课程列表成功')
    //         commit('SaveFinishCourseList', response.body.finishCourseList)
    //         resolve()
    //       } else {
    //         console.log("FinishCourseListAction:" + '获取已完成课程列表失败');
    //         reject()
    //       }
    //     }).catch(error => {
    //       console.log("FinishCourseListAction:", error);
    //       reject()
    //     })
    //   })
    // },
  },
  getters: {}
}
export default CourseModule
