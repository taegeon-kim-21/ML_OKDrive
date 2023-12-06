import {
  motion,
  useAnimation,
  useViewportScroll,
  Variants,
} from "framer-motion";

import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import Search from "../Routes/Search";
import axios from 'axios'; // axios 라이브러리를 사용하여 API 호출을 수행합니다.
import React, { useState, useEffect } from 'react';


const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 4%;
  color: white;
  z-index: 1;
  @media screen and (max-width: 930px) {
    height: 45px;
  }
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 100px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  transform: scale(1.05);
  @media screen and (max-width: 1130px) {
    margin-right: 22px;
  }
  @media screen and (max-width: 930px) {
    transform: scale(0.8);
  }

  /* have to set min-width */
  /* @media screen and (max-width: 850px) {
    } */
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 80px;
  font-size: 28px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
  @media screen and (max-width: 1130px) {
    font-size: 14px;
  }
  @media screen and (max-width: 930px) {
    font-size: 12px;
    margin-right: 14px;
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  bottom: -15px;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.red};
  left: 0;
  right: 0;
  margin: 0 auto;
  @media screen and (max-width: 930px) {
    transform: scale(0.5);
  }
`;

const logoVariants: Variants = {
  initial: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};
const Gallery = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem;
  margin: 0 auto; /* 가운데 정렬을 위해 margin 추가 */
  max-width: 1200px; /* 적당한 최대 너비 설정 */
`;

const ImageCard = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  text-align: center;
`;

const Image = styled.img`
  max-width: 100%; /* 이미지의 최대 너비를 100%로 설정하여 부모 요소에 맞게 조절 */
  height: auto;
`;

interface Image {
  id: number;
  image: string;  // 이미지 URL을 나타내는 문자열
  translated_caption: string | null;  // null 가능성이 있는 번역된 캡션
}
function Header() {
  const homeMatch = useMatch("/");
  const uploadMatch = useMatch("upload");
  const deleteMatch = useMatch("delete");
  const searchMatch = useMatch("search");

  useEffect(() => {
    const fetchImages = () => {
      axios.get('/api/images/')
        .then(response => {
          console.log(response.data); // 응답 확인을 위한 콘솔 로그
          setImages(response.data);
        })
        .catch(error => {
          console.error('Error fetching images', error);
        });
    };

    fetchImages(); // 컴포넌트 마운트 시 이미지를 처음 불러옵니다.
    const interval = setInterval(fetchImages, 30000); // 30초마다 이미지 갱신

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌을 제거합니다.
  }, []);

  const [images, setImages] = useState<Image[]>([]); 
  // 기존의 상태 관련 코드...

  return (
    <>
      <Nav initial="top">
        <Col>
          <Logo
            variants={logoVariants}
            animate="initial"
            whileHover="active"
            xmlns="http://www.w3.org/2000/svg"
            width="1024"
            height="276.742"
            viewBox="0 0 1024 276.742"
          >
            {/* Logo 내용 */}
          </Logo>
          {/* change to menu toggle under 850px. */}
          <Items>
            <Item>
              <Link to="/" >Home{homeMatch && <Circle layoutId="circle" />}</Link>
            </Item>
            <Item>
              <Link to="/upload">Upload{uploadMatch && <Circle layoutId="circle" />}</Link>
            </Item>
            <Item>
              <Link to="/delete">Delete{deleteMatch && <Circle layoutId="circle" />}</Link>
            </Item>
            <Item>
              <Link to="/search">Search{searchMatch && <Circle layoutId="circle" />}</Link>
            </Item>
          </Items>
        </Col>
        <Col>
          <Search />
        </Col>
      </Nav>
      <Gallery>
        {images.map((image) => (
          <ImageCard key={image.id}>
            <Image src={image.image} alt="Uploaded" />
            {image.translated_caption && <p>{image.translated_caption}</p>}
          </ImageCard>
        ))}
      </Gallery>

    </>
  );
}

export default Header;
