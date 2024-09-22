/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import React, { useEffect } from 'react';
import ReportCard from '../Components/ReportCard';
import { useDispatch } from 'react-redux';
import { actions } from '../Slice/KeywordSlice';
import { useSelector } from 'react-redux';
import { selectReports } from '../Selectors/KeywordSelectors';
import CreateReportPopup from 'Popups/CreateReportPopup';
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
  .report-section{
    display: block;
    background-color: white;
    padding: 30px 30px 0px 30px;
    box-shadow: ${boxShadow};
    border-radius: 15px;
  }
`;

const ReportsPage = function ReportsPage() {
  const dispatch = useDispatch();

  const reports = useSelector(selectReports);

  useEffect(() => {
    if (reports?.length === 0) {
      dispatch(actions.getReports());
    }
  }, [])

  return (
    <>
      <Navbar />
      <Wrapper>
        <div className='header'>
          <h2>My Reports</h2>
          <CreateReportPopup />
        </div>
        <span className='report-section'>
          <Row>
            {reports?.map((report) =>
              <Col span={6}>
                <ReportCard
                  report={report}
                />
              </Col>
            )}
          </Row>
        </span>
      </Wrapper>
    </>
  );
}

export default ReportsPage;
