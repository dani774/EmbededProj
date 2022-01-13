/*
*
* @param {string} s a string
* @return {number} a hash code value for the given string.
*/
export default function hashCode(s) {
    for(var i = 0, h = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    return h;
}