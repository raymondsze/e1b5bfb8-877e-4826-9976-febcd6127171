import styled from 'styled-components';

export default styled.div`
  &.App {
    text-align: center;

    .App-logo {
      animation: App-logo-spin infinite 20s linear;
      height: 80px;
    }

    .App-header {
      background-color: #222;
      height: 150px;
      padding: 20px;
      color: white;
      box-sizing: content-box;
    }

    .App-intro {
      font-size: large;
    }

    .App-lang-btn {
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

    .App-route {
      display: inline-block;
      font-size: 16px;
      width: 100px;
      font-weight: 800;
      line-height: 56px;
      color: black;
    }
  }

  @keyframes App-logo-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
