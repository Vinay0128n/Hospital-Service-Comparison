package com.hospital.comparison.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                    "https://sage-figolla-1caa58.netlify.app",
                    "https://localhost:3000",
                    "https://localhost:3001"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .exposedHeaders("Content-Type", "Authorization")
                .maxAge(3600);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Allow specific origins
        List<String> allowedOrigins = Arrays.asList(
            "https://sage-figolla-1caa58.netlify.app",
            "https://localhost:3000",
            "https://localhost:3001"
        );
        configuration.setAllowedOrigins(allowedOrigins);
        
        // Allow specific methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Allow all headers
        configuration.setAllowedHeaders(Arrays.asList("*"));
        
        // Allow credentials
        configuration.setAllowCredentials(true);
        
        // Expose specific headers
        configuration.setExposedHeaders(Arrays.asList("Content-Type", "Authorization"));
        
        // Set max age
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        
        return source;
    }
}
