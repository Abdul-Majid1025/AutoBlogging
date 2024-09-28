import styled from 'styled-components';
import React from 'react';
import { Dropdown, MenuProps, Tag } from 'antd';
import { boxShadow, maxTablet, primaryHeadingColor, wMBold } from '../Utils/utilsStyle';
import { Report } from '../Types/KeywordTypes';
import { useNavigate } from 'react-router-dom';
import ThreeDotSvg from 'SVG/ThreeDotSvg';
import { useDispatch } from 'react-redux';
import { actions } from 'Slice/KeywordSlice';

const Wrapper = styled.div`
  height: 225px;
  min-width: 200px;
  margin-right: 15px;
  border-radius: 10px;
  overflow:hidden;
  box-shadow: ${boxShadow};
  margin-bottom: 20px;
  @media all and (min-width: 1700px) {
    width: auto;
  }
  @media all and (max-width: ${maxTablet}) {
    width: auto;
  }
  .heroImageWrap {
    height: 100%;
    width: 100%;
  }
  .report-text{
    display: flex;
    justify-content: space-between;
    align-items: center;
    p{
      font-size: 12px;
    }
    .ant-tag{
      height: 22px;
    }
    .right-side{
      display: flex;
      align-items: center;
      .ant-dropdown-trigger{
        cursor: pointer;
      }
    }
  }
`;

const ImageWrapper = styled.div`
  height: 150px;
  cursor: pointer;
`;

const TextWrapper = styled.div`
  background-color: white;
  padding: 10px 0px 0px 15px;
`;

const Paragraph = styled.p`
  font-weight: ${wMBold};
  color: ${primaryHeadingColor};
  font-size: 18px;
  text-align: left;
  text-transform: capitalize;
  margin: 0px;
  cursor: pointer;
  &:hover{
    color: green;
  }
`;

const ImageHero = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover; 
`;

type Props = {
  report: Report
}

const ReportCard = function ReportCard(props: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { report } = props;
  const img = report.reportImage || 'https://i0.wp.com/theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png?fit=1200%2C800&ssl=1';

  const deleteReport = () => {
    dispatch(actions.deleteReport(report.reportId));
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span
          onClick={(e) => {
            e.stopPropagation();
            deleteReport();
          }
          }
          role="button"
        >
          Delete
        </span>
      ),
    },
  ];

  return (
    <Wrapper>
      <ImageWrapper className="d-flex flex-row" onClick={() => navigate(`/report?reportId=${report.reportId}`)}>
        <div className="heroImageWrap">
          <ImageHero src={img} loading='lazy' alt="report-img" />
        </div>
      </ImageWrapper>
      <TextWrapper>
        <Paragraph onClick={() => navigate(`/report?reportId=${report.reportId}`)}>{report.reportName}</Paragraph>
        <div className='report-text'>
          <p>{`${report.totalKeywords?.toLocaleString()} keywords`}</p>
          <div className='right-side'>
            <Tag color="cyan">{`${report.totalVolume?.toLocaleString()} SV`}</Tag>
            <Dropdown trigger={['click']} menu={{ items }} placement="bottomRight">
              <span><ThreeDotSvg /></span>
            </Dropdown>
          </div>
        </div>
      </TextWrapper>
    </Wrapper >
  );
}

export default ReportCard;
