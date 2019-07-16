package br.com.transporatadora.repository;

import br.com.transporatadora.domain.Tabela1;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Tabela1 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Tabela1Repository extends JpaRepository<Tabela1, Long> {

}
