package com.shwetashaw.librarysystem.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class AppUser {
    
    @Id
    private String email;
    private String name;
    private String password;

}
