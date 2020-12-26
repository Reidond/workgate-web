import { functions, MyFunctionDefault } from "../../helpers/functionsConfig";
import { FunctionComponent, ReactElement, useState } from "react";
import { InputArray } from "../../components/InputArray";
import { PanelStack } from "@blueprintjs/core";
import cn from "classnames";
import PreviewPanel from "../../components/PreviewPanel";

interface PreviewPanelSkeletonProps {
  loading: boolean;
  content: ReactElement;
}
const PreviewPanelSkeleton: FunctionComponent<PreviewPanelSkeletonProps> = ({
  loading,
  content,
}) => {
  if (loading) {
    return <div style={{ height: "430px" }} className="bp3-skeleton"></div>;
  }
  return content;
};

interface FuncProps {
  func: MyFunctionDefaultStatic;
}
const Func: FunctionComponent<FuncProps> = ({ func }) => {
  let [preview, setPreview] = useState(null);
  let [loading, setLoading] = useState(false);

  return (
    <>
      <section
        className={cn("panel-container", {
          "panel-container--one-col": !preview,
        })}
      >
        <InputArray
          endpoint={func.endpoint}
          inputs={func.inputs}
          setPreview={setPreview}
          setLoading={setLoading}
        />
        {preview && (
          <PreviewPanelSkeleton
            loading={loading}
            content={
              <PanelStack
                className={cn("bp3-elevation-1", "panel-stack")}
                initialPanel={{
                  component: PreviewPanel,
                  title: "Preview",
                  props: { preview, name: func.name },
                }}
              />
            }
          />
        )}
      </section>
      <style jsx>{`
        .panel-container {
          display: grid;
          grid-template-rows: auto;
          grid-template-columns: 1fr 1fr;
          gap: var(--bs-gutter-x, 0.75rem);
          padding: var(--bs-gutter-x, 0.75rem) 0;
        }
        .panel-container--one-col {
          grid-template-columns: 1fr;
        }
      `}</style>
      <style jsx global>{`
        .panel-stack {
          height: max-content;
        }

        .panel-stack .bp3-panel-stack-view {
          position: unset;
        }
      `}</style>
    </>
  );
};

interface MyFunctionDefaultStatic extends Omit<MyFunctionDefault, "endpoint"> {
  endpoint: string;
}
// This also gets called at build time
export async function getStaticProps({ params }) {
  const func = functions.find((f) => f.name === params.name);

  // Pass func data to the page via props
  return {
    props: {
      func: {
        ...func,
        endpoint: func.endpoint.call(null, { name: params.name }),
      },
    },
  };
}

// This function gets called at build time
export async function getStaticPaths() {
  // Get the paths we want to pre-render based on posts
  const paths = functions.map((f) => `/functions/${f.name}`);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export default Func;
