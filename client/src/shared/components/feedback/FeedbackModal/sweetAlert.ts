import Swal from "sweetalert2";

export const successAlert = (
  title: string,
  text: string,
  onConfirm: () => void
) => {
  Swal.fire({
    title,
    text,
    icon: "success",
    confirmButtonText: "Ok",
    preConfirm: () => {
      onConfirm();
    },
  });
};

export const warningAlert = (
  title: string,
  text: string,
  onConfirm: () => void
) => {
  Swal.fire({
    title,
    text,
    icon: "warning",
    confirmButtonText: "Excluir bichinho",
    preConfirm: () => {
      onConfirm();
    },
    buttonsStyling: true,
    confirmButtonColor: "#ee3232",
    showCloseButton: true,
    showCancelButton: true,
    cancelButtonText: "Cancelar",
  });
};
