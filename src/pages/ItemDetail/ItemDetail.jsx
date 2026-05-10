import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { productList } from '../Main/Main';
import { ItemImage } from '../Main/Main';
import star from "../../assets/images/star.png";

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

    return (
        // <h1> 상품 조회하기 페이지 {id}</h1>

        <ProductBox>
            <ImageBox src = {product.img} alt = {product.productname} />
            <Line />
            <TextBox>
                <ItemText1>{product.productprice}</ItemText1>
                <ItemText2>{product.productname}</ItemText2>
                <TextBox2>
                    <TextBox3>
                        <StarIcon src={star}></StarIcon>
                        <ItemText3>4.6</ItemText3>
                    </TextBox3>
                    <ItemText4>{product.reviewcount}</ItemText4>
                </TextBox2>
            </TextBox>
        </ProductBox>
    )
}

