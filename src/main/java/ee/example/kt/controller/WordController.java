package ee.example.kt.controller;

import ee.example.kt.entity.Word;
import ee.example.kt.repository.WordRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/words")
@Transactional
public class WordController {
    @Autowired
    WordRepository wordRepository;


    @GetMapping
    public List<Word> getAllWords() {
        return wordRepository.findAll();
    }

    @PostMapping
    public Word addWord(@RequestBody Word word) {
        if (word.getDescription() == null) {
            throw new RuntimeException("ERROR_WORD_IS_NOT_FOUND");
        }
        return wordRepository.save(word);
    }

    @GetMapping("/{id}")
    public Word getWorById(@PathVariable Long id) {
        return wordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ERROR_WORD_IS_NOT_FOUND"));
    }

    @DeleteMapping("/{id}")
    public List<Word> deleteWordById(@PathVariable Long id) {
        if (!wordRepository.existsById(id)) {
            throw new RuntimeException("ERROR_WORD_IS_NOT_FOUND");
        } else {
            wordRepository.deleteById(id);
            return wordRepository.findAll();
        }
    }

    @PutMapping("/{id}")
    public Word updateWord(@PathVariable Long id, @RequestBody Word updatedWord) {
        Word word = wordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ERROR_WORD_IS_NOT_FOUND"));
        if (updatedWord.getDescription() == null) {
            throw new RuntimeException("ERROR_DESCRIPTION_IS_MISSING");
        }
        word.setDescription(updatedWord.getDescription());
        word.setType(updatedWord.getType());

        Word savedWord = wordRepository.save(word);

        return savedWord;

    }
    @GetMapping("/words-pageable")
    public Page<Word> findByType(@RequestParam String type, Pageable pageable) {
        if ("ALL".equalsIgnoreCase(type)) {
            return wordRepository.findAll(pageable);
        } else {
            return wordRepository.findByType(type, pageable);
        }
    }


}