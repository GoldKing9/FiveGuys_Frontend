import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: number;
}

interface User {
  userId: number;
  nickname: string;
}

const searchUsers = async (
  nickname: string,
  page?: number,
  size?: number
): Promise<{ data: { users: User[] } }> => {
  try {
    console.log("nickname:", nickname);
    const res = await axios.get(`http://www.burgerclub.shop/api/invite`, {
      params: {
        nickname,
        page,
        size,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    });

    if (res.status !== 200) {
      throw new Error(res.data.message);
    }

    return res.data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

const inviteUsers = async (projectId: number, users: { userId: number }[]) => {
  try {
    console.log("users:", users);
    console.log("projectId:", projectId);
    const res = await axios.post(
      `http://www.burgerclub.shop/api/repo/${projectId}/invite`,
      { users },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
      }
    );

    if (res.status !== 200) {
      throw new Error(res.data.message);
    }

    return res.data;
  } catch (error) {
    console.error("Error inviting users:", error);
    throw error;
  }
};

const InviteUserModal: React.FC<InviteUserModalProps> = ({
  isOpen,
  onClose,
  projectId,
}) => {
  const [nickname, setNickname] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<{ userId: number }[]>([]);
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const handleSearch = useCallback(async () => {
    try {
      const result = await searchUsers(nickname);
      setSearchResults(result.data.users);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  }, [nickname]);

  useEffect(() => {
    if (nickname) {
      handleSearch();
    }
  }, [nickname, handleSearch]);

  const handleInvite = async () => {
    try {
      await inviteUsers(projectId, selectedUsers);


      onClose();
    } catch (error) {
      console.error("Error inviting users:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalContainer>
      <CloseButton onClick={onClose}>x</CloseButton>
      <ModalTitle>Five Guys IDE</ModalTitle>
      <SearchInput
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="please enter nickname"
      />
      <SearchResultBox>
        <SearchResultTitle>검색 목록</SearchResultTitle>
        <UsersList>
          {searchResults.map((user) => (
            <UserCheckbox key={user.userId}>
              <input
                type="checkbox"
                onChange={() => {
                  const isSelected = selectedUsers.some(
                    (u) => u.userId === user.userId
                  );
                  if (isSelected) {
                    setSelectedUsers((prev) =>
                      prev.filter((u) => u.userId !== user.userId)
                    );
                  } else {
                    setSelectedUsers((prev) => [
                      ...prev,
                      { userId: user.userId },
                    ]);
                  }
                }}
              />
              <span>{user.nickname}</span>
            </UserCheckbox>
          ))}
        </UsersList>
      </SearchResultBox>
      <InviteButton onClick={handleInvite}>초대 완료</InviteButton>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid var(--purple-5, #e5cff7);
  background: #383142;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  left: 15px;
  background: none;
  border: none;
  font-size: 25px;
  cursor: pointer;
  color: #e5cff7;
`;

const ModalTitle = styled.h2`
  color: var(--purple-5, #e5cff7);
  text-align: center;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const UsersList = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const InviteButton = styled.button`
  background-color: var(--purple-5, #383142);
  color: var(--purple-5, #e5cff7);
  width: 80%;
  padding: 10px;
  border: 1px solid var(--purple-5, #e5cff7);
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const SearchInput = styled.input`
  width: 80%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #e5cff7;
  margin: 15px 0;
  font-size: 16px;
  color: #fff;
  background-color: #383142;

  &::-webkit-input-placeholder {
    color: #fff;
  }
`;

const SearchResultBox = styled.div`
  width: 80%;
  height: 200px;
  border: 1px solid #e5cff7;
  border-radius: 10px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const SearchResultTitle = styled.div`
  color: var(--purple-5, #e5cff7);
  font-size: 20px;
  width: 100%;
  font-weight: bold;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  padding: 8px;
`;

const UserCheckbox = styled.label`
  display: flex;
  align-items: center;
  padding: 5px;
  width: 100%;
  cursor: pointer;
  color: #fff;

  input[type="checkbox"] {
    margin: 0 5px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
`;

export default InviteUserModal;
