import { Autocomplete, Box, Paper } from "@mui/material";
import { useState, } from "react";
import { Button, InputGroup, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { postAluno } from "../services/AlunosService";

export default function NovoAluno() {

    const navegar = useNavigate();
    const [nome, setNome] = useState<string>()
    const [cpf, setCpf] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [senha, setSenha] = useState<string>()
    const [rg, setRg] = useState<string>()
    const [endereco, setEndereco] = useState<string>()
    const [curso, setCurso] = useState<string>()

    async function criarAluno() {
        if (nome && cpf && email && senha && rg && endereco && curso) {
            const novoAluno = {
                nome: nome,
                cpf: cpf,
                email: email,
                senha: senha,
                rg: rg,
                endereco: endereco,
                curso: curso,
                saldoMoedas: 0
            }
            await postAluno(novoAluno)
        }
    }

    return (
        <>
            <Paper>
                <Row>

                </Row>
                <Row>
                    <Form className="p-5" onSubmit={criarAluno}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Nome</InputGroup.Text>
                            <Form.Control
                                onChange={(evt) => setNome(evt.target.value)}
                                type="text"
                                placeholder="Informe o Nome"
                                required
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Cpf</InputGroup.Text>
                            <Form.Control
                                onChange={(evt) => setCpf(evt.target.value)}
                                type="text"
                                placeholder="Informe o Cpf"
                                required
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Endereço</InputGroup.Text>
                            <Form.Control
                                onChange={(evt) => setEndereco(evt.target.value)}
                                type="text"
                                placeholder="Informe o Endereço"
                                required
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Rg</InputGroup.Text>
                            <Form.Control
                                onChange={(evt) => setRg(evt.target.value)}
                                type="text"
                                placeholder="Informe o RG"
                                required
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Curso</InputGroup.Text>
                            <Form.Control
                                onChange={(evt) => setCurso(evt.target.value)}
                                type="text"
                                placeholder="Informe o Curso"
                                required
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                            <Form.Control
                                onChange={(evt) => setEmail(evt.target.value)}
                                type="email"
                                placeholder="Informe o Email"
                                required
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Senha</InputGroup.Text>
                            <Form.Control
                                onChange={(evt) => setSenha(evt.target.value)}
                                type="password"
                                placeholder="Informe a Senha"
                                required
                            />
                        </InputGroup>
                        <Box className="text-end">
                            <Button type="submit" style={{ backgroundColor: "#ccaa32", border: "none" }} onClick={() => { navegar(-1) }}>
                                Cadastrar
                            </Button>
                        </Box>
                    </Form>
                </Row>
            </Paper >
        </>
    );

}