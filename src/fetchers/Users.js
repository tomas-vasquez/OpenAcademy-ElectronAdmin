import Controller from "fetchers";

import Alerts from "helpers/Alerts";
import { apiLinks, apiUrl } from "config";
import axios from "axios";

import DB from "helpers/DB";
import store from "store";
import { setUserData } from "store/userData_store/actions";

class Controller_Users extends Controller {
  login = (form, _callback) => {
    Alerts.showLoading();

    let data = {};

    for (let index = 0; index < form.length; index++) {
      if (form[index].name) {
        data[form[index].name] = form[index].value;
        if (form[index].name === "remember_token")
          data[form[index].name] = form[index].checked;
      }
    }

    axios({
      method: "post",
      url: apiLinks.apiLoginUrl,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((response) => {
        Alerts.showSuccess("Don't break anything please...", "WELCOME!!!");
        DB.set("api-token", response.data.api_token);
        DB.set("userData", response.data.user_data);
        store.dispatch(setUserData(response.data.user_data));
        _callback();
      })
      .catch((error) => {
        this.errorsHandler(error, () => this.login(form, _callback));
      });
  };

  /*!
    =========================================================
    * 
    =========================================================
    */

  logout = () => {
    Alerts.showConfirm("esta seguro?", "Cerrando sesión", true, () => {
      this.unsafeLogout();
    });
  };

  unsafeLogout = () => {
    Alerts.showLoading();

    axios({
      method: "get",
      url: apiUrl + "/logout",
      headers: {
        "api-token": DB.get("api-token"),
      },
    })
      .then((response) => {
        Alerts.showSuccess("", "Sesión cerrada");
        this.clearData();
      })
      .catch((error) => {
        this.errorsHandler(error, () => this.unsafeLogout());
      });
  };
}

export default Controller_Users;
