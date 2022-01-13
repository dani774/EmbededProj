export default Ellipsis = (text = '', length = 0) => {
    try {
        const myText = text.toString();
        if (text.length > length) {
            const subStr = myText.substr(0, parseInt(length)).concat('...');
            return subStr;
        }
        return text;
    } catch (error) {
    }
}