# AI-Driven Architecture Documentation Framework

> **Purpose**: A reusable framework for standardizing software architecture design when working with AI agents. Use this guide to ensure consistency, quality, and production-readiness in any SaaS project.

---

## 1. The Core Objective
When asking an AI to "architect" a solution, the goal is not just a diagram, but a **functional blueprint** that a developer can implement without guesswork. This framework ensures the AI understands the "Whole Deal" from database constraints to UX state transitions.

---

## 2. Framework Components
To achieve "Tomato with Quality," every project should request these 5 pillars of documentation:

### Pillar 1: The Relational Truth (`schema_guide.md`)
AI needs to define the database not just as a list of fields, but as a **relational ecosystem**.
- **Requirement**: Use `INSERT INTO...SELECT` seed data.
- **Why**: This forces the AI to validate its own Foreign Key logic. If the AI can't write a query to link a transaction to a user via a subquery, the schema is likely broken.

### Pillar 2: The Implementation Roadmap (`implementation_plan.md`)
A step-by-step breakdown for a human (or another AI) to follow.
- **Requirement**: Must include the technology stack, directory structure, and exact API endpoint definitions (Method, URI, Body, Response).
- **Why**: This prevents "Architectural Drift" where the code implementation diverges from the design.

### Pillar 3: Visual Logic (PlantUML Suite)
Visuals are the bridge between high-level concepts and low-level code. Use the standard 8-Diagram set:
1. **Component Diagram**: Main system blocks and their dependencies.
2. **Data Flow (L1)**: How data moves from User → App → DB and back.
3. **Authentication Sequence**: The security entry point for all other operations.
4. **Complex Write Sequence**: (e.g., Data Capture) Dealing with validation and audit logs.
5. **Complex Read Sequence**: (e.g., Dashboard Load) Dealing with joins and aggregation.
6. **Process Flow**: The human/operational workflow involved.
7. **UX/Screen Flow**: The state-machine of the frontend navigation.
8. **ERD (Logical)**: Primary keys, Foreign keys, and table relationships.

### Pillar 4: API & Class Specifications
Every diagram must include:
- **Classes**: Methods, properties, and their responsibilities.
- **Inputs/Outputs**: Exact types and origins.
- **Side-Effects**: e.g., "Writes to audit log," "Sends notification."

### Pillar 5: Reusability Instructions
A meta-instruction for the AI to "Standardize its approach."

---

## 3. The "Master Prompt" for AI Architects
When starting a new project, give the AI this prompt to trigger this framework:

> "I need you to act as a Senior Solutions Architect. We are building [PROJECT NAME]. 
> 
> Follow the **AI-Driven Architecture Documentation Framework** to produce a complete design suite in a `docs/design/` folder:
> 
> 1.  **Relational Schema Guide**: Create `schema_guide.md` with comprehensive seed data using `INSERT...SELECT` to prove FK integrity.
> 2.  **Implementation Plan**: Provide a numbered, multi-phase plan (Phase 0-N) with directory structure and API specs.
> 3.  **PlantUML Suite**: Generate 8 diagrams (Component, Data Flow, Auth Seq, Write Seq, Read Seq, Process, UX Flow, ERD). Ensure diagrams specify actual classes, methods, and IO.
> 4.  **Quality Constraint**: Do not use placeholders. All data and flows must be realistic to the [DOMAIN e.g., Banking/Fintech].
> 
> Proceed with building this architecture now."

---

## 4. Key Strategic Principles for AI Quality
- **Generated Columns**: Favor database-level calculations (MySQL Generated Columns) over business logic in code for better performance and data integrity.
- **Audit Trails**: Always include an `audit_log` with JSON fields for `old_values` and `new_values`.
- **Stateless APIs**: Ensure the AI designs RESTfully—sessions or tokens must be explicitly managed in the sequence diagrams.
- **Zero Build Assumption**: If the project requires no build process (like this Vue/CDN project), ensure the architecture respects those constraints while maintaining professional separation of concerns.

---

*This guide serves as the standard for all collaborative development between human and AI on the Natsave Bank KPI project and beyond.*
