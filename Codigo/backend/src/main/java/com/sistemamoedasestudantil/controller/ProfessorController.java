package com.sistemamoedasestudantil.controller;

import com.sistemamoedasestudantil.model.Professor;
import com.sistemamoedasestudantil.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/professores")
public class ProfessorController {

    @Autowired
    private ProfessorRepository professorRepository;

    @GetMapping
    public List<Professor> listarTodos() {
        return professorRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Professor> buscarPorId(@PathVariable Long id) {
        Optional<Professor> professor = professorRepository.findById(id);
        return professor.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Professor criar(@RequestBody Professor professor) {
        return professorRepository.save(professor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Professor> atualizar(@PathVariable Long id, @RequestBody Professor professorAtualizado) {
        return professorRepository.findById(id).map(professor -> {
            professor.setNome(professorAtualizado.getNome());
            professor.setEmail(professorAtualizado.getEmail());
            professor.setCpf(professorAtualizado.getCpf());
            professor.setSenha(professorAtualizado.getSenha());
            professor.setDepartamento(professorAtualizado.getDepartamento());
            professor.setSaldoMoedas(professorAtualizado.getSaldoMoedas());
            Professor professorSalvo = professorRepository.save(professor);
            return ResponseEntity.ok(professorSalvo);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (professorRepository.existsById(id)) {
            professorRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
