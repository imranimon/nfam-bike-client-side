const { default: Swal } = require("sweetalert2")

const useSwal = () => {
    const swalConfirmation = (button, text = "") => {
        return Swal.fire({
            title: 'Are you sure?',
            text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${button} !`
        })
    }

    const swalSuccess = (title) => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title,
            showConfirmButton: false,
            timer: 1500
        })
    }

    const swalWarning = (title) => {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title,
            showConfirmButton: false,
            timer: 1500
        })
    }

    const swalError = (title) => {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title,
            showConfirmButton: false,
            timer: 1500
        })
    }
    const swalReturnSuccess = (title, button) => {
        return Swal.fire({
            title,
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: `${button}`
        })
    }

    const startLoading = (title) => {
        Swal.fire({
            title,
            backdrop: true,
            allowOutsideClick: () => {
                return false;
            },
            didOpen: () => {
                Swal.showLoading();
            },
        });
    }

    const stopLoading = () => {
        Swal.close();
    }

    return {
        swalConfirmation,
        swalReturnSuccess,
        swalSuccess,
        swalWarning,
        swalError,
        startLoading,
        stopLoading
    }
}

export default useSwal;