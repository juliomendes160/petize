import { useParams } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  VStack,
  Link,
  Spinner,
  Center,
} from "@chakra-ui/react";

import { useUser } from "../../hooks/useUser";

export function Profile() {
  const { username } = useParams();

  const { user, loading, error } = useUser(username);

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }


  if (error || !user) {
    return (
      <Center height="100vh">
        <Text fontSize="lg" color="red.500">
          Usuário não encontrado
        </Text>
      </Center>
    );
  }

  return (
    <Box p={6}>
      <VStack spacing={4}>
        <Image
          src={user.avatar_url}
          boxSize="120px"
          borderRadius="full"
        />

        <Text fontSize="xl" fontWeight="bold">
          {user.name ?? user.login}
        </Text>

        {user.bio && <Text>{user.bio}</Text>}

        <Link href={user.html_url} color="blue.500" isExternal>
          Ver no GitHub
        </Link>

        {user.twitter_username && (
          <Text>@{user.twitter_username}</Text>
        )}
      </VStack>
    </Box>
  );
}