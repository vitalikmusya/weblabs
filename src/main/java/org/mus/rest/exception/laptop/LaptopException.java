package org.mus.rest.exception.laptop;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

@AllArgsConstructor
@Getter
public class LaptopException {
    private final String message;
    private final HttpStatus httpStatus;
    private final ZonedDateTime timeStamp;
}
