import styled from 'styled-components';
import { darken } from 'polished';
import { Dialog } from '@material-ui/core/';

export const Container = styled.div`
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

    h1 {
      color: #fff;
      display: flex;
      font-size: 16px;
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
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

    ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      list-style: none;
      padding-bottom: 10px;

      li {
        display: flex;
        width: 100%;
        height: 40px;

        label {
          margin-top: 10px;
          margin-left: 5px;
        }
      }
    }
  }
  button {
    background: none;
    border: 0;
    padding: 6px;
  }
`;

export const DialogUpdate = styled(Dialog)`
  padding: 20px;
  li {
    flex-direction: column;
    display: flex;
    list-style: none;

    h1 {
      font-size: 14px;
      display: flex;
    }
  }
`;

export const RemoveDialog = styled(Dialog)`
  text-align: center;
  border-radius: 10px;
  border: 0.5px;
  padding: 20px;
`;
