import {
  functions,
  MyFunctionDefaultStatic,
} from "../../src/helpers/functionsConfig";
import { FunctionComponent, useEffect, useState } from "react";
import {
  createInitialValues,
  InputArray,
} from "../../src/components/InputArray";
import PreviewPanel from "../../src/components/PreviewPanel";
import { Grid, Container, Skeleton } from "@chakra-ui/react";
import useRouteChanged from "../../src/hooks/use-route-changed";
import Card from "../../src/components/Card";

interface FuncProps {
  func: MyFunctionDefaultStatic;
}
const Func: FunctionComponent<FuncProps> = ({ func }) => {
  let [preview, setPreview] = useState(null);
  let [loading, setLoading] = useState(false);
  let [inputs, setInputs] = useState(func.inputs);

  useRouteChanged(() => {
    setPreview(null);
  });

  useEffect(() => {
    setInputs(func.inputs);
  }, [func.inputs]);

  return (
    <Container maxW="100%">
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Card>
          <InputArray
            endpoint={func.endpoint}
            inputs={inputs}
            setPreview={setPreview}
            setLoading={setLoading}
          />
        </Card>
        <PreviewPanel loading={loading} preview={preview} func={func} />
      </Grid>
    </Container>
  );
};

// This also gets called at build time
export async function getStaticProps({ params }) {
  const func = functions.find((f) => f.name === params.name);
  const endpoint = func.endpoint.call(null, { name: params.name });

  // Pass func data to the page via props
  return {
    props: {
      func: {
        ...func,
        endpoint: func.endpoint.call(null, { name: params.name }),
        preview: `${endpoint}/image?${new URLSearchParams(
          createInitialValues(func.inputs)
        ).toString()}`,
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
