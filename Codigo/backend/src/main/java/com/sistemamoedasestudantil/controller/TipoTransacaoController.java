package com.sistemamoedasestudantil.controller;

import com.sistemamoedasestudantil.model.TipoTransacao;
import com.sistemamoedasestudantil.repository.TipoTransacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tipostransacao")
public class TipoTransacaoController {

    @Autowired
    private TipoTransacaoRepository tipoTransacaoRepository;

    @GetMapping
    public List<TipoTransacao> listarTodos() {
        return tipoTransacaoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoTransacao> buscarPorId(@PathVariable Long id) {
        Optional<TipoTransacao> tipoTransacao = tipoTransacaoRepository.findById(id);
        return tipoTransacao.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public TipoTransacao criar(@RequestBody TipoTransacao tipoTransacao) {
        return tipoTransacaoRepository.save(tipoTransacao);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TipoTransacao> atualizar(@PathVariable Long id, @RequestBody TipoTransacao tipoTransacaoAtualizado) {
        return tipoTransacaoRepository.findById(id).map(tipoTransacao -> {
            tipoTransacao.setNome(tipoTransacaoAtualizado.getNome());
            tipoTransacao.setDescricao(tipoTransacaoAtualizado.getDescricao());
            TipoTransacao tipoTransacaoSalva = tipoTransacaoRepository.save(tipoTransacao);
            return ResponseEntity.ok(tipoTransacaoSalva);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (tipoTransacaoRepository.existsById(id)) {
            tipoTransacaoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
