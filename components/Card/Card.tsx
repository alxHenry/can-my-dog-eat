import { FC } from "react";
import { Box } from "@chakra-ui/react";

const Card: FC = ({ children }) => {
  return (
    <Box borderWidth="1px" borderColor="#e2e8ef" borderRadius="8px" padding="20px" marginX="8px">
      {children}
    </Box>
  );
};

export default Card;
