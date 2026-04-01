import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  VStack,
  Link,
  Spinner,
  Center,
  Heading,
  Select,
} from "@chakra-ui/react";

import { useUser } from "../../hooks/useUser";
import { useRepos } from "../../hooks/useRepos";
import { RepoList } from "../../components/RepoList";

type SortOption = "updated" | "stargazers" | "name";

export function Profile() {
  const { username } = useParams<{ username: string }>();

  const { user, loading: userLoading, error } = useUser(username);

  const [sort, setSort] = React.useState<SortOption>("updated");

  const { repos, loadMore, hasMore, loading: reposLoading } = useRepos(
    username,
    sort
  );

  if (userLoading) {
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
      <VStack spacing={4} align="center">
        <Image src={user.avatar_url} boxSize="120px" borderRadius="full" />

        <Text fontSize="xl" fontWeight="bold">
          {user.name ?? user.login}
        </Text>

        {user.bio && <Text>{user.bio}</Text>}

        <Link href={user.html_url} color="blue.500" isExternal>
          Ver no GitHub
        </Link>

        {user.twitter_username && <Text>@{user.twitter_username}</Text>}
      </VStack>

      <Box mt={8}>
        <Heading size="lg" mb={4}>
          Repositórios
        </Heading>

        <Select
          mb={4}
          maxW="200px"
          value={sort}
          onChange={(e) =>
            setSort(e.target.value as SortOption)
          }
        >
          <option value="updated">Últimos atualizados</option>
          <option value="stargazers">Mais estrelas</option>
          <option value="name">Ordem alfabética</option>
        </Select>

        <RepoList
          repos={repos}
          loadMore={loadMore}
          hasMore={hasMore}
          loading={reposLoading}
        />
      </Box>
    </Box>
  );
}