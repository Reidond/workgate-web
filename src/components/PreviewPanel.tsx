import {FunctionComponent, memo, useEffect} from "react";
import equal from "fast-deep-equal/es6/react";
import { Box } from "@chakra-ui/react";
import {nanoid} from "nanoid";

interface PreviewPanelProps {
  name: string;
  preview: any;
}
const PreviewPanel: FunctionComponent<PreviewPanelProps> = ({
  name,
  preview,
}) => {
  const id = `id${nanoid()}`;
  useEffect(() => {
    (window as any).Bokeh.embed.embed_item(preview, id);
  }, [])
  return (
    <Box
      style={{height: "max-content"}}
      padding="6"
      boxShadow="lg"
      borderWidth="1px"
      borderRadius="lg"
      id={id}
    />
  );
};

function areEqual(prevProps: PreviewPanelProps, nextProps: PreviewPanelProps) {
  return equal(prevProps, nextProps);
}

export default memo(PreviewPanel, areEqual);
