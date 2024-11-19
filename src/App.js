import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Container,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    bairro: '',
    cidade: '',
    estado: '',
  });
  const [userData, setUserData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex === null) {
      setUserData([...userData, formData]);
    } else {
      const updatedUserData = [...userData];
      updatedUserData[editingIndex] = formData;
      setUserData(updatedUserData);
    }
    setFormData({ nome: '', idade: '', bairro: '', cidade: '', estado: '' });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    const user = userData[index];
    setFormData(user);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedUserData = userData.filter((_, i) => i !== index);
    setUserData(updatedUserData);
  };

  useEffect(() => {
    const fakeData = [
      { nome: 'Ana Silva', idade: 25, bairro: 'Centro', cidade: 'São Paulo', estado: 'SP' },
      { nome: 'Carlos Pereira', idade: 34, bairro: 'Jardim Paulista', cidade: 'São Paulo', estado: 'SP' },
      { nome: 'Juliana Costa', idade: 29, bairro: 'Copacabana', cidade: 'Rio de Janeiro', estado: 'RJ' },
      { nome: 'Felipe Souza', idade: 22, bairro: 'Itaim Bibi', cidade: 'São Paulo', estado: 'SP' },
      { nome: 'Maria Oliveira', idade: 31, bairro: 'Botafogo', cidade: 'Rio de Janeiro', estado: 'RJ' },
      { nome: 'Roberto Santos', idade: 40, bairro: 'Vila Progredior', cidade: 'Fortaleza', estado: 'CE' },
      { nome: 'Larissa Lima', idade: 27, bairro: 'Alphaville', cidade: 'Barueri', estado: 'SP' },
      { nome: 'Paulo Martins', idade: 35, bairro: 'Barra da Tijuca', cidade: 'Rio de Janeiro', estado: 'RJ' },
      { nome: 'Fernanda Rocha', idade: 29, bairro: 'Leblon', cidade: 'Rio de Janeiro', estado: 'RJ' },
      { nome: 'Lucas Almeida', idade: 33, bairro: 'Centro', cidade: 'Belo Horizonte', estado: 'MG' },
    ];
    setUserData(fakeData);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleLogoClick = (url) => {
    window.location.href = url;
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img
          src="/react-logo.png"
          alt="React Logo"
          style={{
            width: '100px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          onClick={() => handleLogoClick('https://react.dev/')}
        />
        Formulário de Login
        <img
          src="/mui-logo.png"
          alt="Material UI Logo"
          style={{
            width: '100px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          onClick={() => handleLogoClick('https://mui.com/')}
        />
      </Typography>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField label="Nome" variant="outlined" name="nome" value={formData.nome} onChange={handleChange} required />
        <TextField label="Idade" variant="outlined" type="number" name="idade" value={formData.idade} onChange={handleChange} required />
        <TextField label="Bairro" variant="outlined" name="bairro" value={formData.bairro} onChange={handleChange} required />
        <TextField label="Cidade" variant="outlined" name="cidade" value={formData.cidade} onChange={handleChange} required />
        <TextField label="Estado" variant="outlined" name="estado" value={formData.estado} onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary">{editingIndex === null ? 'Enviar' : 'Salvar Alterações'}</Button>
      </form>

      {userData.length > 0 && (
        <>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Idade</TableCell>
                  <TableCell>Bairro</TableCell>
                  <TableCell>Cidade</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.nome}</TableCell>
                    <TableCell>{user.idade}</TableCell>
                    <TableCell>{user.bairro}</TableCell>
                    <TableCell>{user.cidade}</TableCell>
                    <TableCell>{user.estado}</TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <IconButton onClick={() => handleEdit(index)} color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(index)} color="secondary">
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ mt: 2 }}
          />
        </>
      )}
    </Container>
  );
}

export default App;