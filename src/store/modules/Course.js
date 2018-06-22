import Vue from 'vue'
import MYURL from '../../const/MYURL.js'
const CourseModule = {
  state: {
    courseList: [
    ],
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
    GetCourseListAction({ state, commit, rootState }, keys) {
      var data = {
        teacherid: keys.teacherId
      };
      return new Promise((resolve, reject) => {
        Vue.http.post(MYURL.CourseList, JSON.stringify(data), { withCredentials: true }).then(response => {
          if (response.status === 200 && response.body.code === 1) {


            var courseList = response.body.myBody;
            courseList.forEach(element => {
              element.courseId = element.courseid;
              element.teacherId = element.teacherid;
              element.courseName = element.coursename;
              element.img="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530233487&di=74e46140294240ba0c8926f164e1c59c&imgtype=jpg&er=1&src=http%3A%2F%2Fp.ananas.chaoxing.com%2Fstar%2F733_434cc%2F1381454854971bgonz.jpg";
              delete element.courseid;
              delete element.teacherid;
              delete element.coursename;
            });
            console.log(courseList);
            commit('SaveCourseList', courseList);
            resolve()
          } else {
            reject(response.body.meesage);
          }
        }).catch(error => {
          console.log("NowCourseListAction:", error);
          reject(error)
        })
      })
    },
    AddNewCourseAction({ state, commit, rootState }, keys) {
      var data = {
        teacherid: parseInt(keys.teacherId), coursename: keys.courseName
      };
      return new Promise((resolve, reject) => {
        Vue.http.post(MYURL.CourseCreate, JSON.stringify(data), { withCredentials: true }).then(response => {
          if (response.status === 200 && response.body.code === 1) {
            console.log("AddNewCourseAction:")


            resolve();
          } else {
            console.log("AddNewCourseAction:" + '获取当前课程列表失败');
            reject(response.body.meesage);
          }
        }).catch(error => {
          console.log("AddNewCourseAction:", error);
          reject(error)
        })
      })
    },
    GetCourseAction({ state, commit, rootState }, keys) {
      var data = {
        courseId: courseId
      };
      return new Promise((resolve, reject) => {
        Vue.http.post(MYURL.CourseDetail, JSON.stringify(data), { withCredentials: true }).then(response => {
          if (response.status === 200&&response.body.code===1) {
            console.log("GetCourseAction:")
            resolve(response.body.course);
          } else {
            console.log("GetCourseAction:" + "reject");
            reject('')
          }
        }).catch(error => {
          console.log("GetCourseAction:", error);
          reject(error)
        })
      })
    },
    DeleteCourseAction({ state, commit, rootState }, keys) {
      var data = {
        courseId: courseId
      };
      return new Promise((resolve, reject) => {
        Vue.http.post(MYURL.CourseDelete,  JSON.stringify(data), { withCredentials: true }).then(response => {
          if (response.status === 200&&response.body.code===1) {
            console.log("GetCourseAction:")
            resolve(response.body.course);
          } else {
            console.log("GetCourseAction:" + "reject");
            reject('')
          }
        }).catch(error => {
          console.log("GetCourseAction:", error);
          reject(error)
        })
      })
    }
  },
  getters: {}
}
export default CourseModule
