import { Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'antd';
import { styled } from 'styled-components';
import CategorySvg from 'SVG/CategorySvg';
import { actions } from 'Slice/WebsiteSlice';

const Wrapper = styled.div`
`;

type Props = {
  websiteId: number
}
const AddCategoryPopup = function AddCategoryPopup(props: Props) {
  const { websiteId } = props;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const createNewReport = () => {
    dispatch(actions.addCategory({
      websiteId: websiteId,
      categoryName,
    }));
    setVisible(false);
  };

  return (
    <Wrapper>
      <span className='move-btn' onClick={() => setVisible(true)}><CategorySvg /><span className='btn-text'>Add Category</span></span>
      <Modal
        visible={visible}
        title="Add Category"
        onOk={createNewReport}
        onCancel={() => setVisible(false)}
        centered
        destroyOnClose
        maskClosable
        width={689}
        closeIcon={<div>x</div>}
        okButtonProps={{ disabled: categoryName.trim().length === 0 }}
      >
        <label>Enter Category Name</label>
        <Input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
      </Modal>
    </Wrapper>
  )
}
export default AddCategoryPopup;
