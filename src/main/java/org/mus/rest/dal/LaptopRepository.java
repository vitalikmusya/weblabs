package org.mus.rest.dal;

import org.mus.rest.models.Laptop;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface LaptopRepository extends JpaRepository<Laptop,Integer> {

}
