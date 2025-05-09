package ee.example.kt.controller;

import ee.example.kt.entity.Admin;
import ee.example.kt.entity.Word;
import ee.example.kt.repository.AdminRepository;
import ee.example.kt.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admins")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    AdminRepository adminRepository;

    @Autowired
    WordRepository wordRepository;

    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @GetMapping("/{id}")
    public Admin getAdminById(@PathVariable Long id) {
        return adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ERROR_ADMIN_NOT_FOUND"));
    }

    @GetMapping("/{id}/words")
    public List<Word> getWordsByAdmin(@PathVariable Long id) {
        return wordRepository.findByAdminId(id);
    }

    @PostMapping
    public Admin addAdmin(@RequestBody Admin admin) {
        return adminRepository.save(admin);
    }
}
