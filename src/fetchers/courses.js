import Axios from "axios";
import { addCourseUrl, coursesUrl } from "config";
import Alerts from "helpers/Alerts";

export const getAllCourses = (_callback, _error) => {
  Axios.get(coursesUrl)
    .then((response) => {
      _callback && _callback(response.data);
    })
    .catch((error) => {
      Alerts.showErrorUnknow();
      console.error(error);
      _error && _error(error);
    });
};

export const editCourseData = (courseId, newData, _callback, _error) => {
  Alerts.showLoading();
  Axios.put(`${addCourseUrl}/${courseId}`, newData)
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
