import swal from "sweetalert2";

class Alerts {
  //alerta normal
  showConfirm = (
    message,
    title = "Message",
    backdropDismiss = true,
    onOk = null,
    onCancel = null
  ) => {
    swal
      .fire({
        title: title,
        text: message,
        icon: "question",
        showConfirmButton: true,
        showCancelButton: true,
        allowOutsideClick: backdropDismiss,
        buttonsStyling: false,
        confirmButtonText: 'Sí, continuar <i class="fa fa-check"></i>',
        confirmButtonClass: "btn btn-default",
        cancelButtonText: 'cancelar <i class="fa fa-times"></i>',
        cancelButtonClass: "btn btn-secundary",
      })
      .then((result) => {
        if (result.value) {
          if (onOk !== null) onOk();
        } else {
          if (onCancel !== null) onCancel();
        }
      });
  };

  //alerta normal
  showAlert = (
    message,
    title = "Message",
    backdropDismiss = true,
    onDidDismiss = null
  ) => {
    swal.fire({
      title: title,
      text: message,
      icon: "info",
      showConfirmButton: true,
      buttonsStyling: false,
      allowOutsideClick: backdropDismiss,
      confirmButtonClass: "btn btn-default",
      onAfterClose: (result) => {
        if (onDidDismiss !== null) onDidDismiss(result);
      },
    });
  };

  //alerta normal
  showWarning = (
    message,
    title = "Mensaje",
    backdropDismiss = true,
    onDidDismiss = null
  ) => {
    swal.fire({
      title: title,
      text: message,
      icon: "warning",
      showConfirmButton: true,
      buttonsStyling: false,
      allowOutsideClick: backdropDismiss,
      confirmButtonClass: "btn btn-default",
      onAfterClose: (result) => {
        if (onDidDismiss !== null) onDidDismiss(result);
      },
    });
  };

  //alerta normal
  showSuccess = (message, title = "Perfecto!") => {
    swal.fire({
      title: title,
      text: message,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      buttonsStyling: false,
      confirmButtonClass: "btn btn-default",
    });
  };

  //alerta normal
  showToast = (message) => {
    swal.fire({
      title: message,
      icon: "success",
      position: "bottom-left",
      timer: 3000,
      toast: true,
      showConfirmButton: false,
    });
  };

  //alerta de error de internet
  showErrorConexion = (retryHandler = null, isStrict) => {
    swal
      .fire({
        title: "Error de conexión",
        text: "Revise su conexión a internet",
        icon: "error",
        showConfirmButton: true,
        showCancelButton: !isStrict,
        allowOutsideClick: !isStrict,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-default ml-2",
        cancelButtonClass: "btn btn-default",
        confirmButtonText: 'reintentar <i class="fa fa-redo"></i>',
        cancelButtonText: 'cancelar  <i class="fa fa-times"></i>',
      })
      .then((result) => {
        if (result.value) {
          retryHandler && retryHandler();
        }
      });
  };

  //aleta de error desconocido
  showErrorUnknow = (retryHandler = null, isStrict) => {
    swal
      .fire({
        title: "Error",
        text: "Ups!... error desconocido",

        showConfirmButton: true,
        showCancelButton: !isStrict,
        allowOutsideClick: !isStrict,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-default mr-2",
        cancelButtonClass: "btn btn-default",
        confirmButtonText: 'reintentar <i class="fa fa-redo"></i>',
        cancelButtonText: 'cancelar  <i class="fa fa-times"></i>',
      })
      .then((result) => {
        if (result.value) {
          retryHandler && retryHandler();
        }
      });
  };

  //dialogo de carga de contenido
  showLoading = (isShow = true, message = "Consultando...") => {
    if (isShow) {
      swal.fire({
        allowOutsideClick: false,
        // title: message,
        html:
          '<div class="spinner-border text-primary" role="status"> <span class="visually-hidden">Loading...</span></div><h2 class="text-default mb-0">' +
          message +
          "</h2>",
        showConfirmButton: false,
        onBeforeOpen: () => {
          swal.showLoading();
        },
      });
    } else {
      swal.close();
    }
  };

  setUplodingPercentage = (percentage) => {
    percentage = parseInt(percentage);
    document.getElementById("swal-progress-p").innerText = percentage + "%";
    document.getElementById("swal-progress-bar").style.width = percentage + "%";
  };

  showUploding = (isShow = true, message = "Subiendo...") => {
    if (isShow) {
      swal.fire({
        allowOutsideClick: false,
        // title: message,
        html:
          '<h2 class="display-4 text-default mb-0">' +
          message +
          "</h2>" +
          '<div class="">' +
          "<br></br>" +
          '<span id="swal-progress-p" class="mr-2">0%</span>' +
          "<div>" +
          '<div class="progress" style="width: 100%;height: 10px">' +
          '<div id="swal-progress-bar" class="progress-bar bg-gradient-info" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>' +
          "</div>" +
          "</div>" +
          "</div>",
        showConfirmButton: false,
        showCancelButton: true,
        buttonsStyling: false,

        cancelButtonText: 'cancelar  <i class="fa fa-times"></i>',
        cancelButtonClass: "btn btn-default",
        // onBeforeOpen: () => {
        //     swal.showLoading()
        // }
      });
    } else {
      swal.close();
    }
  };
}

export default new Alerts();
