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
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useUser } from "../../hooks/useUser";
import { useRepos } from "../../hooks/useRepos";
import { RepoList } from "../../components/RepoList";
import { SortSelect } from "../../components/SortSelect";

type SortOption = "updated" | "stargazers" | "name";

export function Profile() {
  const { username } = useParams<{ username: string }>();
  const { t } = useTranslation();

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
        <Text fontSize="lg" color="red.500">
          {t("notFound")}
        </Text>
      </Center>
    );
  }

  return (
    <Box p={4} maxW="900px" mx="auto">
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "flex-start" }}
        gap={6}
      >
        <Avatar src={user.avatar_url} size="xl" />

        <VStack align="start" spacing={2}>
          <Text fontSize="2xl" fontWeight="bold">
            {user.name ?? user.login}
          </Text>

          {user.bio && <Text>{user.bio}</Text>}

          <Link href={user.html_url} color="blue.500" isExternal>
            {t("viewGithub")}
          </Link>

          {user.twitter_username && (
            <Text fontSize="sm">@{user.twitter_username}</Text>
          )}
        </VStack>
      </Flex>

      <Box mt={8}>
        <Flex
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          direction={{ base: "column", md: "row" }}
          gap={4}
        >
          <Heading size="lg">{t("repositories")}</Heading>

          <SortSelect value={sort} onChange={setSort} />
        </Flex>

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