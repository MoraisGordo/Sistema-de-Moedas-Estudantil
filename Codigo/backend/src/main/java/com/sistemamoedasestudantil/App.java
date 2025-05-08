package com.sistemamoedasestudantil;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class App 
{
    public static void main( String[] args )
    {
        SpringApplication.run(App.class, args);
    }

       public WebMvcConfigurer corsConfigurer() {
       return new WebMvcConfigurer() {
           @Override
           public void addCorsMappings(CorsRegistry registry) {
               registry.addMapping("/**").allowedOrigins("http://localhost:lalalalalalallalala");
           }
       };
   }

}