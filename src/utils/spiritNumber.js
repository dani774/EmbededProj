import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/fa';
// this function gets a number with english digits
//       returns:
//         ۱/۲۳۴/۵۶۷ if language is fa
//         1/234/567 if language is en

export function spiritNumber(number) {
    // alert(number)
    // split number by three digit in js
    let seperatedNumber = '';
    if (typeof (number) === 'number') {
        seperatedNumber = new Intl.NumberFormat('fa').format(number).split('٬').join(',');
    }
    return seperatedNumber;
}
