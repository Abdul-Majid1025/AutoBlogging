/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import KeywordsPage from './KeywordsPage';
import Navbar from 'Components/Navbar';
import { useDispatch } from 'react-redux';
import { actions } from 'Slice/WebsiteSlice';
import PostsTab from 'Components/PostsTab';

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const WebsiteDetailPage = function WebsiteDetailPage() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('1');
  const searchParams = new URLSearchParams(window.location.search);
  const websiteId = parseInt(searchParams.get('websiteId') || '');

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Website Keywords`,
      children: <KeywordsPage setTab={setTab} />,
    },
    {
      key: '2',
      label: `Posts`,
      children: <PostsTab
        websiteId={websiteId}
      />,
    },
  ];

  useEffect(() => {
    if (websiteId) {
      dispatch(actions.getSiteKeywords(websiteId));
      dispatch(actions.getCategories(websiteId));
    }
  }, [websiteId])

  return (
    <>
      <Navbar />
      <Wrapper>
        <Tabs defaultActiveKey="1" activeKey={tab} items={items} onChange={(e) => setTab(e)} />
      </Wrapper>
    </>
  );
}

export default WebsiteDetailPage;
