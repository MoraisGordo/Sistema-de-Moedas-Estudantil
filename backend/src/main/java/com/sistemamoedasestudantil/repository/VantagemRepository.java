package com.sistemamoedasestudantil.repository;

import com.sistemamoedasestudantil.model.Vantagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VantagemRepository extends JpaRepository<Vantagem, Long> {
   
}