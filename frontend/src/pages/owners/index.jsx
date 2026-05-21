import { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { ownersService } from '../../services/resoucesService'
import MainLayout from '../../layouts/MainLayout'
import './style.css'
const emptyForm = {
    name: '',
    document: '',
    phone: '',
    email: '',
    address: ''
};
export default function OwnersPage() {
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(''); const [form, setForm] = useState(emptyForm);
    const [editingOwner, setEditingOwner] = useState(null);
    const [detailOwner, setDetailOwner] = useState(null);
    const [message, setMessage] = useState('');
    async function loadOwners() {
        try {
            setLoading(true);
            const data = await ownersService.list();
            setOwners(data);
        } catch (error) {
            setMessage('Erro ao carregar donos.');
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadOwners();
        console.log(owners)

    }, []);
    function handleChange(event) {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        });
    }
    function clearForm() {
        setForm(emptyForm);
        setEditingOwner(null);
    }
    async function handleSubmit(event) {
        event.preventDefault();
        if (!form.name || !form.document || !form.phone || !form.email || !form.address) {
            setMessage('Preencha todos os campos.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(form.email)) {
            setMessage('Por favor, insira um e-mail válido com @.');
            return;
        }
        try {
            if (editingOwner) {
                await ownersService.update(editingOwner.id, form);
                setMessage('Dono atualizado com sucesso.');
            } else {
                await ownersService.create(form);
                setMessage('Dono cadastrado com sucesso.');
            }
            clearForm();
            loadOwners();
        } catch (error) {
            setMessage('Erro ao salvar dono.');
        }
    }
    function handleEdit(owner) {
        setEditingOwner(owner);
        setForm({
            name: owner.name || '',
            document: owner.document || '',
            phone: owner.phone || '',
            email: owner.email || '',
            address: owner.address || ''
        });
    }
    async function handleDetails(owner) {
        try {
            const data = await ownersService.getById(owner.id);
            setDetailOwner(data);
        } catch (error) {
            setMessage('Erro ao carregar detalhes.');
        }
    }
    async function handleDelete(owner) {
        const confirmDelete = window.confirm(`Deseja excluir ${owner.name}?`);
        if (!confirmDelete) return;
        try {
            await ownersService.remove(owner.id);
            setMessage('Dono excluído com sucesso.');
            loadOwners();
        } catch (error) {
            setMessage('Erro ao excluir dono.');
        }
    }
    const filteredOwners = owners.filter((owner) => {
        const term = search.toLowerCase();
        return (
            owner.name?.toLowerCase().includes(term) ||
            owner.document?.toLowerCase().includes(term) ||
            owner.phone?.toLowerCase().includes(term) ||
            owner.email?.toLowerCase().includes(term) ||
            owner.address?.toLowerCase().includes(term)
        );
    });
    if (loading) {
        return <p>Carregando donos...</p>;
    }
    return (
        <div className='owners-container'>
            <h1>Donos</h1>
            <Link to="/dashboard">Dashboard</Link>
            <p className='description'>Gerencie os responsáveis pelos pets cadastrados.</p>

            {message && <p className={`message ${message.includes('Erro') ? 'error' : 'success'}`}>{message}</p>}

            <section className="form-section">
                <h2>{editingOwner ? 'Editar dono' : 'Novo dono'}</h2>
                <form onSubmit={handleSubmit} className='owner-form'>
                    <div className='form-group'>
                        <label>Nome</label>

                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Documento</label>

                        <input
                            name="document"
                            value={form.document}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Telefone</label>

                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group full-width'>
                        <label>Endereço</label>

                        <textarea
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-actions'>


                        <button type="submit">
                            {editingOwner ? 'Salvar alterações' : 'Cadastrar dono'}
                        </button>
                        {editingOwner && (
                            <button type="button" onClick={clearForm}>
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </section>
            <section className='list-section'>
                <div className='list-header'>

                    <h2>Lista de donos ({filteredOwners.length})</h2>
                    <input
                        className='search-input'
                        placeholder="Buscar por nome, documento, telefone ou email"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>

                {filteredOwners.length === 0 ? (
                    <p className='empty-list'>Nenhum dono encontrado.</p>
                ) : (
                    <div className='table-responsive'>
                        <table className='owner-table'>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Documento</th>
                                    <th>Telefone</th>
                                    <th>Email</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOwners.map((owner) => (
                                    <tr key={owner.id}>
                                        <td>{owner.name}</td>
                                        <td>{owner.document}</td>
                                        <td>{owner.phone}</td>
                                        <td>{owner.email}</td>
                                        <td className='actions-cell'>
                                            <button className='btn-icon detail' onClick={() => handleDetails(owner)}>
                                                Detalhes
                                            </button>
                                            <button className='btn-icon edit' onClick={() => handleEdit(owner)}>
                                                Editar
                                            </button>
                                            <button className='btn-icon delete' onClick={() => handleDelete(owner)}>
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            {detailOwner && (

                <div className='modal-overlay'>
                    <div className='detail-card'>

                        <h2>Detalhes do dono</h2>
                        <div className='detail-grid'>
                        <p><strong>Nome:</strong> {detailOwner.name}</p>
                        <p><strong>Documento:</strong> {detailOwner.document}</p>
                        <p><strong>Telefone:</strong> {detailOwner.phone}</p>
                        <p><strong>Email:</strong> {detailOwner.email}</p>
                        <p><strong>Endereço:</strong> {detailOwner.address}</p>
                        </div>
                        <h3>Pets vinculados</h3>
                        {detailOwner.pets?.length > 0 ? (
                            <ul className='pet-list'>
                                {detailOwner.pets.map((pet) => (
                                    <li key={pet.id}>{pet.name}</li>
                                ))}
                            </ul>
                        ) :
                            <p className="no-pets">Nenhum pet vinculado.</p>
                        }
                        <button className="btn-close" onClick={() => setDetailOwner(null)}>
                            Fechar detalhes
                        </button>
                    </div>
                    </div>
            )}
                </div>
            
    );
    
}
