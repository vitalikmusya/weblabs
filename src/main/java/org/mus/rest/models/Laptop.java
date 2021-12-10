package org.mus.rest.models;

import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.*;

@Setter
@Getter
@NoArgsConstructor
@Entity

public class Laptop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "Missing name")
    @Size(min=0, max=32)
    private String name;

    @NotNull(message = "Missing price")
    @Min(0)
    @Max(999999)
    private float price;

    @NotNull(message = "Missing weight_kg")
    @Min(0)
    @Max(999999)
    private float weight_kg;

    private String item_type;

    @NotNull(message = "Missing item_count")
    @Min(0)
    @Max(999999)
    private int item_count;

    public Laptop(Integer id, String name, float price, float weight_kg, String type, int item_count) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.weight_kg = weight_kg;
        this.item_type = type;
        this.item_count = item_count;
    }

    public String objToString() {
        return "________________________"
                + "\n|Name: " + name
                + "|\n|price: " + price
                + "|\n|weight_kg: " + weight_kg
                + "|\n|type " + item_type
                + "|\n|item_count " + item_count;
    }

    @Override
    public String toString() {
        return objToString() + "|\n________________________\n";
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public void setWeight_kg(float weight_kg) {
        this.weight_kg = weight_kg;
    }

    public void setItem_type(String item_type) {
        this.item_type = item_type;
    }

    public void setItem_count(int item_count) {
        this.item_count = item_count;
    }
}
