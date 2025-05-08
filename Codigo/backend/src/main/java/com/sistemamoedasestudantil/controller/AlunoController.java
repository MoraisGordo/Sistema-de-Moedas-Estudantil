package com.sistemamoedasestudantil.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sistemamoedasestudantil.model.Aluno;
import com.sistemamoedasestudantil.repository.AlunoRepository;

import java.util.List;

@RestController
@RequestMapping("/alunos")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @GetMapping
    public List<Aluno> listarAlunos() {
        return alunoRepository.findAll();
    }

    @PostMapping
    public Aluno criarAluno(@RequestBody Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    @PostMapping("/login")
    public Aluno autenticar(@RequestBody Aluno loginData) {
        Aluno aluno = alunoRepository.findByEmail(loginData.getEmail());
        if (aluno != null && aluno.autenticar(loginData.getEmail(), loginData.getSenha())) {
            return aluno;
        }
        throw new RuntimeException("Autenticação falhou.");
    }
}

