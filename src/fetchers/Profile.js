import Alerts from "helpers/Alerts";
import axios from "axios";
import { apiUrl } from "config";
import Controller from "fetchers";
import DB from "helpers/DB";
import store from "store";
import { add_user } from "store/users_store/actions";

class Controller_Profile extends Controller {
  constructor() {
    super();
    // this.alerts = new Alerts();
  }

  getProfile = (id, _callback) => {
    axios({
      method: "get",
      url: apiUrl + "/profile?id=" + id,
      headers: {
        "Content-Type": "application/json",
        "api-token": DB.get("api-token"),
      },
    })
      .then((response) => {
        const { user_data } = response.data;

        console.log(response.data);

        store.dispatch(add_user(user_data));

        _callback && _callback(response.data, null);
      })
      .catch((error) => {
        _callback && _callback(null, error);
      });
  };
}

export default Controller_Profile;
