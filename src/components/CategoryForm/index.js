import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { MdDelete } from 'react-icons/md';
import { Container, RemoveDialog } from './styles';
import { ProductTable } from './../../pages/ProductManagement/styles';
import api from '~/services/api';
import * as Yup from 'yup';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const schema = Yup.object().shape({
  name: Yup.string()
    .max(30, 'O tamanho máximo é de 25 caracteres')
    .required('O nome da categoria é obrigatória'),
});

export default function CategoryForm() {
  const { register, errors, handleSubmit, reset } = useForm({
    validationSchema: schema,
  });
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = useState();

  useEffect(() => {
    async function loadCategories() {
      const response = await api.get('categories');

      const data = response.data.map((category) => ({
        ...category,
      }));
      setCategories(data);
    }

    loadCategories();
  }, []);

  const handleClickOpen = (data) => {
    setIndex(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function confirmDelete() {
    try {
      await api.delete(`/categories/${index}`);
      setOpen(false);
      setCategories(categories.filter((e) => e.id !== index));
      toast.success('Categoria removida com sucesso');
    } catch (err) {
      toast.error('Erro ao remover Categoria!');
    }
  }

  async function onSubmit(data) {
    const { name } = data;
    try {
      await api.post('categories', { name });
      toast.success('Cadastro realizado com sucesso!');

      const response = await api.get('categories');

      const data = response.data.map((category) => ({
        ...category,
      }));

      setCategories(data);
    } catch (err) {
      toast.error('Erro ao cadastrar Categoria!' + err);
    }
    reset();
  }

  return (
    <Container>
      <form schema={schema} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="name"
          placeholder="Nome da Categoria"
          ref={register}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input type="submit" />
      </form>

      {categories.length > 0 && (
        <ProductTable>
          <tr>
            <th align="left">Categoria</th>
            <th width={80}>Ações</th>
          </tr>
          {categories.map((category) => (
            <tr key={category.name}>
              <td align="left">{category.name}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleClickOpen(category.id)}
                >
                  <MdDelete size={20} color="#FFF" />
                </button>
              </td>
            </tr>
          ))}
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
    </Container>
  );
}
