import Axios from "axios";
import { apiUrl } from "config";
import { courseItemsDescriptionsUrl2 } from "config";
import Alerts from "helpers/Alerts";

export const uploadDescription = (item_id, newHtml, _callback, _error) => {
  Alerts.showLoading();
  Axios.post(`${apiUrl}${courseItemsDescriptionsUrl2}/${item_id}`, {
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
