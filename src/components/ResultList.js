import { useRef, useCallback } from "react";

const ResultList = ({ data, loading, onScrollIntoLastElement }) => {
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onScrollIntoLastElement();
          }
        },
        { rootMargin: "50px" }
      );
      if (node) observer.current.observe(node);
    },
    [loading]
  );
  return (
    <>
      <div className="container">
        {data.map(({ id, download_url, author }, index) => {
          const _ref = index === data.length - 1 ? lastElementRef : null;
          return (
            <div className="image-container" ref={_ref}>
              <img
                className="image"
                alt={author}
                key={id}
                src={download_url}
                height={144}
                width={256}
                loading={index < 50 ? "egaer" : "lazy"}
              />
              <p>{author}</p>
            </div>
          );
        })}
      </div>
      {loading && <div class="loader"></div>}
    </>
  );
};

export default ResultList;
