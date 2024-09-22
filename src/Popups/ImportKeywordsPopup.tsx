import { Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import TextArea from 'antd/es/input/TextArea';
import { actions } from 'Slice/KeywordSlice';
import UploadSvg from 'SVG/UploadSvg';
import classNames from 'classnames';
import { selectImportLoading } from 'Selectors/KeywordSelectors';
import { useSelector } from 'react-redux';

const Wrapper = styled.span`
  .import-btn{
    color: white;
    font-weight: 500;
    padding: 8px 12px;
    border-radius: 5px;
    background-color: green;
    cursor: pointer;
    margin-left: 10px;
    &.disabled{
      pointer-events: none;
      opacity: 0.6;
    }
  }
  .upload-btn{
    background-color: white;
    cursor: pointer;
    margin-left: 10px;
    padding: 6px 12px;
    border-radius: 5px;
    border: 2px solid #008000;
  }
`;

type Props = {
  isUpload: boolean;
};
const ImportKeywordsPopup = function ImportKeywordsPopup(props: Props) {
  const { isUpload } = props;
  const dispatch = useDispatch();
  const importLoading = useSelector(selectImportLoading);
  const searchParams = new URLSearchParams(window.location.search);
  const reportId = searchParams.get('reportId');

  const [visible, setVisible] = useState(false);
  const [keywords, setKeywords] = useState('');
  const title = isUpload ? 'Upload Keywords' : 'Import Keywords';

  const importKeywords = () => {
    const values = keywords.split('\n');
    const commaSeparated = values.map((value) => value.trim()).join(',');
    dispatch(actions.importKeywords({
      reportId: parseInt(reportId || ''),
      keywords: commaSeparated
    }))
    setVisible(false);
  };

  return (
    <Wrapper>
      {isUpload ?
        <span
          className='upload-btn'
          onClick={() => setVisible(true)}
          role="button"
        ><UploadSvg /></span>
        :
        <span
          className={classNames('import-btn', { disabled: importLoading })}
          onClick={() => setVisible(true)}
          role="button"
        >{title}</span>
      }
      <Modal
        visible={visible}
        title={title}
        onOk={importKeywords}
        onCancel={() => setVisible(false)}
        centered
        destroyOnClose
        maskClosable
        width={689}
        closeIcon={<div>x</div>}
        okButtonProps={{ disabled: keywords.trim().length === 0 }}
      >
        <TextArea rows={8} value={keywords} onChange={(e) => setKeywords(e.target.value)} />
      </Modal>
    </Wrapper>
  )
}
export default ImportKeywordsPopup;
