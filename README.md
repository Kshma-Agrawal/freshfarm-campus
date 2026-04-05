# FarmFresh@Campus

FarmFresh@Campus is a pilot digital platform designed to connect local farmers with consumers within a university ecosystem for the discovery, ordering, and management of fresh agricultural produce.

The platform is being developed as a **functional MVP (Minimum Viable Product)** to digitally support interactions between **farmers, consumers, and campus-level operations**, while also laying the foundation for future features such as **admin management, counselling support, marketplace workflows, and agricultural demand insights**.

---

## Project Status

**Current Stage:** Functional MVP / Frontend + Backend Integration in Progress

At present, the project has completed its **core UI/UX design phase** and is under active development as a **working prototype**.

During implementation, the originally designed high-fidelity interface was **simplified and redesigned into a more development-friendly MVP version**. This redesign was done to ensure the platform remains realistic, usable, and feasible to complete within available time, resources, and technical constraints.

The project currently focuses on building and integrating the following active modules:

- **Consumer side**
- **Farmer side**
- **Authentication and backend logic**
- **Shared product, order, and profile workflows**

The **Admin module**, which was fully designed as part of the project prototype, is currently being maintained as a **demo/design module** and is not yet fully integrated into the backend.

---

## Problem Statement

Within many university and campus ecosystems, the distribution and sale of local farm produce is often **manual, fragmented, and unstructured**. This leads to:

- Low visibility of available produce
- Inefficient communication between farmers and consumers
- Poor order coordination
- Difficulty in managing supply and demand
- Potential wastage of fresh produce

---

## Proposed Solution

FarmFresh@Campus addresses this by providing a digital platform where:

- **Consumers** can browse, discover, and order fresh produce
- **Farmers** can create profiles and manage listed produce
- **Orders** can be tracked across user roles
- **Farmer information** can automatically reflect on the consumer-facing side
- **Admin workflows** can be supported through future expansion
- **Counselling and crop planning support** can be integrated for farmers

---

## Current Implementation Notes

### 1. UI/UX Redesign During Development
The initial interface and user flows were designed as a **complete product concept prototype**. However, while moving into development, parts of the interface were **redesigned and simplified** to make the MVP more practical to implement.

This redesign preserves the **core workflows and functionality**, while reducing unnecessary complexity for development.

---

### 2. Authentication / OTP Setup
The platform includes a **basic login and OTP verification flow**.

Because the project is being built under **limited budget and infrastructure constraints**, a production OTP service has **not been integrated with a paid SMS/API provider**.

Instead, the current implementation supports **two OTP modes**:

- **Developer OTP mode**: OTP can be viewed in the development environment (VS Code / local console)
- **Demo OTP mode**: A fallback demo OTP can be entered manually if network or delivery simulation is not working

This allows authentication flow testing without requiring paid API services, SIM setup, or external OTP gateways.

---

### 3. Shared Data Flow Between Roles
To reduce unnecessary duplication and simplify development:

- A **Farmer profile created in the system is reflected on the Consumer side**
- Orders placed by the **Consumer** are also visible in the **Farmer flow**
- Some order-related sections currently use **dummy or placeholder content**, especially where real delivery/logistics systems are not yet implemented

This is intentional for the MVP stage and helps simulate the complete product journey without requiring a fully operational logistics backend.

---

### 4. Admin Module Status
The **Admin dashboard and admin workflows were fully designed as part of the project concept**, but at present they are being maintained as a **design/demo module**.

Current active development is prioritizing:

- Consumer-side flows
- Farmer-side flows
- Shared backend functionality

This approach helps ensure the project remains stable and functional within current constraints.

---

### 5. Data & API Constraints
Due to limited access to institutional datasets and third-party APIs, some modules currently operate with:

- Static or placeholder data
- Frontend-driven simulations
- Demo-based content

This includes:

- Marketplace module
- Counselling module
- Crop demand / insights module

For example:

- No official dataset was provided for counsellors or expert profiles
- No external APIs were integrated for real-time agricultural or logistics data

These modules are designed as **functional UI prototypes** and can be connected to real backend data in future iterations.

---

## Active Modules

### Consumer Module
- Splash / onboarding
- Login / OTP flow
- Location and address management
- Browse produce and farmers
- Cart and checkout flow
- Order placement
- Order history / order details

### Farmer Module
- Farmer profile creation
- Produce listing and management
- Order visibility
- Shared product/order flow with consumer system
- Farmer support chatbot

### Admin Module (Prototype / Demo Stage)
- Dashboard concept
- Farmer management
- Counselling management
- Marketplace management
- Reports and crop demand views

---

## AI Assistance (Farmer Support)

The platform includes a **Claude-powered chatbot** integrated into the Farmer module.

This feature allows farmers to:

- Ask questions related to crop health
- Get guidance on pest issues
- Seek general farming advice
- Receive quick assistance without requiring immediate manual expert support

This enhances accessibility of agricultural knowledge and supports farmers in real-time decision making.

---

## Technology Stack

> The project uses a lightweight and flexible stack to support rapid MVP development and testing.

### Frontend
- HTML5  
- CSS3  
- JavaScript  

### Backend
- Node.js (`server.js` for core routing and API handling)
- Python (`server.py` for additional backend services and processing)

### Database
- SQLite

### Tools & Workflow
- Figma (UI/UX Design)
- VS Code (Development)
- Netlify (Planned Deployment)

> Note: The architecture is intentionally modular and practical for student-level MVP development under limited time and resource constraints.

---

## Deployment Link

**https://fresh-farm-campus.netlify.app/**

---

## Limitations (Current MVP)

This project is currently a **resource-constrained MVP prototype**, and certain features are intentionally simplified.

### Current limitations include:
- No production OTP API integration (uses demo and development-based OTP handling)
- No real delivery/logistics system (order tracking is simulated)
- Marketplace and counselling data are not sourced from real APIs
- Limited access to institutional datasets (e.g., counsellor data)
- Some modules rely on static or placeholder data
- Admin module is not yet fully connected to backend

These limitations are acknowledged and are part of the current development scope.

---

## Future Scope

Planned future improvements include:

- Full admin backend integration
- Real OTP / SMS API integration
- Role-based dashboards for all users
- Better inventory and demand management
- Farmer counselling records and scheduling
- Real delivery coordination / tracking
- Full deployment and testing in live environment
- Improved AI support for farmer assistance

---

## Team

**Mindfull Machines**  
CSE (UX/UI) Major Project  

**Mentor:**  
Dr. Yogita Yashveer Raghav
