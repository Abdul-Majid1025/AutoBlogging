import DeleteSvg from 'SVG/DeleteSvg';
import DownAngleSvg from 'SVG/DownAngleSvg';
import FilterSvg from 'SVG/FilterSvg';
import ReportSvg from 'SVG/ReportSvg';
import WebsiteSvg from 'SVG/WebsiteSvg';
import { selectReports } from 'Selectors/KeywordSelectors';
import { selectWebsites } from 'Selectors/WebsiteSelectors';
import { actions } from 'Slice/WebsiteSlice';
import { actions as keywordActions } from 'Slice/KeywordSlice';
import { boxShadow } from 'Utils/utilsStyle';
import { Button, Checkbox, InputNumber } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
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
    .btn-text{
      margin-left: 5px;
      margin-right: 5px;
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
  .popover {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    border-radius: 9px;
    box-shadow: ${boxShadow};
    padding: 15px;
    z-index: 100;
    background-color: white;
    .filters-wrapper{
      display: block;
      width: 170px;
      .move-to-title{
        font-size: 14px;
        font-weight: 500;
        position: relative;
        top: -10px;
      }
      .move-to{
        margin-bottom: 10px;
        margin-left: 10px
      }
      .ant-input-number{
        width: 70px;
        margin-left: 5px;
        margin-right: 5px;
      }
      hr{
        background-color: #fafafa;
        height: 2px;
        border: none;
      }
      .filter-text{
        font-size: 12px;
        margin-left: 5px;
        font-weight: 500;
      }
      .ant-btn-primary{
        font-size: 12px;
        font-weight: 500;
        margin-left: 5px;
        &:first-child{
          background-color: white;
          border: 1px solid green;
          color: green;
        }
        &:last-child{
          background-color: green;
        }
      }
    }
  }
`;

type Props = {
  type: string;
  handleFilter: (a: number, b: number) => void;
  selectedKeywords?: React.Key[];
}
const Popover = function Popover(props: Props) {
  const { type, selectedKeywords, handleFilter } = props;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [minVol, setMinVol] = useState<number | null>();
  const [maxVol, setMaxVol] = useState<number | null>();
  const [minSerp, setMinSerp] = useState<number | null>();
  const [maxSerp, setMaxSerp] = useState<number | null>();
  const [selectedWebsite, setSelectedWebsite] = useState(0);
  const [selectedReport, setSelectedReport] = useState(0);

  const websites = useSelector(selectWebsites);
  const reports = useSelector(selectReports);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleMove = () => {
    if (type === 'report') {
      dispatch(keywordActions.moveReportKeywords({
        reportId: selectedReport,
        keywordIds: selectedKeywords?.join(',') || ''
      }))
    } else {
      dispatch(actions.moveSiteKeywords({
        websiteId: selectedWebsite,
        keywordIds: selectedKeywords?.join(',') || ''
      }))
    }
    setIsOpen(false);
  }

  const Filters = (
    <span className='filters-wrapper'>
      <div>
        <span className='filter-text'>Volume</span><br />
        <InputNumber min={0} placeholder='Min' value={minVol} onChange={setMinVol} />-
        <InputNumber min={0} placeholder='Max' value={maxVol} onChange={setMaxVol} />
      </div><hr />
      <div>
        <span className='filter-text'>Serp Score</span><br />
        <InputNumber min={-1} max={10} placeholder='Min' value={minSerp} onChange={setMinSerp} />-
        <InputNumber min={-1} max={10} placeholder='Max' value={maxSerp} onChange={setMaxSerp} />
      </div><hr />
      <div>
        <Button type="primary" onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button type="primary" onClick={() => handleFilter(minSerp as number, maxSerp as number)}>{type === 'filter' ? 'Apply' : 'Delete'}</Button>
      </div>
    </span>
  );

  const MoveTo = (
    <>
      <span className='filters-wrapper'>
        {type === 'report' ?
          <>
            <span className='move-to-title'>Move to Report</span>
            <div className='move-to'>

              {reports?.map((report) => <><Checkbox value={report.reportId} onChange={() => setSelectedReport(report.reportId)} checked={report.reportId === selectedReport}>{report.reportName}</Checkbox><br /></>)}
            </div>
          </> : <>
            <span className='move-to-title'>Move to Website</span>
            <div className='move-to'>
              {websites?.map((website) => <><Checkbox value={website.websiteId} onChange={() => setSelectedWebsite(website.websiteId)} checked={website.websiteId === selectedWebsite}>{website.websiteName}</Checkbox><br /></>)}
            </div>
          </>}
        <div>
          <Button type="primary" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button type="primary" onClick={handleMove}>Move</Button>
        </div>
      </span>
    </>
  );

  const handleWebsites = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      if (websites?.length === 0) {
        dispatch(actions.getWebsites());
      }
      setIsOpen(true);
    }
  }

  const handleReports = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      if (reports?.length === 0) {
        dispatch(keywordActions.getReports());
      }
      setIsOpen(true);
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Wrapper ref={popoverRef}>
      {type === 'filter' ?
        <span className='white-btn' onClick={() => setIsOpen(!isOpen)}><FilterSvg /><span className='btn-text'>Filters</span><DownAngleSvg /></span> : null}
      {type === 'delete' ?
        <span className='white-btn' onClick={() => setIsOpen(!isOpen)}><DeleteSvg /><span className='btn-text'>Delete</span><DownAngleSvg /></span> : null}
      {type === 'website' ?
        <span className='move-btn' onClick={handleWebsites}><WebsiteSvg /><span className='btn-text'>Websites</span><DownAngleSvg /></span> : null}
      {type === 'report' ?
        <span className='move-btn' onClick={handleReports}><ReportSvg /><span className='btn-text'>Reports</span><DownAngleSvg /></span> : null}
      {isOpen && (
        <div className="popover">
          {type === 'filter' || type === 'delete' ? Filters : null}
          {type === 'report' || type === 'website' ? MoveTo : null}
        </div>
      )}
    </Wrapper>
  );
}
export default Popover;
