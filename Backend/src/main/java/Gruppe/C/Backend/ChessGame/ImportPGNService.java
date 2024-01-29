package Gruppe.C.Backend.ChessGame;


import Gruppe.C.Backend.User.User;
import Gruppe.C.Backend.User.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ImportPGNService {
    private final ImportPGNRepository importPGNRepository;
    private final UserRepository userRepository;

    public ImportPGNService(ImportPGNRepository importPGNRepository, UserRepository userRepository) {
        this.importPGNRepository = importPGNRepository;
        this.userRepository = userRepository;
    }

    public Boolean importPGN(String pgn, Long id) {
        User user = userRepository.getUserById(id);
        ImportPGN neuesPGN=new ImportPGN();
        neuesPGN.setPGN(pgn);
        neuesPGN.setUser(user);
        importPGNRepository.save(neuesPGN);
        return true;
    }

    public List<String> listPGN(Long UserId) {
        User user = userRepository.getUserById(UserId);
        List<String> listPGN = new ArrayList<>();
        List<ImportPGN> pgn = importPGNRepository.findAllByUser(user);
        for(ImportPGN importPGN : pgn) {
            listPGN.add(importPGN.getPGN());
        }
        //listPGN.add(importPGNRepository.findByUserId(UserId));
        return  listPGN;

    }
}
