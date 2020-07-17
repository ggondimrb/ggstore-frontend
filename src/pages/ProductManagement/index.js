import React, { useState } from 'react';
import CategoryForm from '~/components/CategoryForm';
import ProductForm from '~/components/ProductForm';

import { Container, RegisterMenu } from './styles';

export default function ProductManagement() {
  const [selectForm, setSelectForm] = useState('product');

  const onSelectForm = (data) => {
    setSelectForm(data);
  };

  return (
    <Container>
      <RegisterMenu>
        <button onClick={() => onSelectForm('product')}>Produtos</button>
        <button onClick={() => onSelectForm('category')}>Categorias</button>
      </RegisterMenu>
      {selectForm === 'product' && <ProductForm />}
      {selectForm === 'category' && <CategoryForm />}
    </Container>
  );
}
