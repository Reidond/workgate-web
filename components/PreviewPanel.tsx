import { IPanelProps } from "@blueprintjs/core";
import { FunctionComponent, memo } from "react";
import equal from "fast-deep-equal/es6/react";

interface PreviewPanelProps {
  name: string;
  preview: any;
}
const PreviewPanel: FunctionComponent<IPanelProps & PreviewPanelProps> = ({
  name,
  preview,
}) => {
  (window as any).Bokeh.embed.embed_item(preview);
  return <div id={name} />;
};

function areEqual(
  prevProps: IPanelProps & PreviewPanelProps,
  nextProps: IPanelProps & PreviewPanelProps
) {
  return equal(prevProps, nextProps);
}

export default memo(PreviewPanel, areEqual);
