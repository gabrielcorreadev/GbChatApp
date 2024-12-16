export const timeAgo = (prevDate:any) => {
    const diff = Number(new Date()) - prevDate;
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;
    switch (true) {
        case diff < minute:
            const seconds = Math.round(diff / 1000);
             return `${seconds} ${seconds > 1 ? 'segundos' : 'segundo'} atrás`
        case diff < hour:
            return Math.round(diff / minute) + ' minutos atrás';
        case diff < day:
            return Math.round(diff / hour) + ' horas atrás';
        case diff < month:
            return Math.round(diff / day) + ' dias atrás';
        case diff < year:
            return Math.round(diff / month) + ' meses antes';
        case diff > year:
            return Math.round(diff / year) + ' anos atrás';
        default:
            return "";
    }
};