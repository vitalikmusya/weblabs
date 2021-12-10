package org.mus.rest.service;

import org.mus.rest.dal.LaptopRepository;
import org.mus.rest.models.Laptop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.annotation.ApplicationScope;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@ApplicationScope
public class LaptopService {

    @Autowired
    private LaptopRepository laptopRepository;

    public Laptop addLaptop(final Laptop laptop) {
        return laptopRepository.save(laptop);
    }

    public Laptop updateLaptop(final Laptop laptop) {
        return laptopRepository.save(laptop);
    }

    public List<Laptop> getLaptop() {
        return laptopRepository.findAll();
    }

    public Laptop getLaptopById(final Integer id) {
        return laptopRepository.findById(id).orElse(null);
    }

    public void deleteLaptopById(final Integer id) {
        laptopRepository.deleteById(id);
    }
}
