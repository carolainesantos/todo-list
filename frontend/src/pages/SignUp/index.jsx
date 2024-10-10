import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/user";
import { toast } from "react-toastify";
import "./styles.css";
import hasScript from "../../fns/regex_script";

export default function SignUp() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (hasScript(name) || hasScript(email) || hasScript(password)) {
        return toast("Informe corretamente seus dados!");
      }

      const responseApi = await createUser({ name, email, password });
      if (responseApi.id) {
        navigate("/");
      } else {
        console.log(responseApi);
      }
    } catch (error) {
      if (error.status === 403) {
        return toast("Sem permissão.");
      }
      if (error.status === 401 || error.status === 404) {
        return toast("Email ou password inválido, tente novamente!");
      }
      toast("Erro inesperado, tente novamente mais tarde!");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form">
        <h2 className="title-signup">Criar Conta</h2>
        <div className="input-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="button" type="submit" onClick={handleSubmit}>
          Cadastrar-se
        </button>
        <button className="button back-button" onClick={handleBackClick}>
          Voltar
        </button>
      </form>
    </div>
  );
}
