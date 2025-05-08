package com.sistemamoedasestudantil.repository;

import com.sistemamoedasestudantil.model.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, UUID> {
    // Transacao findByTipoTransacaoId(Long tipoTransacaoId);
    //não sei se ta funcionando, mas o findByTipoTransacaoId é um método que busca uma transação pelo id do tipo de transação associado a ela.
}
