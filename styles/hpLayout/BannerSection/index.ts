import styled from "styled-components";
import { theme } from "@/styles/Theme";

export const BannerWrapper = styled.div`
  width: 100%;
  /* height: 100vh; */
  padding: 0;
  margin: 0;
  .slick-dots li.slick-active button:before {
    opacity: 0.75;
    color: ${theme.HPSECONDARYCOLOR};
    font-size: 10px;
  }
  .slick-dots li button:before {
    font-size: 10px;
  }
  .slick-dots {
    bottom: -17px !important;
  }
`;

export const BannerItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 500px) {
    img {
      height: unset;
      object-fit: contain;
    }
  }
`;
