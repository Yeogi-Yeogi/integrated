import React from 'react';
import Slider from "react-slick";
import styled from 'styled-components';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const StyledCarouselDiv = styled(Slider)`
  width: 1000px;
  height: 400px;
  & > div {
  }
  
  .slick-track > div{
    outline: none;
    width: 250px;
    height: 300px;
    background-color: red;
    /* display: grid; */
    padding: 30px;
    & > div > div {
        display: inline-block;
        width: 200px;
        height: 250px;
        background: yellow;
    }
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

      {direction === 'prev' ? <img src="/img/arrow-icon.png" style={{width:"50px", height:"50px"}}/> : <img src="/img/arrow-icon.png" style={{width:"50px", height:"50px"}}/>}
    </div>
  );

const MainClubList = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 4,  // 한 번에 보여질 슬라이드 개수
        slidesToScroll: 1,
        prevArrow: <Arrow direction="prev" />,
        nextArrow: <Arrow direction="next" />,
      };
    return (
        <StyledCarouselDiv {...settings}>
          <div>
            <h3>슬라이드 1</h3>
          </div>
          <div>
            <h3>슬라이드 2</h3>
          </div>
          <div>
            <h3>슬라이드 3</h3>
          </div>
          <div>
            <h3>슬라이드 4</h3>
          </div>
          <div>
            <h3>슬라이드 5</h3>
          </div>
          <div>
            <h3>슬라이드 6</h3>
          </div>
        </StyledCarouselDiv>  
      );
    
};

export default MainClubList;