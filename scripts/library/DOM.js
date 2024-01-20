//@ts-check
export default class DOMHandler {
  /**
   * html: <p>태그 추가(after)
   * @param {string} query - cssSelector
   * @param {string} className - 생성된 태그 class명
   * @param {string} text - 추가할 text
   */
  static addTextAfter = (query, className, text) => {
    const element = document.querySelector(query);
    if (element) {
      const textTag = document.createElement('p');
      textTag.textContent = text;
      textTag.className = className.slice(1);
      element.after(textTag);
    }
  };
}
