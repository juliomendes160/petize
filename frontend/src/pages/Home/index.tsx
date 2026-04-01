import { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    if (!username.trim()) return;
    navigate(`/profile/${username}`);
  }

  return (
    <Box
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
      px={4}
    >
      <VStack spacing={6} w="full" maxW="400px">
        <Heading textAlign="center">
          <Text as="span" color="blue.500">
            Search
          </Text>{" "}
          <Text as="span" color="purple.500">
            d_evs
          </Text>
        </Heading>

        <HStack w="full">
          <Input
            placeholder="Search"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            bg="white"
            borderColor="gray.200"
          />

          <Button colorScheme="purple" onClick={handleSearch}>
            Search
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}