import { Wrap, WrapItem, Container } from "@chakra-ui/react";
import HomeCard from "../src/components/HomeCard";
import { createInitialValues } from "../src/components/InputArray";
import {
  functions,
  MyFunctionDefault,
  MyFunctionDefaultStatic,
} from "../src/helpers/functionsConfig";

export default function Home({ staticFunctions }) {
  return (
    <Container maxW="100%">
      <Wrap spacing="1rem">
        {staticFunctions.map((f: MyFunctionDefaultStatic) => (
          <WrapItem key={f.name}>
            <HomeCard func={f} />
          </WrapItem>
        ))}
      </Wrap>
    </Container>
  );
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const staticFunctions: MyFunctionDefaultStatic[] = ((functions as unknown) as MyFunctionDefault[]).map(
    (f) => {
      const endpoint = f.endpoint.call(null, { name: f.name });
      const preview = `${endpoint}/image?${new URLSearchParams(
        createInitialValues(f.inputs)
      ).toString()}`;
      return {
        ...f,
        endpoint,
        preview,
      };
    }
  );

  // Pass func data to the page via props
  return {
    props: {
      staticFunctions,
    },
  };
}
