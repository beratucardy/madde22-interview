import Swal from "sweetalert2";

export const toast = (title, icon = "info", timer = 4000) => {
  Swal.fire({
    position: "middle",
    icon,
    title,
    showConfirmButton: false,
    timer,
  });
};
