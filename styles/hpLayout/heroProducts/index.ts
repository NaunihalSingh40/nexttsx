import styled from "styled-components";
import { theme } from "@/styles/Theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
  /* margin: 98px 100px 0 100px; */
  margin: 0 153px;
  .empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .slick-slider {
    width: 100%;
  }
  .slick-prev:before {
    display: none;
  }
  .slick-next:before {
    display: none;
  }
  .slick-next:hover {
    background-color: ${theme.HPPRIMARYCOLOR};
  }
  .slick-prev:hover {
    background-color: ${theme.HPPRIMARYCOLOR};
  }
  .slick-list {
    margin-left: 30px;
  }
  .slick-prev {
    left: -50px;
    top: 121px;
    z-index: 1;
  }
  .slick-next {
    right: -47px;
    top: 121px;
    z-index: 1;
  }
  .slick-track {
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  }
  .empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  @media (max-width: 767px) {
    margin: 80px 24px 50px 0;
    gap: 24px;
    .slick-list {
      margin-left: 0;
    }
  }
  @media (max-width: 500px) {
    margin: 0 24px 0 0;
  }
  @media (max-width: 450px) {
    .slick-list {
      margin-left: 41px;
    }
    .slick-track {
      gap: 0;
    }
  }
`;
export const MainHeading = styled.div`
  font-weight: 700;
  font-size: 42px;
  line-height: 51.2px;
  color: ${theme.HPPRIMARYTEXTCOLORDARK};
  @media (max-width: 767px) {
    font-size: 24px;
    line-height: 29.26px;
    text-align: center;
  }
`;
export const ProductSection = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 270px;
  /* height: 500px; */
  width: 100%;
  @media (max-width: 767px) {
    max-width: 320px;
    width: 100%;
    height: 522px;
  }
`;
export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 220px;
  width: 100%;
  gap: 13px;
  @media (max-width: 767px) {
    max-width: 320px;
    width: 100%;
  }
`;
export const ProductImageWrapper = styled.div`
  max-width: 270px;
  height: 337px;
  width: 100%;
  position: relative;
  /* img {
    height: 337px;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    object-fit: contain;
  } */
  img {
    height: 100%;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    object-fit: cover;
  }
  @media (max-width: 500px) {
    max-width: 320px;
    height: 393px;
  }
`;
export const WishlistWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 5px;
  background: #f2f2f2;
  border-radius: 500px;
  svg {
    cursor: pointer;
  }
`;
export const ProductName = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: ${theme.HPPRIMARYTEXTCOLORDARK};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 296px;
  width: 100%;
  text-transform: capitalize;
`;
export const PriceWrapper = styled.div`
  display: flex;
  gap: 5px;
  border-top: 1px solid ${theme.HPPRIMARYBORDERCOLOR};
  padding: 12px 0 0;
`;
export const OriginalPrice = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${theme.HPTEXTCOLORTERTIONARY};
  text-decoration: line-through;
`;
export const ProductPrice = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: ${theme.HPPRIMARYTEXTCOLORDARK};
`;
export const DiscountPercentage = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 22px;
  color: ${theme.HPSECONDARYCOLOR};
  border: 1px solid ${theme.HPPRIMARYBORDERCOLOR};
  border-radius: 5px;
  padding: 0 3px;
  height: 22px;
  text-align: center;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
  button {
    text-transform: none;
    border-radius: 8px;
    padding: 3px;
    font-size: 12px;
    height: 36px;
  }
  .cart-button {
    width: 50px;
    padding: 0;
    &:hover {
      background-color: transparent;
    }
    &:disabled {
      cursor: not-allowed;
    }
  }
  .outOfStock {
    background: #f73a181a;
    color: #f73a18;
    cursor: not-allowed;
  }
`;
export const NoDataWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const IconButton = styled.div`
  display: flex !important;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  background-color: ${theme.HPPRIMARYCOLOR};
  svg > path {
    stroke: ${theme.HPTEXTCOLORSECONDARYCOLORY};
    fill: ${theme.HPTEXTCOLORSECONDARYCOLORY};
    width: 20px;
    height: 20px;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;
