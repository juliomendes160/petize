import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  VStack,
  Link,
  Spinner,
  Center,
  Heading,
  Avatar,
  Flex,
  Button,
} from "@chakra-ui/react";

import { useUser } from "../../hooks/useUser";
import { useRepos } from "../../hooks/useRepos";
import { RepoList } from "../../components/RepoList";
import { SortSelect } from "../../components/SortSelect";

type SortOption = "updated" | "stargazers" | "name";

export function Profile() {
  const { username = "" } = useParams<{ username: string }>();

  const { user, loading: userLoading, error } = useUser(username);

  const [sort, setSort] = React.useState<SortOption>("updated");

  const { repos, loadMore, hasMore, loading: reposLoading } = useRepos(
    username,
    sort
  );

  if (userLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error || !user) {
    return (
      <Center h="100vh">
        <Text color="red.500">Usuário não encontrado</Text>
      </Center>
    );
  }

  return (
    <Box bg="gray.100" minH="100vh" py={6}>
      <Flex maxW="1100px" mx="auto" px={4} direction={{ base: "column", md: "row" }} gap={8}>
        
        {/* SIDEBAR */}
        <Box
          w={{ base: "full", md: "260px" }}
          bg="white"
          p={5}
          borderRadius="md"
          border="1px solid"
          borderColor="gray.200"
        >
          <VStack
            align={{ base: "center", md: "flex-start" }}
            textAlign={{ base: "center", md: "left" }}
            spacing={3}
          >
            <Avatar src={user.avatar_url} size="xl" />

            <Text fontWeight="bold" fontSize="lg">
              {user.name ?? user.login}
            </Text>

            {user.bio && (
              <Text fontSize="sm" color="gray.500">
                {user.bio}
              </Text>
            )}

            <Button colorScheme="purple" w="full">
              Contato
            </Button>

            <Link href={user.html_url} isExternal color="blue.500">
              GitHub
            </Link>
          </VStack>
        </Box>

        {/* CONTEÚDO */}
        <Box flex="1">
          <Flex
            justify="space-between"
            direction={{ base: "column", md: "row" }}
            gap={4}
            mb={4}
          >
            <Heading size="lg" color="gray.800">
              Repositórios
            </Heading>

            <SortSelect value={sort} onChange={setSort} />
          </Flex>

          <RepoList
            repos={repos}
            loadMore={loadMore}
            hasMore={hasMore}
            loading={reposLoading}
          />
        </Box>
      </Flex>
    </Box>
  );
}