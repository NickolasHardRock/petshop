import { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout";
import { petsService, serviceRecordsService, serviceType } from '../../services/resoucesService'

const emptyForm = {
    name: '',
    description: '',
    basePrice: '',
};

const emptySchedule = {
    petId: '',
    serviceTypeId: '',
    serviceDate: '',
    notes: '',
};

export default function TypeServicesPage() {
    const [types, setTypes] = useState([]);
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState(emptyForm);
    const [editingType, setEditingType] = useState(null);
    const [detailType, setDetailType] = useState(null);
    const [message, setMessage] = useState('');
    const [scheduleForm, setScheduleForm] = useState(emptySchedule);
    const [scheduleMessage, setScheduleMessage] = useState('');

    async function loadData() {
        try {
            setLoading(true);
            const [typesData, petsData] = await Promise.all([
                serviceType.list(),
                petsService.list(),
            ]);
            setTypes(typesData);
            setPets(petsData);
        } catch (error) {
            setMessage('Erro ao carregar os dados.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
    }

    function handleScheduleChange(event) {
        const { name, value } = event.target;
        setScheduleForm({
            ...scheduleForm,
            [name]: value,
        });
    }

    function clearForm() {
        setForm(emptyForm);
        setEditingType(null);
    }

    function clearScheduleForm() {
        setScheduleForm(emptySchedule);
    }

    function formatMoney(value) {
        if (!value) return 'R$ 0,00';
        return Number(value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!form.name) {
            setMessage('Preencha o nome do tipo de serviço.');
            return;
        }

        if (Number(form.basePrice) <= 0) {
            setMessage('Preço base inválido.');
            return;
        }

        const payload = {
            name: form.name,
            description: form.description,
            basePrice: Number(form.basePrice),
        };

        try {
            if (editingType) {
                await serviceType.update(editingType.id, payload);
                setMessage('Tipo de serviço atualizado com sucesso.');
            } else {
                await serviceType.create(payload);
                setMessage('Tipo de serviço cadastrado com sucesso.');
            }
            clearForm();
            loadData();
        } catch (error) {
            setMessage('Erro ao salvar tipo de serviço.');
        }
    }

    async function handleScheduleSubmit(event) {
        event.preventDefault();
        setScheduleMessage('');

        if (!scheduleForm.serviceTypeId) {
            setScheduleMessage('Escolha um tipo de serviço.');
            return;
        }

        if (!scheduleForm.petId) {
            setScheduleMessage('Escolha um pet para o serviço.');
            return;
        }

        if (!scheduleForm.serviceDate) {
            setScheduleMessage('Informe a data e hora do serviço.');
            return;
        }

        const selectedType = types.find((type) => type.id === Number(scheduleForm.serviceTypeId));
        if (!selectedType) {
            setScheduleMessage('Tipo de serviço inválido.');
            return;
        }

        const payload = {
            petId: Number(scheduleForm.petId),
            serviceTypeId: Number(scheduleForm.serviceTypeId),
            serviceDate: new Date(scheduleForm.serviceDate).toISOString(),
            chargedAmount: Number(selectedType.basePrice),
            notes: scheduleForm.notes,
            status: 'scheduled',
        };

        try {
            await serviceRecordsService.create(payload);
            setScheduleMessage('Serviço agendado com sucesso.');
            clearScheduleForm();
        } catch (error) {
            const backendMessage = error?.response?.data?.message;
            setScheduleMessage(backendMessage ? `Erro ao agendar o serviço: ${backendMessage}` : 'Erro ao agendar o serviço.');
        }
    }

    function handleEdit(type) {
        setEditingType(type);
        setForm({
            name: type.name || '',
            description: type.description || '',
            basePrice: String(type.basePrice || ''),
        });
    }

    async function handleDetails(type) {
        try {
            const data = await serviceType.getById(type.id);
            setDetailType(data);
        } catch (error) {
            setMessage('Erro ao carregar detalhes.');
        }
    }

    async function handleDelete(type) {
        const confirmDelete = window.confirm(`Deseja excluir o tipo de serviço ${type.name}?`);
        if (!confirmDelete) return;

        try {
            await serviceType.remove(type.id);
            setMessage('Tipo de serviço excluído com sucesso.');
            loadData();
        } catch (error) {
            setMessage('Erro ao excluir tipo de serviço.');
        }
    }

    const filteredTypes = types.filter((type) => {
        const term = search.toLowerCase();
        return (
            type.name?.toLowerCase().includes(term) ||
            type.description?.toLowerCase().includes(term)
        );
    });

    if (loading) return <MainLayout><p>Carregando tipos de serviço...</p></MainLayout>;

    return (
        <MainLayout>
            <div className="owners-container">
                <h1>Tipos de Serviços</h1>
                {message && <p className={`message ${message.includes('Erro') ? 'error' : 'success'}`}>{message}</p>}

                <section className="form-section">
                    <h2>{editingType ? 'Editar tipo de serviço' : 'Novo tipo de serviço'}</h2>
                    <form onSubmit={handleSubmit} className="owner-form">
                        <div className="form-group">
                            <label>Nome *</label>
                            <input name="name" value={form.name} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Descrição</label>
                            <textarea name="description" value={form.description} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Preço base (R$) *</label>
                            <input type="number" name="basePrice" value={form.basePrice} onChange={handleChange} step="0.01" />
                        </div>

                        <div className="form-actions">
                            <button type="submit">{editingType ? 'Salvar' : 'Cadastrar'}</button>
                            {editingType && <button type="button" onClick={clearForm}>Cancelar</button>}
                        </div>
                    </form>
                </section>

                <section className="schedule-section">
                    <h2>Agendar serviço para um pet</h2>
                    {scheduleMessage && <p className={`message ${scheduleMessage.includes('Erro') ? 'error' : 'success'}`}>{scheduleMessage}</p>}
                    <form onSubmit={handleScheduleSubmit} className="owner-form">
                        <div className="form-group">
                            <label>Tipo de serviço *</label>
                            <select name="serviceTypeId" value={scheduleForm.serviceTypeId} onChange={handleScheduleChange}>
                                <option value="">Selecione um tipo de serviço</option>
                                {types.map((type) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Pet *</label>
                            <select name="petId" value={scheduleForm.petId} onChange={handleScheduleChange}>
                                <option value="">Selecione um pet</option>
                                {pets.map((pet) => (
                                    <option key={pet.id} value={pet.id}>{pet.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Data e hora *</label>
                            <input
                                type="datetime-local"
                                name="serviceDate"
                                value={scheduleForm.serviceDate}
                                onChange={handleScheduleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Observações</label>
                            <textarea name="notes" value={scheduleForm.notes} onChange={handleScheduleChange} />
                        </div>

                        <div className="form-actions">
                            <button type="submit">Agendar serviço</button>
                            <button type="button" onClick={clearScheduleForm}>Limpar</button>
                        </div>
                    </form>
                </section>

                <section className="list-section">
                    <h2>Lista de tipos de serviços</h2>
                    <input
                        placeholder="Buscar..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="table-responsive">
                        <table className="owner-table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Preço base</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTypes.map(type => (
                                    <tr key={type.id}>
                                        <td>{type.name}</td>
                                        <td>{type.description || '-'}</td>
                                        <td>{formatMoney(type.basePrice)}</td>
                                        <td>
                                            <button type="button" onClick={() => handleDetails(type)}>Detalhes</button>
                                            <button type="button" onClick={() => handleEdit(type)}>Editar</button>
                                            <button type="button" onClick={() => setScheduleForm({
                                                ...scheduleForm,
                                                serviceTypeId: String(type.id),
                                            })}>Agendar este tipo</button>
                                            <button type="button" onClick={() => handleDelete(type)}>Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {detailType && (
                    <div className="detail-card">
                        <h2>Detalhes do Tipo de Serviço</h2>
                        <p><strong>Nome:</strong> {detailType.name}</p>
                        <p><strong>Descrição:</strong> {detailType.description || '-'}</p>
                        <p><strong>Preço base:</strong> {formatMoney(detailType.basePrice)}</p>
                        <button onClick={() => setDetailType(null)}>Fechar</button>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
