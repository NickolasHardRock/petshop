import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { petsService, ownersService } from '../../services/resoucesService'
import './style.css'

const emptyForm = {
    name: '',
    species: '',
    breed: '',
    size: 'small',
    age: '',
    weight: '',
    notes: '',
    ownerId: ''
};

export default function PetsPage() {
    const [pets, setPets] = useState([]);
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState(emptyForm);
    const [editingPet, setEditingPet] = useState(null);
    const [detailPet, setDetailPet] = useState(null);
    const [message, setMessage] = useState('');



    async function loadData() {
        try {
            setLoading(true);

            const petsData = await petsService.list();
            const ownersData = await ownersService.list();

            setPets(petsData);
            setOwners(ownersData);

        } catch (error) {
            setMessage('Erro ao carregar os dados.');
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData();
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
        setEditingPet(null);
    }

    function getSizeText(size) {
        if (size === 'small') return 'Pequeno';
        if (size === 'medium') return 'Médio';
        if (size === 'large') return 'Grande';

        return size;
    }

    function formatDate(date) {
        if (!date) return '-';

        return new Date(date).toLocaleString('pt-BR');
    }

    function formatMoney(value) {
        if (!value) return 'R$ 0,00';

        return Number(value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    function getStatusText(status) {
        if (status === 'scheduled') return 'Agendado';
        if (status === 'in_progress') return 'Em andamento';
        if (status === 'completed') return 'Concluído';
        if (status === 'canceled') return 'Cancelado';

        return status;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (
            form.weight == 0 && form.weight < 0
        ) {
            setMessage('Peso menor que zero');
            return;
        }


        if (
            !form.name ||
            !form.species ||
            !form.breed ||
            !form.ownerId ||
            !form.age ||
            !form.weight
        ) {
            setMessage('Preencha os campos obrigatórios.');
            return;
        }

        const payload = {
            name: form.name,
            species: form.species,
            breed: form.breed,
            size: form.size,
            age: Number(form.age),
            weight: Number(form.weight),
            notes: form.notes,
            ownerId: Number(form.ownerId)
        };

        try {
            if (editingPet) {
                await petsService.update(editinPet.id, payload);
                setMessage('Pet atualizado com sucesso.');
            } else {
                await petsService.create(payload);
                setMessage('Pet cadastrado com sucesso.');
            }

            clearForm();
            loadData();
        } catch (error) {
            console.log(error)
            setMessage('Erroa ao salvar pet.');
        }
    }

    function handleEdit(pet) {
        setEditingPet(pet);

        setForm({
            name: pet.name || '',
            species: pet.species || '',
            breed: pet.breed || '',
            size: pet.size || 'small',
            age: String(pet.age || ''),
            weight: String(pet.weight || ''),
            notes: pet.notes || '',
            ownerId: String(pet.ownerId || '')
        });
    }

    function renderOwnersMessage(ownersList) {
        if (ownersList.length === 0) {
            return (
                <div className="empty-state-container">
                    <p> Ops! Ainda não temos donos cadastrados.</p>
                    <p>Que tal começar cadastrando o primeiro responsável agora mesmo?</p>
                </div>
            )
        }
    }


    async function handleDetails(pet) {
        try {
            const data = await petsService.getById(pet.id);
            setDetailPet(data);
        } catch (error) {
            setMessage('Erro ao carregar detalhes do pet.');
        }
    }

    async function handleDelete(pet) {
        const confirmDelete = window.confirm(`Deseja excluir ${pet.name}?`);

        if (!confirmDelete) return;

        try {
            await petsService.remove(pet.id);
            setMessage('Pet excluído com sucesso.');
            loadData();
        } catch (error) {
            setMessage('Erro ao excluir pet.');
        }
    }

    const filteredPets = pets.filter((pet) => {
        const term = search.toLowerCase();

        return (
            pet.name?.toLowerCase().includes(term) ||
            pet.species?.toLowerCase().includes(term) ||
            pet.breed?.toLowerCase().includes(term) ||
            pet.owner?.name?.toLowerCase().includes(term) ||
            pet.notes?.toLowerCase().includes(term)
        );
    });

    if (loading) {
        return <p>Carregando pets...</p>;
    }

    return (


        <div className="pets-container">
            <h1>
                Pets
            </h1>
            <Link to="/dashboard">Dashboard</Link>
            <p className="description">
                Cadastre e acompanhe os animais atendidos pelo petshop.
            </p>
            {message && <p>{`message ${message.includes('Erro') ? 'error' : 'sucess'}`}</p>}

            <section className="form-group">

                <h2>
                    {editingPet ? 'Editar pet ' : 'Novo pet'}
                </h2>

                <form onSubmit={handleSubmit} className="pet-form">
                    <div className="form-group">
                        <label>Nome</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Espécie</label>

                        <input
                            name="species"
                            value={form.species}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Raça</label>

                        <input
                            name="breed"
                            value={form.breed}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <labe>Porte</labe>

                        <select
                            name="size"
                            value={form.size}
                            onChange={handleChange}
                        >
                            <option value="small">Pequeno</option>
                            <option value="medium">Médio</option>
                            <option value="large">Grande</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Idade</label>

                        <input
                            type="number"
                            name="age"
                            min="0"
                            value={form.age}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Peso kg</label>
                        <input
                            type="number"
                            name="weight"
                            min="0"
                            step="0.1"
                            value={form.weight}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>Dono</label>
                        {owners.length === 0 ? (
                            <div className="owner-alert">
                                <p>⚠️ <strong>Nenhum dono encontrado!</strong></p>
                                <p>Você precisa <Link to="/owners" style={{ color: '#4a90e2', fontWeight: 'bold' }}>cadastrar um dono</Link> antes de adicionar um pet.</p>
                            </div>
                        ) : (
                            <select name="ownerId" value={form.ownerId} onChange={handleChange}>
                                <option value="">Selecione o responsável</option>
                                {owners.map((owner) => (
                                    <option key={owner.id} value={owner.id}>
                                        {owner.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="form-group full-width">
                        <label>Observações</label>

                        <textarea
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit">
                            {editingPet ? ' Salvar alterações' : 'Cadastrar pet'}
                        </button>

                        {editingPet && (
                            <button type="button" onClick={clearForm} className="btn-secondary">
                                Cancelar
                            </button>
                        )}
                    </div>

                </form>

            </section>

            <section className="list-section">
                <div className="list-header">

                    <h2>Lista de pets</h2>

                    <input
                        placeholder="Buscar por nome, espécie, raça, dono ou observação"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>

                {filteredPets.length === 0 ? (
                    <p className="empty-list">Nenhum pet encontrado.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="pet-table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Espécie</th>
                                    <th>Raça</th>
                                    <th>Porte</th>
                                    <th>Dono</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPets.map((pet) => (
                                    <tr key={pet.id}>
                                        <td>{pet.name}</td>
                                        <td>{pet.species}</td>
                                        <td>{pet.breed}</td>
                                        <td>{getSizeText(pet.size)}</td>
                                        <td>{pet.owner?.name || '-'}</td>
                                        <td>
                                            <button onClick={() => handleDetails(pet)}>
                                                Detalhes
                                            </button>

                                            <button onClick={() => handleEdit(pet)}>
                                                Editar
                                            </button>

                                            <button onClick={() => handleDelete(pet)}>
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section >

            {detailPet && (
                <div className="detail-card">

                    <div className="detail-card">
                        <h2>Detalhes do Pet</h2>
                        <div className="detail-grid">
                            <p><strong>Nome:</strong> {detailPet.name}</p>
                            <p><strong>Dono:</strong> {detailPet.owner?.name || '-'}</p>
                            <p><strong>Espécie:</strong> {detailPet.species}</p>
                            <p><strong>Raça:</strong> {detailPet.breed}</p>
                            <p><strong>Porte:</strong> {getSizeText(detailPet.size)}</p>
                            <p><strong>Peso:</strong> {detailPet.weight}</p>
                            <p className="full-width"><strong>Observações:</strong> {detailPet.notes || 'Sem observações.'}</p>
                        </div>

                        <h3>Histórico recente</h3>
                        {detailPet.services?.length > 0 ? (
                            <ul className="service-list">
                                {detailPet.services.slice(0, 4).map((service) => (
                                    <li key={service.id}>
                                        {service.serviceType?.name || 'Serviço'} -{' '}
                                        {formatDate(service.serviceDate)} -{' '}
                                        {formatMoney(service.chargedAmount)} -{' '}
                                        {getStatusText(service.status)}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="no-services">Nenhum atendimento registrado.</p>
                        )}
                        <button className="btn-close" onClick={() => setDetailPet(null)}>
                            Fechar detalhes
                        </button>
                    </div>
                </div>
            )}
        </div >
    );
}