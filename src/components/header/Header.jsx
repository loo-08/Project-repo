import styled from "styled-components";
import logoUrl from "../../assets/images/kream_image.png";
import homeUrl from "../../assets/icons/home_icon.png";
import {useLocation, useNavigate} from "react-router-dom";
import { act, useState } from "react";
import Button from "../common/button/Button";

import { deleteItem } from "../../api/shop";

// 대문자로 시작! -> 대문자를 컴포넌트로 인식하기 때문
const LogoImage = styled.img`
    width: 166px;
    height: 141px;
    cursor: pointer;
`;

const IconBox = styled.div`
    display: flex;
    flex-direction: row-reverse;
`

const HomeIcon = styled.img`
    width: 61px;
    height: 24px;
    cursor: pointer;
`

const HeadContainer = styled.div`
    padding-left: 160px;
    padding-right: 160px;
    display: flex;
    justify-content: space-between;
`

const CustomButton = styled(Button)`
    color: #6C6C6C;
    font-size: 13px;
    font-family: Pretendard;
    font-weight: 400;
    margin-top: 9px;
    margin-bottom: 30px;
    cursor: pointer;
    display:flex;
    flex-direction: row-reverse;
`

const OptionBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 28px;
`

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

const ModalContent = styled.div`
    background-color: white;
    padding: 30px 33px 30px 35px;
    border-radius: 22px;
    width: 340px;
    height: 150px;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h2 {
        font-size: 16px;
    }
`

const ModalText = styled.div`
    display: flex;
    justify-content: center;
    
`

const ModalButtonBox = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 7px;
`

const YesButton = styled(Button)`
    background-color: #F2F2F2;
    border-radius: 5px;
    padding: 5px 40px;
    cursor: pointer;
`

const NoButton = styled(Button)`
    background-color: #D0D0D0;
    border-radius: 5px;
    padding: 5px 40px;
    cursor: pointer;
`

const NowButton = styled(CustomButton)`
    font-weight: 900;
`

export default function Header() {

    const {pathname} = useLocation(); // 현재 페이지 경로 불러오기
    const navigate = useNavigate(); // 페이지 이동시키는 함수

    const itemId = pathname.split("/")[2];

    const buttonName1 = "상품등록";
    const buttonName2 = "상품삭제";
    const buttonName3 = "상품수정";

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDelete = async () => {
        try {
            // 현재는 의류(clothes) 기준으로 하는 중이므로 "clothes" 넣음
            await deleteItem("clothes", itemId); 
            
            alert("상품이 삭제되었습니다.");
            setIsDeleteModalOpen(false); // 모달 닫기
            navigate("/"); // 삭제 후 메인 목록으로 이동
        } catch (error) {
            console.error("삭제 실패:", error);
            alert("상품 삭제 중 에러가 발생했습니다.");
        }
    };

    return(
        <div>
            <HeadContainer>
                <LogoImage src={logoUrl} onClick = {() => navigate("/")} />
                <div>
                    {pathname === "/" && (
                        <CustomButton onClick = {() => navigate("/add")} buttonName = {buttonName1}></CustomButton>
                    )}
                    {pathname.includes("/item") && (
                        <OptionBox>
                            <CustomButton onClick = {() => navigate("/add")} buttonName = {buttonName1}></CustomButton>
                            <CustomButton onClick = {() => setIsDeleteModalOpen(true)} buttonName = {buttonName2}></CustomButton>
                            <CustomButton onClick = {() => navigate(`/edit/${itemId}`)} buttonName = {buttonName3}></CustomButton>
                        </OptionBox>
                    )}
                    {pathname === "/add" && (
                        <NowButton buttonName = {buttonName1}></NowButton>
                    )}
                    <IconBox>
                        <HomeIcon src={homeUrl} onClick = {() => navigate("/")} />
                    </IconBox>
                </div>
            </HeadContainer>

            {isDeleteModalOpen && (
                <ModalOverlay onClick={() => setIsDeleteModalOpen(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalText>
                            <h2>상품을 삭제하시겠습니까?</h2>
                        </ModalText>
                        <ModalButtonBox>
                            <YesButton 
                                onClick={() => handleDelete()}
                                buttonName="확인"
                            />
                            <NoButton 
                                onClick={() => setIsDeleteModalOpen(false)}
                                buttonName="취소"
                            />
                        </ModalButtonBox>
                    </ModalContent>
                </ModalOverlay>
            )}
        </div>
    );
}