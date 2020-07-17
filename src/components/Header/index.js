import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  MdShoppingBasket,
  MdFace,
  MdDns,
  MdAccountCircle,
} from 'react-icons/md';

import {
  Container,
  Cart,
  Login,
  ManagementItens,
  Right,
  Profile,
} from './styles';

import logo from '~/assets/images/logo.svg';

export default function Header() {
  const cartSize = useSelector((state) => state.cart.length);

  const provider = useSelector((state) => state.auth.provider);

  const auth = useSelector((state) => state.auth.signed);
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="GabrielStore" />
      </Link>
      <Right>
        {auth && provider && (
          <ManagementItens provider={true} to="/products">
            <MdDns size={36} color="#FFF"></MdDns>
          </ManagementItens>
        )}

        <Login to="/login">
          <MdFace size={36} color="#FFF" />
        </Login>

        <Cart to="/cart">
          <div>
            <strong>Meu carrinho</strong>
            <span>{cartSize} itens</span>
          </div>
          <MdShoppingBasket size={36} color="#FFF" />
        </Cart>
        {auth && (
          <Profile to="/profile">
            <MdAccountCircle size={36} color="#FFF"></MdAccountCircle>
          </Profile>
        )}
      </Right>
    </Container>
  );
}
