import React, { useState, useContext } from "react";
import { AuthContext } from "context";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "hooks/mutations";
import { Storage } from "@capacitor/storage";
import { Card, Grid, Button, Text, Input, Col } from "@nextui-org/react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setJwt } = useContext(AuthContext);

  const [register, { loading, data }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      Storage.set({
        key: "accessToken",
        value: data.createUser.token,
      });
      setJwt(data.createUser.token);
      console.log(data);
    },
    onError: (error) => console.log(error.message),
  });

  return (
    <React.Fragment>
      <br></br>
      <Grid.Container justify="center">
        <Grid sm={12} md={5}>
          <Card variant={0}>
            <Card.Header>
              <Text b>
                إنشاء حساب
              </Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: "$10" }}>
              <Input
                clearable
                bordered
                fullWidth
                label
                color="primary"
                size="lg"
                placeholder="اسم المستخدم"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
              <Input
                css={{ mt: "12px" }}
                clearable
                bordered
                fullWidth
                label
                color="primary"
                size="lg"
                placeholder="البريد الإكتروني"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
              <Input
                css={{ mt: "12px" }}
                clearable
                bordered
                fullWidth
                label
                color="primary"
                size="lg"
                placeholder="كلمة المرور"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <Col css={{ d: "flex", alignItems: "center", flexDirection: 'column',}}>
                <Button
                  size="sm"
                  onPress={() =>
                    register({
                      variables: {
                        username: username.trim(),
                        email: email.trim(),
                        password: password.trim(),
                      },
                    })
                  }
                >
                  إنشاء
                </Button>
                <Button
                  size="sm"
                  color={"secondary"}
                  css={{ mt: 12}}
                >
                  إنشاء
                </Button>
              </Col>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </React.Fragment>
  );
}
