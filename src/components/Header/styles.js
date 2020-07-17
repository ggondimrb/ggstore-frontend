import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 10px;
`;

export const Right = styled.div`
  display: flex;
`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;
  margin-left: 20px;

  &:hover {
    opacity: 0.7;
  }

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }

    span {
      font-size: 12px;
      color: #fff;
    }
  }
`;

export const Login = styled(Link)`
  text-decoration: none;
  transition: opacity 0.2s;
  margin-left: 20px;

  &:hover {
    opacity: 0.7;
  }
`;
export const ManagementItens = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

export const Profile = styled(Link)`
  text-decoration: none;
  transition: opacity 0.2s;
  margin-left: 20px;

  &:hover {
    opacity: 0.7;
  }
`;
