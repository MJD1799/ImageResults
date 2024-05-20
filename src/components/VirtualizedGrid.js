import { useRef, useEffect } from "react";
import { Grid, WindowScroller, AutoSizer } from "react-virtualized";
import useWindowSize from "../hooks/useWindowSize";

const getColumnCount = (width, itemMinWidth) => {
  return Math.floor(width / itemMinWidth);
};
const getItemWidth = (width, columnCount) => {
  return width / columnCount;
};

const VirtualizedGrid = ({
  data,
  loading,
  itemMinWidth,
  itemHeight,
  renderCell,
}) => {
  const containerRef = useRef();
  const gridRef = useRef();
  const windowSize = useWindowSize();
  useEffect(() => {
    gridRef.current?.recomputeGridSize();
  }, [windowSize]);

  return (
    <>
      <div className="virtualized-container" ref={containerRef}>
        <WindowScroller>
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <AutoSizer>
              {() => {
                const containerWidth = containerRef?.current?.clientWidth;
                const columnCount = getColumnCount(
                  containerWidth,
                  itemMinWidth
                );
                const rowCount = Math.ceil(data.length / columnCount);
                const itemWidth =
                  itemMinWidth ?? getItemWidth(containerWidth, columnCount);

                return (
                  <Grid
                    ref={gridRef}
                    autoHeight
                    columnCount={columnCount}
                    columnWidth={itemWidth}
                    width={containerWidth}
                    height={height}
                    rowCount={rowCount}
                    rowHeight={itemHeight}
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                    onScroll={onChildScroll}
                    cellRenderer={(cellProps) =>
                      renderCell({ ...cellProps, columnCount, data })
                    }
                  />
                );
              }}
            </AutoSizer>
          )}
        </WindowScroller>
      </div>
      {loading && <div className="loader"></div>}
    </>
  );
};

export default VirtualizedGrid;
