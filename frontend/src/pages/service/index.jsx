import { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { serviceRecordsService } from '../../services/resoucesService'

const statusLabels = {
    scheduled: 'Agendado',
    in_progress: 'Em andamento',
    completed: 'Concluído',
    canceled: 'Cancelado',
};

export default function ServicePage(){
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [rescheduleDate, setRescheduleDate] = useState('');

    async function load(){
        try{
            setLoading(true);
            const data = await serviceRecordsService.list();
            setServices(data);
        }catch(err){
            setMessage('Erro ao carregar serviços.');
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{ load() },[])

    function formatDate(dateString) {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    function toDateTimeLocal(value) {
        if (!value) return '';
        const date = new Date(value);
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60000);
        return localDate.toISOString().slice(0, 16);
    }

    async function updateService(id, payload, successMessage) {
        try {
            await serviceRecordsService.update(id, payload);
            setMessage(successMessage);
            setSelectedService(null);
            setRescheduleDate('');
            load();
        } catch (error) {
            const backendMessage = error?.response?.data?.message;
            setMessage(backendMessage ? `Erro: ${backendMessage}` : 'Erro ao atualizar serviço.');
        }
    }

    function handleConclude(service) {
        if (service.status === 'completed') return;
        updateService(service.id, { status: 'completed' }, 'Serviço concluído com sucesso.');
    }

    function handleCancel(service) {
        if (service.status === 'canceled') return;
        updateService(service.id, { status: 'canceled' }, 'Serviço cancelado com sucesso.');
    }

    function handleRescheduleClick(service) {
        setSelectedService(service);
        setRescheduleDate(toDateTimeLocal(service.serviceDate));
        setMessage('');
    }

    async function handleRescheduleSubmit(event) {
        event.preventDefault();
        if (!selectedService) return;

        if (!rescheduleDate) {
            setMessage('Informe uma nova data para reagendamento.');
            return;
        }

        updateService(
            selectedService.id,
            { serviceDate: new Date(rescheduleDate).toISOString(), status: 'scheduled' },
            'Serviço reagendado com sucesso.',
        );
    }

    if(loading) return <MainLayout><p>Carregando serviços...</p></MainLayout>

    return (
        <MainLayout>
            <div className='owners-container'>
                <h1>Serviços agendados</h1>
                {message && <p className={`message ${message.includes('Erro') ? 'error' : 'success'}`}>{message}</p>}

                {services.length === 0 ? (
                    <p className='empty-list'>Nenhum serviço agendado.</p>
                ) : (
                    <div className='table-responsive'>
                        <table className='owner-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Pet</th>
                                    <th>Tipo</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((s) => (
                                    <tr key={s.id}>
                                        <td>{s.id}</td>
                                        <td>{s.pet?.name ?? '-'}</td>
                                        <td>{s.serviceType?.name ?? '-'}</td>
                                        <td>{formatDate(s.serviceDate)}</td>
                                        <td>{statusLabels[s.status] ?? s.status ?? '-'}</td>
                                        <td>
                                            <button type='button' onClick={() => handleConclude(s)} disabled={s.status === 'completed'}>Concluir</button>
                                            <button type='button' onClick={() => handleCancel(s)} disabled={s.status === 'canceled'}>Cancelar</button>
                                            <button type='button' onClick={() => handleRescheduleClick(s)} disabled={s.status === 'completed' || s.status === 'canceled'}>Reagendar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {selectedService && (
                    <section className='form-section'>
                        <h2>Reagendar serviço #{selectedService.id}</h2>
                        <form onSubmit={handleRescheduleSubmit} className='owner-form'>
                            <div className='form-group'>
                                <label>Pet</label>
                                <input value={selectedService.pet?.name ?? '-'} readOnly />
                            </div>
                            <div className='form-group'>
                                <label>Tipo de serviço</label>
                                <input value={selectedService.serviceType?.name ?? '-'} readOnly />
                            </div>
                            <div className='form-group'>
                                <label>Nova data e hora</label>
                                <input
                                    type='datetime-local'
                                    value={rescheduleDate}
                                    onChange={(e) => setRescheduleDate(e.target.value)}
                                />
                            </div>
                            <div className='form-actions'>
                                <button type='submit'>Salvar reagendamento</button>
                                <button type='button' onClick={() => setSelectedService(null)}>Cancelar</button>
                            </div>
                        </form>
                    </section>
                )}
            </div>
        </MainLayout>
    )
}
