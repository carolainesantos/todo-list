import { useContext, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/Context";
import { loginUser, verifyMfa } from "../../api/user";
import { toast } from "react-toastify";
import hasScript from "../../fns/regex_script";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/signup");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [showMfa, setShowMfa] = useState(false);

  const handleSubmitMfa = async (e) => {
    e.preventDefault();
    if (hasScript(email) || hasScript(password)) {
      return toast("Informe o e-mail e a password para continuar!");
    }
    if (!email || !password) {
      return toast("Informe o e-mail e a password para continuar!");
    }

    try {
      const response = await verifyMfa(email, password, code);

      if (response.token) {
        login(response.token);
        return navigate("/todolist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasScript(email) || hasScript(password)) {
      return toast("Informe o e-mail e a password para continuar!");
    }

    if (!email || !password) {
      return toast("Informe o e-mail e a password para continuar!");
    }

    try {
      const response = await loginUser(email, password);

      if (response.msg) {
        toast(response.msg);
        setShowMfa(true);
      }
    } catch (error) {
      if (error.response.status === 403) {
        return toast("Sem permissão.");
      }
      if (error.response.status === 401 || error.response.status === 404) {
        return toast("Email ou password inválido, tente novamente!");
      }
      return toast("Erro inesperado, tente novamente mais tarde!");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h2 className="Title-Login">Login</h2>
        <div className="input-group-login">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group-login">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {showMfa ? (
          <div className="input-group-login">
            <label htmlFor="code">Access Code:</label>
            <input
              type="code"
              id="code"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        ) : null}
        <p>
          Não possui conta?{" "}
          <spam className="signup" onClick={handleCreateAccount}>
            Clique aqui
          </spam>
        </p>
        <button
          className="button"
          type="submit"
          onClick={showMfa ? handleSubmitMfa : handleSubmit}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
