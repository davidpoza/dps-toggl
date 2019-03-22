const utils = {
    format(time){
        let aux = time;
        let hours = parseInt(time / 3600);
        aux = time % 3600;       
        let min = parseInt(aux / 60);
        let sec = aux % 60;
    
        if (hours.toString().length < 2)  hours="0"+hours;
        if (min.toString().length < 2)  min="0"+min;
        if (sec.toString().length < 2)  sec="0"+sec;
    
        return `${hours}:${min}:${sec}`;
    },

    pad(str, max) {
        str = str.toString();
        return str.length < max ? this.pad("0" + str, max) : str;
    },

    standarizeDate(date){
        return `${date.getFullYear()}-${this.pad(date.getMonth(),2)}-${this.pad(date.getDay(),2)} ${this.pad(date.getHours(),2)}:${this.pad(date.getMinutes(),2)}:${this.pad(date.getSeconds(),2)}`;
    }
}

export default utils;
