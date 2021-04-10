import styled from "styled-components";

// 애플리케이션의 전체에 적용될 스타일을 설정한다.
const BaseLayout = styled.div`
  font-family: Consolas, Arial, Helvetica, sans-serif;
  font-weight: normal;
  font-style: normal;
  color: black;
  text-align: center;
`;

const BaseParagraph = styled.p`
  font-family: Consolas, Arial, Helvetica, sans-serif;
  font-weight: normal;
  font-style: normal;
  font-size: ${props => props.size || 'medium'};;
  color: ${props => props.color || 'black'};
`
// 상단
const TopLayout = styled.div`
  padding: 5px 10px 5px 10px;
  display: flex;
  justify-content: space-between;
  background-color: darkcyan;
  width: 100%;
  height: 60px;
  color: white;
`
// 내용
const MainLayout = styled.div`
  padding: 15px 10px 5px 10px;
  display: flex;
  width: 100%;
`

export {
    BaseLayout,
    BaseParagraph,
    TopLayout,
    MainLayout
}
