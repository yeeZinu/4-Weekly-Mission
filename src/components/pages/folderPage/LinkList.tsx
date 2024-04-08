import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUserLinks } from '../../../util/api';
import FolderList from '../sharedPage/FolderList';
import UpdateBtnList from './UpdateBtnList';
import { FoldersContext } from '../../context/FoldersContext';
import { totalFolderName } from '../../../util/constants';
import { Folder, FolderId, Link } from '../../../types/types';

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.4rem;
  width: 100%;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 600;
  letter-spacing: -0.02rem;

  @media (max-width: 767px) {
    font-size: 2rem;
  }
`;

const selectFolderName = (folders: Folder[], selectedFolderId: FolderId) => {
  const selectedFolder = folders.filter(
    (folder) => folder.id === selectedFolderId
  )[0];
  return selectedFolder?.name || totalFolderName;
};

interface LinkListProps {
  selectedFolderId: FolderId;
  searchString: string;
}

const LinkList = ({ selectedFolderId, searchString }: LinkListProps) => {
  const folders = useContext<Folder[]>(FoldersContext);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const selectedFolderName = selectFolderName(folders, selectedFolderId);
  const searchLinks =
    searchString === ''
      ? links
      : links.filter(
          (link) =>
            link.url.toLowerCase().includes(searchString.toLowerCase()) ||
            link.title?.toLowerCase().includes(searchString.toLowerCase()) ||
            link.description?.toLowerCase().includes(searchString.toLowerCase())
        );

  useEffect(() => {
    const fetchLinks = async (id: FolderId) => {
      setLoading(true);
      setError(null);
      try {
        const links = await getUserLinks(id);
        setLinks(links);
      } catch (err) {
        console.error(err);
        setError('링크를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchLinks(selectedFolderId);
  }, [selectedFolderId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Header>
        <Title>{selectedFolderName}</Title>
        {selectedFolderName !== totalFolderName && (
          <UpdateBtnList
            selectedFolderId={selectedFolderId}
            selectedFolderName={selectedFolderName}
          />
        )}
      </Header>
      <FolderList folderList={searchLinks} />
    </>
  );
};
export default LinkList;
