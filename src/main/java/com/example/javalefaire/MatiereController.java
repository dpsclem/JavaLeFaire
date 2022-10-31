package com.example.javalefaire;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MatiereController {
    @RequestMapping("/application")
    public String Application(Model model){
        return "application";
    }
}
