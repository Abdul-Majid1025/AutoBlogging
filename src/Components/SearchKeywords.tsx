import styled from 'styled-components';
import React, { ChangeEvent, useRef } from 'react';
import * as XLSX from 'xlsx';
import { Input, Select } from 'antd';
import SearchSvg from 'SVG/SearchSvg';
import ImportKeywordsPopup from 'Popups/ImportKeywordsPopup';
import UploadSvg from 'SVG/UploadSvg';
import { useDispatch } from 'react-redux';
import { actions } from 'Slice/KeywordSlice';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { selectImportLoading } from 'Selectors/KeywordSelectors';

const Wrapper = styled.div`
  .search-bar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .search-btn{
      height: 39px;
      width: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .upload-btn{
      background-color: white;
      cursor: pointer;
      margin-left: 10px;
      padding: 6px 12px;
      border-radius: 5px;
      border: 2px solid #008000;
      &.disabled{
        pointer-events: none;
        opacity: 0.6;
      }
    }
  }
  .ant-input-group-wrapper{
    width: 70%;
    .ant-input-wrapper{
      height: 40px;
      input{
        height: 41px;
      }
      .ant-input-group-addon{
        &:last-child{
          padding: 0px;
        }
      }
    }
    .ant-select{
      width: 130px;
    }
  }
`;

interface ExcelRow {
  keywords: string;
  volume: number;
}

const SearchKeywords = function SearchKeywords() {
  const { Option } = Select;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const importLoading = useSelector(selectImportLoading);
  const searchParams = new URLSearchParams(window.location.search);
  const reportId = searchParams.get('reportId');

  const selectBefore = (
    <Select defaultValue="wildcard">
      <Option value="wildcard">Wildcard</Option>
      <Option value="info">Info</Option>
      <Option value="commercial">Commercial</Option>
    </Select>
  );

  const selectAfter = (
    <div
      className='search-btn'
      // onClick={() => setIsImportKeywords(true)}
      role="button"
    >
      <SearchSvg />
    </div>
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    dispatch(actions.setImportLoading(true));
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: ExcelRow[] = XLSX.utils.sheet_to_json(sheet);
        const keywordsString = jsonData.map((row) => row.keywords).join(', ');
        const volumeString = jsonData.map((row) => row.volume).join(', ');
        dispatch(actions.importKeywords({
          reportId: parseInt(reportId || ''),
          keywords: keywordsString,
          volume: volumeString,
        }))
      };
      reader.readAsArrayBuffer(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Wrapper>
      <div className='search-bar'>
        <Input addonBefore={selectBefore} addonAfter={selectAfter} placeholder="Enter seed keyword" />
        <div>
          <ImportKeywordsPopup isUpload={false} />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept=".xlsx"
          />
          <span
            className={classNames('upload-btn', { disabled: importLoading })}
            onClick={() => fileInputRef?.current?.click()}
            role="button"
          ><UploadSvg /></span>
        </div>
      </div>
    </Wrapper>
  );
}

export default SearchKeywords;
