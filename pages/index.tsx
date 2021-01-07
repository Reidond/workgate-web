import { SimpleGrid, Container, Center } from "@chakra-ui/react";
import { functions } from "../config";
import HomeCard from "../src/components/HomeCard";
import { createInitialValues } from "../src/components/InputArray";
import {
  MyFunctionDefault,
  MyFunctionDefaultStatic,
} from "../src/helpers/functionsType";

export default function Home({ staticFunctions }) {
  return (
    <Container maxW="100%">
      <Center>
        <SimpleGrid
          alignItems="center"
          justifyContent="center"
          spacing="1rem"
          columns={{ base: 2, md: 3 }}
        >
          {staticFunctions.map((f: MyFunctionDefaultStatic) => (
            <HomeCard func={f} key={f.name} />
          ))}
        </SimpleGrid>
      </Center>
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
