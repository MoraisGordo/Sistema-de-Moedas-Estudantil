import { Button, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { createSearchParams, Navigate, useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmarDelete from "../components/ConfirmarDelete";
import { getAlunos, deleteAluno } from "../services/AlunosService";
export default function Alunos() {
    const navegar = useNavigate();
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [IdAlunosParaAtualiar, setIdAlunoParaAtualizar] = useState<number>();
    const [alunoParaDeletar, setAlunoParaDeletar] = useState<Aluno>();
    const [openAlunoDeletar, setOpenAlunoDeletar] = useState<boolean>(false);

    const aaa = [
        {
            id: 1,
            nome: "jorge",
            cpf: "281.293.018-09",
            email: "emailongopraporra@email.com.br",
            senha: "123456",
            rg: "123456789",
            endereco: "rua 123",
            curso: "engenharia",
            saldoMoedas: 140
        },
        {
            id: 1,
            nome: "Neymar da Silva Santos Júnior",
            cpf: "281.293.018-09",
            email: "emailongo@email.com.br",
            senha: "123456",
            rg: "123456789",
            endereco: "rua 123",
            curso: "engenharia",
            saldoMoedas: 150
        }, {
            id: 2,
            nome: "Calabreso",
            cpf: "281.293.018-09",
            email: "emailongopraporra@email.com.br",
            senha: "123456",
            rg: "123456789",
            endereco: "rua 123",
            curso: "engenharia",
            saldoMoedas: 100
        }, {
            id: 1,
            nome: "John Cena",
            cpf: "281.293.018-09",
            email: "naoaguentomais@email.com.br",
            senha: "123456",
            rg: "123456789",
            endereco: "rua 123",
            curso: "engenharia",
            saldoMoedas: 1590
        },
    ]

    useEffect(() => {
        // const buscaData = async () => {
        //     try {
        //         const alunos = await getAlunos();
        //         setAlunos(alunos)
        //     }
        //     catch (error) {
        //         console.log("Erro ao buscar alunos:", error);
        //     }
        // };
        // buscaData();
        setAlunos(aaa)
    }, [openAlunoDeletar]);


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));






    function handleOpenDeleteAluno(aluno: Aluno) {
        setAlunoParaDeletar(aluno);
        setOpenAlunoDeletar(true);
    }

    async function handleDeleteAluno(id: number) {
        setOpenAlunoDeletar(false);
        try {
            if (alunoParaDeletar) {
                await deleteAluno(id);
            }
        } catch (error) {
            console.log("Erro ao deletar empresa:", error);
        }
    }

    return (
        <>
            <Row style={{}}>
                <Paper sx={{}}>
                    <Paper style={{ backgroundColor: "#ccaa32", marginTop: "-40px", padding: "10px" }}>
                        <Col className="justify-content-center text-center">
                            <h2 style={{ color: "#474646" }}>Lista de Alunos</h2>
                        </Col>
                    </Paper>
                    <Row className="justify-content-center text-center">
                        <TableContainer>
                            <Table sx={{ minWidth: 700 }} aria-label="simple table">
                                <TableHead sx={{}}>
                                    <TableRow>
                                        <TableCell align="left">Nome</TableCell>
                                        <TableCell align="left">Cpf</TableCell>
                                        <TableCell align="left">Moedas</TableCell>
                                        <TableCell align="left">Ações</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {alunos.map((alunos) => (
                                        <StyledTableRow key={alunos.id}>
                                            <StyledTableCell align="left">
                                                {alunos.nome}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">{alunos.cpf}</StyledTableCell>
                                            <StyledTableCell align="left">{alunos.saldoMoedas}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Button className="m-2" style={{ backgroundColor: "#ccaa32", border: "none" }} onClick={() => navegar({
                                                    pathname: "/atualizarAluno",
                                                    search: createSearchParams({
                                                        id: String(alunos.id),
                                                    }).toString()
                                                })}><EditIcon /></Button>
                                                <Button style={{ backgroundColor: "#ccaa32", border: "none" }} onClick={() => { handleOpenDeleteAluno(alunos) }}><DeleteIcon /></Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Row>
                    <Row className="justify-content-end text-end">
                        <Col >
                            <Button
                                className="m-4"
                                style={{ backgroundColor: "#ccaa32   ", border: "none" }}
                                onClick={() => {
                                    navegar({
                                        pathname: "/novoAluno",
                                    });
                                }}
                            >
                                Novo Aluno
                            </Button>
                        </Col>
                    </Row>
                </Paper>
            </Row>

            <ConfirmarDelete
                title="Deletar Aluno?"
                id={alunoParaDeletar?.id}
                open={openAlunoDeletar}
                onClose={() => setOpenAlunoDeletar(false)}
                onSubmitValue={(id: number) => { handleDeleteAluno(id) }}
            />
        </>
    );
}