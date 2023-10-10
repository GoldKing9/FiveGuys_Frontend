import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <>
      <HeaderContainer>
        <HeaderContainerTitle>Five Guys IDE</HeaderContainerTitle>
        <FontAwesomeIcon
          icon={faAddressCard}
          style={{
            color: "#dbbff4",
            fontSize: "40px",
            marginRight: "30px",
          }}
        />
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  border-bottom: 1px #ebebeb solid;
`;

const HeaderContainerTitle = styled.div`
  color: #dbbff4;
  font-size: 40px;
  font-weight: bolder;
  margin-left: 30px;
`;
