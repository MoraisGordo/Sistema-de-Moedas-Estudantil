package com.sistemamoedasestudantil.controller;

import com.sistemamoedasestudantil.model.Transacao;
import com.sistemamoedasestudantil.repository.TransacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/transacoes")
public class TransacaoController {

    @Autowired
    private TransacaoRepository transacaoRepository;

    @GetMapping
    public List<Transacao> listarTodas() {
        return transacaoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transacao> buscarPorId(@PathVariable UUID id) {
        Optional<Transacao> transacao = transacaoRepository.findById(id);
        return transacao.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Transacao criar(@RequestBody Transacao transacao) {
        return transacaoRepository.save(transacao);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transacao> atualizar(@PathVariable UUID id, @RequestBody Transacao transacaoAtualizada) {
        return transacaoRepository.findById(id).map(transacao -> {
            transacao.setData(transacaoAtualizada.getData());
            transacao.setDescricao(transacaoAtualizada.getDescricao());
            transacao.setQuantidade(transacaoAtualizada.getQuantidade());
            transacao.setTipo(transacaoAtualizada.getTipo());
            transacao.setOrigem(transacaoAtualizada.getOrigem());
            transacao.setDestino(transacaoAtualizada.getDestino());
            Transacao transacaoSalva = transacaoRepository.save(transacao);
            return ResponseEntity.ok(transacaoSalva);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        if (transacaoRepository.existsById(id)) {
            transacaoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
