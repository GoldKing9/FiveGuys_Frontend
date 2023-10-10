import styled from "styled-components";
import { RepoType } from "../utils/types";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

interface RepoItemProps {
  repo: RepoType;
  onEdit?: (repoId: number, newRepoName: string, updatedAt: string) => void;
  onDelete: (projectId: number) => void;
  onBookmark?: (repoId: number) => void;
}

const RepoItem: React.FC<RepoItemProps> = ({
  repo,
  onEdit,
  onDelete,
  onBookmark,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(repo.repoName);
  const [Message, setMessage] = useState("");
  const [isBookmark, setIsBookmark] = useState(repo.bookmark);

  const handleSaveEdit = async () => {
    try {
      const res = await axios.put(
        `http://www.burgerclub.shop/api/repo/${repo.repoId}`,
        {
          repoName: editedName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      );
      if (res.status === 200 && onEdit) {
        const updatedDate = new Date().toISOString().split("T")[0];
        onEdit(repo.repoId, editedName, updatedDate);
        setIsEditing(false);
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("프로젝트 이름 변경 실패 (영문, 숫자만 가능))");
    }
  };

  const handleDelete = () => {
    onDelete && onDelete(repo.repoId);
  };

  const handleBookmark = async () => {
    try {
      const res = await axios.post(
        `http://www.burgerclub.shop/api/repo/${repo.repoId}/bookmark`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        setIsBookmark(!isBookmark);
        onBookmark && onBookmark(repo.repoId);
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      alert("북마크 실패");
    }
  };

  return (
    <RepoItemContainer>
      {isEditing ? (
        <>
          <StyledInput
            value={editedName || ""}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <RepoItemButton onClick={handleSaveEdit}>Confirm</RepoItemButton>
          <RepoItemButton onClick={() => setIsEditing(false)}>
            Cancel
          </RepoItemButton>
        </>
      ) : (
        <>
          <div>
            {isBookmark ? (
              <FontAwesomeIcon
                icon={faStar}
                color="yellow"
                onClick={handleBookmark}
                style={{ cursor: "pointer", margin: "0 10px" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faStar}
                color="white"
                onClick={handleBookmark}
                style={{ cursor: "pointer", margin: "0 10px" }}
              />
            )}
          </div>
          <RepoItemInfo>{repo.repoName}</RepoItemInfo>
          <RepoItemInfo>{repo.createdAt}</RepoItemInfo>
          <RepoItemInfo>{repo.updatedAt}</RepoItemInfo>
          <RepoItemInfo>{repo.invitedUserCnt}</RepoItemInfo>
          <RepoItemButton onClick={() => setIsEditing(true)}>
            Edit
          </RepoItemButton>
          <RepoItemButton onClick={handleDelete}>Delete</RepoItemButton>
        </>
      )}
      {Message && <div>{Message}</div>}
    </RepoItemContainer>
  );
};

const RepoItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5cff7;
  padding: 0 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 1px 3px 15px rgba(0, 0, 0, 0.5);
  }
`;

const RepoItemInfo = styled.p`
  color: white;
  margin: 0 10px;
`;

const RepoItemButton = styled.button`
  background-color: #383142;
  color: #e5cff7;
  padding: 10px;
  margin: 12px 20px;
  font-size: 14px;
  font-weight: bold;
  border: 1px solid #e5cff7;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #59535e;
    background-color: #e5cff7;
  }
`;

const StyledInput = styled.input`
  /* background-color: #383142; */
  color: black;
  border: 1px solid #e5cff7;
  border-radius: 10px;
  padding: 8px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 10%;
  &:hover {
    color: #59535e;
    background-color: #e5cff7;
  }
`;

export default RepoItem;
