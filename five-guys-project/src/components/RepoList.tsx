import RepoItem from "./RepoItem";
import styled from "styled-components";
import { RepoListProps, RepoType } from "../utils/types";
import React, { useState, useEffect } from "react";

const RepoList: React.FC<RepoListProps> = ({
  myRepos,
  // invitedRepos,
  onRepoEdit,
  onRepoDelete,
}) => {
  const [sortedMyRepos, setSortedMyRepos] = useState<RepoType[]>([]);

  useEffect(() => {
    setSortedMyRepos(
      [...myRepos].sort((a, b) => (b.bookmark ? 1 : 0) - (a.bookmark ? 1 : 0))
    );
  }, [myRepos]);


  const handleBookmarkChange = (repoId: number) => {
    const updateRepos = (repos: RepoType[]) => {
      return repos
        .map((repo) => {
          if (repo.repoId === repoId) {
            return {
              ...repo,
              bookmark: !repo.bookmark,
            };
          }
          return repo;
        })
        .sort((a, b) => (b.bookmark ? 1 : 0) - (a.bookmark ? 1 : 0));
    };

    setSortedMyRepos((prevRepos) => updateRepos(prevRepos));
  };

  return (
    <RepoListContainer>
      {sortedMyRepos.map((repo) => (
        <RepoItem
          key={repo.repoId}
          repo={repo}
          onEdit={onRepoEdit}
          onDelete={onRepoDelete}
          onBookmark={handleBookmarkChange}
        />
      ))}
      {/* {sortedInvitedRepos.map((repo) => (
        <RepoItem
          key={repo.repoId}
          repo={repo}
          onEdit={onRepoEdit}
          onDelete={onRepoDelete}
        />
      ))} */}
    </RepoListContainer>
  );
};

const RepoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #383142;
  border-radius: 10px;
  width: 100%;
`;

export default RepoList;
