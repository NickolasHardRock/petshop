import { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { usersService } from '../../services/resoucesService'

export default function UsersPage(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    async function load(){
        try{
            setLoading(true);
            const data = await usersService.list();
            setUsers(data);
        }catch(err){
            setMessage('Erro ao carregar usuários.');
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{ load() },[])

    if(loading) return <MainLayout><p>Carregando usuários...</p></MainLayout>

    return (
        <MainLayout>
            <div className='owners-container'>
                <h1>Usuários</h1>
                {message && <p className={`message ${message.includes('Erro') ? 'error' : 'success'}`}>{message}</p>}

                {users.length === 0 ? (
                    <p className='empty-list'>Nenhum usuário encontrado.</p>
                ) : (
                    <div className='table-responsive'>
                        <table className='owner-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.role}</td>
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
