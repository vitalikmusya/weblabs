package org.mus.rest.exception.laptop.not.found;

import org.mus.rest.exception.laptop.LaptopException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@ControllerAdvice
public class LaptopNotFoundExceptionHandler {
    @ExceptionHandler(LaptopNotFoundException.class)
    public ResponseEntity<Object> handleFarmNotFoundException(final LaptopNotFoundException e) {
        LaptopException farmException = new LaptopException(
                e.getMessage(),
                HttpStatus.NOT_FOUND,
                ZonedDateTime.now(ZoneId.of("Z"))
        );
        return new ResponseEntity<>(farmException, HttpStatus.NOT_FOUND);
    }
}
