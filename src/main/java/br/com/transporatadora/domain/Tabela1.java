package br.com.transporatadora.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Tabela1.
 */
@Entity
@Table(name = "tabela1")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Tabela1 implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "point_id")
    private String point_id;

    @Column(name = "date_visit")
    private LocalDate date_visit;

    @Column(name = "max_pdop")
    private Double max_pdop;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPoint_id() {
        return point_id;
    }

    public Tabela1 point_id(String point_id) {
        this.point_id = point_id;
        return this;
    }

    public void setPoint_id(String point_id) {
        this.point_id = point_id;
    }

    public LocalDate getDate_visit() {
        return date_visit;
    }

    public Tabela1 date_visit(LocalDate date_visit) {
        this.date_visit = date_visit;
        return this;
    }

    public void setDate_visit(LocalDate date_visit) {
        this.date_visit = date_visit;
    }

    public Double getMax_pdop() {
        return max_pdop;
    }

    public Tabela1 max_pdop(Double max_pdop) {
        this.max_pdop = max_pdop;
        return this;
    }

    public void setMax_pdop(Double max_pdop) {
        this.max_pdop = max_pdop;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tabela1)) {
            return false;
        }
        return id != null && id.equals(((Tabela1) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Tabela1{" +
            "id=" + getId() +
            ", point_id='" + getPoint_id() + "'" +
            ", date_visit='" + getDate_visit() + "'" +
            ", max_pdop=" + getMax_pdop() +
            "}";
    }
}
