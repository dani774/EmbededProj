/**
* @param text get a string text and return 'fa' if there was one farsi character in text
* else return 'en' and as default language return 'en' when an error occurred
*/
export default function getLanguage(text) {
    try {
        if(text) {
            for (let index = 0; index < text.length && index < 200; index++) {
                const char = text.substring(index, index + 1);
                if (char.charCodeAt(0) >= 1569) {
                    return 'fa';
                }
            }
        }
        return 'en';
    } catch (error) {
        console.error("an error throw from detectLanguage in getLanguage(), returned 'en' as default", error);
        return 'en';
    }
}
