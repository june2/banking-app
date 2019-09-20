package com.banking.api.api.utilization.repository;

import com.banking.api.api.utilization.model.Utilization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilizationRepository extends JpaRepository<Utilization, Long> {

}
