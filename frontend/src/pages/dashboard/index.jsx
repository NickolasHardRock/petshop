import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { serviceRecordsService } from '../../services/resoucesService';
import "./style.css"

function Dashboard(){
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    async function loadServices(){
        try {
            setLoading(true);
            const data = await serviceRecordsService.list();
            setServices(data);
        } catch (error) {
            setMessage('Erro ao carregar serviços agendados.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadServices();
    }, []);

    const scheduledServices = services.filter((service) => service.status === 'scheduled');

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

    return(
        <MainLayout>
            <div className="dashboard-header">
                <h1 className="Dashboard">Dashboard</h1>
            </div>

            {message && <p className={`message ${message.includes('Erro') ? 'error' : 'success'}`}>{message}</p>}

            <section className="dashboard-summary">
                <div className="summary-card">
                    <strong>{scheduledServices.length}</strong>
                    <span>Serviços agendados</span>
                </div>
                <div className="summary-card">
                    <strong>{services.length}</strong>
                    <span>Total de serviços</span>
                </div>
            </section>

            <section className="cards-section">
                <h2>Serviços agendados</h2>
                {loading ? (
                    <p>Carregando serviços...</p>
                ) : scheduledServices.length === 0 ? (
                    <p className="empty-list">Não há serviços agendados no momento.</p>
                ) : (
                    <div className="cards-grid">
                        {scheduledServices.map((service) => (
                            <article key={service.id} className="service-card">
                                <h3>{service.serviceType?.name ?? 'Serviço'}</h3>
                                <p><strong>Pet:</strong> {service.pet?.name ?? '-'}</p>
                                <p><strong>Data:</strong> {formatDate(service.scheduledAt)}</p>
                                <p><strong>Status:</strong> {service.status}</p>
                                <p><strong>ID:</strong> {service.id}</p>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </MainLayout>
    )
}

export default Dashboard