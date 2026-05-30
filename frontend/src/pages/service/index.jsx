import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { service, petsService } from '../../services/resoucesService'

const emptyForm = {
    serviceType: '', 
    description: '',
    price: '',
    duration: '', 
    petId: '',
    serviceDate: '',
    chargedAmount: '',
    status: 'scheduled', 
    notes: '',
};

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState(emptyForm);
    const [editingService, setEditingService] = useState(null);
    const [detailService, setDetailService] = useState(null);
    const [message, setMessage] = useState('');

    const serviceTypes = [
        { value: 'banho', label: 'Banho' },
        { value: 'tosa', label: 'Tosa' },
        { value: 'vacinacao', label: 'Vacinação' },
        { value: 'consulta', label: 'Consulta' },
        { value: 'outro', label: 'Outro' }
    ];

    async function loadData() {
        try {
            setLoading(true);

            // Usando 'service.list()' conforme seu padrão
            const servicesData = await service.list();
            const petsData = await petsService.list();

            setServices(servicesData);
            setPets(petsData);

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
        setEditingService(null);
    }

    function getServiceTypeText(type) {
        const s = serviceTypes.find(st => st.value === type);
        return s ? s.label : type;
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

        if (form.price <= 0) {
            setMessage('Preço inválido');
            return;
        }

        if (!form.serviceType || !form.petId || !form.serviceDate) {
            setMessage('Preencha os campos obrigatórios.');
            return;
        }

        const payload = {
            serviceType: form.serviceType,
            description: form.description,
            price: Number(form.price),
            duration: Number(form.duration),
            petId: Number(form.petId),
            serviceDate: form.serviceDate,
            chargedAmount: Number(form.chargedAmount) || Number(form.price),
            status: form.status,
            notes: form.notes
        };

        try {
            if (editingService) {
                await service.update(editingService.id, payload);
                setMessage('Serviço atualizado com sucesso.');
            } else {
                await service.create(payload);
                setMessage('Serviço cadastrado com sucesso.');
            }

            clearForm();
            loadData();
        } catch (error) {
            setMessage('Erro ao salvar serviço.');
        }
    }

    function handleEdit(s) {
        setEditingService(s);
        setForm({
            serviceType: s.serviceType || '',
            description: s.description || '',
            price: String(s.price || ''),
            duration: String(s.duration || ''),
            petId: String(s.petId || ''),
            serviceDate: s.serviceDate || '',
            chargedAmount: String(s.chargedAmount || ''),
            status: s.status || 'scheduled',
            notes: s.notes || '',
        });
    }

    async function handleDetails(s) {
        try {
            const data = await service.getById(s.id);
            setDetailService(data);
        } catch (error) {
            setMessage('Erro ao carregar detalhes.');
        }
    }

    async function handleDelete(s) {
        const confirmDelete = window.confirm(`Deseja excluir o serviço de ${s.pet?.name}?`);
        if (!confirmDelete) return;

        try {
            await service.remove(s.id);
            setMessage('Serviço excluído com sucesso.');
            loadData();
        } catch (error) {
            setMessage('Erro ao excluir serviço.');
        }
    }

    const filteredServices = services.filter((s) => {
        const term = search.toLowerCase();
        return (
            s.serviceType?.toLowerCase().includes(term) ||
            s.pet?.name?.toLowerCase().includes(term) ||
            s.description?.toLowerCase().includes(term)
        );
    });

    if (loading) return <p>Carregando serviços...</p>;

    return (
        <div className="services-container">
            <h1>Serviços</h1>
            <Link to="/dashboard">Dashboard</Link>
            {message && <p className={`message ${message.includes('Erro') ? 'error' : 'success'}`}>{message}</p>}

            <section className="form-section">
                <h2>{editingService ? 'Editar serviço' : 'Novo serviço'}</h2>
                <form onSubmit={handleSubmit} className="pet-form">
                    <div className="form-group">
                        <label>Tipo de Serviço *</label>
                        <select name="serviceType" value={form.serviceType} onChange={handleChange}>
                            <option value="">Selecione</option>
                            {serviceTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Pet *</label>
                        <select name="petId" value={form.petId} onChange={handleChange}>
                            <option value="">Selecione o pet</option>
                            {pets.map(p => (
                                <option key={p.id} value={p.id}>{p.name} - {p.owner?.name || 'Sem dono'}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Preço (R$) *</label>
                        <input type="number" name="price" value={form.price} onChange={handleChange} step="0.01" />
                    </div>

                    <div className="form-group">
                        <label>Data *</label>
                        <input type="datetime-local" name="serviceDate" value={form.serviceDate} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <select name="status" value={form.status} onChange={handleChange}>
                            <option value="scheduled">Agendado</option>
                            <option value="in_progress">Em andamento</option>
                            <option value="completed">Concluído</option>
                            <option value="canceled">Cancelado</option>
                        </select>
                    </div>

                    <div className="form-actions">
                        <button type="submit">{editingService ? 'Salvar' : 'Cadastrar'}</button>
                        {editingService && <button type="button" onClick={clearForm}>Cancelar</button>}
                    </div>
                </form>
            </section>

            <section className="list-section">
                <h2>Lista de serviços</h2>
                <input 
                    placeholder="Buscar..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />

                <table className="pet-table">
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Pet</th>
                            <th>Data</th>
                            <th>Preço</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredServices.map(s => (
                            <tr key={s.id}>
                                <td>{getServiceTypeText(s.serviceType)}</td>
                                <td>{s.pet?.name || '-'}</td>
                                <td>{formatDate(s.serviceDate)}</td>
                                <td>{formatMoney(s.chargedAmount || s.price)}</td>
                                <td>{getStatusText(s.status)}</td>
                                <td>
                                    <button onClick={() => handleDetails(s)}>Detalhes</button>
                                    <button onClick={() => handleEdit(s)}>Editar</button>
                                    <button onClick={() => handleDelete(s)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {detailService && (
                <div className="detail-card">
                    <h2>Detalhes do Serviço</h2>
                    <p><strong>Tipo:</strong> {getServiceTypeText(detailService.serviceType)}</p>
                    <p><strong>Pet:</strong> {detailService.pet?.name}</p>
                    <p><strong>Preço:</strong> {formatMoney(detailService.chargedAmount || detailService.price)}</p>
                    <p><strong>Status:</strong> {getStatusText(detailService.status)}</p>
                    <button onClick={() => setDetailService(null)}>Fechar</button>
                </div>
            )}
        </div>
    );
}