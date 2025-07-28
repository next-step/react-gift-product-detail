export interface ParsedHTMLElement {
  type: "image" | "text";
  content: string;
  key: string;
}

export const parseHTMLContent = (html: string): ParsedHTMLElement[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const elements: ParsedHTMLElement[] = [];

  const paragraphs = doc.querySelectorAll("p");
  paragraphs.forEach((p, index) => {
    const img = p.querySelector("img");
    if (img) {
      const src = img.getAttribute("src");
      if (src) {
        elements.push({
          type: "image",
          content: src,
          key: `img-${index}`,
        });
      }
    } else if (p.textContent?.trim()) {
      elements.push({
        type: "text",
        content: p.textContent,
        key: `text-${index}`,
      });
    }
  });

  return elements;
};
