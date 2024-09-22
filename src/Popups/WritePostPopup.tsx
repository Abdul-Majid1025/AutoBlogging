import { Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import WriteSvg from 'SVG/WriteSvg';
import { useSelector } from 'react-redux';
import { selectCategories } from 'Selectors/WebsiteSelectors';
import { actions } from 'Slice/WebsiteSlice';

const Wrapper = styled.div`
`;

type Props = {
  selectedKeywords: React.Key[]
  websiteId: number
  setTab: (a: string) => void
}
const WritePostPopup = function WritePostPopup(props: Props) {
  const { selectedKeywords, websiteId, setTab } = props;
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const [categoryId, setCategoryId] = useState(0);

  const writePost = () => {
    dispatch(actions.writePost({
      websiteId,
      categoryId,
      keywordIds: selectedKeywords as number[]
    }))
    setTab('2')
    setVisible(false);
  };

  useEffect(() => {
    setCategoryId(categories[0]?.categoryId)
  }, [categories])

  return (
    <Wrapper>
      <span className='move-btn' onClick={() => setVisible(true)}><WriteSvg /><span className='btn-text'>Write Post</span></span>
      <Modal
        visible={visible}
        title="Write Post"
        onOk={writePost}
        onCancel={() => setVisible(false)}
        centered
        destroyOnClose
        maskClosable
        width={689}
        closeIcon={<div>x</div>}
        className='write-modal'
      >
        <label>Select Category:</label><br />
        <Select defaultValue={categories[0]?.categoryId} style={{ width: '100%' }} onChange={(value: number) => setCategoryId(value)}>
          {categories.map((category) => <Option value={category.categoryId}>{category.categoryName}</Option>)}
        </Select>
      </Modal>
    </Wrapper>
  )
}
export default WritePostPopup;
