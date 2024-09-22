/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Radio, RadioChangeEvent, Table } from 'antd';
import { useSelector } from 'react-redux';
import { selectDomains } from 'Selectors/KeywordSelectors';
import { useDispatch } from 'react-redux';
import { actions } from 'Slice/KeywordSlice';
import { Domain } from 'Types/KeywordTypes';
import { convertDaysToYearsMonthsDays } from 'Utils/UtilityFunctions';

const Wrapper = styled.div`
  .radio-group{
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .ant-table-wrapper{
    .volume{
      float: right;
    }
    .center{
      display: flex;
      justify-content: center;
    }
    .ant-table-selection-column{
      width: 3%;
    }
  }
`;

const DomainsTab = function DomainsTab() {
  const dispatch = useDispatch();
  const domains = useSelector(selectDomains);
  const searchParams = new URLSearchParams(window.location.search);
  const reportId = parseInt(searchParams.get('reportId') || '');

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [tabPosition, setTabPosition] = useState('all');
  const [forums, setForums] = useState<Domain[]>();
  const [contentDomains, setContentDomains] = useState<Domain[]>();

  const changeTabPosition = (e: RadioChangeEvent) => {
    setTabPosition(e.target.value);
  };

  useEffect(() => {
    setForums(domains.filter((domain) => domain.isForum))
    setContentDomains(domains.filter((domain) => !domain.isForum))
  }, [domains])

  const columns = [
    {
      title: 'Domains',
      dataIndex: 'domainName',
      key: 'domainName',
      width: '55%',
    },
    {
      title: 'Keywords',
      key: 'noOfKeywords',
      dataIndex: 'noOfKeywords',
      width: '10%',
      sorter: (a: Domain, b: Domain) => a.noOfKeywords - b.noOfKeywords,
      render: (noOfKeywords: number) => { if (noOfKeywords < 0) { return <>-</> } else { return <span className='center'>{noOfKeywords.toLocaleString()}</span> } },
    },
    {
      title: 'Age',
      dataIndex: 'domainAge',
      key: 'domainAge',
      width: '10%',
      sorter: (a: Domain, b: Domain) => a.domainAge - b.domainAge,
      render: (domainAge: number) => { if (domainAge === -1) { return <span className='center'>-</span> } else { return <span className='volume'>{convertDaysToYearsMonthsDays(domainAge)}</span> } },
    },
    {
      title: 'Posts',
      dataIndex: 'totalPosts',
      key: 'totalPosts',
      width: '10%',
      sorter: (a: Domain, b: Domain) => a.totalPosts - b.totalPosts,
      render: (totalPosts: number) => { if (totalPosts === -1) { return <span className='center'>-</span> } else { return <span className='center'>{totalPosts.toLocaleString()}</span> } },
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    if (reportId) {
      dispatch(actions.getDomains(reportId));
    }
  }, [reportId])

  return (
    <Wrapper>
      <div className='radio-group'>
        <Radio.Group value={tabPosition} onChange={changeTabPosition}>
          <Radio.Button value="all">All</Radio.Button>
          <Radio.Button value="domains">Domains</Radio.Button>
          <Radio.Button value="forums">Forums</Radio.Button>
        </Radio.Group>
      </div>
      <Table
        rowKey={(domain) => domain.domainId}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        columns={columns}
        dataSource={tabPosition === 'all' ? domains : tabPosition === 'domains' ? contentDomains : forums}
        pagination={{ pageSize: 1000 }}
      />
    </Wrapper>
  );
}

export default DomainsTab;
