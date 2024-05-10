import "./Form.css";
import { useEffect, useState } from "react";
const API_URL = "http://localhost:3010";

function Form() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showData, setShowData] = useState<boolean>(false);
    const [showMessage, setMessage] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [motosData, setMotosData] = useState<any[]>([]);

    useEffect(() => {   
        const userInStorageString = window.localStorage.getItem("user");
        if (userInStorageString) {
            const userInStorage = JSON.parse(userInStorageString);
            setUser(userInStorage);
        }
    }, []);

    const handleInputChange = (stateUpdate: (arg0: any) => void) => {
        return (event: { target: { value: any; }; }) => {
            stateUpdate(event.target.value);
        };
    };

    const HandleOnClickEnviar = () => {
        fetchCategory();
        setShowData(!showData);
    };

    const fetchCategory = async () => {
        try {
            const response = await fetch(`${API_URL}/api/v1/motos`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await response.json();
            setMotosData(data);
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <>
            <header className="header">
                <h1>Empty Store</h1>
            </header>

            <section className="formContainer">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="inputContainer">
                        <label htmlFor="login" className="loginLabel">Iniciar Sesión</label>
                        <label htmlFor="email">Email: </label>
                        <input type="email" id="email" name="email" value={email} onChange={handleInputChange(setEmail)} />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="password">Contraseña: </label>
                        <input type="password" id="password" name="password" value={password} onChange={handleInputChange(setPassword)} />
                    </div>
                    <button onClick={HandleOnClickEnviar}>Enviar</button>
                </form>
            </section>

            {
    user && (
        <section className="dataContainer">
            {
                showData ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Categoría</th>
                                <th>Descripción</th>
                                <th>Stock</th>
                                {/* Agregar otras columnas si es necesario */}
                            </tr>
                        </thead>
                        <tbody>
                            {motosData.map((category, index) => (
                                <tr key={index}>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
                                    <td>{category.stock}</td>
                                    {/* Agregar otras celdas para otras propiedades */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : 
                showMessage ? (
                    <p>Información incorrecta</p>
                ) : (
                    <p>No hay datos para mostrar</p>
                )
            }
        </section>
    )
}


            <footer className="footer">
                <p>CETI COLOMOS | Programacion WEB y BD II </p>
            </footer>
        </>
    );
}

export default Form;

