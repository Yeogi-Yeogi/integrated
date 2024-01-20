import React, { useEffect } from 'react';
import Slider from "react-slick";
import styled from 'styled-components';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ClubListItem from './ClubListItem';
import { useState } from 'react';

const StyledCarouselDiv = styled(Slider)`
  display: flex;
  align-items: center;
  width: 1000px;
  height: 400px;
  & > div {
  }
  
  .slick-track > div{
    outline: none;
    width: 250px;
    height: 300px;
    /* background-color: red; */
    /* display: grid; */
    padding: 30px;

  }
`;


const Arrow = ({ onClick, direction }) => (

    <div onClick={onClick} style={{ 
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        zIndex: 1,
        left: direction === 'prev' ? '-50px' : 'auto',
        right: direction === 'next' ? '-50px' : 'auto' 
        }}>

      {direction === 'prev' ? <img src="/img/arrow-icon.png" style={{width:"50px", height:"50px", transform: "rotate(90deg)"}}/> : <img src="/img/arrow-icon.png" style={{width:"50px", height:"50px", transform: "rotate(-90deg)"}}/>}
    </div>
  );

const MainClubList = () => {

  const [clubData, setClubData] = useState([]);

  useEffect(() => {
    fetch("")
  }, []);

  const settings = {
      // dots: true,
      infinite: true,
      speed: 400,
      slidesToShow: 4,  
      slidesToScroll: 1,
      prevArrow: <Arrow direction="prev" />,
      nextArrow: <Arrow direction="next" />,
  };
    return (
        <StyledCarouselDiv {...settings}>
          <ClubListItem/>
          <ClubListItem/>
          <ClubListItem/>
          <ClubListItem/>
          <ClubListItem/>
          <ClubListItem/>
          <ClubListItem/>
          <ClubListItem/>
          <ClubListItem/>
          <ClubListItem/>
          <ClubListItem/>
          <ClubListItem/>
          <ClubListItem/>
          <ClubListItem/>
          <ClubListItem/>
        </StyledCarouselDiv>  
      );
    
};

export default MainClubList;