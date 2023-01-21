import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div>
            <p>Error 404</p>
            <p>Esta pagina no existe</p>
            <Link to="/home">
                <button>Home</button>
            </Link>
        </div>
    )
}

export default Error;