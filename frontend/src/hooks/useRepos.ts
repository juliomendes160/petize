import { useState, useEffect } from "react";
import { api } from "../services/api";
import { repoSchema } from "../schemas/repo.schema";
import type { Repo } from "../schemas/repo.schema";

export type SortOption = "updated" | "stargazers" | "name";

export function useRepos(username?: string, sort: SortOption = "updated") {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const perPage = 10;

  useEffect(() => {
    setRepos([]);
    setPage(1);
    setHasMore(true);
  }, [username, sort]);

  useEffect(() => {
    if (!username || loading || !hasMore) return;

    const fetchRepos = async () => {
      setLoading(true);

      try {
        const response = await api.get(`/users/${username}/repos`, {
          params: {
            page,
            per_page: perPage,
          },
        });

        const data = repoSchema.array().parse(response.data);

        if (data.length < perPage) {
          setHasMore(false);
        }

        setRepos((prev) => {
          const merged = [...prev, ...data];

          if (sort === "stargazers") {
            return merged.sort(
              (a, b) => b.stargazers_count - a.stargazers_count
            );
          }

          if (sort === "name") {
            return merged.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
          }

          return merged.sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          );
        });
      } catch (err) {
        console.error(err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username, page, sort]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return { repos, loading, hasMore, loadMore };
}