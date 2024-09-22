/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../Slice/KeywordSlice';
import { useSelector } from 'react-redux';
import { selectKeywords, selectKeywordsLoading, selectKeywordsReport, selectNoOfKeywordsWithSerp, selectRemoveDuplicateLoading, selectSerpLoading } from '../Selectors/KeywordSelectors';
import { Progress, Spin, Table, Tag } from 'antd';
import DeleteSvg from 'SVG/DeleteSvg';
import SerpScoreSvg from 'SVG/SerpScoreSvg';
import Popover from 'Components/Popover';
import { selectWebKeywords } from 'Selectors/WebsiteSelectors';
import WritePostPopup from 'Popups/WritePostPopup';
import { Keyword } from 'Types/KeywordTypes';
import SerpPopover from 'Components/SerpPopover';
import Pill from 'Components/Pill';
import classNames from 'classnames';

const Wrapper = styled.div`
  margin-top: 10px;
  .ant-spin{
    display: flex;
    justify-content: center;
    margin-top: 100px;
  }
  .table-operations{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .left-side{
      display: flex;
      .clr-btn{
        color: white;
        padding: 8px 12px;
        font-size: 12px;
        line-height: 14px;
        font-weight: 500;
        border-radius: 5px;
        background-color: green;
        cursor: pointer;
        margin-right: 10px;
        &.disabled{
          pointer-events: none;
          opacity: 0.6;
        }
      }
      .move-btn{
        cursor: pointer;
        padding: 7px 12px;
        border-radius: 5px;
        background: rgb(255, 255, 255);
        opacity: 1;
        color: green;
        font-size: 12px;
        line-height: 14px;
        font-weight: 500;
        border: 1px solid green;
        margin-right: 10px;
        transition: all 0.5s ease 0s;
        white-space: pre;
        display: flex;
        align-items: center;
        .btn-text{
          margin-left: 5px;
          margin-right: 5px;
        }
        svg{
          &:first-child{
            height: 12px;
            width: auto;
            stroke: green;
          }
          &:last-child{
            height: 5px;
            width: auto;
            path{
              fill: green;
            }
          }
        }
      }
    }
    .right-side{
      display: flex;
      .filter-popover{
      }
      .white-btn{
        cursor: pointer;
        padding: 7px 12px;
        border-radius: 5px;
        background: rgb(255, 255, 255);
        opacity: 1;
        color: rgb(126, 126, 126);
        font-size: 12px;
        line-height: 14px;
        font-weight: 500;
        border: 1px solid rgb(218, 218, 218);
        margin-left: 10px;
        transition: all 0.5s ease 0s;
        white-space: pre;
        display: flex;
        align-items: center;
        &.disabled{
          pointer-events: none;
          opacity: 0.6;
        }
        .btn-text{
          margin-left: 5px;
          margin-right: 5px;
        }
        .ant-spin{
          margin-top: 0px;
          .ant-spin-dot{
            width: 15px;
            height: 15px;
            i {
              background-color: green;
            }
          }
        }
        svg{
          &:first-child{
            height: 12px;
            width: auto;
          }
          &:last-child{
            height: 5px;
            width: auto;
          }
        }
      }
    }
  }
  .ant-table-wrapper{
    .volume{
      float: right;
    }
    .serp-score{
      display: flex;
      justify-content: center;
      div{
        font-weight: 700;
        cursor: pointer; 
      }
    }
    .center-text{
      display: flex;
      justify-content: center;
    }
    .ant-table-selection-column{
      width: 3%;
    }
    .center{
      display: flex;
      justify-content: center;
    }
  }
`;
type Props = {
  setTab?: (a: string) => void;
}
const KeywordsPage = function KeywordsPage(props: Props) {
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(window.location.search);
  const reportId = searchParams.get('reportId');
  const websiteId = parseInt(searchParams.get('websiteId') || '');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [percentage, setPercentage] = useState(0);
  const [decimalPercent, setDecimalPercent] = useState(0);

  const reportKeywords = useSelector(selectKeywords);
  const webKeywords = useSelector(selectWebKeywords);
  const report = useSelector(selectKeywordsReport);
  const noOfKeywordsWithSerp = useSelector(selectNoOfKeywordsWithSerp);
  const serpLoading = useSelector(selectSerpLoading);
  const keywordsLoading = useSelector(selectKeywordsLoading);
  const removeDuplicateLoading = useSelector(selectRemoveDuplicateLoading);
  const keywords = reportId ? reportKeywords : webKeywords;
  const [keywordsToShow, setKeywordsToShow] = useState(keywords);

  const handleDeleteKeyword = (id: number) => {
    dispatch(actions.deleteKeyword(id))
  }

  useEffect(() => {
    setPercentage(Math.floor((noOfKeywordsWithSerp / keywords?.length) * 100));
    setDecimalPercent((noOfKeywordsWithSerp / keywords?.length) * 100);
  }, [noOfKeywordsWithSerp])

  const columns = [
    {
      title: (report?.totalKeywords ?
        <>
          Keywords ({report.totalKeywords}) <Tag color='cyan'>Total Volume: {report.totalVolume?.toLocaleString()}</Tag>
        </> :
        <>
          Keywords
        </>
      ),
      dataIndex: 'keywordName',
      key: 'keywordName',
      width: '55%',
      sorter: (a: Keyword, b: Keyword) => a.keywordName.localeCompare(b.keywordName),
    },
    {
      title: 'Type',
      key: 'keywordType',
      dataIndex: 'keywordType',
      width: '10%',
      render: (keywordType: string) => {
        if (keywordType === 'Best') {
          return <Tag color='yellow'>
            {keywordType}
          </Tag>
        } else if (keywordType === 'Comparison') {
          return <Tag color='cyan'>
            {keywordType}
          </Tag>
        } else if (keywordType === 'Info') {
          return <Tag color='green'>
            {keywordType}
          </Tag>
        } else if (keywordType === 'Review') {
          return <Tag color='orange'>
            {keywordType}
          </Tag>
        }
      },
    },
    {
      title: (<span className='center-text'>Volume</span>),
      dataIndex: 'volume',
      key: 'volume',
      width: '10%',
      sorter: (a: Keyword, b: Keyword) => a.volume - b.volume,
      render: (volume: number) => { if (volume === -1) { return <span className='center'>-</span> } else { return <span className='volume'>{volume.toLocaleString()}</span> } },
    },
    {
      title: (<span className='center-text'>Serp Score</span>),
      dataIndex: 'serpScore',
      key: 'serpScore',
      width: '10%',
      sorter: (a: Keyword, b: Keyword) => a.serpScore - b.serpScore,
      render: (serpScore: number, record: Keyword) => {
        if (serpScore === -1) {
          return <span className='serp-score'><SerpScoreSvg /></span>
        } else if (serpScore > -1) {
          return <span className='serp-score'><SerpPopover urls={record?.urls} serpScore={serpScore} /></span>
        }
      },
    },
    {
      title: (<span className='center-text'>Status</span>),
      dataIndex: 'contentWritten',
      key: 'contentWritten',
      width: '10%',
      sorter: (a: Keyword, b: Keyword) => Number(a.contentWritten) - Number(b.contentWritten),
      render: (contentWritten: boolean) => {
        if (contentWritten) {
          return <Pill color="#4BB543" text="Written" />
        } else {
          return <Pill color="#778899" text="Pending" />
        }
      },
    },
    {
      title: '',
      dataIndex: 'keywordId',
      key: 'keywordId',
      width: '5%',
      render: (keywordId: number) => <span onClick={() => handleDeleteKeyword(keywordId)}><DeleteSvg /></span>,
    },
  ];

  useEffect(() => {
    if (reportId) {
      actions.reset()
      dispatch(actions.getKeywords(parseInt(reportId || '')));
    }
  }, [reportId])

  useEffect(() => {
    return () => {
      dispatch(actions.resetKeywords());
    };
  }, []);

  useEffect(() => {
    setKeywordsToShow(keywords);
  }, [keywords])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const getSearchVolume = () => {
    dispatch(actions.getVolume(parseInt(reportId || '')));
  };


  const handleAnalyzeKeywords = () => {
    if (selectedRowKeys?.length) {
      dispatch(actions.getSerpScore(selectedRowKeys as number[]));
    }
  }

  const handleFilter = (minSerp: number, maxSerp: number) => {
    const filterKeywords = keywords.filter((keyword) => keyword.serpScore >= minSerp && keyword.serpScore <= maxSerp);
    setKeywordsToShow(filterKeywords);
  }

  const handleRemoveDuplicate = () => {
    if (reportId) {
      dispatch(actions.removeDuplicateKeywords(parseInt(reportId || '')))
    }
  }

  return (
    <>
      <Wrapper>
        <div className='table-operations'>
          <div className='left-side'>
            <span
              className='clr-btn'
              onClick={getSearchVolume}
              role="button"
            >Get Volume</span>
            <span
              className={classNames('clr-btn', { disabled: serpLoading })}
              onClick={handleAnalyzeKeywords}
              role="button"
            >Analyze Keywords</span>
            {selectedRowKeys?.length && reportId ? <>
              <Popover type='website' selectedKeywords={selectedRowKeys} handleFilter={handleFilter} />
              <Popover type='report' selectedKeywords={selectedRowKeys} handleFilter={handleFilter} />
            </>
              : null}
            {websiteId ?
              <WritePostPopup websiteId={websiteId} selectedKeywords={selectedRowKeys} setTab={props.setTab as () => {}} />
              : null}
          </div>
          <div className='right-side'>
            <span className={classNames('white-btn', { disabled: removeDuplicateLoading })} onClick={handleRemoveDuplicate}>{removeDuplicateLoading ? <Spin /> : <DeleteSvg />}<span className='btn-text'>Remove Duplicates</span></span>
            <Popover type='delete' handleFilter={handleFilter} />
            <Popover type='filter' handleFilter={handleFilter} />
          </div>
        </div>
        {serpLoading && decimalPercent > 0 ? <Progress percent={percentage} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} /> : null}
        {keywordsLoading ?
          <Spin size="large" /> :
          <Table
            rowKey={(keyword) => keyword.keywordId}
            rowSelection={{
              selectedRowKeys,
              onChange: onSelectChange,
            }}
            columns={columns}
            dataSource={keywordsToShow}
            pagination={{ pageSize: 1000 }}
          />
        }
      </Wrapper>
    </>
  );
}

export default KeywordsPage;