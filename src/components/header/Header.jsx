import styled from "styled-components";
import logoUrl from "../../assets/images/kream_image.png";
import homeUrl from "../../assets/icons/home_icon.png";
import {useLocation, useNavigate} from "react-router-dom";

// 대문자로 시작! -> 대문자를 컴포넌트로 인식하기 때문
const LogoImage = styled.img`
    width: 166px;
    height: 141px;
`;

const HomeIcon = styled.img`
    width: 61px;
    height: 24px;
`

const HeadContainer = styled.div`
    padding-left: 160px;
    padding-right: 160px;
    display: flex;
    justify-content: space-between;
`

const Button = styled.div`
    color: #6C6C6C;
    font-size: 13px;
    font-family: Pretendard;
    font-weight: 400;
    margin-top: 9px;
    margin-bottom: 30px;
`

export default function Header() {

    const {pathname} = useLocation(); // 현재 페이지 경로 불러오기
    const navigate = useNavigate(); // 페이지 이동시키는 함수
    const buttonName = "상품등록";

    return(
        <div>
            <HeadContainer>
                <LogoImage src={logoUrl}/>
                <div>
                    {pathname === "/" && (
                        <Button onClick = {() => navigate("/add")}>{buttonName}</Button>
                    )}
                    <HomeIcon src={homeUrl}/>
                </div>
            </HeadContainer>
        </div>
    );
}