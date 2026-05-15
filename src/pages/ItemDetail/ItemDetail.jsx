import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { productList } from '../Main/Main';
import { ItemImage } from '../Main/Main';
import star from "../../assets/images/star.png";

import { useEffect, useState } from "react";
import { getItemDetail, patchItem } from "../../api/shop";


const ProductBox = styled.div`
    display: flex;
    margin-top: 100px;
    margin-right: 400pw;
    flex-direction: rot: center;
    justify-content: center;
`

const Line = styled.div`
    width: 2px;
    height: 830px;

    background-color: #EBEBEB;
`

const ImageBox = styled.img`
    width: 600px;
    height: 602px;
    margin-right: 100px;
`

const TextBox = styled.div`
    margin-top: 60px;
    margin-left: 60px;
`

const TextBox2 = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`

const TextBox3 = styled.div`
    display: flex;
    flex-direction: row;
`

const StarIcon = styled.img`
    width: 13px;
    height: 12px;
    vertical-align: middle;
`

const ItemText1 = styled.div` font-size: 32px; color: #000000; margin-bottom: 24px; `
const ItemText2 = styled.div` font-size: 16px; color: #333333; margin-bottom: 8px;`
const ItemText3 = styled.div` font-size: 15px; color: #333333; `
const ItemText4 = styled.div` font-size: 15px; color: #949494; `

export default function ItemDetail() {
    const {id} = useParams();
    const product = productList.find(item => item.id === Number(id));

    if (!product) {
        return <div>상품 정보를 불러오는 중이거나 상품이 없습니다.</div>;
    }

    // URL 파라미터에서 id와 type을 가져옴 (예: /item/clothes/1)
    const { type } = useParams(); 
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                // 해당 id의 상세 정보를 서버에 요청
                const data = await getItemDetail(type || "clothes", id);
                setItem(data);
            } catch (error) {
                console.error("상세 정보 로드 실패:", error);
            }
        };
        fetchDetail();
    }, [type, id]);

    if (!item) return <div>로딩 중...</div>;

    const handleSoldOut = async () => {
        try {
            // soldout 상태만 true로 바꿈
            await patchItem("clothes", id, { soldout: true });
            alert("품절 처리되었습니다.");
            window.location.reload(); // 변경된 상태 확인을 위해 새로고침
        } catch (error) {
            console.error("품절 처리 실패:", error);
        }
    };

    return (
        <ProductBox>
            <ImageBox src = {item.image} alt = {item.name} />
            <Line />
            <TextBox>
                <ItemText1>{Number(item.price).toLocaleString()}원</ItemText1>
                <ItemText2>{item.name}</ItemText2>
                <TextBox2>
                    <TextBox3>
                        <StarIcon src={star} />
                        <ItemText3>{item.rating}</ItemText3>
                    </TextBox3>
                    <ItemText4>리뷰 {item.reviews}</ItemText4>
                </TextBox2>
            </TextBox>
            <button onClick={handleSoldOut}>품절 처리하기</button>
        </ProductBox>


    )
}

