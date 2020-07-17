import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { MdDelete, MdCached } from 'react-icons/md';
import { Container, DialogUpdate, RemoveDialog } from './styles';
import { ProductTable } from './../../pages/ProductManagement/styles';
import ProductInput from './ProductInput';
import api from '../../services/api';
import * as Yup from 'yup';
import { formatPrice } from '../../util/format';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const schema = Yup.object().shape({
  title: Yup.string().required('O nome do produto é obrigatório'),
  price: Yup.number()
    .positive('O valor deve ser positivo')
    .required()
    .typeError('Informe um valor no formato: 9999.99'),
  stock: Yup.number()
    .positive('A quantidade deve ser positiva')
    .required()
    .max(100, 'A quantidade não pode ser maior que 100')
    .typeError('A quantidade é obrigatória'),
});

export default function ProductForm() {
  const { register, errors, handleSubmit, reset } = useForm({
    validationSchema: schema,
  });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [categoriesSelectedUpdate, setCategoriesSelectedUpdate] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = useState();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [openUpdate, setOpenUpdate] = React.useState(false);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');

      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    async function loadCategories() {
      const response = await api.get('categories');

      const data = response.data.map((category) => ({
        ...category,
      }));
      setCategories(data);
    }

    loadProducts();
    loadCategories();
  }, []);

  async function loadCategoriesSelected(id) {
    const response = await api.get(`products/${id}`, {});

    const dataSelected = response.data.categories;

    setCategoriesSelectedUpdate(dataSelected.map((category) => category.id));
  }

  const changeCategories = (e) => {
    if (e.target.checked) {
      setCategoriesSelected([...categoriesSelected, e.target.id]);
    } else {
      const productIndex = categoriesSelected.findIndex(
        (p) => p === e.target.value
      );
      categoriesSelected.splice(productIndex, 1);
      setCategoriesSelected(categoriesSelected);
    }
  };

  async function onSubmit(data) {
    const { title, price, stock, categories } = data;

    try {
      await api.post('products', { title, price, stock, categories });
      toast.success('Cadastro realizado com sucesso!');

      const response = await api.get('products');

      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    } catch (err) {
      toast.error('Erro ao cadastrar produto!' + err);
    }
    reset();
  }

  const handleClickOpen = (data) => {
    setIndex(data);
    setOpen(true);
  };

  const handleClickOpenUpdate = (data) => {
    setIndex(data.id);
    setTitle(data.title);
    setPrice(data.price);
    setStock(data.stock);
    loadCategoriesSelected(data.id);
    setOpenUpdate(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  async function confirmDelete() {
    try {
      await api.delete(`/products/${index}`);
      toast.success('Produto removido com sucesso');
      setProducts(products.filter((e) => e.id !== index));
    } catch (err) {
      toast.error('Erro ao remover produto!');
    }
    setOpen(false);
  }

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updatePrice = (e) => {
    setPrice(e.target.value);
  };

  const updateStock = (e) => {
    setStock(e.target.value);
  };

  const updateCategories = (e) => {
    if (e.target.checked) {
      setCategoriesSelectedUpdate([
        ...categoriesSelectedUpdate,
        parseInt(e.target.id),
      ]);
    } else {
      const productIndex = categoriesSelectedUpdate.findIndex(
        (p) => p === parseInt(e.target.value)
      );
      categoriesSelectedUpdate.splice(productIndex, 1);
      setCategoriesSelectedUpdate(categoriesSelectedUpdate);
    }
  };

  async function onSubmitUpdate() {
    try {
      await api.put('products', {
        id: index,
        title,
        price,
        stock,
        categories: categoriesSelectedUpdate,
      });
      toast.success('Produto atualizado com sucesso');
    } catch (err) {
      toast.error('Erro ao atualizar produto!');
    }

    setOpenUpdate(false);
  }

  return (
    <Container>
      <form schema={schema} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="title"
          placeholder="Nome do Produto"
          ref={register}
        />
        {errors.title && <p>{errors.title.message}</p>}

        <input
          type="double"
          name="price"
          prefix={'$'}
          mask="9999.00"
          placeholder="Preço"
          ref={register}
        />
        {errors.price && <p>{errors.price.message}</p>}
        <input
          type="number"
          name="stock"
          placeholder="Quantidade"
          ref={register}
        />
        {errors.stock && <p>{errors.stock.message}</p>}

        {categories.length > 0 && <h1>Categorias</h1>}
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <input
                id={category.id}
                type="checkbox"
                name="categories"
                onChange={changeCategories}
                value={category.id}
                ref={register}
              />
              <label htmlFor={category.id}>{category.name}</label>
            </li>
          ))}
        </ul>
        <h1>Imagem do Produto</h1>
        <ProductInput name="avatar_id" id="product_image" />

        <input type="submit" />
      </form>

      {products.length > 0 && (
        <ProductTable>
          <tbody>
            <tr>
              <th align="left">Produto</th>
              <th width={100}>Preço</th>
              <th width={100}>Qtd</th>
              <th width={80}>Ações</th>
            </tr>
            {products.map((product) => (
              <tr key={product.title}>
                <td align="left">{product.title}</td>
                <td> {product.priceFormatted}</td>
                <td>{product.stock}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleClickOpen(product.id)}
                  >
                    <MdDelete size={20} color="#FFF" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleClickOpenUpdate(product)}
                  >
                    <MdCached size={20} color="#FFF" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
      )}

      <RemoveDialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar Exclusão?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Não
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Sim
          </Button>
        </DialogActions>
      </RemoveDialog>

      <DialogUpdate open={openUpdate} onClose={handleCloseUpdate}>
        <DialogContent>
          <ul>
            <li>
              <h1>Nome</h1>
              <TextField
                autoFocus
                margin="dense"
                type="text"
                name="title"
                value={title.value}
                onChange={updateTitle}
                defaultValue={title}
                placeholder="Nome do Produto"
              />
            </li>
            <li>
              <h1>Preço</h1>
              <TextField
                margin="dense"
                type="double"
                name="price"
                value={price.value}
                onChange={updatePrice}
                defaultValue={price}
                placeholder="Preço"
              />
            </li>
            <li>
              <h1>Quantidade</h1>
              <TextField
                margin="dense"
                type="number"
                name="stock"
                value={stock.value}
                onChange={updateStock}
                defaultValue={stock}
                placeholder="Quantidade"
              />
            </li>
            <li>
              <h1>Categorias</h1>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <input
                  id={category.id}
                  type="checkbox"
                  name="categories"
                  value={category.id}
                  onChange={updateCategories}
                  checked={categoriesSelectedUpdate.includes(category.id)}
                />
                <label htmlFor={category.id}>{category.name}</label>
              </li>
            ))}
          </ul>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseUpdate} color="primary">
            Voltar
          </Button>
          <Button onClick={onSubmitUpdate} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </DialogUpdate>
    </Container>
  );
}
