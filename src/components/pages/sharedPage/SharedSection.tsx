import React, { useEffect, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { getSampleFolder } from '../../../util/api';
import SearchBar from '../../common/SearchBar';
import FolderList from './FolderList';
import { Link } from '../../../types/types';

const SharedArea = styled.section`
  margin: 0 auto;
  padding: 4rem 0;
  max-width: 112.4rem;

  @media (max-width: 1199px) {
    padding: 4rem 3.2rem;
  }

  @media (max-width: 767px) {
    padding: 2rem 3.2rem;
  }
`;

const SharedSection: React.FC = () => {
  const [folderList, setFolderList] = useState<Link[]>([]);
  const [searchString, setSearchString] = useState<string>('');

  const fetchFolder = async () => {
    try {
      const {
        folder: { links },
      } = await getSampleFolder();
      setFolderList(links);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFolder();
  }, []);

  const handleChangeSearchString = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const handleResetSearchString = () => {
    setSearchString('');
  };

  return (
    <SharedArea>
      <SearchBar
        searchString={searchString}
        onChangeSearchString={handleChangeSearchString}
        onResetSearchString={handleResetSearchString}
      />
      <FolderList folderList={folderList} />
    </SharedArea>
  );
};

export default SharedSection;
