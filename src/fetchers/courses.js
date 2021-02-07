import Axios from "axios";
import { apiUrl } from "config";
import { addCourseUrl, coursesUrl } from "config";
import Alerts from "helpers/Alerts";
import store from "store";
import { add_course } from "store/courses_store/actions";

export const getAllCourses = (_callback, _error) => {
  Alerts.showLoading();
  Axios.get(apiUrl + coursesUrl)
    .then((response) => {
      Alerts.showLoading(false);
      const { courses } = response.data;

      console.log("courses", courses);
      courses.forEach((course) => {
        store.dispatch(add_course(course));
      });

      _callback && _callback(courses);
    })
    .catch((error) => {
      Alerts.showErrorUnknow(() => {
        getAllCourses(_callback, _error);
      });
      console.error(error);
      _error && _error(error);
    });
};

export const editCourseData = (courseId, newData, _callback, _error) => {
  Alerts.showLoading();
  Axios.put(`${apiUrl}${addCourseUrl}/${courseId}`, newData)
    .then((response) => {
      Alerts.showSuccess();
      _callback && _callback(response.data);
    })
    .catch((error) => {
      Alerts.showErrorUnknow();
      console.error(error);
      _error && _error(error);
    });
};

export const addCourse = (newCourse, _callback, _error) => {
  Alerts.showLoading();
  Axios.post(`${apiUrl}${addCourseUrl}`, newCourse)
    .then((response) => {
      Alerts.showSuccess();
      _callback && _callback(response.data);
    })
    .catch((error) => {
      Alerts.showErrorUnknow();
      console.error(error);
      _error && _error(error);
    });
};
