import Alerts from "helpers/Alerts";
import DB from "helpers/DB";
import store from "store";
import { deleteUserData } from "store/userData_store/actions";

class Controller {
  clearData = () => {
    DB.clear("userData");
    store.dispatch(deleteUserData());
  };

  errorsHandler = (error, retryHandler, isStrict) => {
    console.error("%c Error > %c", "background:red; color:white", "", error);

    if (error.isAxiosError) {
      if (error.response) {
        if (error.response.status === 422) {
          switch (error.response.data.msg) {
            case "error-incorrect-password":
              return Alerts.showAlert(
                "Revise la contrasena ingresado...",
                "Contrasena incorrecta!",
                true,
                (e) => {
                  document.getElementById("input-password").focus();
                }
              );

            case "error-unexist-email":
              return Alerts.showAlert(
                "Revise el correo electrónico ingresado...",
                "Correo electrónico no encontrado!",
                true,
                (e) => {
                  document.getElementById("input-email").focus();
                }
              );

            case "error-already-exist-email":
              return Alerts.showAlert(
                "Ingrese otro correo...",
                "Correo electrónico ya registrado!",
                true,
                (e) => {
                  document.getElementById("input-email").focus();
                }
              );

            case "error-already-exist-username":
              return Alerts.showAlert(
                "Ingrese otro nombre...",
                "nombre de cuenta ya registrado!",
                true,
                (e) => {
                  document.getElementById("input-username").focus();
                }
              );

            default:
              return Alerts.showAlert("Revise los datos ingresados");
          }
        } else if (error.response.status === 406) {
          return Alerts.showWarning("Contraseña incorrecta");
        } else if (error.response.status === 401) {
          return Alerts.showWarning(
            "Deve volver a iniciar sesión",
            "Ups... Su sesión caducó",
            true,
            () => {
              DB.clear("userData");
              DB.set("targetPage", document.location.href);
              // Router.push("/login");
            }
          );
        } else {
          return Alerts.showErrorUnknow(retryHandler, isStrict);
        }
      } else {
        return Alerts.showErrorConexion(retryHandler, isStrict);
      }
    } else {
      return Alerts.showErrorUnknow(retryHandler, isStrict);
    }
  };
}

export default Controller;
