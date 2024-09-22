import styled from 'styled-components';
import React from 'react';
import { boxShadow, maxTablet, primaryFont, primaryHeadingColor, wMBold } from '../Utils/utilsStyle';
import { useNavigate } from 'react-router-dom';
import { Website } from 'Types/WebsiteTypes';
import { Dropdown, MenuProps } from 'antd';
import ThreeDotSvg from 'SVG/ThreeDotSvg';
import { useDispatch } from 'react-redux';
import { actions } from 'Slice/WebsiteSlice';

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
  .website-text{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    p{
      font-family: ${primaryFont};
      font-size: 12px;
    }
    .ant-tag{
      height: 22px;
    }
    .ant-dropdown-trigger{
      cursor: pointer;
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
`;

type Props = {
  website: Website
}

const WebsiteCard = function WebsiteCard(props: Props) {
  const { website } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const img = website.websiteImage || 'https://i0.wp.com/theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png?fit=1200%2C800&ssl=1';

  const deleteWebsite = () => {
    dispatch(actions.deleteWebsite(website.websiteId));
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span
          onClick={(e) => {
            e.stopPropagation();
            deleteWebsite();
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
      <ImageWrapper className="d-flex flex-row" onClick={() => navigate(`/website?websiteId=${website.websiteId}`)}>
        <div className="heroImageWrap">
          <ImageHero src={img} alt="heroArticle" />
        </div>
      </ImageWrapper>
      <TextWrapper>
        <Paragraph onClick={() => navigate(`/website?websiteId=${website.websiteId}`)}>{website.websiteName}</Paragraph>
        <div className='website-text'>
          <Dropdown trigger={['click']} menu={{ items }} placement="bottomRight">
            <span><ThreeDotSvg /></span>
          </Dropdown>
        </div>
      </TextWrapper>
    </Wrapper>
  );
}

export default WebsiteCard;
