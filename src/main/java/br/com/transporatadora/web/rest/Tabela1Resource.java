package br.com.transporatadora.web.rest;

import br.com.transporatadora.domain.Tabela1;
import br.com.transporatadora.repository.Tabela1Repository;
import br.com.transporatadora.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.com.transporatadora.domain.Tabela1}.
 */
@RestController
@RequestMapping("/api")
public class Tabela1Resource {

    private final Logger log = LoggerFactory.getLogger(Tabela1Resource.class);

    private static final String ENTITY_NAME = "tabela1";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Tabela1Repository tabela1Repository;

    public Tabela1Resource(Tabela1Repository tabela1Repository) {
        this.tabela1Repository = tabela1Repository;
    }

    /**
     * {@code POST  /tabela-1-s} : Create a new tabela1.
     *
     * @param tabela1 the tabela1 to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tabela1, or with status {@code 400 (Bad Request)} if the tabela1 has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tabela-1-s")
    public ResponseEntity<Tabela1> createTabela1(@RequestBody Tabela1 tabela1) throws URISyntaxException {
        log.debug("REST request to save Tabela1 : {}", tabela1);
        if (tabela1.getId() != null) {
            throw new BadRequestAlertException("A new tabela1 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tabela1 result = tabela1Repository.save(tabela1);
        return ResponseEntity.created(new URI("/api/tabela-1-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tabela-1-s} : Updates an existing tabela1.
     *
     * @param tabela1 the tabela1 to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tabela1,
     * or with status {@code 400 (Bad Request)} if the tabela1 is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tabela1 couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tabela-1-s")
    public ResponseEntity<Tabela1> updateTabela1(@RequestBody Tabela1 tabela1) throws URISyntaxException {
        log.debug("REST request to update Tabela1 : {}", tabela1);
        if (tabela1.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tabela1 result = tabela1Repository.save(tabela1);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tabela1.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tabela-1-s} : get all the tabela1S.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tabela1S in body.
     */
    @GetMapping("/tabela-1-s")
    public ResponseEntity<List<Tabela1>> getAllTabela1S(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Tabela1S");
        Page<Tabela1> page = tabela1Repository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /tabela-1-s/:id} : get the "id" tabela1.
     *
     * @param id the id of the tabela1 to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tabela1, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tabela-1-s/{id}")
    public ResponseEntity<Tabela1> getTabela1(@PathVariable Long id) {
        log.debug("REST request to get Tabela1 : {}", id);
        Optional<Tabela1> tabela1 = tabela1Repository.findById(id);
        return ResponseUtil.wrapOrNotFound(tabela1);
    }

    /**
     * {@code DELETE  /tabela-1-s/:id} : delete the "id" tabela1.
     *
     * @param id the id of the tabela1 to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tabela-1-s/{id}")
    public ResponseEntity<Void> deleteTabela1(@PathVariable Long id) {
        log.debug("REST request to delete Tabela1 : {}", id);
        tabela1Repository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
