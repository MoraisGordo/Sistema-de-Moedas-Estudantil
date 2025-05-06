package com.sistemamoedasestudantil.repository;

import com.sistemamoedasestudantil.model.TipoTransacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoTransacaoRepository extends JpaRepository<TipoTransacao, Long> {
    TipoTransacao findByNome(String nome); // Método para encontrar TipoTransacao pelo nome
}
