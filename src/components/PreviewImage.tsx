import { Skeleton } from "@chakra-ui/react";
import * as React from "react";
import { MyFunctionDefaultStatic } from "../helpers/functionsConfig";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Skeletor: React.FunctionComponent = (props) => {
  return (
    <Skeleton
      {...props}
      style={{ height: "382px", width: "382px" }}
      as="div"
    ></Skeleton>
  );
};

interface IPreviewImageProps {
  func: MyFunctionDefaultStatic;
}
const PreviewImage: React.FunctionComponent<IPreviewImageProps> = ({
  func,
}) => {
  return (
    <LazyLoadImage
      src={func.preview}
      alt={func.prettyName || func.name}
      height={382}
      width={382}
      placeholder={<Skeletor />}
    />
  );
};

export default PreviewImage;
