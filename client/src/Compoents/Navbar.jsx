import React from "react";
import { Flex, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box>
    <Box h={"60px"}>
      <Flex justifyContent={"space-evenly"} paddingTop={"10px"}>
        <Link to={'/'}>
          <Button colorScheme='teal' variant='outline'>Home</Button>
        </Link>
        <Link to={'/listuser'}>
          <Button colorScheme='teal' variant='outline'>All Users</Button>
        </Link>
      </Flex>
    </Box>
    </Box>
  );
};

export default Navbar;
