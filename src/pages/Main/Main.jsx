import styled from "styled-components";
import Button from "../../components/common/button/Button.jsx";
import { act, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import clothes1 from "../../assets/images/lite_gray.png";
import clothes2 from "../../assets/images/lite_blue.png";
import clothes3 from "../../assets/images/black_jersey.png";
import clothes4 from "../../assets/images/supreme_hoodie.png";
import clothes5 from "../../assets/images/nike_air.png";

// 5개 버튼 감싸는 박스
const ButtonContainer = styled.div`
    margin-top: 40px;
    margin-left: 155px;
    margin-right: 160px;
    
    display: flex;
    justify-content: space-between;
    width: 365px;
`

// 버튼 CSS
const StyledButton = styled(Button)`
    background-color: ${props => props.$bg || "#F2F2F2"};
    color: #616161;
    font-size: 13px;
    font-family: Pretendard;
    font-weight: 400;

    padding: 10px 9px;

    border-radius: 15px;
    cursor: pointer;
`

const CloseButton = styled(StyledButton)`
    background-color: transparent;
    color: #616161;
    font-size: 19px;
    font-family: Pretendard;
    font-weight: 400;

    padding: 0;
    margin: 0;
    min-width: auto;
    min-height: auto;
    line-height: 1;

    border: none;
    cursor: pointer;
`

// 모달 안의 버튼 css
const ModalOptionButton = styled(StyledButton)`
    min-width: 60px;      /* 최소 50px 유지 */
    width: auto;          /* 글자가 길면 늘어남 */
    white-space: nowrap;  /* 줄바꿈 방지 */
    padding: 10px 12px;   /* 좌우 여백 확보 */
    
    /* 텍스트가 중앙에 오도록 보정 */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
`;

// 정렬순 버튼 감싸는 박스
const ButtonArray = styled.div`
    margin-top: 20px;
    margin-right: 130px;

    padding-right: 20px;
    
    display: flex;
    justify-content: flex-end;

    position: relative;
    z-index: 100;
`

// 정렬순 클릭 시 나오는 항목들 박스
const OrderOption = styled.div`
    position: absolute;

    top: 100%;
    right: 20px;

    background-color: white;
    border-radius: 12px;
    box-shadow: 0 1px 13px rgba(0, 0, 0, 0.25);

    z-index:1000;

    width: 150px;
    
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 10px 20px 10px 10px;
`

// 모달창 열었을 때 뒷배경
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`

// 모달창 박스
const ModalContent = styled.div`
    background-color: white;
    padding: 30px 33px 48px 35px;
    border-radius: 22px;
    width: 340px;
    min-height: 147px;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h2 {
        font-size: 16px;
    }
`

// 모달창 안의 제목, X 감싸는 박스
const ModalText = styled.div`
    display: flex;
    justify-content: space-between;
`

// 모달창 안의 박스들의 박스
const ModalContent2 = styled.div`
    background-color: white;
    border-radius: 10px;
    
    margin-top: 10px;
    gap: 16px 20px;
    width: 100%;
    flex-wrap: wrap;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
`

// 모달창 안의 버튼들의 박스
const ModalContent3 = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    justify-content: flex-start;
`

// 제품들 감싸는 박스
const ProductItems = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 155px;
    margin-right: 100px;
    margin-top: 120px;
`

const ProductComponents = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const ItemImage = styled.img`
    width: 220px;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    background-color: white;
    border-radius: 8px;
    margin-bottom: 10px;
`

const ItemText1 = styled.div` font-size: 12px; color: #333333; `
const ItemText2 = styled.div` font-size: 12px; color: #000000; `
const ItemText3 = styled.div` font-size: 12px; color: #A7A7A7; `

function useToggle(initialValue = false) {
    const [activeId, setActiveId] = useState(initialValue);

    const toggle = (buttonId) => {
        console.log("버튼 클릭됨! 이전 상태: ", activeId, "현재 상태: ", buttonId);
        setActiveId((prev) => (prev === buttonId ? null : buttonId));
    }

    return [activeId, toggle];
}

export default function Main(){
    const {pathname} = useLocation(); // 현재 페이지 경로 불러오기
    const navigate = useNavigate(); // 페이지 이동시키는 함수

    const [activeId, modalOpener] = useToggle(null);

    const [selectedOption, setSelectedOption] = useState("defalut");

    const button = [ 
        { id: "gender", name: "성별" }, 
        { id: "color", name: "색상" }, 
        { id: "size", name: "사이즈" }, 
        { id: "price", name: "가격대" }, 
        { id: "type", name: "종류" },
    ]

    const genderbutton = [
        { id: "male", name: "남성" },
        { id: "female", name: "여성" }, 
        { id: "unisex", name: "남녀공용" },
    ]

    const colorbutton = [
        { id: "color1", name: "red" },
        { id: "color2", name: "pink" }, 
        { id: "color3", name: "blue" }, 
        { id: "color4", name: "black" }, 
        { id: "color5", name: "gray" }, 
        { id: "color6", name: "denim" }, 
        { id: "color7", name: "multi" }, 
        { id: "color8", name: "rainbow" }, 
        { id: "color9", name: "holographic" },
    ]

    const sizebutton = [
        { id: "shoesize1", name: "9" },
        { id: "shoesize2", name: "10" },
        { id: "clothingsize1", name: "S" },  
        { id: "clothingsize2", name: "M" }, 
        { id: "clothingsize3", name: "L" }, 
        { id: "clothingsize4", name: "XL" },
    ]

    const pricebutton = [
        { id: "price1", name: "0~30" }, 
        { id: "price2", name: "31~60" }, 
        { id: "price3", name: "60~90" },
    ]

    const typebutton = [
        { id: "clothes", name: "의류" }, 
        { id: "shoes", name: "신발" },
    ]

    const orderButton = { id: "order", name: "정렬순" };

    const orderOptionButton = [
        { id: "default", name: "기본 정렬순"}, 
        { id: "rating", name: "평점 높은순"}, 
        { id: "review", name: "리뷰 많은순"},
    ]

    const productList = [
        { id: 1, img: clothes1, productname: "아이앱 스튜디오 25 후드 라이트 그레이", productprice: "145,000원", reviewcount: "리뷰 1,561" }, 
        { id: 2, img: clothes2, productname: "아이앱 스튜디오 25 후드 라이트 블루", productprice: "145,000원", reviewcount: "리뷰 1,732" }, 
        { id: 3, img: clothes3, productname: "아디다스 블랙 져지 2016", productprice: "255,000원", reviewcount: "리뷰 781" }, 
        { id: 4, img: clothes4, productname: "슈프림 후드집업 30 딥블루", productprice: "458,000원", reviewcount: "리뷰 2,567" }, 
        { id: 5, img: clothes5, productname: "나이키 에어 그레이 하운드 25", productprice: "235,000원", reviewcount: "리뷰 231" }
    ]

    return (
        <div>
            {/* 왼쪽 상단 버튼 5개 */}
            <ButtonContainer>
                {button.map(btn => (
                    <StyledButton
                        key = {btn.id}
                        onClick={() => modalOpener(btn.id)}
                        buttonName={`${btn.name} ${activeId === btn.id ? "∧" : "⌵"}`}>
                    </StyledButton>
                ))}
            </ButtonContainer>
            
            {/* activeId가 order나 null 아닐 때(즉 5개 버튼 중 하나일 때) 모달 창 띄움 */}
            {activeId && activeId !== "order" && (
                <ModalOverlay onClick={()=>modalOpener(null)}>
                    {/* 원래는 모달창을 클릭해도 부모인 ModalOverlay를 클릭했다 간주하여 꺼지는 것을 방지하기 위한 명령어 */}
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalText>
                            <h2>{button.find(btn => btn.id === activeId)?.name}</h2>
                            {/* X 아이콘 */}
                            <CloseButton onClick={() => modalOpener(null)} buttonName = "⨉" $bg = "" />
                        </ModalText>

                        <br />

                        {/* 성별 모달 */}
                        {activeId === "gender" && (
                            <ModalContent2>
                                <ModalContent3>
                                    {genderbutton.map(gnd => (
                                        <ModalOptionButton 
                                            key = {gnd.id}
                                            onClick={() => navigate("")}
                                            buttonName = {gnd.name}>
                                        </ModalOptionButton>
                                    ))}
                                </ModalContent3>
                            </ModalContent2>
                        )}

                        {/* 색상 모달 */}
                        {activeId === "color" && (
                            <ModalContent2>
                                <ModalContent3>
                                    {colorbutton
                                        .filter((clr) => clr.id === "color1" || clr.id === "color2" || clr.id === "color3")
                                        .map(clr => (
                                            <ModalOptionButton 
                                                key = {clr.id}
                                                onClick={() => navigate("")}
                                                buttonName = {clr.name}>
                                            </ModalOptionButton>   
                                    ))}
                                </ModalContent3>
                                
                                <ModalContent3>
                                    {colorbutton
                                        .filter((clr) => clr.id === "color4" || clr.id === "color5" || clr.id === "color6")
                                        .map(clr => (
                                            <ModalOptionButton 
                                                key = {clr.id}
                                                onClick={() => navigate("")}
                                                buttonName = {clr.name}>
                                            </ModalOptionButton>
                                    ))}
                                </ModalContent3>

                                <ModalContent3>
                                    {colorbutton
                                        .filter((clr) => clr.id === "color7" || clr.id === "color8" || clr.id === "color9")
                                        .map(clr => (
                                            <ModalOptionButton 
                                                key = {clr.id}
                                                onClick={() => navigate("")}
                                                buttonName = {clr.name}>
                                            </ModalOptionButton>    
                                    ))}
                                </ModalContent3>
                            </ModalContent2>
                        )}

                        {/* 사이즈 모달 */}
                        {activeId === "size" && (
                            <ModalContent2>
                                <ModalContent3>
                                {sizebutton
                                    .filter((sze) => sze.id === "shoesize1" || sze.id === "shoesize2")
                                    .map(sze => (
                                        <ModalOptionButton 
                                            key = {sze.id}
                                            onClick={() => navigate("")}
                                            buttonName = {sze.name}>
                                        </ModalOptionButton>
                                    ))}
                                </ModalContent3>

                                <ModalContent3>
                                {sizebutton
                                    .filter((sze) => sze.id === "clothingsize1" || sze.id === "clothingsize2" || sze.id === "clothingsize3" || sze.id === "clothingsize4")
                                    .map(sze => (
                                        <ModalOptionButton 
                                            key = {sze.id}
                                            onClick={() => navigate("")}
                                            buttonName = {sze.name}>
                                        </ModalOptionButton>
                                    ))}
                                </ModalContent3>
                            </ModalContent2>
                        )}

                        {/* 가격 모달 */}
                        {activeId === "price" && (
                            <ModalContent2>
                                <ModalContent3>
                                    {pricebutton.map(prc => (
                                        <ModalOptionButton 
                                            key = {prc.id}
                                            onClick={() => navigate("")}
                                            buttonName = {prc.name}>
                                        </ModalOptionButton>
                                    ))}
                                </ModalContent3>
                            </ModalContent2>
                        )}

                        {/* 종류 모달 */}
                        {activeId === "type" && (
                            <ModalContent2>
                                <ModalContent3>
                                    {typebutton.map(typ => (
                                        <ModalOptionButton 
                                            key = {typ.id}
                                            onClick={() => navigate("")}
                                            buttonName = {typ.name}>
                                        </ModalOptionButton>
                                    ))}
                                </ModalContent3>
                            </ModalContent2>
                        )}
                    </ModalContent>
                </ModalOverlay>
            )}

            {/* 정렬순 버튼 */}
            <ButtonArray>
                <StyledButton
                    $bg = "white"
                    onClick = {() => modalOpener(orderButton.id)} 
                    buttonName={`${orderButton.name} ⮃`}>
                </StyledButton>

                {/* 정렬순 버튼 클릭 시 나오는 것들 */}
                { activeId === "order" && (
                    <OrderOption>
                        {orderOptionButton.map((item) => (
                            <div
                                key = {item.id}
                                onClick = {() => {
                                    setSelectedOption(item.id);
                                    modalOpener(null);
                                    navigate("");
                                }}
                                style={{
                                    display: 'flex', 
                                    cursor: 'pointer'
                                }}
                            >
                                {item.name}
                                {selectedOption === item.id && <span style = {{ marginLeft: '10px' }}>✓</span>}
                            </div>
                        ))}
                    </OrderOption>
                )}
            </ButtonArray>

            <ProductItems>
                {productList.map((item) => 
                    <ProductComponents key = {item.id}>
                        <ItemImage src = {item.img} alt = {item.productname} />
                        <ItemText1>{item.productname}</ItemText1>
                        <ItemText2>{item.productprice}</ItemText2>
                        <ItemText3>{item.reviewcount}</ItemText3>
                    </ProductComponents>
                )}
            </ProductItems>

            <ProductItems>
                {productList.map((item) => 
                    <ProductComponents key = {item.id}>
                        <ItemImage src = {item.img} alt = {item.productname} />
                        <ItemText1>{item.productname}</ItemText1>
                        <ItemText2>{item.productprice}</ItemText2>
                        <ItemText3>{item.reviewcount}</ItemText3>
                    </ProductComponents>
                )}
            </ProductItems>
        </div>
    )
}