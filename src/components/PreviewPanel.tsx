// @refresh reset

import { FunctionComponent, memo, ReactElement, useEffect } from "react";
import equal from "fast-deep-equal/es6/react";
import { Box, Skeleton } from "@chakra-ui/react";
import { MyFunctionDefaultStatic } from "../helpers/functionsType";
import PreviewImage from "./PreviewImage";

interface PreviewPanelSkeletonProps {
  loading: boolean;
  content: ReactElement;
}
const PreviewPanelSkeleton: FunctionComponent<PreviewPanelSkeletonProps> = ({
  loading,
  content,
}) => {
  if (loading) {
    return (
      <Skeleton>
        <div style={{ height: "430px" }} />
      </Skeleton>
    );
  }
  return content;
};

interface PreviewPanelProps {
  func: MyFunctionDefaultStatic;
  preview: any | null;
  loading: boolean;
}
const PreviewPanel: FunctionComponent<PreviewPanelProps> = ({
  func,
  preview,
  loading,
}) => {
  useEffect(() => {
    preview && (window as any).Bokeh.embed.embed_item(preview, func.name);
  }, [preview, func.name]);

  if (!preview) {
    return (
      <Box
        style={{ height: "max-content" }}
        padding="6"
        boxShadow="lg"
        borderWidth="1px"
        borderRadius="lg"
      >
        <PreviewImage func={func} />
      </Box>
    );
  }

  return (
    <PreviewPanelSkeleton
      loading={loading}
      content={
        <Box
          style={{ height: "max-content" }}
          padding="6"
          boxShadow="lg"
          borderWidth="1px"
          borderRadius="lg"
          id={func.name}
        />
      }
    />
  );
};

function areEqual(prevProps: PreviewPanelProps, nextProps: PreviewPanelProps) {
  return equal(prevProps, nextProps);
}

export default memo(PreviewPanel, areEqual);
