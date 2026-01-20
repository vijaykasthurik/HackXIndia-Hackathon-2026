# **Growlify – An AI-Powered Urban Farming System**

## **Team Name**
**Green Sync Innovators**  
**PSNA College of Engineering and Technology, Tamil Nadu**

---

## **Team Members**
- **Vijay Kasthuri K** – III BE CSE  
  📧 vijaykasthuri777@gmail.com  
  📞 9965508415  

- **Dinny Paul Navis C** – III BE CSE  

- **Akash S M** – III BE CSE  

- **Akash S** – III BE CSE  

---

## **Prototype, Research & Demo Links**
- **Prototype Video Link:**  
  https://drive.google.com/file/d/1Hp_v-phkXRLtPr-BOSJ4gmzkLMY-i6Ih/view?usp=sharing

- **Research Paper (IJIRT – 2025):**  
  Vijay Kasthuri K & Dinny Paul Navis C,  
  *“Growlify: An AI-Powered Urban Farming System”*  
  https://ijirt.org/article?manuscript=183371  

- **Animated Video Link:**  
  https://drive.google.com/file/d/1OJanNLQ9C0KKU4xAk8a9R8U4KafEWdQX/view

- **PPT Link:**  
  https://drive.google.com/file/d/1udO8kLZXntZvyXuzG0ZdmWgCeOto_RBN/view?usp=drive_link

---

## **Overview**
**Growlify** is an AI + IoT-powered urban farming system designed for city environments where space, air quality, and time are limited.  
It enables **smart plant care through deep learning–based disease detection, weather-aware irrigation, automated reminders, and organic farming guidance**.

Growlify works as a **personal plant guardian**, especially for balconies and small urban homes.

---

## **Problem Statement**
Rapid urbanization in India has led to:
- Severe **air pollution** in cities like **Delhi, Uttar Pradesh regions, Bengaluru, and Chennai**
- Reduced green cover and increasing **carbon footprint**
- Limited access to clean, self-grown food
- Lack of gardening knowledge among urban residents

Despite awareness, many people avoid home gardening due to:
- Unpredictable weather
- Plant diseases
- Irregular watering
- Busy lifestyles

This directly impacts **environmental sustainability, mental well-being, and urban air quality**.

---

## **Why Open Innovation (Open Bharat Track)**
Growlify aligns with **Open Innovation – Open Bharat** because:

- 🌍 India is facing **critical environmental challenges** due to pollution and urban congestion  
- 🌱 Promotes **decentralized green growth** at household level  
- 🏙️ Encourages citizens to convert balconies into **micro green zones**  
- ♻️ Supports **sustainable living, water optimization, and organic practices**  
- 🇮🇳 Empowers India’s vision of **self-reliant, eco-conscious urban communities**

Growlify is not just a product — it is a **citizen-driven environmental movement**.

---

## **Proposed Solution**
Growlify provides an end-to-end solution with:

- 🌱 **Smart Onboarding & Localization**  
  PIN-code-based weather detection for plant-specific care

- 🌱 **AI-Driven Plant Disease Diagnosis**  
  Upload leaf images to detect diseases and get treatment suggestions

- 🌱 **Deep Learning CNN Model (Python)**  
  Trained on **50,000+ plant leaf images**  
  Achieved **98.5% accuracy** using CNN architecture

- 🌱 **Automated Smart Reminders**  
  Email alerts for watering and treatment, dynamically adjusted to rainfall

- 🌱 **Organic Care Tips & Eco Store**  
  Eggshell compost, banana peel water, neem oil suggestions

- 🌱 **IoT Smart Irrigation with Fail-Safe Logic**  
  If **electricity or Wi-Fi is OFF**, the system automatically releases a **minimum safe amount of water every 2 days** to prevent plant death

---

## **Tech Stack**

### **Frontend**
- React.js  

### **Backend**
- Node.js  
- Express.js  

### **AI & APIs**
- **Python (Deep Learning & AI)**  
- **CNN Model for Plant Disease Detection**  
  - Dataset: 50,000+ images  
  - Accuracy: **98.5%**
- Flask (AI API Server)
- OpenWeather API (Real-time weather & rainfall)

### **Database**
- MongoDB  

### **Why This Tech Stack?**
- **React** → Fast, scalable UI for users  
- **Node & Express** → Real-time IoT + API handling  
- **Python & CNN** → High-accuracy plant disease detection  
- **MongoDB** → Flexible plant & user data storage  
- **OpenWeather API** → Weather-aware irrigation decisions  

---

## **Architecture**
- **Frontend** → User interaction & dashboard  
- **Backend APIs** → Logic, reminders, automation  
- **AI Layer (Python + CNN)** → Disease detection  
- **IoT Layer (ESP32)** → Smart irrigation & sensors  
- **Cloud Services** → Notifications & storage  

---

## **Functional Requirements**
- User registration & plant onboarding  
- Leaf image upload & disease detection  
- Weather-based watering logic  
- Smart irrigation automation  
- Power-failure water backup logic  
- Email reminders & alerts  
- Community engagement & streak tracking  

---

## **Non-Functional Requirements**
- Scalable architecture  
- Secure data handling  
- Low-cost & energy-efficient hardware  
- Reliable automation even during power issues  
- Easy UI for non-technical users  

---

## **Hardware & Software Components**

### **Hardware**
- ESP32  
- RTC Module  
- 5V Dual Channel Relay  
- Rain Detection Sensor  
- 6V Pump Motor  

### **Software**
- React JS  
- Node JS  
- Express JS  
- MongoDB  
- Python (AI & Deep Learning)  
- Flask  
- OpenWeather API  

---

## **Cost Analysis**
- **Hardware Cost:** ₹3,500 per prototype  
- **Software & Hosting:** ₹65,000  
- **Total Project Cost:** **₹70,000**

🟢 Affordable, scalable, and suitable for Indian households.

---

## How to Run the Project
Install React app 
npx create-react-app my-app

Install all the packages 
 npm install 
react@18.2.0 react-dom@18.2.0 react-scripts@5.0.1 
react-router-dom@7.6.2 
@testing-library/react@16.3.0 
@testing-library/dom@10.4.0 
@testing-library/jest-dom@6.6.3 
@testing-library/user-event@13.5.0 
@lottiefiles/lottie-player@2.0.12 
aos@2.3.4 axios@1.10.0 bcryptjs@3.0.2 
bootstrap@5.3.7 cors@2.8.5 dotenv@17.2.0 
framer-motion@12.23.24 jsonwebtoken@9.0.2 
lottie-react@2.4.1 lucide-react@0.525.0 
mongoose@8.16.3 node-cron@4.2.1 
nodemailer@7.0.5 otp-generator@4.0.1 
pdf-creator-node@2.3.5 razorpay@2.9.6 
react-bootstrap-icons@1.11.6 
web-vitals@2.1.4 winston@3.17.0 
--legacy-peer-deps
npm install -D vite@6.3.5
### 1. Frontend (React)
```bash
cd my-app
npm start

 2. Backend (Node.js + Express)

cd my-app/backend
node index.js

 3. Deep Learning / AI (Python + CNN using Flask)

cd FLASK-BACKEND
python app.py
