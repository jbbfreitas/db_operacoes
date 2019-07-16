package br.com.transporatadora.web.rest;

import br.com.transporatadora.DbOperacoesApp;
import br.com.transporatadora.domain.Tabela1;
import br.com.transporatadora.repository.Tabela1Repository;
import br.com.transporatadora.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static br.com.transporatadora.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link Tabela1Resource} REST controller.
 */
@SpringBootTest(classes = DbOperacoesApp.class)
public class Tabela1ResourceIT {

    private static final String DEFAULT_POINT_ID = "AAAAAAAAAA";
    private static final String UPDATED_POINT_ID = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_VISIT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_VISIT = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_MAX_PDOP = 1D;
    private static final Double UPDATED_MAX_PDOP = 2D;

    @Autowired
    private Tabela1Repository tabela1Repository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTabela1MockMvc;

    private Tabela1 tabela1;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Tabela1Resource tabela1Resource = new Tabela1Resource(tabela1Repository);
        this.restTabela1MockMvc = MockMvcBuilders.standaloneSetup(tabela1Resource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tabela1 createEntity(EntityManager em) {
        Tabela1 tabela1 = new Tabela1()
            .point_id(DEFAULT_POINT_ID)
            .date_visit(DEFAULT_DATE_VISIT)
            .max_pdop(DEFAULT_MAX_PDOP);
        return tabela1;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tabela1 createUpdatedEntity(EntityManager em) {
        Tabela1 tabela1 = new Tabela1()
            .point_id(UPDATED_POINT_ID)
            .date_visit(UPDATED_DATE_VISIT)
            .max_pdop(UPDATED_MAX_PDOP);
        return tabela1;
    }

    @BeforeEach
    public void initTest() {
        tabela1 = createEntity(em);
    }

    @Test
    @Transactional
    public void createTabela1() throws Exception {
        int databaseSizeBeforeCreate = tabela1Repository.findAll().size();

        // Create the Tabela1
        restTabela1MockMvc.perform(post("/api/tabela-1-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tabela1)))
            .andExpect(status().isCreated());

        // Validate the Tabela1 in the database
        List<Tabela1> tabela1List = tabela1Repository.findAll();
        assertThat(tabela1List).hasSize(databaseSizeBeforeCreate + 1);
        Tabela1 testTabela1 = tabela1List.get(tabela1List.size() - 1);
        assertThat(testTabela1.getPoint_id()).isEqualTo(DEFAULT_POINT_ID);
        assertThat(testTabela1.getDate_visit()).isEqualTo(DEFAULT_DATE_VISIT);
        assertThat(testTabela1.getMax_pdop()).isEqualTo(DEFAULT_MAX_PDOP);
    }

    @Test
    @Transactional
    public void createTabela1WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tabela1Repository.findAll().size();

        // Create the Tabela1 with an existing ID
        tabela1.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTabela1MockMvc.perform(post("/api/tabela-1-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tabela1)))
            .andExpect(status().isBadRequest());

        // Validate the Tabela1 in the database
        List<Tabela1> tabela1List = tabela1Repository.findAll();
        assertThat(tabela1List).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTabela1S() throws Exception {
        // Initialize the database
        tabela1Repository.saveAndFlush(tabela1);

        // Get all the tabela1List
        restTabela1MockMvc.perform(get("/api/tabela-1-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tabela1.getId().intValue())))
            .andExpect(jsonPath("$.[*].point_id").value(hasItem(DEFAULT_POINT_ID.toString())))
            .andExpect(jsonPath("$.[*].date_visit").value(hasItem(DEFAULT_DATE_VISIT.toString())))
            .andExpect(jsonPath("$.[*].max_pdop").value(hasItem(DEFAULT_MAX_PDOP.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getTabela1() throws Exception {
        // Initialize the database
        tabela1Repository.saveAndFlush(tabela1);

        // Get the tabela1
        restTabela1MockMvc.perform(get("/api/tabela-1-s/{id}", tabela1.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tabela1.getId().intValue()))
            .andExpect(jsonPath("$.point_id").value(DEFAULT_POINT_ID.toString()))
            .andExpect(jsonPath("$.date_visit").value(DEFAULT_DATE_VISIT.toString()))
            .andExpect(jsonPath("$.max_pdop").value(DEFAULT_MAX_PDOP.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTabela1() throws Exception {
        // Get the tabela1
        restTabela1MockMvc.perform(get("/api/tabela-1-s/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTabela1() throws Exception {
        // Initialize the database
        tabela1Repository.saveAndFlush(tabela1);

        int databaseSizeBeforeUpdate = tabela1Repository.findAll().size();

        // Update the tabela1
        Tabela1 updatedTabela1 = tabela1Repository.findById(tabela1.getId()).get();
        // Disconnect from session so that the updates on updatedTabela1 are not directly saved in db
        em.detach(updatedTabela1);
        updatedTabela1
            .point_id(UPDATED_POINT_ID)
            .date_visit(UPDATED_DATE_VISIT)
            .max_pdop(UPDATED_MAX_PDOP);

        restTabela1MockMvc.perform(put("/api/tabela-1-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTabela1)))
            .andExpect(status().isOk());

        // Validate the Tabela1 in the database
        List<Tabela1> tabela1List = tabela1Repository.findAll();
        assertThat(tabela1List).hasSize(databaseSizeBeforeUpdate);
        Tabela1 testTabela1 = tabela1List.get(tabela1List.size() - 1);
        assertThat(testTabela1.getPoint_id()).isEqualTo(UPDATED_POINT_ID);
        assertThat(testTabela1.getDate_visit()).isEqualTo(UPDATED_DATE_VISIT);
        assertThat(testTabela1.getMax_pdop()).isEqualTo(UPDATED_MAX_PDOP);
    }

    @Test
    @Transactional
    public void updateNonExistingTabela1() throws Exception {
        int databaseSizeBeforeUpdate = tabela1Repository.findAll().size();

        // Create the Tabela1

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTabela1MockMvc.perform(put("/api/tabela-1-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tabela1)))
            .andExpect(status().isBadRequest());

        // Validate the Tabela1 in the database
        List<Tabela1> tabela1List = tabela1Repository.findAll();
        assertThat(tabela1List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTabela1() throws Exception {
        // Initialize the database
        tabela1Repository.saveAndFlush(tabela1);

        int databaseSizeBeforeDelete = tabela1Repository.findAll().size();

        // Delete the tabela1
        restTabela1MockMvc.perform(delete("/api/tabela-1-s/{id}", tabela1.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Tabela1> tabela1List = tabela1Repository.findAll();
        assertThat(tabela1List).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tabela1.class);
        Tabela1 tabela11 = new Tabela1();
        tabela11.setId(1L);
        Tabela1 tabela12 = new Tabela1();
        tabela12.setId(tabela11.getId());
        assertThat(tabela11).isEqualTo(tabela12);
        tabela12.setId(2L);
        assertThat(tabela11).isNotEqualTo(tabela12);
        tabela11.setId(null);
        assertThat(tabela11).isNotEqualTo(tabela12);
    }
}
