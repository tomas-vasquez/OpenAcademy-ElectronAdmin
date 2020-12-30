import Axios from "axios";
import { itemsOrderUrl } from "config";
import { apiUrl } from "config";
import { courseItemsUrl, addItemUrl } from "config";
import Alerts from "helpers/Alerts";

export const getItems = (courseName, _callback, _error) => {
  Alerts.showLoading();
  Axios.get(apiUrl + courseItemsUrl + "/" + courseName)
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
  Axios.put(`${apiUrl}${addItemUrl}/${itemId}`, newData)
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

export const addItem = (newItem, _callback, _error) => {
  Alerts.showLoading();
  Axios.post(apiUrl + addItemUrl, newItem)
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

export const saveItemSord = (data, _callback, _error) => {
  Alerts.showLoading();
  Axios.put(apiUrl + itemsOrderUrl, data)
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
