import styled from 'styled-components';

const Button = styled.button`
  outline: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 0 20px 0 20px;
  height: 40px;

  font-family: inherit;
  font-weight: lighter;
  font-size: medium;
  background-color: blue;
  color: azure;
  
  &:hover {
    background-color: azure;
    color: blue;
  }
`

export {
    Button
}
