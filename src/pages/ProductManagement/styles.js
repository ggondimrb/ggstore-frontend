import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 700px;
  margin: 50px auto;
  text-align: center;

  form {
    max-width: 350px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 5px 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    select {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border: none;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: rgba(255, 255, 255, 0.7);
      margin: 5px 0 10px;

      option {
        background: #00a0b6;
        border-radius: 10px;
        color: rgba(255, 255, 255, 0.7);
      }
    }

    input[type='submit'] {
      margin: 5px, 0, 0;
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      margin-top: 10px;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      cursor: pointer;

      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
    p {
      color: #bf1650;
      font-weight: 500;
    }
    p::before {
      display: inline;
      content: '⚠ ';
    }

    label {
      line-height: 2;
      text-align: left;
      display: block;
      margin-bottom: 13px;
      margin-top: 20px;
      color: white;
      font-size: 14px;
      font-weight: 200;
    }
  }
  button {
    background: none;
    border: 0;
    padding: 6px;
  }
`;

export const ProductTable = styled.table`
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  border: 0;
  border-radius: 10px;
  margin-bottom: 10px;
  flex-direction: column;

  th {
    height: 22px;
    background: rgba(0, 0, 0, 0.2);
    color: rgba(255, 255, 255, 0.7);
    font-size: 18px;
  }

  tr {
    &:hover {
      background: ${darken(0.03, '#00a0b6')};
    }
  }

  td {
    height: 30px;
    color: rgba(255, 255, 255, 0.7);
  }
`;

export const RegisterMenu = styled.div`
  margin: 0 auto;
  height: 60px;
  width: 300px;
  background: rgba(255, 255, 255, 0.2);
  overflow-x: hidden;
  padding: 10px 10px;
  border-radius: 10px;

  button {
    margin-left: 10px;
    text-decoration: none;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    transition: 0.5s;

    &:hover {
      background: ${darken(0.05, '#00a0b6')};
      border-radius: 10px;
    }
  }
`;
