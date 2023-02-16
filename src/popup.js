import Swal from "sweetalert2";

export const errorPopup = (title, message) => {
  Swal.fire({
    icon: "error",
    title: title,
    text: message,
    confirmButtonColor: "#36899e",
  });
};

export const warningPopup = (title, message) => {
  Swal.fire({
    icon: "warning",
    title: title,
    text: message,
    confirmButtonColor: "#36899e",
    timer: 2500,
    timerProgressBar: true,
  });
};

export const successPopup = (title, message) => {
  Swal.fire({
    icon: "success",
    title: title,
    text: message,
    confirmButtonColor: "#36899e",
    timer: 2500,
    timerProgressBar: true,
  });
};
