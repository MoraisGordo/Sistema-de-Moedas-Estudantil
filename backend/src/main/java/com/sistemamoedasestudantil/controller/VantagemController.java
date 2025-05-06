package com.sistemamoedasestudantil.controller;

import com.sistemamoedasestudantil.model.Vantagem;
import com.sistemamoedasestudantil.repository.VantagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/vantagens")
public class VantagemController {

    @Autowired
    private VantagemRepository vantagemRepository;

    @GetMapping
    public List<Vantagem> listarTodas() {
        return vantagemRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vantagem> buscarPorId(@PathVariable Long id) {
        Optional<Vantagem> vantagem = vantagemRepository.findById(id);
        return vantagem.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Vantagem criar(@RequestBody Vantagem vantagem) {
        return vantagemRepository.save(vantagem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vantagem> atualizar(@PathVariable Long id, @RequestBody Vantagem vantagemAtualizada) {
        return vantagemRepository.findById(id).map(vantagem -> {
            vantagem.setDescricao(vantagemAtualizada.getDescricao());
            vantagem.setCustoEmMoedas(vantagemAtualizada.getCustoEmMoedas());
            vantagem.setFoto(vantagemAtualizada.getFoto());
            Vantagem vantagemSalva = vantagemRepository.save(vantagem);
            return ResponseEntity.ok(vantagemSalva);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (vantagemRepository.existsById(id)) {
            vantagemRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}