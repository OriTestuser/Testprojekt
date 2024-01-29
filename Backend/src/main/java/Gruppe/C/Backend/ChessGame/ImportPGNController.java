package Gruppe.C.Backend.ChessGame;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ImportPGN")
@CrossOrigin("*")
public class ImportPGNController {
    @Autowired
    private ImportPGNService importPGNService;

    public ImportPGNController (ImportPGNService importPGNService){
        this.importPGNService=importPGNService;
    }
    @PostMapping("/importPGN")
    public ResponseEntity<Boolean> importPGN(@RequestParam("PGN")String PGN,@RequestParam("UserID")Long id){
        return ResponseEntity.ok(importPGNService.importPGN(PGN,id));
    }
    @GetMapping("/listPGN")
    public ResponseEntity<List<String>> listPGN(@RequestParam("User")Long id){
        return ResponseEntity.ok(importPGNService.listPGN(id));
    }



}
