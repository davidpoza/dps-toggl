const utils = {
    /** Convierte un cantidad de segundos transcurridos a una cadena hh:mm:ss */
    secondsToFormatedString(time){
        let aux = time;
        let hours = parseInt(time / 3600);
        aux = time % 3600;       
        let min = parseInt(aux / 60);
        let sec = aux % 60;
    
        return `${this.pad(hours,2)}:${this.pad(min,2)}:${this.pad(sec,2)}`;
    },

    /** Convierte una cadena estándar: YYYY-MM-DD a una cadena del tipo Viernes 13 de Abril */
    standarDateToHuman(date){
        let d = new Date(date);
        let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        let weekDays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        return `${weekDays[d.getDay()]} ${d.getDate()} de ${months[d.getMonth()]}`;
    },

    /** Recibe un número y devuelve una cadena con la longitud indicada como segundo parámetro.
        Rellenando si es necesario con ceros por la izquierda */
    pad(str, max) {
        str = str.toString();
        return str.length < max ? this.pad("0" + str, max) : str;
    },

    /** Convierte un objeto Date a una cadena estándar: YYYY-MM-DD HH:MM:SS */
    standarizeDatetime(date){
        return `${date.getFullYear()}-${this.pad(date.getMonth()+1,2)}-${this.pad(date.getDate(),2)} ${this.pad(date.getHours(),2)}:${this.pad(date.getMinutes(),2)}:${this.pad(date.getSeconds(),2)}`;
    },

    /** Convierte un objeto Date a una cadena estándar: YYYY-MM-DD */
    standarizeDate(date){
        return `${date.getFullYear()}-${this.pad(date.getMonth()+1,2)}-${this.pad(date.getDate(),2)}`;
    },

    /** Convierte un objeto Date a una cadena YYYY-MM-DD */
    removeHour(date){
        return `${date.getFullYear()}-${this.pad(date.getMonth()+1,2)}-${this.pad(date.getDate(),2)}`;
    },

    /** Dada una cadena HH:MM:SS devuelve solo la parte HH:MM */
    removeSeconds(date){
        let regex = /(\d{2}:\d{2}):\d{2}/;
        return date.match(regex)[1];
    },

    /** Dada una cadena HH:MM devuekve solo la parte HH */
    getHour(date){
        let regex = /(\d{2}):\d{2}/;
        return date.match(regex)[1];
    },

    /** Dada una cadena HH:MM devuelve solo la parte MM */
    getMinutes(date){
        let regex = /\d{2}:(\d{2})/;
        return date.match(regex)[1];
    },

    /** Dado un objeto Date devuelve una cadena con la hora en el formato HH:MM */
    getHourFromDate(date){
        return this.pad(date.getHours(),2)+":"+this.pad(date.getMinutes(),2);
    },

    /** Dado un objeto Date devuelve una cadena con la hora en el formato HH:MM:SS */
    getHourSecFromDate(date){
        return this.pad(date.getHours(),2)+":"+this.pad(date.getMinutes(),2)+":"+this.pad(date.getSeconds(),2);
    },

   /** Dado un objeto Date devuelve una cadena con la hora en el formato HH:MM:SS */
    getHourInSecFromDate(date){
        return (parseInt(date.getHours())*3600+parseInt(date.getMinutes())*60+parseInt(date.getSeconds()));
    },

    /** Dadas dos horas como cadena HH:MM:SS, devuelve la diferencia entre ellas con el formato HH:MM:SS */
    diffHoursBetDates(hour_start, hour_end){
        let regexHour = /(\d{2}):\d{2}:\d{2}/;
        let regexMin = /\d{2}:(\d{2}):\d{2}/;
        let regexSec = /\d{2}:\d{2}:(\d{2})/;
        let hour1 = hour_start.match(regexHour)[1];
        let hour2 = hour_end.match(regexHour)[1];
        let min1 = hour_start.match(regexMin)[1];
        let min2 = hour_end.match(regexMin)[1];
        let sec1 = hour_start.match(regexSec)[1];
        let sec2 = hour_end.match(regexSec)[1];
        let start_in_secs = parseInt(sec1) + parseInt(min1*60) + parseInt(hour1*60*60);
        let end_in_secs = parseInt(sec2) + parseInt(min2*60) + parseInt(hour2*60*60);
        return(this.secondsToFormatedString(end_in_secs-start_in_secs));
    },

    /** Devuelve true si se ejecuta desde un navegador movil.
     * from detectmobilebrowsers.com)
    */
    isMobile() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    },

    /** Comprueba que la cadena sea una hora en formato 24 horas del tipo HH:MM */
    validateHour(hour){
        let regex = /([01][0-9]|2[0-3]):[0-5][0-9]/;
        return regex.test(hour);
    },

    /** Dadas dos cadenas del tipo HH:MM, devuelve true si la primera es mayor que la segunda */
    hourIsGreater(hour1, hour2){
        let hh1 = parseInt(this.getHour(hour1));
        let hh2 = parseInt(this.getHour(hour2));
        let mm1 = parseInt(this.getMinutes(hour1));
        let mm2 = parseInt(this.getMinutes(hour2));
        return hh1*60+mm1 > hh2*60+mm2;
    }


}


export default utils;
