import React, { useEffect } from 'react';
import Slider from "react-slick";
import styled from 'styled-components';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ClubListItem from './ClubListItem';
import { useState } from 'react';
import JoinClub from '../club/manage/JoinClub';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');
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
    padding: 30px;

  }
  .arrow > img {
    filter: brightness(250%);
  }
  .arrow > img:hover {
    filter: brightness(70%) saturate(120%);
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
      right: direction === 'next' ? '-50px' : 'auto',  
      }}
      className="arrow"
    >
      {direction === 'prev' ? <img src="/img/arrow-icon.png" style={{width:"50px", height:"50px", transform: "rotate(90deg)"}}/> : <img src="/img/arrow-icon.png" style={{width:"50px", height:"50px", transform: "rotate(-90deg)"}}/>}
    </div>
  );

const MainClubList = () => {

  const [clubList, setClubList] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8885/club/clubList")
    .then(resp => resp.json())
    .then( data => {
      console.log(data);
      setClubList(data);
    });
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
          {clubList.map((club) => (
            <ClubListItem key={club.no} club={club}/>
          ))}
        </StyledCarouselDiv>  
      );
    
};

export default MainClubList;