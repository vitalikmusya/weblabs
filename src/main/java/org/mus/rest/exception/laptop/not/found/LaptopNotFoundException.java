package org.mus.rest.exception.laptop.not.found;

public class LaptopNotFoundException extends RuntimeException{

    public LaptopNotFoundException(final String message) {
        super(message);
    }

    public LaptopNotFoundException(final String message, final Throwable cause) {
        super(message, cause);
    }
}
