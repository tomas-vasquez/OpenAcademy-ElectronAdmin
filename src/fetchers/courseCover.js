import Alerts from "helpers/Alerts";
import Axios from "axios";
import { uploadPicUrl } from "config";
import DB from "helpers/DB";
import { apiUrl } from "config";

export const uploadCover = (e, course, _callback) => {
  const file = e.target.files[0];
  var formData = new FormData();

  formData.append("blob", file);
  formData.append("_id", course._id);

  Alerts.showLoading();
  Axios.post(apiUrl + uploadPicUrl, formData)
    .then((response) => {
      setTimeout(() => {
        Alerts.showSuccess();
        _callback(response.data);
      }, 1000);
    })
    .catch((error) => {
      Alerts.showErrorUnknow();
      console.error(error);
    });
};
