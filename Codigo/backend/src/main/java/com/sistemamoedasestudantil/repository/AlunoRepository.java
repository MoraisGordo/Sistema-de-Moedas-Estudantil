package com.sistemamoedasestudantil.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sistemamoedasestudantil.model.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    Aluno findByEmail(String email);
}

