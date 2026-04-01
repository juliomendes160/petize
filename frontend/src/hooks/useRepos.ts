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
    if (!username || !hasMore) return;

    const fetchRepos = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/users/${username}/repos`, {
          params: {
            page,
            per_page: perPage,
            sort: sort === "updated" ? "updated" : "full_name",
            direction: sort === "stargazers" ? "desc" : "asc",
          },
        });

        const data = repoSchema.array().parse(response.data);
        
        if (sort === "stargazers") {
          data.sort((a, b) => b.stargazers_count - a.stargazers_count);
        }

        setRepos((prev) => [...prev, ...data]);
        if (data.length < perPage) setHasMore(false);
      } catch (err) {
        console.error(err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username, page, sort, hasMore]);

  const loadMore = () => {
    if (!loading && hasMore) setPage((prev) => prev + 1);
  };

  return { repos, loading, hasMore, loadMore };
}