import { useRef, useCallback, useState } from "react";
import ImageResult from "./components/ImageResult";
import VirtualizedGrid from "./components/VirtualizedGrid";
import useSearch from "./hooks/useSearch";

import "./styles.css";

export default function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, data } = useSearch({ page: pageNumber });
  const observer = useRef();
  const observerElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
          }
        },
        { rootMargin: "50px" }
      );
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const renderCell = ({ columnCount, rowIndex, columnIndex, style, key }) => {
    const index = rowIndex * columnCount + columnIndex;
    let _ref = null;
    if (index === data.length - 1) {
      _ref = observerElementRef;
    }

    return (
      <ImageResult
        style={style}
        ref={_ref}
        details={data[index]?.author}
        imageUrl={data[index]?.download_url}
        id={key}
      />
    );
  };
  return (
    <div className="App">
      {/* search is not supported */}
      <input type="text" placeholder="Search images..." />
      <VirtualizedGrid
        data={data}
        loading={loading}
        renderCell={renderCell}
        itemHeight={176}
        itemMinWidth={256}
      />
    </div>
  );
}
