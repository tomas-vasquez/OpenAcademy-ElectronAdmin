import Axios from "axios";
import { courseItemsUrl, addItemUrl } from "config";

import Alerts from "helpers/Alerts";

export const getItems = (courseName, _callback, _error) => {
  Alerts.showLoading();
  Axios.get(courseItemsUrl + "/" + courseName)
    .then((response) => {
      Alerts.showLoading(false);
      _callback && _callback(response.data);
    })
    .catch((error) => {
      Alerts.showErrorUnknow();
      console.error(error);
      _error && _error(error);
    });
};

export const editItem = (itemId, newData, _callback, _error) => {
  Alerts.showLoading();
  Axios.put(`${addItemUrl}/${itemId}`, newData)
    .then((response) => {
      Alerts.showSuccess("");
      _callback && _callback(response.data);
    })
    .catch((error) => {
      Alerts.showErrorUnknow();
      console.error(error);
      _error && _error(error);
    });
};
