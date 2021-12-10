package org.mus.rest.controllers;

import org.mus.rest.exception.laptop.not.found.LaptopNotFoundException;
import org.mus.rest.models.Laptop;
import org.mus.rest.service.LaptopService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import javax.validation.Valid;
import org.slf4j.Logger;

import java.util.List;

@RestController
@RequestMapping(path = "/checklist")

public class LaptopController {

    private static final Logger LOGGER = LoggerFactory.getLogger(LaptopController.class);

    @Autowired
    private LaptopService laptopService;

    @PostMapping
    public ResponseEntity<Laptop> createLaptop(@Valid @RequestBody final Laptop laptop) {
        LOGGER.info("Added new laptop");
        System.out.println(laptop);
        return new ResponseEntity<Laptop>(laptopService.addLaptop(laptop), HttpStatus.OK);
    }

    @PutMapping(path = "/{id}" ,consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Laptop> updateLaptop(
            @PathVariable("id") final int id,
            @Valid @RequestBody final Laptop laptop) {

        if (laptopService.getLaptopById(id) == null) {
            LOGGER.error("Can't put(updateLaptop) an farm with non-existing id: " + id);
            throw new LaptopNotFoundException("Can't put(updateLaptop) an farm with non-existing id: " + id);
        }
        LOGGER.info("Successfully updated laptop with id: " + id);
        laptop.setId(id);
        return new ResponseEntity<Laptop>(laptopService.updateLaptop(laptop), HttpStatus.OK);

    }

    @GetMapping
    public ResponseEntity<List<Laptop>> getLaptops() {
        LOGGER.info("Gave away all Laptop");
        return new ResponseEntity<List<Laptop>>(laptopService.getLaptop(), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Laptop> getLaptop(@PathVariable(name = "id") final Integer id) {
        if (laptopService.getLaptopById(id) == null) {
            LOGGER.error("Can't get(getLaptop) an circus with non-existing id: " + id);
            throw new LaptopNotFoundException("Can't get(getLaptop) an laptop with non-existing id: " + id);
        }
        LOGGER.info("Successfully get an laptop with id: " + id);
        return new ResponseEntity<Laptop>(laptopService.getLaptopById(id), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Laptop> deleteLaptopById(@PathVariable("id") final Integer id) {
        if (laptopService.getLaptopById(id) == null) {
            LOGGER.error("Can't delete(deleteLaptopById) an laptop with non-existing id: " + id);
            throw new LaptopNotFoundException("Can't delete(deleteLaptopById) an circus with non-existing id: " + id);
        }
        LOGGER.info("Successfully deleted laptop with id: " + id);
        laptopService.deleteLaptopById(id);
        return ResponseEntity.noContent().build();
    }

}
