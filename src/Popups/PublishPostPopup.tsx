import { InputNumber, Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import { actions } from 'Slice/WebsiteSlice';
import PublishSvg from 'SVG/PublishSvg';

const Wrapper = styled.div`
`;

type Props = {
  websiteId: number;
  selectedPosts: React.Key[];
}
const PublishPostPopup = function PublishPostPopup(props: Props) {
  const { websiteId, selectedPosts } = props;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [schedulingGap, setSchedulingGap] = useState(1);

  const publishPost = () => {
    dispatch(actions.publishPosts({
      websiteId: websiteId,
      postIds: selectedPosts.join(','),
      schedulingGap: schedulingGap,
    }));
    setVisible(false);
  };

  return (
    <Wrapper>
      <span
        className='clr-btn'
        onClick={() => setVisible(true)}
        role="button"
      ><PublishSvg /><span>Publish Post</span></span>
      <Modal
        visible={visible}
        title="Publish Post"
        onOk={publishPost}
        onCancel={() => setVisible(false)}
        centered
        destroyOnClose
        maskClosable
        width={689}
        closeIcon={<div>x</div>}
        okButtonProps={{ disabled: !schedulingGap }}
      >
        <label>Enter Scheduling Gap</label>
        <InputNumber min={0} placeholder='Schduling Gap in hours' value={schedulingGap} onChange={(e) => setSchedulingGap(e as number)} />
      </Modal>
    </Wrapper>
  )
}
export default PublishPostPopup;
