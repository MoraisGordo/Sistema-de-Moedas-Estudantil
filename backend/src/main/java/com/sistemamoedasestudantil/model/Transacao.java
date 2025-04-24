package com.sistemamoedasestudantil.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class Transacao {
    private UUID id;
    private LocalDateTime data;
    private String descricao;
    private int quantidade;
    private TipoTransacao tipo;
    private Pessoa origem;
    private Object destino; // Pessoa ou EmpresaParceira

    public String getDescricao() {
        return descricao;
    }

    public Object getDestino() {
        return destino;
    }
    
    public UUID getId() {
        return id;
    }

    public Pessoa getOrigem() {
        return origem;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public TipoTransacao getTipo() {
        return tipo;
    }

}

