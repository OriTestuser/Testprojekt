package Gruppe.C.Backend.Services;

import Gruppe.C.Backend.User.User;
import Gruppe.C.Backend.User.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class Cookies extends HttpServlet {

   /* public void service(HttpServletRequest request, HttpServletResponse response, User user) throws ServletException, IOException {

        Cookie loginCookie = new Cookie("username", user.getEmail());
        loginCookie.setMaxAge(3600);
        response.addCookie(loginCookie);

        Cookie[] cookies = request.getCookies();
        String email = null;

        if(cookies != null){
            for(Cookie cookie : cookies){
                if(cookie.getName().equals("username")){
                    email = cookie.getValue();
                }
            }
        }

        if(email != null && email.equals(user.getEmail())){
            System.out.println("Benutzer ist angemeldet");
        }

        else{
            System.out.println("Der Nutzer ist noch nicht angemeldet");
        }

    }

    */


}
