package com.sistemamoedasestudantil.model;

public class Professor extends Pessoa {
    private String departamento;
    private int saldoMoedas;

    public void enviarMoedas(Aluno aluno, int quantidade, String mensagem) {
        if (quantidade > 0 && quantidade <= saldoMoedas) {
            aluno.adicionarMoedas(quantidade);
            saldoMoedas -= quantidade;
            // Aqui você pode adicionar lógica para registrar a transação ou enviar a mensagem
        } else {
            throw new IllegalArgumentException("Quantidade inválida de moedas.");
        }
    }

}

