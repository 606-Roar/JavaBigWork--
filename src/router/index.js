import Vue from 'vue'
import Router from 'vue-router'
//top pages
import Login from '@/pages/Login/login'
import Register from '@/pages/Register/register'
import CourseList from '@/pages/Course/CourseList.vue'
import CourseDetails from '@/pages/Course/CourseDetails.vue'
import CourseCreate from '@/pages/Course/CourseCreate.vue'
import TeacherManager from '@/pages/TeacherManager/TeacherManager.vue'
import NotFound from '@/pages/NotFound/NotFound.vue';
//second
import CourseDetailsIndex from '@/pages/Course/CourseDetails/Index.vue'
import Attendance from '@/pages/Course/CourseDetails/Attendance/Attendance.vue'
import Grade from '@/pages/Course/CourseDetails/Grade/Grade.vue'
import Student from '@/pages/Course/CourseDetails/Student/Student.vue'
import GradeAccount from '@/pages/Course/CourseDetails/Student/GradeAccount.vue'
import HomeWorkAccount from '@/pages/Course/CourseDetails/Student/HomeWorkAccount.vue'
import Work from '@/pages/Course/CourseDetails/Work/Work.vue'
import SingleAttendance from '@/pages/Course/CourseDetails/Attendance/SingleAttendance.vue'
import SingleWork from '@/pages/Course/CourseDetails/Work/SingleWork.vue'
import Setting from '@/pages/Course/CourseDetails/Setting/Setting.vue'

import TeacherList from '@/pages/TeacherManager/TeacherManagerDetails/TeacherList.vue'


import MainPage from '@/pages/mainPage'
import Test from '@/pages/test'



import Organization from '@/pages/Organization/organization'
import OrOption1 from '@/pages/Organization/organizationoption/oroption1'
import Orchengyuan from '@/pages/Organization/organizationoption/orchengyuan'
import Orgroup from '@/pages/Organization/organizationoption/orgroup'
import Orpower from '@/pages/Organization/organizationoption/orpower'
import Orstruct from '@/pages/Organization/organizationoption/orstruct'
import Personal from '@/pages/My/personal'
import Rightbase1 from '@/pages/My/personaloption/rightbase1'
import Rightbase2 from '@/pages/My/personaloption/rightbase2'
import Rightbase3 from '@/pages/My/personaloption/rightbase3'
import Search from '@/pages/Search/search'
// import Register from '@/pages/Register/register'
//second pages
import ProjectList from '@/pages/Project/projectList'
import ProjectDetails from '@/pages/Project/projectDetails'
import ProjectCreate from '@/pages/Project/projectCreate'
// third pages
import Staff from '@/pages/Project/ProjectDetails/ProjectStaff/projectStaff'
import Recordgraph from '@/pages/Project/ProjectDetails/recordgraph'
import ProjectPlan from '@/pages/Project/ProjectDetails/projectplan'
import ProjectPower from '@/pages/Project/ProjectDetails/projectpower'
import ProjectReports from '@/pages/Project/ProjectDetails/ProjectReports/projectReports'
import Tasklist from '@/pages/Project/ProjectDetails/tasklist'
// import Attendance from '@/pages/Project/ProjectDetails/attendance'
import Data from '@/pages/Data/data'
import TaskPage from '@/pages/Task/taskpage'
import Taskmainbody from '@/pages/Task/taskmainbody'
import Dataoption1 from '@/pages/Data/dataoption/data1.vue'
import test from '../pages/test.vue'
import SingleReport from '@/pages/Project/ProjectDetails/ProjectReports/singleReport'
import ProjectData from '@/pages/Project/ProjectDetails/ProjectData/projectData'
import ProjectStaff from '@/pages/Project/ProjectDetails/ProjectStaff/projectStaff'
import personalData from '@/pages/My/personalData'
import WorkRecord from '@/pages/Project/ProjectDetails/ProjectReports/workRecord'
import TaskStatistics from '@/pages/Project/ProjectDetails/ProjectReports/taskStatistics.vue'
import ProjectSetting from '@/pages/Project/ProjectDetails/ProjectSetting/projectSetting'
import EntryAndExit from '@/pages/Project/ProjectDetails/EntryAndExit/entryAndExit'
import staffHub from '@/pages/Project/ProjectDetails/ProjectStaff/staffHub'
import TaskDataChange from '@/pages/Task/taskDataChange'
Vue.use(Router)
// 兄弟 or 侄子 用router-to ，父子 包含router-view
const vueRouter = new Router({
  routes: [
    { path: '', redirect: { name: '登录' } },
    { path: '/login', name: '登录', component: Login },
    { path: '/test', name: 'test', component: Test },
    {
      path: '/Home/:teacherId',
      name: 'Home',
      component: MainPage,
      redirect: { name: 'CourseList' },
      children: [
        { path: '', redirect: { name: 'CourseList' } },
        {
          path: 'TeacherManager',
          name: 'TeacherManager',
          component: TeacherManager,
          redirect: { name: 'TeacherList' },
          children: [
            {
              path: 'TeacherList',
              name: 'TeacherList',
              component: TeacherList,
            }
          ]
        },
        {
          path: 'CourseList',
          name: "CourseList",
          component: CourseList
        },
        {
          path: 'CourseCreate',
          name: "CourseCreate",
          component: CourseCreate
        },
        {
          path: 'CourseDetails/:courseId',
          name: "CourseDetails",
          component: CourseDetails,
          redirect: { name: 'CourseDetailsIndex' },
          children: [
            { path: '', redirect: { name: 'CourseDetailsIndex' } },
            {
              path: 'CourseDetailsIndex',
              name: "CourseDetailsIndex",
              component: CourseDetailsIndex
            },
            {
              path: 'Attendance',
              name: "Attendance",
              component: Attendance
            },
            {
              path: 'Grade',
              name: "Grade",
              component: Grade
            },
            {
              path: 'Student',
              name: "Student",
              component: Student
            },
            {
              path: 'HomeWorkAccount',
              name: "HomeWorkAccount",
              component: HomeWorkAccount
            },
            {
              path: 'GradeAccount',
              name: "GradeAccount",
              component: GradeAccount
            },
            {
              path: 'Work',
              name: "Work",
              component: Work
            },
            {

              path: 'SingleWork/:workId',
              name: "SingleWork",
              component: SingleWork
            },
            {

              path: 'Setting',
              name: "Setting",
              component: Setting
            },
            {
              path: 'SingleAttendance/:attendanceId',
              name: "SingleAttendance",
              component: SingleAttendance
            },
          ],
        },
      ]
    },
    {
      path: '/index',
      name: '首页',
      component: MainPage,
      redirect: { name: '项目列表' },
      children: [{ path: '', redirect: { name: '项目列表' } },
      {
        path: 'personal',
        name: '个人中心',
        component: Personal,
        redirect: { name: 'main' },
        children: [{
          path: 'main',
          name: 'main',
          component: Rightbase1
        },
        {
          path: 'editemail',
          name: 'editemail',
          component: Rightbase2
        },
        {
          path: 'editpwd',
          name: 'editpwd',
          component: Rightbase3
        },
        {
          path: 'personalData',
          name: '个人文件',
          component: personalData
        },
        ]
      },
      {
        path: 'taskpage',
        name: '任务详情页',
        component: TaskPage,
        redirect: { name: 'mainf' },
        children: [{
          path: 'mainf',
          name: 'mainf',
          component: Taskmainbody
        },
        {
          path: 'TaskDataChange',
          name: '任务资料变化',
          component: TaskDataChange
        }
        ]
      },
      {
        path: 'organization',
        name: '团队配置中心',
        component: Organization,
        redirect: { name: '团队信息' },
        children: [{
          path: 'mains', //不可司仪 即使这里重名也会导致路由器指向别的那个组件!
          name: '团队信息',
          component: OrOption1
        },
        {
          path: 'orchengyuan', //不可司仪 即使这里重名也会导致路由器指向别的那个组件!
          name: '团队成员',
          component: Orchengyuan
        },
        {
          path: 'orgroup', //不可司仪 即使这里重名也会导致路由器指向别的那个组件!
          name: '用户组',
          component: Orgroup
        },
        {
          path: 'orpower', //不可司仪 即使这里重名也会导致路由器指向别的那个组件!
          name: '团队权限',
          component: Orpower
        },
        {
          path: 'orstruct', //不可司仪 即使这里重名也会导致路由器指向别的那个组件!
          name: '组织架构',
          component: Orstruct
        }
        ]
      },
      {
        path: 'data',
        name: '数据中心',
        component: Data,
        redirect: { name: 'Dataoption1' },
        children: [{
          path: 'Dataoption1',
          name: 'Dataoption1',
          component: Dataoption1
        }]
      },
      {
        path: "project-list",
        name: '项目列表',
        component: ProjectList
      },
      {
        path: "project-create",
        name: '新建项目',
        component: ProjectCreate
      },
      {
        path: 'project-details',
        name: '项目详情',
        component: ProjectDetails,
        redirect: { name: '任务总览' },
        children: [{
          path: 'tasklist',
          name: '任务总览',
          component: Tasklist,
          meta: ["首页", "项目详情", "任务总览"]
        },
        {
          path: 'staff',
          name: '成员',
          component: Staff,
          meta: ["首页", "项目详情", "人员"]
        },
        {
          path: 'attendance',
          name: '考勤',
          component: Attendance,
          meta: ["首页", "项目详情", "考勤"]
        },
        {
          path: 'recordgraph',
          name: '记录图表',
          component: Recordgraph,
          meta: ["首页", "项目详情", "记录图表"]
        },
        {
          path: 'projectplan',
          name: '项目计划',
          component: ProjectPlan,
        },
        {
          path: 'ProjectPower',
          name: '项目权限',
          component: ProjectPower
        },
        {
          path: 'ProjectReports',
          name: '报表',
          component: ProjectReports
        },
        {
          path: 'SingleReport',
          name: '单个报表',
          component: SingleReport
        },
        {
          path: 'ProjectData',
          name: '项目资料',
          component: ProjectData
        },
        {
          path: 'ProjectStaff',
          name: '人员',
          component: ProjectStaff
        },
        {
          path: 'WorkRecord',
          name: '工作记录',
          component: WorkRecord
        },
        {
          path: 'TaskStatistics',
          name: '任务统计',
          component: TaskStatistics
        },
        {
          path: 'ProjectSetting',
          name: '项目设置',
          component: ProjectSetting
        },
        {
          path: 'EntryAndExit',
          name: '出入职',
          component: EntryAndExit
        },
        {
          path: 'staffHub',
          name: '成员个人仓库',
          component: staffHub
        }
        ]
      }
      ]
    },
    { path: '/register', name: '注册', component: Register },
    { path: '/search', name: '搜索', component: Search },
    { path: '/login', name: '', component: Login },
    { path: '/test', component: test },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ]
})

export default vueRouter
