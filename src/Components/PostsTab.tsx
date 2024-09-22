/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Drawer, Table } from 'antd';
import { useSelector } from 'react-redux';
import { selectCategories, selectPosts } from 'Selectors/WebsiteSelectors';
import { useDispatch } from 'react-redux';
import { actions } from 'Slice/WebsiteSlice';
import Pill from './Pill';
import Popover from './Popover';
import AddCategoryPopup from 'Popups/AddCategoryPopup';
import PublishPostPopup from 'Popups/PublishPostPopup';
import { Post } from 'Types/WebsiteTypes';
import ReactHtmlParser from 'react-html-parser';

const Wrapper = styled.div`
.ant-drawer-body {
  background-color: #5340ff;
  color: #fff;
  height: calc(100vh - 55px);
}
.ant-drawer-body{
  background-color: blue;
        h2{
          margin-bottom: 0px !important;
        }
      }
  .ant-drawer{
    .preview-drawer{
      .ant-drawer-wrapper-body{
        .ant-drawer-body{
          h2{
            margin-bottom: 0px;
          }
        }
      }
    }
  }
  .table-operations{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 10px;
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
        display: flex;
        align-items: center;
        svg{
          height: 14px;
          width: auto;
          margin-right: 5px;
          stroke: white;
          fill: white;
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
    }
  }
  .ant-table-wrapper{
    .ant-table-selection-column{
      width: 3%;
    }
    .preview{
      cursor: pointer;
      color: blue;
    }
    .post-title{
      font-weight: 500;
    }
  }
`;

type Props = {
  websiteId: number
}
const PostsTab = function PostsTab(props: Props) {
  const { websiteId } = props;
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const categories = useSelector(selectCategories);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [previewPost, setPreviewPost] = useState(false);
  const [postToPreview, setPostToPreview] = useState<Post>();

  const handlePreview = (post: Post) => {
    setPreviewPost(true);
    setPostToPreview(post);
  }

  const getCategoryName = (categoryId: number) => {
    const category = categories.filter((category) => category.categoryId === categoryId);
    if (category?.length) {
      return category[0].categoryName;
    }
    return '';
  }
  const columns = [
    {
      title: 'Posts',
      dataIndex: 'title',
      key: 'title',
      width: '55%',
      render: (title: string, post: Post) =>
        <>
          <span className='post-title'>{title}</span><br />
          <span className="preview" onClick={() => handlePreview(post)}>Preview</span>
        </>
    },
    {
      title: 'Category',
      key: 'category',
      dataIndex: 'category',
      width: '10%',
      sorter: (a: Post, b: Post) => a.category - b.category,
      render: (category: number) =>
        getCategoryName(category),
    },
    {
      title: 'Status',
      dataIndex: 'isPublished',
      key: 'isPublished',
      width: '10%',
      sorter: (a: Post, b: Post) => Number(a.isPublished) - Number(b.isPublished),
      render: (isPublished: boolean) => {
        if (isPublished) {
          return <Pill color="#4BB543" text="Published" />
        } else { return <Pill color="#778899" text="Draft" /> }
      },
    },
  ];

  useEffect(() => {
    if (websiteId) {
      dispatch(actions.getPosts(websiteId))
    }
  }, [websiteId])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleFilter = () => {

  }

  return (
    <Wrapper>
      <Drawer
        onClose={() => setPreviewPost(false)}
        open={previewPost}
        key={"right"}
        width={700}
        className='preview-drawer'
      >
        {ReactHtmlParser(`<h1>${postToPreview?.title}</h1>` || "")}
        {ReactHtmlParser(postToPreview?.postText?.replace(/\n\n</g, "<").replace(/>\n\n/g, ">").replace(/\n</g, "<").replace(/>\n/g, ">").replace(/\n/g, "<br>") || '')}
      </Drawer>
      <div className='table-operations'>
        <div className='left-side'>
          <PublishPostPopup websiteId={websiteId} selectedPosts={selectedRowKeys} />
          <AddCategoryPopup websiteId={websiteId} />
        </div>
        <div className='right-side'>
          <Popover type='delete' handleFilter={handleFilter} />
          <Popover type='filter' handleFilter={handleFilter} />
        </div>
      </div>
      <Table
        rowKey={(post) => post.postId}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        columns={columns}
        dataSource={posts}
        pagination={{ pageSize: 1000 }}
      />
    </Wrapper>
  );
}

export default PostsTab;
