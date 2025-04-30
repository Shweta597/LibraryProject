
package com.shwetashaw.librarysystem.repository;

import com.shwetashaw.librarysystem.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<AppUser, String> {
    AppUser findByEmail(String email);
}
