export interface RepoType {
  repoId: number;
  repoName: string;
  createdAt: string;
  updatedAt: string;
  bookmark: boolean;
  invitedUserCnt: number;
  isInvited: boolean;
}

export interface onCloseType {
  onClose: () => void;
}

export interface updateRepoType {
  updateRepo: (repoList: RepoType) => void;
}

export interface RepoListProps {
  myRepos: RepoType[];
  invitedRepos: RepoType[];
  onRepoEdit?: (repoId: number, repoName: string) => void;
  onRepoDelete: (repoId: number) => void;
}

export interface RepoTypeWithActions extends RepoType {
  onEdit: (repoId: number, newRepoName: string) => void;
  onDelete: (repoId: number) => void;
}