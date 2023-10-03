import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus, faFileCircleMinus, faFolderPlus, faFolderMinus, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import FileTree from '../components/FileTree';

const EditingPage = () => {

  return (
    <>
      <PageContainer>
        <EditingHeader>
          <OneTouchButtonHeader>
            <SaveButtonDiv>
              <SaveButton>
                <FontAwesomeIcon icon={faFloppyDisk} style={{color: "#e5ccf7",}} />
              </SaveButton>
              <SaveCaption>Save</SaveCaption>
            </SaveButtonDiv>
            <SaveAsButtonDiv>
              <SaveAsButton>
                <FontAwesomeIcon icon={faFloppyDisk} style={{color: "#e5ccf7",}} />
              </SaveAsButton>
              <SaveAsCaption>Save As</SaveAsCaption>
            </SaveAsButtonDiv>
          </OneTouchButtonHeader>
          <EditingPartHeader>
            <RepoNameDiv>Hyungjun's Repository</RepoNameDiv>
            <ToggleDiv></ToggleDiv>
            <InviteButtonDiv></InviteButtonDiv>
          </EditingPartHeader>
        </EditingHeader>
        <EditingBody>
          <DirectoryContainer>
            <OneTouchButtonDiv>
              <AddFileButton>
                <FontAwesomeIcon icon={faFileCirclePlus} style={{color: "#e5cff7",}} />
              </AddFileButton>
              <DeleteFileButton>
                <FontAwesomeIcon icon={faFileCircleMinus} style={{color: "#e5cff7",}} />
              </DeleteFileButton>
              <AddFolderButton>
                <FontAwesomeIcon icon={faFolderPlus} style={{color: "#e5cff7",}} />
              </AddFolderButton>
              <DeleteFolderButton>
                <FontAwesomeIcon icon={faFolderMinus} style={{color: "#e5cff7",}} />
              </DeleteFolderButton>
            </OneTouchButtonDiv>
            <FileTreeContainer>
              <FileTree/>
            </FileTreeContainer>
          </DirectoryContainer>
          <EditingContainer></EditingContainer>
        </EditingBody>
      </PageContainer> 
    </>
  );
};

export default EditingPage;

const PageContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 6.25rem);
  border: 1px #ebebeb solid;
  background-color: #383142;
  overflow: hidden;
`

const EditingHeader = styled.div`
  width: 100%;
  height: 4.625rem;
  border-bottom: 1px #ebebeb solid;
  display: flex;
`

const EditingBody = styled.div`
  width: 100%;
  height: calc(100% - 4.625rem);
  border: none;
  display: flex;
`

const DirectoryContainer = styled.div`
  width: 18.75rem;
  height: 100%;
  border-right: 1px #ebebeb solid;
`

const EditingContainer = styled.div`
  width: calc(100% - 18.75rem);
  height: 100%;
`

const OneTouchButtonDiv = styled.div`
  width: 100%;
  height: 4rem;
  border-bottom: 1px #ebebeb solid;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const OneTouchButtonHeader = styled.div`
  width: 18.75rem;
  height: 4.625rem;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const EditingPartHeader = styled.div`
  width: calc(100% - 18.75rem);
  height: 4.625rem;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const EditingButton = styled.div`
  width: 2rem;
  height: 2rem;
  margin-top: 0.5rem;
`

const AddFileButton = styled(EditingButton)``

const DeleteFileButton = styled(EditingButton)``

const AddFolderButton = styled(EditingButton)``

const DeleteFolderButton = styled(EditingButton)``

const SaveButtonDiv = styled.div`
  width: 2rem;
  height: 3rem;
`

const SaveAsButtonDiv = styled(SaveButtonDiv)``

const SaveButton = styled.div`
  width: 2rem;
  height: 2rem;
`

const SaveAsButton = styled(SaveButton)`
  width: 3rem;
`

const SaveCaption = styled.div`
  width: 2rem;
  height: 1rem;
  color: #E5CCF7;
  font-size: 10px;
  font-weight: bolder;
`

const SaveAsCaption = styled(SaveCaption)`
  width: 3rem;
  text-align: center;
`

const RepoNameDiv = styled.div`
  width: 18.75rem;
  height: 2.5rem;
  font-size: 1.25rem;
  font-weight: bolder;
  color: #E5CCF7;
  line-height: 2.5rem;
`

const ToggleDiv = styled(RepoNameDiv)``

const InviteButtonDiv = styled(RepoNameDiv)`
  width: 2.5rem;
`

const FileTreeContainer = styled.div`
  width: 100%;
  height: calc(100% - 4.625rem);
  text-align: start;
  text-indent: 1.5rem;
  margin-top: 1rem;
`



