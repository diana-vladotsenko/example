package ee.example.kt.repository;

import ee.example.kt.entity.Word;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List; // ✅ You need this import

public interface WordRepository extends JpaRepository<Word, Long> {
    Page<Word> findByType(String type, Pageable pageable);
    List<Word> findByAdminId(Long adminId);
}
