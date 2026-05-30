import { useContext } from "react";
import './FooterStyle.css'
const Footer = () =>{
    return(
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2026 Minha Empresa. Todos os direitos reservados</p>
                <ul className="footer-links">
                    <li><a href="#Sobre">Sobre</a></li>
                    <li><a href="#contato">Contato</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer