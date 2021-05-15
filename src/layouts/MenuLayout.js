import React from "react";
import styled from "styled-components";

const MenuLayout = styled.div`
    display: flex;
    justify-content: space-between;
    width: 640px; // 전체 메뉴의 길이에 따라 폭을 조정
    & > {
      a:link {
        color: blue;
        background-color: #4cae4c;
        padding: 15px 15px;
        text-align: center;
        text-decoration: none;
        font-size: medium;
        font-weight: bold;
      }
      a:visited {color: white}
      a:hover {color: blue}
    };
`;

export {
    MenuLayout
};
