import { Badge, Box } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { MyFunctionDefaultStatic } from "../helpers/functionsType";
import Link from "next/link";
import PreviewImage from "./PreviewImage";

interface IHomeCardProps {
  func: MyFunctionDefaultStatic;
}
const HomeCard: FunctionComponent<IHomeCardProps> = ({ func }) => {
  return (
    <Link
      aria-label="Go to Chakra UI GitHub page"
      href={`/functions/${func.name}`}
    >
      <Box
        maxW="sm"
        as="a"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        _hover={{
          boxShadow: "lg",
          cursor: "pointer",
        }}
      >
        <PreviewImage func={func} />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              {func.name}
            </Badge>
            {func?.inputs && (
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {func?.inputs.length} inputs
              </Box>
            )}
          </Box>

          {func?.prettyName && (
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {func.prettyName}
            </Box>
          )}
        </Box>
      </Box>
    </Link>
  );
};

export default HomeCard;
