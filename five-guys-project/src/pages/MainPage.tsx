import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import RepoList from "../components/RepoList";
import styled from "styled-components";
import { onCloseType, RepoType, updateRepoType } from "../utils/types";
import axios from "axios";
import { device } from "../utils/responsive";

interface CreateRepoFormProps extends onCloseType, updateRepoType {}

// axios.defaults.baseURL = "http://www.burgerclub.shop/";

// const apiClient = axios.create({
//   baseURL: 'http://www.burgerclub.shop/api/repo'
// });

const CreateRepoForm: React.FC<CreateRepoFormProps> = ({
  onClose,
  updateRepo,
}) => {
  const [repoName, setRepoName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("project:", repoName);

    const formData = new FormData();
    formData.append("repoName", repoName);
    if (file) {
      formData.append("file", file);
      console.log("file:", file);
    }

    try {
      const res = await axios.post(
        "http://www.burgerclub.shop/api/repo",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        const now = new Date().toISOString().split("T")[0];

        if (res.data.data) {
          const newRepo: RepoType = {
            repoId: res.data.data.projectId,
            repoName: repoName,
            createdAt: now,
            updatedAt: now,
            bookmark: false,
            invitedUserCnt: 0,
            isInvited: false,
          };
          updateRepo(newRepo);
        } else {
          console.error("Failed to create repo:", res.data.message);
        }
        onClose();
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.error("Error while creating repo:", error);
      setMessage("레포지토리 생성 실패");
    }
    console.log("message:", message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
        placeholder="레포지토리 이름"
        required
      />
      <UploadButton>
        <input
          type="file"
          accept=".zip"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0]);
              setFileName(e.target.files[0].name);
            }
          }}
          id="fileInput"
          required
        />
        <label htmlFor="fileInput">파일 업로드</label>
        {fileName && <FileNameLabel>{fileName}</FileNameLabel>}
      </UploadButton>
      <StyledButton type="submit">레포지토리 생성</StyledButton>
      {message && <p>{message}</p>}
    </form>
  );
};

export const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myRepos, setMyRepos] = useState<RepoType[]>([]);
  const [myInvitedRepos, mySetInvitedRepos] = useState<RepoType[]>([]);

  useEffect(() => {
    const fetchMyRepos = async () => {
      try {
        const response = await axios.get(
          "http://www.burgerclub.shop/api/repo/my?page=0&size=10",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("accessToken"),
            },
          }
        );

        if (response.data.status === "Success") {
          setMyRepos(response.data.data.repoList);
        } else {
          console.error("Failed to fetch my repos:", response.data.message);
        }
      } catch (error) {
        console.error("Error while fetching my repos:", error);
      }
    };

    const fetchInvitedRepos = async () => {
      try {
        const response = await axios.get(
          "http://www.burgerclub.shop/api/repo/invited?page=0&size=10",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("accessToken"),
            },
          }
        );

        if (response.data.status === "Success") {
          mySetInvitedRepos(response.data.data.repoList);
        } else {
          console.error(
            "Failed to fetch invited repos:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error while fetching invited repos:", error);
      }
    };

    fetchMyRepos();
    fetchInvitedRepos();
  }, []);

  const handleRepoEdit = (repoId: number, newName: string) => {
    const updatedRepos = myRepos.map((repo) =>
      repo.repoId === repoId ? { ...repo, repoName: newName } : repo
    );
    setMyRepos(updatedRepos);
  };

  const handleRepoDelete = async (repoId: number) => {
    try {
      const res = await axios.delete(
        `http://www.burgerclub.shop/api/repo/${repoId}`,
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      );

      if (res.status === 200) {
        console.log("Success to delete repo:", res.data.message);
        const updatedRepos = myRepos.filter((repo) => repo.repoId !== repoId);
        setMyRepos(updatedRepos);
      } else {
        console.log("Failed to delete repo:", res.data.message);
      }
    } catch (error) {
      console.error("Error while deleting repo:", error);
    }
  };

  return (
    <>
      <Header />
      <MainContainer>
        <RepoListContainer>
          <RepoListContainerHeader>
            <MyRepository>My Repository</MyRepository>
            <CreateRepoButton onClick={() => setIsModalOpen(true)}>
              Create Repository
            </CreateRepoButton>
          </RepoListContainerHeader>
          <RepoList
            myRepos={myRepos}
            onRepoEdit={handleRepoEdit}
            onRepoDelete={handleRepoDelete}
            invitedRepos={[]}
          />
        </RepoListContainer>

        <InvitedRepoListContainer>
          <RepoListContainerHeader>
            <InvitedRepository>Invited Repository</InvitedRepository>
          </RepoListContainerHeader>
          <RepoList
            invitedRepos={myInvitedRepos}
            myRepos={[]}
            onRepoDelete={handleRepoDelete}
          />
        </InvitedRepoListContainer>

        {isModalOpen && (
          <Modal>
            <CloseButton onClick={() => setIsModalOpen(false)}>X</CloseButton>
            <ModalTitle>Five Guys IDE</ModalTitle>
            <CreateRepoForm
              onClose={() => setIsModalOpen(false)}
              updateRepo={(newRepo) =>
                setMyRepos((prevRepos) => [newRepo, ...prevRepos])
              }
            />
          </Modal>
        )}
      </MainContainer>
    </>
  );
};

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #383142;
  padding: 30px;
  width: 250px;
  height: 250px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #383142;
  width: 50vw;
  height: 40vw;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1), inset 0 5px 15px rgba(0, 0, 0, 0);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.9;
  z-index: 100;
  overflow: auto;

  @media ${device.tablet} {
    width: 70vw;
    height: 60vw;
  }

  @media ${device.laptop} {
    width: 70vw;
    height: 50vw;
  }
`;

const RepoListContainer = styled.div`
  background-color: #383142;
  border: 1px solid #e5cff7;
  border-radius: 30px;
  margin: 20px;
  width: 40vw;
  height: 14vw;
  overflow: auto;

  @media ${device.tablet} {
    width: 70vw;
    height: auto;
    margin-bottom: 20px;
    border: none;
  }
  @media ${device.laptop} {
    width: 70vw;
    height: auto;
    margin-bottom: 20px;
    border: none;
  }
`;

const InvitedRepoListContainer = styled(RepoListContainer)``;

const RepoListContainerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  width: 100%;
  border-bottom: 1px solid #e5cff7;
  box-sizing: border-box;
  /* border-radius: 30px 30px 0 0;
  background-color: #383142;
  color: #e5cff7;
  font-weight: bold; */
  @media ${device.tablet} {
    font-size: 16px;
  }

  @media ${device.laptop} {
    font-size: 20px;
  }
`;

const MyRepository = styled.h2`
  color: #e5cff7;
  margin: 20px;
`;

const InvitedRepository = styled(MyRepository)``;

const CreateRepoButton = styled.button`
  background-color: #383142;
  color: #e5cff7;
  padding: 10px;
  margin-right: 20px;
  font-size: 20px;
  font-weight: bold;
  border: 1px solid #e5cff7;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #59535e;
    background-color: #e5cff7;
  }
  @media ${device.tablet} {
    font-size: 16px;
  }
  @media ${device.laptop} {
    font-size: 16px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #59535e;
  font-weight: bold;
  background-color: #e5cff7;
  border: none;
  font-size: 18px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #59535e;
    color: #e5cff7;
  }
`;

const ModalTitle = styled.h2`
  color: #e5cff7;
`;

const UploadButton = styled.div`
  position: relative;
  margin-top: 20px;
  height: 40px;

  input[type="file"] {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #383142;
    color: #e5cff7;
    border: 1px solid #e5cff7;
    border-radius: 15px;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

const StyledInput = styled.input`
  background-color: #383142;
  color: #e5cff7;
  border: 1px solid #e5cff7;
  border-radius: 15px;
  padding: 10px 15px;
  text-align: center;
  font-size: 16px;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border-color: #59535e;
  }

  &::placeholder {
    color: #e5cff7;
  }
`;

const StyledButton = styled.button`
  background-color: #383142;
  color: #e5cff7;
  border: 1px solid #e5cff7;
  border-radius: 15px;
  padding: 10px 15px;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: #59535e;
    background-color: #e5cff7;
  }
`;

const FileNameLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
