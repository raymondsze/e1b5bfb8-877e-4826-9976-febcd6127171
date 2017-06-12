import styled from 'styled-components';

export default styled.div`
  &.I18n {
    .I18n-lang-btn {
      font-size: large;
      margin: 10px;
      width: 100px;
      line-height: 56px;
      background: white;
      border: solid 1px gray;
      outline: none;
      color: black;
      &:hover {
        background: #60d7f8;
      }
      &.active {
        color: #60d7f8;
      }
    }
  }
`;
