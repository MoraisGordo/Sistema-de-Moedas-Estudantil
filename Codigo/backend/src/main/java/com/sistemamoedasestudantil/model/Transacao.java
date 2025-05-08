package com.sistemamoedasestudantil.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class Transacao {

    @Id
    @GeneratedValue
    private UUID id;

    private LocalDateTime data;
    private String descricao;
    private int quantidade;

    @ManyToOne
    private TipoTransacao tipo;

    @ManyToOne
    private Pessoa origem;

    @ManyToOne
    private Pessoa destino;

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public UUID getId() {
        return id;
    }

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public TipoTransacao getTipo() {
        return tipo;
    }

    public void setTipo(TipoTransacao tipo) {
        this.tipo = tipo;
    }

    public Pessoa getOrigem() {
        return origem;
    }

    public void setOrigem(Pessoa origem) {
        this.origem = origem;
    }

    public Pessoa getDestino() {
        return destino;
    }

    public void setDestino(Pessoa destino) {
        this.destino = destino;
    }
    
}

