/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import React from 'react';
import { Tabs, TabsProps } from 'antd';
import KeywordsPage from './KeywordsPage';
import Navbar from 'Components/Navbar';
import SearchKeywords from 'Components/SearchKeywords';
import DomainsTab from 'Components/DomainsTab';

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Keywords`,
    children: <KeywordsPage />,
  },
  {
    key: '2',
    label: `Domains`,
    children: <DomainsTab />,
  },
];

const ReportDetailPage = function ReportDetailPage() {

  const onTabChange = (key: string) => {
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        <SearchKeywords />
        <Tabs defaultActiveKey="1" items={items} onChange={onTabChange} />
      </Wrapper>
    </>
  );
}

export default ReportDetailPage;
