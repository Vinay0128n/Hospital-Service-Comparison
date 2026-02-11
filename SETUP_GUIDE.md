# Running the Application - Setup Guide

## System Requirements Status

✅ **Node.js** v22.19.0 - Installed  
✅ **npm** v10.9.3 - Installed  
✅ **Java** 19.0.2 - Installed  
❌ **Maven** - Not installed or not in PATH

## Options to Run the Backend

### Option 1: Install Maven (Recommended)

1. **Download Maven:**
   - Visit: https://maven.apache.org/download.cgi
   - Download the binary zip archive (e.g., `apache-maven-3.9.x-bin.zip`)

2. **Install:**
   - Extract to `C:\Program Files\Apache\maven`
   - Add to PATH: `C:\Program Files\Apache\maven\bin`
   - Restart your terminal

3. **Verify:**
   ```bash
   mvn --version
   ```

4. **Run Backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

### Option 2: Use an IDE

**IntelliJ IDEA:**
1. Open the `backend` folder as a project
2. Wait for Maven dependencies to download
3. Right-click `HospitalComparisonApplication.java`
4. Select "Run 'HospitalComparisonApplication'"

**Eclipse:**
1. Import as "Existing Maven Project"
2. Right-click project → Run As → Spring Boot App

### Option 3: Build JAR and Run

If you can install Maven temporarily:
```bash
cd backend
mvn clean package
java -jar target/hospital-comparison-1.0.0.jar
```

## Running the Frontend

The frontend can be started independently:

```bash
cd frontend
npm install
npm start
```

This will open the UI at `http://localhost:3000`, but it won't be functional until the backend is running.

## Full Application Startup

Once Maven is available:

**Terminal 1 (Backend):**
```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm install
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api
