package com.hospital.comparison.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AreaCoordinatesService {
    
    private final Map<String, Map<String, Double[]>> areaCoordinates = new HashMap<>();
    
    public AreaCoordinatesService() {
        // Pune areas
        Map<String, Double[]> puneAreas = new HashMap<>();
        puneAreas.put("koregaon park", new Double[]{18.5344, 73.8985});
        puneAreas.put("kothrud", new Double[]{18.5114, 73.8048});
        puneAreas.put("shivajinagar", new Double[]{18.5314, 73.8776});
        puneAreas.put("deccan", new Double[]{18.5166, 73.8562});
        puneAreas.put("camp", new Double[]{18.5294, 73.8745});
        puneAreas.put("viman nagar", new Double[]{18.5669, 73.9134});
        puneAreas.put("wakad", new Double[]{18.5994, 73.7743});
        puneAreas.put("hinjewadi", new Double[]{18.5921, 73.7399});
        puneAreas.put("baner", new Double[]{18.5646, 73.8057});
        puneAreas.put("pashan", new Double[]{18.5423, 73.8187});
        puneAreas.put("aundh", new Double[]{18.5636, 73.8082});
        puneAreas.put("balewadi", new Double[]{18.5846, 73.7840});
        puneAreas.put("magarpatta", new Double[]{18.5771, 73.9319});
        puneAreas.put("hadapsar", new Double[]{18.5139, 73.9317});
        puneAreas.put("kharadi", new Double[]{18.5570, 73.9376});
        puneAreas.put("vishrantwadi", new Double[]{18.5888, 73.8747});
        puneAreas.put("yerwada", new Double[]{18.5486, 73.8865});
        puneAreas.put("pimpri", new Double[]{18.6298, 73.8039});
        puneAreas.put("chinchwad", new Double[]{18.6295, 73.7997});
        puneAreas.put("new sangvi", new Double[]{18.6585, 73.8226});
        puneAreas.put("old sangvi", new Double[]{18.6416, 73.8164});
        puneAreas.put("nigdi", new Double[]{18.6474, 73.7578});
        puneAreas.put("akurdi", new Double[]{18.6476, 73.8275});
        puneAreas.put("bhosari", new Double[]{18.6846, 73.8562});
        puneAreas.put("moshi", new Double[]{18.6513, 73.8779});
        puneAreas.put("dhanori", new Double[]{18.5806, 73.9104});
        puneAreas.put("lohegaon", new Double[]{18.5666, 73.9258});
        puneAreas.put("wagholi", new Double[]{18.5537, 73.9231});
        puneAreas.put("manjri", new Double[]{18.5119, 73.9446});
        puneAreas.put("uruli kanchan", new Double[]{18.4256, 73.9286});
        puneAreas.put("lonikand", new Double[]{18.6705, 74.0433});
        puneAreas.put("shikrapur", new Double[]{18.5116, 74.0351});
        puneAreas.put("ravet", new Double[]{18.6425, 73.7683});
        puneAreas.put("punawale", new Double[]{18.6602, 73.7589});
        puneAreas.put("tathawade", new Double[]{18.6194, 73.7559});
        puneAreas.put("kivale", new Double[]{18.6069, 73.7448});
        puneAreas.put("mamurdi", new Double[]{18.6079, 73.7337});
        puneAreas.put("nande", new Double[]{18.5816, 73.7245});
        puneAreas.put("chakan", new Double[]{18.7597, 73.8547});
        puneAreas.put("rajgurunagar", new Double[]{18.8435, 73.8867});
        puneAreas.put("shirur", new Double[]{18.9841, 74.3619});
        puneAreas.put("jejuri", new Double[]{18.2789, 74.1667});
        puneAreas.put("daund", new Double[]{18.4675, 74.3139});
        puneAreas.put("baramati", new Double[]{18.1648, 74.5780});
        puneAreas.put("saspune", new Double[]{18.5304, 73.8550});
        puneAreas.put("kondhwa", new Double[]{18.4590, 73.8926});
        puneAreas.put("katraj", new Double[]{18.4589, 73.8652});
        puneAreas.put("ambegaon", new Double[]{18.4532, 73.8746});
        puneAreas.put("dhayari", new Double[]{18.4675, 73.8391});
        puneAreas.put("sinhagad road", new Double[]{18.5113, 73.8258});
        puneAreas.put("warje", new Double[]{18.4866, 73.8198});
        puneAreas.put("kondhwa budruk", new Double[]{18.4489, 73.8859});
        puneAreas.put("undri", new Double[]{18.4444, 73.9037});
        puneAreas.put("phursungi", new Double[]{18.5157, 73.9479});
        puneAreas.put("lullanagar", new Double[]{18.5139, 73.9042});
        puneAreas.put("kalyani nagar", new Double[]{18.5430, 73.9025});
        puneAreas.put("magarpatta city", new Double[]{18.5771, 73.9319});
        puneAreas.put("hadapsar industrial estate", new Double[]{18.5089, 73.9368});
        puneAreas.put("fadke mala", new Double[]{18.5114, 73.8562});
        puneAreas.put("prabhat road", new Double[]{18.5144, 73.8476});
        puneAreas.put("law college road", new Double[]{18.5149, 73.8378});
        puneAreas.put("senapati bapat road", new Double[]{18.5314, 73.8384});
        puneAreas.put("karve road", new Double[]{18.5136, 73.8229});
        puneAreas.put("jangli maharaj road", new Double[]{18.5186, 73.8549});
        puneAreas.put("fc road", new Double[]{18.5166, 73.8562});
        puneAreas.put("m g road", new Double[]{18.5166, 73.8562});
        
        // Mumbai areas
        Map<String, Double[]> mumbaiAreas = new HashMap<>();
        mumbaiAreas.put("bandra", new Double[]{19.0596, 72.8295});
        mumbaiAreas.put("kurla", new Double[]{19.0667, 72.8766});
        mumbaiAreas.put("andheri", new Double[]{19.1196, 72.8464});
        mumbaiAreas.put("borivali", new Double[]{19.2306, 72.8567});
        mumbaiAreas.put("dadar", new Double[]{19.0169, 72.8445});
        mumbaiAreas.put("churchgate", new Double[]{18.9330, 72.8263});
        mumbaiAreas.put("colaba", new Double[]{18.9047, 72.8148});
        mumbaiAreas.put("cuffe parade", new Double[]{18.9129, 72.8124});
        mumbaiAreas.put("worli", new Double[]{19.0170, 72.8156});
        mumbaiAreas.put("lower parel", new Double[]{19.0060, 72.8337});
        mumbaiAreas.put("mahim", new Double[]{19.0270, 72.8442});
        mumbaiAreas.put("matunga", new Double[]{19.0206, 72.8446});
        mumbaiAreas.put("sion", new Double[]{19.0410, 72.8555});
        mumbaiAreas.put("kurla", new Double[]{19.0667, 72.8766});
        mumbaiAreas.put("vidyavihar", new Double[]{19.0760, 72.8907});
        mumbaiAreas.put("ghatkopar", new Double[]{19.0821, 72.9085});
        mumbaiAreas.put("bhandup", new Double[]{19.1495, 72.9366});
        mumbaiAreas.put("nahur", new Double[]{19.1652, 72.9367});
        mumbaiAreas.put("mulund", new Double[]{19.1699, 72.9570});
        mumbaiAreas.put("thane", new Double[]{19.1882, 72.9780});
        mumbaiAreas.put("vashi", new Double[]{19.0760, 73.0798});
        mumbaiAreas.put("nerul", new Double[]{19.0461, 73.0198});
        mumbaiAreas.put("kharghar", new Double[]{19.0728, 73.0956});
        mumbaiAreas.put("panvel", new Double[]{18.9890, 73.1275});
        
        // Delhi areas
        Map<String, Double[]> delhiAreas = new HashMap<>();
        delhiAreas.put("connaught place", new Double[]{28.6304, 77.2177});
        delhiAreas.put("karol bagh", new Double[]{28.6520, 77.1903});
        delhiAreas.put("chandni chowk", new Double[]{28.6506, 77.2303});
        delhiAreas.put("daryaganj", new Double[]{28.6413, 77.2430});
        delhiAreas.put("lajpat nagar", new Double[]{28.5616, 77.2422});
        delhiAreas.put("south extension", new Double[]{28.5305, 77.2151});
        delhiAreas.put("greater kailash", new Double[]{28.5344, 77.2501});
        delhiAreas.put("hauz khas", new Double[]{28.5555, 77.2086});
        delhiAreas.put("green park", new Double[]{28.5465, 77.2108});
        delhiAreas.put("malviya nagar", new Double[]{28.5283, 77.2016});
        delhiAreas.put("saket", new Double[]{28.5279, 77.2069});
        delhiAreas.put("defence colony", new Double[]{28.5805, 77.2420});
        delhiAreas.put("lodi colony", new Double[]{28.5903, 77.2274});
        delhiAreas.put("kalkaji", new Double[]{28.5408, 77.2501});
        delhiAreas.put("okhla", new Double[]{28.5165, 77.2695});
        delhiAreas.put("jamia nagar", new Double[]{28.5365, 77.2833});
        delhiAreas.put("zakir nagar", new Double[]{28.5426, 77.2857});
        delhiAreas.put("abul fazal enclave", new Double[]{28.5403, 77.2918});
        delhiAreas.put("batla house", new Double[]{28.5431, 77.2836});
        delhiAreas.put("shaheen bagh", new Double[]{28.5408, 77.2876});
        delhiAreas.put("jama masjid", new Double[]{28.6506, 77.2334});
        delhiAreas.put("daryaganj", new Double[]{28.6413, 77.2430});
        delhiAreas.put("paharganj", new Double[]{28.6429, 77.2124});
        delhiAreas.put("karol bagh", new Double[]{28.6520, 77.1903});
        delhiAreas.put("rajouri garden", new Double[]{28.6458, 77.1124});
        delhiAreas.put("janakpuri", new Double[]{28.6219, 77.0897});
        delhiAreas.put("uttam nagar", new Double[]{28.6180, 77.0674});
        delhiAreas.put("dwarka", new Double[]{28.5713, 77.0324});
        delhiAreas.put("najafgarh", new Double[]{28.6106, 76.9837});
        delhiAreas.put("rohini", new Double[]{28.7322, 77.0658});
        delhiAreas.put("pitampura", new Double[]{28.6998, 77.1232});
        delhiAreas.put("ashok vihar", new Double[]{28.6956, 77.1583});
        delhiAreas.put("model town", new Double[]{28.6587, 77.1583});
        delhiAreas.put("kamla nagar", new Double[]{28.6793, 77.1583});
        delhiAreas.put("shakti nagar", new Double[]{28.6793, 77.1583});
        delhiAreas.put("guru nanak nagar", new Double[]{28.6793, 77.1583});
        delhiAreas.put("adharsh nagar", new Double[]{28.6793, 77.1583});
        delhiAreas.put("mahendra park", new Double[]{28.6793, 77.1583});
        delhiAreas.put("bhera enclave", new Double[]{28.6793, 77.1583});
        delhiAreas.put("paschim vihar", new Double[]{28.6793, 77.1583});
        delhiAreas.put("punjabi bagh", new Double[]{28.6793, 77.1583});
        delhiAreas.put("west punjabi bagh", new Double[]{28.6793, 77.1583});
        delhiAreas.put("east punjabi bagh", new Double[]{28.6793, 77.1583});
        
        areaCoordinates.put("pune", puneAreas);
        areaCoordinates.put("pimpri-chinchwad", puneAreas);
        areaCoordinates.put("mumbai", mumbaiAreas);
        areaCoordinates.put("delhi", delhiAreas);
        areaCoordinates.put("new delhi", delhiAreas);
    }
    
    public Double[] getAreaCoordinates(String city, String area) {
        if (city == null || area == null) return null;
        
        String cityKey = city.toLowerCase().trim();
        String areaKey = area.toLowerCase().trim();
        
        Map<String, Double[]> cityAreas = areaCoordinates.get(cityKey);
        if (cityAreas != null) {
            Double[] coords = cityAreas.get(areaKey);
            if (coords != null) {
                System.out.println("✅ Found area coordinates in database: " + area + " -> " + coords[0] + ", " + coords[1]);
                return coords;
            }
        }
        
        return null;
    }
}
