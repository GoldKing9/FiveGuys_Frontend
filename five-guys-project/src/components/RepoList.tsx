import RepoItem from "./RepoItem";
import styled from "styled-components";
import { RepoListProps } from "../utils/types";
// import { useState } from "react";

const RepoList: React.FC<RepoListProps> = ({
  myRepos,
  invitedRepos,
  onRepoEdit,
  onRepoDelete,
}) => {
  // const [myRepos, setMyRepos] = useState(initialMyRepos);
  // const [invitedRepos, setInvitedRepos] = useState(initialInvitedRepos);

  const sortedMyRepos = [...myRepos].sort(
    (a, b) => (b.bookmark ? 1 : 0) - (a.bookmark ? 1 : 0)
  );

  const sortedInvitedRepos = [...invitedRepos].sort(
    (a, b) => (b.bookmark ? 1 : 0) - (a.bookmark ? 1 : 0)
  );

  // const handleBookmark = (repoId: number) => {
  //   const repoIndex = myRepos.findIndex((repo) => repo.repoId === repoId);
  //   if (repoIndex > -1) {
  //     const updatedRepos = [...myRepos];
  //     updatedRepos[repoIndex].bookmark = !updatedRepos[repoIndex].bookmark;
  //     setMyRepos(updatedRepos); // 상태 업데이트
  //   } else {
  //     const invitedRepoIndex = invitedRepos.findIndex((repo) => repo.repoId === repoId);
  //     if (invitedRepoIndex > -1) {
  //       const updatedInvitedRepos = [...invitedRepos];
  //       updatedInvitedRepos[invitedRepoIndex].bookmark = !updatedInvitedRepos[invitedRepoIndex].bookmark;
  //       setInvitedRepos(updatedInvitedRepos); // 상태 업데이트
  //     }
  //   }
  // };


  return (
    <RepoListContainer>
      {sortedMyRepos.map((repo) => (
        <RepoItem
          key={repo.repoId}
          repo={repo}
          onEdit={onRepoEdit}
          onDelete={onRepoDelete}
          // onBookmark={handleBookmark}
        />
      ))}
      {sortedInvitedRepos.map((repo) => (
        <RepoItem
          key={repo.repoId}
          repo={repo}
          onEdit={onRepoEdit}
          onDelete={onRepoDelete}
          // onBookmark={handleBookmark}
        />
      ))}
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

// const RepoItemContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   border-bottom: 1px solid #e5cff7;
//   padding: 0 10px;
//   box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
//   transition: box-shadow 0.3s ease;

//   &:hover {
//     box-shadow: 1px 3px 15px rgba(0, 0, 0, 0.5);
//   }
// `;

// const RepoItemInfo = styled.p`
//   color: white;
// `;

export default RepoList;
