import { Box } from "@chakra-ui/react";
import * as React from "react";

interface ICardProps {}
const Card: React.FunctionComponent<ICardProps> = ({ children, ...rest }) => {
  return (
    <Box
      padding="6"
      boxShadow="lg"
      borderWidth="1px"
      borderRadius="lg"
      style={{
        height: "max-content",
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Card;
