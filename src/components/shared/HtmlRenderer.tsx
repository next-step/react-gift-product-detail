export const HtmlRenderer = ({ html }: { html: string }) => {
  return (
    <>
      <div className="html-content" dangerouslySetInnerHTML={{ __html: html }} />
      <style>
        {`
          .html-content img {
            max-width: 100%;
            height: auto;
          }
        `}
      </style>
    </>
  );
};
