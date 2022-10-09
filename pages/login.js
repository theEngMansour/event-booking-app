import React, { useState, useContext } from "react";
import { AuthContext } from "context";
import { useMutation } from "@apollo/client";
import { LOGIN } from "hooks/mutations";
import { Storage } from "@capacitor/storage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setJwt } = useContext(AuthContext);

  const [login, { loading, data }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      Storage.set({
        key: "accessToken",
        value: data.login.token
      });
      setJwt(data.login.token);
    },
    onError: (error) => console.log(error.message),
  });

  return (
    <React.Fragment>
      <input
        type="email"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        required
      />
      <input
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        required
      />
      <button
        onClick={() =>
          login({
            variables: {
              email: email.trim(),
              password: password.trim(),
            },
          })
        }
      >
        إرسال
      </button>
    </React.Fragment>
  );
}
