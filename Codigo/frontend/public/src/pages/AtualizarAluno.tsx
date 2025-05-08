import { Autocomplete, Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, InputGroup, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router";
import { updateAluno, getAlunoPorId } from "../services/AlunosService";

export default function AtualizarAluno() {

    const navegar = useNavigate();
    const [aluno, setAluno] = useState<Aluno>()
    const [id, setId] = useSearchParams()
    const [nome, setNome] = useState<string>()
    const [cpf, setCpf] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [senha, setSenha] = useState<string>()
    const [rg, setRg] = useState<string>()
    const [endereco, setEndereco] = useState<string>()
    const [curso, setCurso] = useState<string>()


    async function atualizarAluno() {
        if (nome && cpf && email && senha && rg && endereco && curso) {
            const aluno = {
                nome: nome,
                cpf: cpf,
                email: email,
                senha: senha,
                rg: rg,
                endereco: endereco,
                curso: curso,
                saldoMoedas: 0
            }
            await updateAluno(Number(id), aluno)
        }
    }

    useEffect(() => {
        // const buscaData = async () => {
        //     try {
        //         const aluno = await getAlunoPorId(Number(id));
        //         setAluno(aluno)
        //     }
        //     catch (error) {
        //         console.log("Erro ao buscar o aluno:", error);
        //     }
        // };
        // buscaData();
        console.log("id", id)
    }, [])

    return (
        <>
            <Paper>
                <Row>

                </Row>
                <Row>
                    <Form className="p-5" onSubmit={atualizarAluno}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Nome</InputGroup.Text>
                            <Form.Control
                                defaultValue={aluno?.nome}
                                onChange={(evt) => setNome(evt.target.value)}
                                type="text"
                                placeholder="Informe o Nome"
                                required
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Cpf</InputGroup.Text>
                            <Form.Control
                                defaultValue={aluno?.cpf}
                                onChange={(evt) => setCpf(evt.target.value)}
                                type="text"
                                placeholder="Informe o Cpf"
                                required
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Endereço</InputGroup.Text>
                            <Form.Control
                                defaultValue={aluno?.endereco}
                                onChange={(evt) => setEndereco(evt.target.value)}
                                type="text"
                                placeholder="Informe o Endereço"
                                required
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Rg</InputGroup.Text>
                            <Form.Control
                                defaultValue={aluno?.rg}
                                onChange={(evt) => setRg(evt.target.value)}
                                type="text"
                                placeholder="Informe o RG"
                                required
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Curso</InputGroup.Text>
                            <Form.Control
                                defaultValue={aluno?.curso}
                                onChange={(evt) => setCurso(evt.target.value)}
                                type="text"
                                placeholder="Informe o Curso"
                                required
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                            <Form.Control
                                defaultValue={aluno?.email}
                                onChange={(evt) => setEmail(evt.target.value)}
                                type="email"
                                placeholder="Informe o Email"
                                required
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Senha</InputGroup.Text>
                            <Form.Control
                                defaultValue={aluno?.senha}
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