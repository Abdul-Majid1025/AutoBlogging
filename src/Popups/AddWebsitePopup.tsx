import { Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'antd';
import { styled } from 'styled-components';
import { actions } from 'Slice/WebsiteSlice';

const Wrapper = styled.div`
  .create-report-btn{
    color: white;
    padding: 8px 12px;
    border-radius: 5px;
    background-color: green;
    font-weight: 500;
    cursor: pointer;
  }
  label{
    margin-top: 10px;
  }
`;

const AddWebsitePopup = function AddWebsitePopup() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [websiteName, setWebsiteName] = useState('');
  const [domain, setDomain] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const addWebsite = () => {
    dispatch(actions.addWebsite({
      websiteName,
      domain,
      userName,
      password,
      categoryName,
    }))
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
        Add Website
      </span>
      <Modal
        visible={visible}
        title="Add Website"
        onOk={addWebsite}
        onCancel={() => setVisible(false)}
        centered
        destroyOnClose
        maskClosable
        width={689}
        closeIcon={<div>x</div>}
        okButtonProps={{ disabled: false }}
      >
        <label>Website Name</label>
        <Input value={websiteName} onChange={(e) => setWebsiteName(e.target.value)} />
        <label>Website URL</label>
        <Input value={domain} onChange={(e) => setDomain(e.target.value)} />
        <label>Wordpress Username/Email</label>
        <Input value={userName} onChange={(e) => setUserName(e.target.value)} />
        <label>Wordpress Password</label>
        <Input value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>Default Category</label>
        <Input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
      </Modal>
    </Wrapper>
  )
}
export default AddWebsitePopup;
