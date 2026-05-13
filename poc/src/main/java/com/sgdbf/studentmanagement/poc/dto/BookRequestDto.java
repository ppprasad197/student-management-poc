package com.sgdbf.studentmanagement.poc.dto;

public class BookRequestDto {
    String title;
    private String author;
    private String category;
    private String description;
    private boolean available;
    int quantity;

    public BookRequestDto() {
    }

    public BookRequestDto(String title, String author, String category, String description, boolean available, int quantity) {
        this.title = title;
        this.author = author;
        this.category = category;
        this.description = description;
        this.available = available;
        this.quantity = quantity;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
