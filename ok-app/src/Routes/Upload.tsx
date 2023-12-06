import { useState } from "react";
import styled from "styled-components";
import { uploadImage } from "../api";

const Wrapper = styled.div`
  max-width: 1000px; // 최대 너비 설정
  width: 90%; // 전체 너비의 90%를 차지하도록 설정
  margin: 20px auto;
  margin-top: 180px;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 15px;
  color: ${(props) => props.theme.gray};
  font-size: 42px;
  margin-bottom: 15px;
`;

const UploadForm = styled.form`
  width: 800px;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const InputButton = styled.div`
  width: 200px;
  height: 40px;
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  background-color: #c3c3c3a2;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 400;
  transition: 0.3s;
  color: black;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

const FileLog = styled.div`
  margin-top: 10px;
  color: #555;
  font-style: italic;
`;

const GenerateButton = styled.div`
  width: 200px;
  height: 40px;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  margin-top: 10px;
  opacity: 0.8;
  transition: 0.3s;
  &:hover {
    opacity: 1;
  }
`;

const Footer = styled.footer`
  font-size: 18px;
  text-align: center;
  font-weight: 400;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const CaptionDisplay = styled.div`
  color: black; 
  font-size: 16px; 
  margin-top: 20px;
  margin-bottom: 20px;
`;



function Upload() {
  const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const [fileLog, setFileLog] = useState('No image selected.');
  const [caption, setCaption] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileLog(`Selected Image: ${file.name}`);
    } else {
      setFileLog('No image selected.');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile) {
      try {
        const response = await uploadImage(selectedFile);
        setCaption(response.translated_caption); // 서버로부터 받은 캡션을 상태에 저장
      } catch (error) {
        console.error('Error uploading image:', error);
        setCaption('Failed to generate caption.'); // 오류 발생 시 메시지 설정
      }
    } else {
      alert('Please select an image to upload.');
    }
  };

  return (
    <>
      <Wrapper>
        <Title>Image Captioning with AI</Title>
        <UploadForm onSubmit={handleSubmit}>
          <InputButton as="label" htmlFor="image-upload">Choose an Image</InputButton>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <FileLog>{fileLog}</FileLog>
          <GenerateButton as="button" type="submit">Generate Caption</GenerateButton>
        </UploadForm>
        {caption && <CaptionDisplay>{caption}</CaptionDisplay>}
        
      </Wrapper>
      <Footer>Save</Footer>
    </>
  );
}

export default Upload;