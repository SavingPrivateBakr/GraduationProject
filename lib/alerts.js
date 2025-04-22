import Swal from "sweetalert2";

export  function showErrorAlert(message) {
    Swal.fire({
        toast: true,
        icon: "error",
        title: message,
        position: "top-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });
}


export function showSuccess(message) {
    Swal.fire({
        toast: true,
        icon: "success",  
        title: message,
        position: "top-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#f8f9fa',  // Optional: lighter background
        iconColor: '#28a745'    // Optional: green icon color to match success theme
    });
}