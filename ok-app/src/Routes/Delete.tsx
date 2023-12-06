import React, { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { allImagesState } from '../atom';
import { getImages, deleteImage } from '../api'; // deleteImage를 import 추가
import styled from "styled-components";


const Wrapper = styled.div`
  width: 1200px;
  height: 200vh;
  max-width: 1200px;
  margin: 20px auto;
  margin-top: 200px;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Gallery = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 26px;
  padding: 0 18px 0 18px;
`;

const ImageCard = styled.div`
  height: 400px;
  border: 1.5px solid #5f5b5b49;
  border-radius: 10px;  // 둥근 모서리 추가
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;


const Img = styled.div`
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
`;

const Caption = styled.div`
  font-size: 15px;
  font-weight: 200;
  color: black;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100px;
  height: 30px;
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.15);
    background-color: #ff6b6b;
  color: white;
  font-size: 14px;
  margin-bottom: 3px;
  opacity: 0.7;
  transition: 0.3s;
  &:hover {
    opacity: 1;
  }
`;

// ... 스타일 컴포넌트 정의 ...
function Delete() {
    const setAllImages = useSetRecoilState(allImagesState);
  
    useEffect(() => {
      getImages().then(images => {
        setAllImages(images);
      }).catch(error => {
        console.error("Error fetching images:", error);
      });
    }, [setAllImages]);
  
    const allImages = useRecoilValue(allImagesState);
  
    // imageId의 타입을 number로 지정
    const handleDelete = async (imageId: number) => {
      try {
        await deleteImage(imageId);
        setAllImages((prevImages) => prevImages.filter((image) => image.id !== imageId));
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    };
  
    return (
      <Wrapper>
        <Gallery>
          {allImages.map((image) => (
            <ImageCard key={image.id}>
              <Img style={{ backgroundImage: `url(${image.image})` }} />
              {image.translated_caption && (
                <Caption>{image.translated_caption}</Caption>
              )}
              {/* Delete 버튼에 onClick 이벤트 핸들러를 연결 */}
              <Button onClick={() => handleDelete(image.id)}>Delete</Button>
            </ImageCard>
          ))}
        </Gallery>
      </Wrapper>
    );
  }
  
  export default Delete;