import Axios from "axios";
import { apiUrl } from "config";
import { addCourseUrl, coursesUrl } from "config";
import Alerts from "helpers/Alerts";

export const getAllCourses = (_callback, _error) => {
  Alerts.showLoading();
  Axios.get(apiUrl + coursesUrl)
    .then((response) => {
      Alerts.showLoading(false);
      _callback && _callback(response.data);
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
