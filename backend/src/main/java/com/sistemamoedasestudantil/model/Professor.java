package com.sistemamoedasestudantil.model;

public class Professor extends Pessoa {
    private String departamento;
    private int saldoMoedas;

    public void enviarMoedas(Aluno aluno, int quantidade, String mensagem) {
        if (quantidade > 0 && quantidade <= saldoMoedas) {
            aluno.adicionarMoedas(quantidade);
            saldoMoedas -= quantidade;
        } else {
            throw new IllegalArgumentException("Quantidade inválida de moedas.");
        }
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public int getSaldoMoedas() {
        return saldoMoedas;
    }

    public void setSaldoMoedas(int saldoMoedas) {
        this.saldoMoedas = saldoMoedas;
    }

}

