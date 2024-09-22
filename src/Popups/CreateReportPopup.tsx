import { actions } from 'Slice/KeywordSlice';
import { Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'antd';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  .create-report-btn{
    color: white;
    padding: 8px 12px;
    border-radius: 5px;
    background-color: green;
    cursor: pointer;
    font-weight: 500;
  }
`;

const CreateReportPopup = function CreateReportPopup() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [reportName, setReportName] = useState('');

  const createNewReport = () => {
    dispatch(actions.createReport({ reportName: reportName }))
    setVisible(false);
  };

  return (
    <Wrapper>
      <span
        className='create-report-btn'
        onClick={() => setVisible(true)}
        onKeyPress={() => setVisible(true)}
        role="button"
      >
        Create New Report
      </span>
      <Modal
        visible={visible}
        title="Create New Report"
        onOk={createNewReport}
        onCancel={() => setVisible(false)}
        centered
        destroyOnClose
        maskClosable
        width={689}
        closeIcon={<div>x</div>}
        okButtonProps={{ disabled: reportName.trim().length === 0 }}
      >
        <label>Enter Report Name</label>
        <Input value={reportName} onChange={(e) => setReportName(e.target.value)} />
      </Modal>
    </Wrapper>
  )
}
export default CreateReportPopup;
