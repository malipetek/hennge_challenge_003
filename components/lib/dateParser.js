export function dymd (s) {
    if(s.constructor === Date) return s;
    const d = new Date();
    const [year, month, day] = s.split('/').map(n => parseInt(n, 10));
    d.setDate(day);
    d.setMonth(month - 1);
    d.setFullYear(year);
    return d;
}
export function ddmy (s) {
    if(s.constructor === Date) return s;
    const d = new Date();
    const [day, month, year] = s.split('/').map(n => parseInt(n, 10));
    d.setDate(day);
    d.setMonth(month - 1);
    d.setFullYear(year);
    return d;
}