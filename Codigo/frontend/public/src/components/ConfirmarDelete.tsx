import { Dialog, DialogActions, DialogTitle, DialogContent } from "@mui/material";
import { Col, Form, Button, Row } from "react-bootstrap";

export default function ConfirmarDelete({ title, id, open, onClose, onSubmitValue, mensagem }: any) {

    function handleDelete(event: any) {
        event.preventDefault()
        onSubmitValue(id)
    }

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <Form className=" w-200" onSubmit={handleDelete}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent> {mensagem}</DialogContent>
                    <DialogActions>
                        <Col>
                            <Button className="btn btn-success" onClick={onClose}>Cancelar</Button>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button className=" btn btn-danger" type="submit">Deletar</Button>
                        </Col>
                    </DialogActions>
                </Form>
            </Dialog>
        </>
    );
}

