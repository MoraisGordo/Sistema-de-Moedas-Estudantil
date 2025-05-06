package com.sistemamoedasestudantil.model;

import java.time.LocalDateTime;

public class Cupom {
    private String codigo;
    private LocalDateTime dataGeracao;

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public LocalDateTime getDataGeracao() {
        return dataGeracao;
    }

    public void setDataGeracao(LocalDateTime dataGeracao) {
        this.dataGeracao = dataGeracao;
    }

}
