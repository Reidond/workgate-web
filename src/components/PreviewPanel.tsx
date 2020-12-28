import { FunctionComponent, memo } from "react";
import equal from "fast-deep-equal/es6/react";
import { Box } from "@chakra-ui/react";

interface PreviewPanelProps {
  name: string;
  preview: any;
}
const PreviewPanel: FunctionComponent<PreviewPanelProps> = ({
  name,
  preview,
}) => {
  (window as any).Bokeh.embed.embed_item(preview);
  return (
    <Box
      style={{ height: "max-content" }}
      padding="6"
      boxShadow="lg"
      borderWidth="1px"
      borderRadius="lg"
      id={name}
    ></Box>
  );
};

function areEqual(prevProps: PreviewPanelProps, nextProps: PreviewPanelProps) {
  return equal(prevProps, nextProps);
}

export default memo(PreviewPanel, areEqual);
