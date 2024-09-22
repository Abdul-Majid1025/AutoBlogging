/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import WebsiteCard from 'Components/WebsiteCard';
import { selectWebsites } from 'Selectors/WebsiteSelectors';
import { actions } from 'Slice/WebsiteSlice';
import AddWebsitePopup from 'Popups/AddWebsitePopup';
import { Col, Row } from 'antd';
import Navbar from 'Components/Navbar';
import { boxShadow } from 'Utils/utilsStyle';

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .website-section{
    display: block;
    background-color: white;
    padding: 30px 30px 0px 30px;
    box-shadow: ${boxShadow};
    border-radius: 15px;
  }
`;

const WebsitesPage = function WebsitesPage() {
  const dispatch = useDispatch();
  const websites = useSelector(selectWebsites);

  useEffect(() => {
    if (websites?.length === 0) {
      dispatch(actions.getWebsites());
    }
  }, [])

  return (
    <>
      <Navbar />
      <Wrapper>
        <div className='header'>
          <h2>My Websites</h2>
          <AddWebsitePopup />
        </div>
        <span className='website-section'>
          <Row>
            {websites.map((website) =>
              <Col span={6}>
                <WebsiteCard
                  website={website}
                />
              </Col>
            )}
          </Row>
        </span>
      </Wrapper>
    </>
  );
}

export default WebsitesPage;
