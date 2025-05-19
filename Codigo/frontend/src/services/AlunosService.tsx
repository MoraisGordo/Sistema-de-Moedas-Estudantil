import api from "./api";

export const getAlunos = async () => {
    try {
        const response = await api.get("/alunos");
        return response.data;
    } catch (error) {
        console.error("Error buscando alunos:", error);
        throw error;
    }
};
export const getAlunoPorId = async (id: number) => {
    try {
        const response = await api.get(`/alunos/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error buscando o aluno:", error);
        throw error;
    }
}
export const postAluno = async (aluno: AlunoPayload) => {
    try {
        const response = await api.post("/alunos", aluno);
        return response.data;
    } catch (error) {
        console.error("Error criando o aluno:", error);
        throw error;
    }
}
export const updateAluno = async (id: number, aluno: AlunoPayload) => {
    try {
        const response = await api.put(`/alunos/${id}`, aluno);
        return response.data;
    } catch (error) {
        console.error("Error atualizando o aluno:", error);
        throw error;
    }
}
export const deleteAluno = async (id: number) => {
    try {
        const response = await api.delete(`/alunos/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deletando o aluno:", error);
        throw error;
    }
}