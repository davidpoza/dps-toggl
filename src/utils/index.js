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
    },

    getHour(date){
        console.log(date);
        let regex = /(\d{2}:\d{2}):\d{2}/;
        return date.match(regex)[1];
    },

    //two dates are of the same day
    diffHoursBetDates(date_start, date_end){
        let regexHour = /(\d{2}):\d{2}:\d{2}/;
        let regexMin = /\d{2}:(\d{2}):\d{2}/;
        let regexSec = /\d{2}:\d{2}:(\d{2})/;
        let hour1 = date_start.match(regexHour)[1];
        let hour2 = date_end.match(regexHour)[1];
        let min1 = date_start.match(regexMin)[1];
        let min2 = date_end.match(regexMin)[1];
        let sec1 = date_start.match(regexSec)[1];
        let sec2 = date_end.match(regexSec)[1];
        return(this.pad(parseInt(hour2-hour1),2)+":"+this.pad(parseInt(min2-min1),2)+":"+this.pad(parseInt(sec2-sec1),2));
    }
}

export default utils;
