package com.sistemamoedasestudantil.model;

public class Aluno extends Pessoa {
    private String rg;
    private String endereco;
    private String curso;
    private int saldoMoedas;

    public void trocarMoedas(Vantagem v) {
        if (saldoMoedas >= v.getCustoEmMoedas()) {
            saldoMoedas -= v.getCustoEmMoedas();
        }
    }

    public void adicionarMoedas(int quantidade) {
        if (quantidade > 0) {
            saldoMoedas += quantidade;
        } else {
            throw new IllegalArgumentException("Quantidade inválida de moedas.");
        }
    }

    public void removerMoedas(int quantidade) {
        if (quantidade > 0 && quantidade <= saldoMoedas) {
            saldoMoedas -= quantidade;
        } else {
            throw new IllegalArgumentException("Quantidade inválida de moedas.");
        }
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }

    public int getSaldoMoedas() {
        return saldoMoedas;
    }

    public void setSaldoMoedas(int saldoMoedas) {
        this.saldoMoedas = saldoMoedas;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }

}
