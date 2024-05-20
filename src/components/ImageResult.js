import { forwardRef } from "react";

const ImageResult = ({ style, details, imageUrl, id }, ref) => {
  return (
    <div className="image-container" style={style} ref={ref} key={id}>
      <img
        className="image"
        alt={details}
        src={imageUrl}
        height={144}
        width={256}
      />
      <div>{details}</div>
    </div>
  );
};

export default forwardRef(ImageResult);
