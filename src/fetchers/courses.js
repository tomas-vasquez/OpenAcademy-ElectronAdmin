import Axios from "axios";
import {addCourseUrl, coursesUrl} from "config";
import Alerts from "helpers/Alerts";
import DB from 'helpers/DB'

export const getAllCourses = (_callback, _error) => {
  Alerts.showLoading();
  Axios.get(DB.get('serverUrl') + coursesUrl)
    .then((response) => {
      Alerts.showLoading(false)
      _callback && _callback(response.data);
    })
    .catch((error) => {
      Alerts.showErrorUnknow(() => {
        getAllCourses(_callback, _error)
      });
      console.error(error);
      _error && _error(error);
    });
};

export const editCourseData = (courseId, newData, _callback, _error) => {
  Alerts.showLoading();
  Axios.put(`${DB.get('serverUrl')}${addCourseUrl}/${courseId}`, newData)
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
