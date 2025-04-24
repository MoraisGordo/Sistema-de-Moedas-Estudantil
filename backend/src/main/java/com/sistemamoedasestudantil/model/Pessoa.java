package com.sistemamoedasestudantil.model;

public abstract class Pessoa {
    protected String nome;
    protected String email;
    protected String cpf;
    protected String senha;

    public boolean autenticar(String email, String senha) {
        return this.email.equals(email) && this.senha.equals(senha);
    }
}
