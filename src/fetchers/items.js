import Axios from "axios";
import {itemsOrderUrl} from "config";
import {courseItemsUrl, addItemUrl} from "config";

import Alerts from "helpers/Alerts";
import DB from "helpers/DB";

export const getItems = (courseName, _callback, _error) => {
  Alerts.showLoading();
  Axios.get(DB.get('serverUrl') + courseItemsUrl + "/" + courseName)
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
  Axios.put(`${DB.get('serverUrl')}${addItemUrl}/${itemId}`, newData)
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
  Axios.post(DB.get("serverUrl") + addItemUrl, newItem)
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
  Axios.put(DB.get("serverUrl") + itemsOrderUrl, data)
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
