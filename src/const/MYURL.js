const BASEURL = "http://192.168.43.239:8080"
const GET = "/GET/api/";
const POST = "/POST/api/";
const PUT = "/PUT/api/";
const DELETE = "/DELETE/api/";

const TEST = "http://localhost:8080/test"


const Login = BASEURL + "/login";

const CourseList = BASEURL + "/LoadAllCourse";
const CourseCreate = BASEURL + "/AddCourse";
const CourseDelete = BASEURL + "/DelCourse";
const CourseDetail = BASEURL + "/ReadCourse";
const CourseModify = BASEURL + "/ModifyCourse";


const AttendanceList = BASEURL + "/LoadAllAttendance";
const AttendanceUp = BASEURL + "/modifyAttdendanceDetails";
const AttendanceCreate = BASEURL + "/AddAttendance";
const AttendanceDetails = BASEURL + "/LoadAllAttendanceDetails";

//
const WorkList = BASEURL + "/LoadAllHomework";

const WorkDetail = BASEURL + "/LoadHomework";
const WorkDetailUp = BASEURL + "/ModifyHomework";

const WorkSubmission = BASEURL + "/LoadAllHomeworkdetails";
const WorkSubmissionUp = BASEURL + "/ModifyHomework";
//新建work
const WorkCreate = BASEURL + "/AddHomework";

const UploadAttachment = BASEURL + "/UploadAttachment";
const DownloadAttachment = BASEURL + "/DownloadAttachment";

const StudentList = BASEURL + "/LoadAllStudent";
const StudentCreate = BASEURL + "/AddClassStudent";
const StudentUp = BASEURL + "/AddClassStudent";



const GradeList = BASEURL + "";
const GradeUp = BASEURL + "";

const TeacherList = BASEURL + "/LoadAllTeacher";
const TeacherUp = BASEURL + "";
const TeacherCreate = BASEURL + "/AddTeacher";
const TeacherDetail = BASEURL + "/ReadTeacher";





// 抛弃
const PROJECTMOUDLE = "project/";
const USERMOUDLE = "user/";
const URL_LOGIN = BASEURL + GET + USERMOUDLE + "login";
const URL_PrepareProjectList = BASEURL + GET + PROJECTMOUDLE + "prepareProjectList";
const URL_StartProjectList = BASEURL + GET + PROJECTMOUDLE + "startProjectList";
const URL_FinishProjectList = BASEURL + GET + PROJECTMOUDLE + "finishProjectList";
const URL_STAFF = BASEURL + GET + PROJECTMOUDLE + "staff";
const URL_ADDNEWSTAFF = BASEURL + POST + PROJECTMOUDLE + "staff";
const URL_ATTENDANCE = BASEURL + GET + PROJECTMOUDLE + "attendance";
const URL_ATTENDANCERANGE = BASEURL + GET + PROJECTMOUDLE + "attendanceRange";
export default {
  Login,
  CourseList,
  CourseCreate,
  CourseDelete,
  CourseDetail,
  CourseModify,
  AttendanceList,
  AttendanceUp,
  AttendanceCreate,
  AttendanceDetails,
  UploadAttachment,
  DownloadAttachment,
  WorkDetailUp,
  WorkList,
  WorkSubmissionUp,
  WorkSubmission,
  WorkDetail,
  WorkCreate,
  StudentList,
  StudentCreate,
  StudentUp,
  GradeList,
  GradeUp,
  TeacherDetail,
  TeacherList,
  TeacherUp,
  TeacherCreate,
  URL_LOGIN,
  URL_PrepareProjectList,
  URL_StartProjectList,
  URL_FinishProjectList,
  URL_STAFF,
  URL_ADDNEWSTAFF,
  URL_ATTENDANCE,
  URL_ATTENDANCERANGE,
}
