import { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { serviceRecordsService } from '../../services/resoucesService'


export default function ServicePage(){
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

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
                                </tr>
                            </thead>
                            <tbody>
                                {services.map(s => (
                                    <tr key={s.id}>
                                        <td>{s.id}</td>
                                        <td>{s.pet?.name ?? '-'}</td>
                                        <td>{s.serviceType?.name ?? '-'}</td>
                                        <td>{s.scheduledAt ?? '-'}</td>
                                        <td>{s.status ?? '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}
