import "./Form.css"
import {useState} from "react"

function Form() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showData, setShowData] = useState<boolean>(false);
    const [showMessage, setMessage] = useState<boolean>(false);

    const handleInputChange = (stateUpdate: (arg0: any) => void) => {
        return (event: { target: { value: any; }; }) => {
            stateUpdate(event.target.value);
        }
    }

    const HandleOnClickEnviar = () => {
        if(email == "ivannoeramirezvivanco@gmail.com" && password == "ivan4658" ){
            setShowData(true)
            setMessage(false)
        }else{
            setShowData(false)
            setMessage(true)
        }
    }

    return(
        <>
        <section className="dataContainer">
            {
                showData ?(
                    <>
                    <p>Email: {email}</p>
                    <p>Password: {password}</p>
                    </>
                ) : 
                showMessage && (
                    <p>Informacion incorrecta</p>
                )

            }
        </section>
        <section className="formContainer">
            <span className="inputContainer">
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" name="email" value={email} onChange={handleInputChange(setEmail)}/>
            </span>
            <span className="inputContainer">
                <label htmlFor="password">Contraseña: </label>
                <input type="password" id="password" name="password" value={password} onChange={handleInputChange(setPassword)} />
            </span>
            <button onClick={HandleOnClickEnviar}>Enviar</button>
        </section>
        </>
    );
}

export default Form;