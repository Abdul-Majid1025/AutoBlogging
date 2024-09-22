import styled from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { boxShadow } from 'Utils/utilsStyle';

const Wrapper = styled.div`
  height: 70px;
  padding: 0px 100px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${boxShadow};
  margin-bottom: 20px;
  .web-title{
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
  }
  .menu-item{
    margin-left: 15px;
    cursor: pointer;
    font-weight: 500;
  }
`;


const Navbar = function Navbar() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <span
        className='web-title'
        onClick={() => navigate('/')}
      >
        <span style={{ color: "#ff6404" }}>Keywords</span>
        <span style={{ color: "#0c3044" }}> Finder</span>
      </span>
      <span>
        <span className='menu-item' onClick={() => navigate('/')}>My Reports</span>
        <span className='menu-item' onClick={() => navigate('/websites')}>My Websites</span>
      </span>
    </Wrapper>
  );
}

export default Navbar;
