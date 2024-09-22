import { boxShadow } from 'Utils/utilsStyle';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { URL } from 'Types/KeywordTypes';
import classNames from 'classnames';
import Pill from './Pill';
import { Tag } from 'antd';
import { convertDaysToYearsMonthsDays } from 'Utils/UtilityFunctions';

const Wrapper = styled.div`
  position: relative;
  .popover {
    position: absolute;
    top: calc(100% - 25px);
    right: 35px;
    border-radius: 9px;
    box-shadow: ${boxShadow};
    padding: 15px;
    z-index: 100;
    background-color: white;
    width: 650px;
    overflow-x: hidden;
    .serp-result{
      margin-bottom: 5px;
      font-weight: 400 !important;
      cursor: default !important;
      .index{
        font-weight: 500;
        border-radius: 5px;
        padding: 3px 5px;
        font-size: 12px;
        margin-right: 5px;
      }
      .isForum{
        color: white;
        background-color: #4BB543;
      }
      .title{
        margin-right: 10px;
      }
      .ant-tag{
        font-size: 12px;
        font-weight: 500;
      }
    }
  }
`;

type Props = {
  urls: URL[];
  serpScore: number;
}
const SerpPopover = function SerpPopover(props: Props) {
  const { urls, serpScore } = props;
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const color = serpScore === 0 ? "#778899" : serpScore > 2 ? "#4BB543" : "#ffc107";

  const handleClickOutside = (event: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const getAgeColor = (age: number) => {
    if (age < 366) {
      return "success"
    } else if (age > 365 && age < 1095) {
      return "warning"
    } else {
      return "default"
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Wrapper ref={popoverRef}>
      <span className='pill' onClick={() => setIsOpen(!isOpen)}><Pill color={color} text={serpScore} /></span>
      {isOpen && (
        <div className="popover">
          {urls.map((url, index) => <div className='serp-result'>
            <span className={classNames('index', { isForum: url.isForum })}>{index + 1}. </span>
            <span className='title'>{url.urlTitle}</span>
            {url.urlDomainAge > 0 ?
              <Tag color={getAgeColor(url.urlDomainAge)}>{convertDaysToYearsMonthsDays(url.urlDomainAge)}</Tag>
              : null}
            <br />
            <a href={url.url} target='_blank' rel="noreferrer">{url.url}</a><br />
          </div>)}
        </div>
      )
      }
    </Wrapper >
  );
}
export default SerpPopover;
