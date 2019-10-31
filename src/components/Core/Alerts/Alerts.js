import swal from 'sweetalert2';

class Alerts {
    static timer = 1000;

    static insertSuccess(title = null) {
        swal({
            position: 'top-end',
            type: 'success',
            title: title ? title : '¡Guardado!',
            showConfirmButton: false,
            timer: this.timer
        });
    }

    static insertError(title = null) {
        swal({
            position: 'top-end',
            type: 'error',
            title: title ? title : '¡Error al guardar!',
            showConfirmButton: false,
            timer: this.timer
        });
    }

    static updateSuccess(title = null) {
        swal({
            position: 'top-end',
            type: 'success',
            title: title ? title : '¡Actualizado!',
            showConfirmButton: false,
            timer: this.timer
        });
    }

    static updateError(title = null) {
        swal({
            position: 'top-end',
            type: 'error',
            title: title ? title : '¡Error al actualizar!',
            showConfirmButton: false,
            timer: this.timer
        });
    }

    static deleteSuccess(title = null) {
        swal({
            position: 'top-end',
            type: 'success',
            title: title ? title : '¡Destruido!',
            showConfirmButton: false,
            timer: this.timer
        });
    }

    static deleteError(title = null) {
        swal({
            position: 'top-end',
            type: 'error',
            title: title ? title : '¡Error al destruir!',
            showConfirmButton: false,
            timer: this.timer
        });
    }

    static deletePrompt(callback = null) {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    callback();
                }
            });
    }
}

export default Alerts;