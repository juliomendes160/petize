import { Box, Spinner, Text, VStack, Link } from "@chakra-ui/react";
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
        const isLast = index === repos.length - 1;

        return (
          <Box
            key={repo.id}
            ref={isLast ? lastRepoRef : undefined}
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            p={4}
            _hover={{ boxShadow: "md" }}
          >
            <Link
              href={repo.html_url}
              isExternal
              fontWeight="bold"
              color="blue.500"
            >
              {repo.name}
            </Link>

            {repo.description && (
              <Text fontSize="sm" mt={2} color="gray.600">
                {repo.description}
              </Text>
            )}

            <Text fontSize="xs" color="gray.500" mt={2}>
              ⭐ {repo.stargazers_count} •{" "}
              {new Date(repo.updated_at).toLocaleDateString()}
            </Text>
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