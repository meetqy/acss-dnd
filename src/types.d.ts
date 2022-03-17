export interface CheckedElement {
  tagName: string;
  className: string;
  innerText: string;
  innerHTML: string;
  // outerHTML = <tagName className>innerHTML</tagName>
}
