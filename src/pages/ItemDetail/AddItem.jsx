import { useState, useRef } from "react";
import styled from "styled-components";
import uploadIcon from "../../assets/images/upload_icon.png";
import Button from "../../components/common/button/Button";

import { addItem } from "../../api/shop";
import { useNavigate } from "react-router-dom";

const MainBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 200px;
    margin-right: 200px;
`

const UploadBox = styled.div`
    width: 459px;
    height: 602px;
    border: 2px dashed #D0D0D0;
    border-radius: 5px;
    background-color: #F9F9F9;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    overflow: hidden;

    &:hover {
        background-color: #F2F2F2;
    }
`;

const PreviewImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const UploadIcon = styled.img`
    width: 50px;
    height: 55px;
`

const Line = styled.div`
    width: 2px;
    height: 830px;

    background-color: #EBEBEB;
`

const ProductInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 27px 33px;

    border-radius: 15px;
    box-shadow: 1.5px 1px 8px rgba(0, 0, 0, 0.5);

    width: 285px;
    height: 739px;
`

const Text1 = styled.div`
    color: #1A1A1A;
    font-size: 24px;
    
    margin-bottom: 14px;
`

const Text2 = styled.div`
    color: #6C6C6C;
    font-size: 14px;
    
    margin-top: 10px;
`

//padding-top: 8px;
//padding-bottom: 8px;

const WordSizeBox = styled.input`
    display: flex;
    align-items: center;

    border-radius: 5px;
    padding-left: 10px;

    border: 1px solid #6C6C6C;

    min-height: 40px;

    
`

const NumSizeBox = styled.div`
    display: flex;
    align-items: center;

    border-radius: 5px;
    padding-left: 11px;
    padding-top: 8px;
    padding-bottom: 8px;

    border: 1px solid #6C6C6C;

    min-height: 40px;

    
`

const OptionButton = styled.button`
    background-color: ${props => props.$isSelected ? "#DFDFDF" : "#F2F2F2"};
    color: #333;
    width: 102px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #ddd;
    margin-right: 5px;
    cursor: pointer;
    font-size: 12px;
`;

const OptionButton2 = styled.button`
    background-color: ${props => props.$isSelected ? "#DFDFDF" : "#F2F2F2"};
    color: #333;
    width: 67px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #ddd;
    margin-right: 5px;
    cursor: pointer;
    font-size: 12px;
`;

const TypeBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const types = [
    { id: 1, name: "의류" },
    { id: 2, name: "신발" }
]

const sex = [
    { id: 1, name: "남성" },
    { id: 2, name: "여성" }
]

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px 0px;
    margin-bottom: 20px;
    width: 100%;
`;

const color = [
    { id: 1, name: "red" },
    { id: 2, name: "pink" },
    { id: 3, name: "blue" },
    { id: 4, name: "gray" },
    { id: 5, name: "black" },
    { id: 6, name: "denim" },
    { id: 7, name: "multi" },
    { id: 8, name: "rainbow" },
    { id: 9, name: "holographic" }
]

const CompleteButton = styled.div`
    display: flex;
    justify-content: center;
`

const CompleteButton2 = styled(Button)`
    display: flex;
    justify-content: center;
    font-size: 12px;

    background-color: #F2F2F2;
    padding: 8px 67px 8px 66px;
    align-items: center;
    border-radius: 5px;
    border: 1px solid #F2F2F2;
    cursor: pointer;
`




export default function AddItem() {
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const [selectedType, setSelectedType] = useState("");
    const [selectedSex, setSelectedSex] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    const [name, setName] = useState("");
    const [rating, setRating] = useState("");
    const [reviews, setReviews] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");


    const onUploadClick = () => {
        fileInputRef.current.click();
    };

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const navigate = useNavigate();
    const handleSubmit = async () => {
        // 서버가 요구하는 데이터 규격에 맞춰 객체 생성 [cite: 364-374, 693-696]
        const productData = {
            image: imagePreview || "기본_이미지_URL", // 업로드한 이미지 주소
            name: name,
            rating: Number(rating), // 숫자로 변환 필수! [cite: 366]
            reviews: Number(reviews),
            price: Number(price),
            size: size,
            type: selectedType.name === "의류" ? "clothes" : "shoes", // 영문 변환
            gender: selectedSex.name === "남성" ? "male" : "female",
            color: selectedColor.name
        };

        try {
            // "의류"면 clothes, "신발"이면 shoes 경로로 POST 요청 [cite: 258, 356]
            const type = selectedType.name === "의류" ? "clothes" : "shoes";
            await addItem(type, productData); 
            
            alert("상품 등록이 완료되었습니다!");
            navigate("/"); // 등록 후 메인으로 이동
        } catch (error) {
            console.error("등록 에러:", error);
            alert("등록에 실패했습니다.");
        }
    };

    return (
        <MainBox>
            <UploadBox onClick={onUploadClick}>
                {imagePreview ? (
                    <PreviewImage src={imagePreview} alt="미리보기" />
                ) : (
                    <>
                        <UploadIcon src= {uploadIcon} alt="업로드 아이콘"/>
                    </>
                )}
            </UploadBox>

            <Line />

            <ProductInfoBox>
                <Text1>상품 정보 등록</Text1>
                <Text2>상품명</Text2>
                <WordSizeBox value={name} onChange={(e) => setName(e.target.value)} />
                <Text2>평점</Text2>
                <WordSizeBox value={rating} onChange={(e) => setName(e.target.value)} />
                <Text2>리뷰수</Text2>
                <WordSizeBox value={reviews} onChange={(e) => setName(e.target.value)} />
                <Text2>가격</Text2>
                <WordSizeBox value={price} onChange={(e) => setName(e.target.value)} />
                <Text2>사이즈</Text2>
                <WordSizeBox value={size} onChange={(e) => setName(e.target.value)} />

                <Text2>종류</Text2>
                <TypeBox>
                    {types.map(typ => (
                        <OptionButton
                            key={typ.id}
                            $isSelected={selectedType === typ}
                            onClick={() => setSelectedType(typ)}
                        >
                        {typ.name}
                        </OptionButton>
                    ))}
                </TypeBox>

                <Text2>성별</Text2>
                <TypeBox>
                    {sex.map(sx => (
                        <OptionButton
                            key={sx.id}
                            $isSelected={selectedSex === sx}
                            onClick={() => setSelectedSex(sx)}
                        >
                        {sx.name}
                        </OptionButton>
                    ))}
                </TypeBox>

                <Text2>색상</Text2>
                <GridContainer>
                    {color.map(clr => (
                        <OptionButton2
                            key={clr.id}
                            $isSelected={selectedColor === clr}
                            onClick={() => setSelectedColor(clr)}
                        >
                        {clr.name}
                        </OptionButton2>
                    ))}
                </GridContainer>

                <CompleteButton>
                    <CompleteButton2 buttonName="상품 등록 완료" onClick={handleSubmit} /> {/* 클릭 시 API 호출! */}
                </CompleteButton>
            
            </ProductInfoBox>

            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={onFileChange}
            />

        </MainBox>
    );
}