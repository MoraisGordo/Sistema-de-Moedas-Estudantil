import { Dialog, DialogActions, DialogTitle, DialogContent } from "@mui/material";
import { Col, Form, Button, Row, ToggleButtonGroup, ToggleButton, ButtonGroup } from "react-bootstrap";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function AtualizaMoedas({ id, open, onClose, onSubmitValue }: any) {

    const [quantidadeMoedas, setQuantidadeMoedas] = useState<number>(0)
    const [botaoSomaHabilitado, setBotaoSomaHabilitado] = useState<boolean>(true)
    const [botaoSubtracaoHabilitado, setBotaoSubtracaoHabilitado] = useState<boolean>(true)
    const [valor, setValor] = useState<number>();


    function handleMoedas() {
        if (valor == 1) {
            onSubmitValue(quantidadeMoedas)
        }
        else {
            onSubmitValue(0 - quantidadeMoedas)
        }
    }


    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <Form className=" w-400" onSubmit={handleMoedas}>
                    <DialogTitle style={{ backgroundColor: "#ccaa32" }} className="justify-content-center text-center mb-5">Adicionar ou remover quantas moedas?</DialogTitle>
                    <DialogContent>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Control type="number" placeholder="Digite a quantidade de moedas" onChange={(evt) => setQuantidadeMoedas(Number(evt.target.value))} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <ButtonGroup>
                                    <ToggleButton
                                        key={1}
                                        id={`radio-1`}
                                        type="radio"
                                        variant={"outline-primary"}
                                        name="radio"
                                        value={1}
                                        checked={valor === 1}
                                        onChange={(e) => (setValor(Number(e.currentTarget.value)))}
                                    >
                                        <AddIcon />
                                    </ToggleButton>
                                    <ToggleButton
                                        key={2}
                                        id={`radio-2`}
                                        type="radio"
                                        variant={"outline-primary"}
                                        name="radio"
                                        value={2}
                                        checked={valor === 2}
                                        onChange={(e) => (setValor(Number(e.currentTarget.value)))}
                                    >
                                        <RemoveIcon />
                                    </ToggleButton>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </DialogContent>
                    <DialogActions>
                        <Col>
                            <Button className="btn btn-danger" onClick={onClose}>Cancelar</Button>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button className="  btn btn-success" type="submit">Salvar</Button>
                        </Col>
                    </DialogActions>
                </Form>
            </Dialog>
        </>
    );
}

