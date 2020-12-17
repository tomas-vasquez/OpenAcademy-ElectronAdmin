import Axios from "axios";
import {
  courseItemsDescriptionsUrl2,
  courseItemsDescriptionsUrl,
} from "config";
import Alerts from "helpers/Alerts";
import DB from "helpers/DB";

export const loadDescription = (item_content_url, _callback, _error) => {
  Axios.get(`${DB.get("serverUrl")}${courseItemsDescriptionsUrl}/${item_content_url}`)
    .then((response) => {
      _callback && _callback(response.data);
    })
    .catch((error) => {
      _error && _error(error);
    });
};

export const uploadDescription = (item_id, newHtml, _callback, _error) => {
  Alerts.showLoading();
  Axios.post(`${DB.get("serverUrl")}${courseItemsDescriptionsUrl2}/${item_id}`, {
    newHtml,
  })
    .then((response) => {
      Alerts.showSuccess();
      _callback && _callback();
    })
    .catch((error) => {
      Alerts.showLoading(false);
      console.log(error);
      _error && _error(error);
    });
};
