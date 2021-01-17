import Swal from 'sweetalert2';

const popUp = ( icon, color, title, msg ) => {
    Swal.fire( { 
        confirmButtonColor: color,
        hideClass: {
            popup: 'animate__animated animate__zoomOut'
        },
        icon: icon,
        iconColor: color,
        showClass: {
            popup: 'animate__animated animate__zoomIn'
        },
        title: `<h6>${ title }</h6>`, 
        text: msg,
        width: '21rem'
    } );
};

export default popUp;
