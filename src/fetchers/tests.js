import Axios from "axios";
import { courseItemsTestsUrl, courseItemsTestsUrl2 } from "config";

import Alerts from "helpers/Alerts";

export const loadTest = (item_tree_url, _callback, _error) => {
  Axios.get(`${courseItemsTestsUrl}/${item_tree_url}`)
    .then((response) => {
      _callback && _callback(response.data);
    })
    .catch((error) => {
      //   Alerts.showErrorUnknow();
      //   console.error(error);
      _error && _error(error);
    });
};

export const uploadTest = (itemId, newData, _callback, _error) => {
  Alerts.showLoading();
  Axios.post(`${courseItemsTestsUrl2}/${itemId}`, newData)
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
