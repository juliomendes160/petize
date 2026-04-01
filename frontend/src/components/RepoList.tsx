import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import type { Repo } from "../schemas/repo.schema";
import { useRef, useCallback } from "react";

interface RepoListProps {
  repos: Repo[];
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
}

export function RepoList({ repos, loadMore, hasMore, loading }: RepoListProps) {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastRepoRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  return (
    <VStack spacing={4} align="stretch">
      {repos.map((repo, index) => {
        if (index === repos.length - 1) {
          return (
            <Box
              key={repo.id}
              ref={lastRepoRef}
              p={4}
              borderWidth={1}
              borderRadius="md"
            >
              <Text fontWeight="bold">{repo.name}</Text>
              <Text fontSize="sm">{repo.description}</Text>
            </Box>
          );
        }

        return (
          <Box key={repo.id} p={4} borderWidth={1} borderRadius="md">
            <Text fontWeight="bold">{repo.name}</Text>
            <Text fontSize="sm">{repo.description}</Text>
          </Box>
        );
      })}

      {loading && (
        <Box textAlign="center" p={4}>
          <Spinner />
        </Box>
      )}

      {!hasMore && !loading && repos.length > 0 && (
        <Text textAlign="center" color="gray.500">
          Todos os repositórios foram carregados.
        </Text>
      )}
    </VStack>
  );
}