import { useState, useEffect } from "react";
import { api } from "../services/api";
import { repoSchema } from "../schemas/repo.schema";
import type { Repo } from "../schemas/repo.schema";

export function useRepos(username?: string) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const perPage = 10;

  useEffect(() => {
    if (!username) return;

    setRepos([]);
    setPage(1);
    setHasMore(true);
  }, [username]);

  useEffect(() => {
    if (!username || !hasMore) return;

    const fetchRepos = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/users/${username}/repos`, {
          params: { page, per_page: perPage, sort: "updated" },
        });
        const data = repoSchema.array().parse(response.data);

        setRepos((prev) => [...prev, ...data]);
        if (data.length < perPage) setHasMore(false);
      } catch (error) {
        console.error(error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username, page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return { repos, loading, hasMore, loadMore };
}