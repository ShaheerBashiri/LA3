# Projekt-Dokumentation  
**Mohammad Shahir Bashiri**  

| Version | Zusammenfassung                                                                               |
| ------- | -------------------------------------------------------------------------------------------- |
| 0.0.1   | Anlegen des Node.js-Backends (Express, erste Endpoints), Aufsetzen von Next.js-Projekt       |
| 0.0.2   | Implementierung der REST-API (CRUD für Leads, Convert-Endpoint), Grundgerüst Frontend        |
| 0.0.3   | Einbindung von MongoDB/Mongoose, Umstellung vom in-memory Array auf echte DB                 |
| 0.0.4   | Finale Routen in Next.js (Leads, Create, [id], Customers), UI-Verbesserungen                 |
| 0.0.5   | Testing aller Funktionen, Bugfixes, Performance-Optimierungen                                 |
| 1.0.0   | Abschluss der Dokumentation, Deployment (lokal / Vercel/Render), Projektfinalisierung        |

---

## 1 Informieren

### 1.1 Projektbeschreibung

Ziel ist die **Entwicklung eines Lead Management Systems**, bei dem Benutzer Leads erstellen, bearbeiten und zu Kunden konvertieren können. Hierfür wurde **Next.js** für das Frontend gewählt und **Node.js** mit **Express** sowie **MongoDB (Mongoose)** für das Backend.  

**Kernfunktionen**:
- Leads erstellen, Liste anzeigen, bearbeiten, löschen  
- Leads zu Kunden konvertieren  
- Kundenliste anzeigen  
- Persistente Speicherung in einer MongoDB

---

### 1.2 User Stories

| US-№ | Verbindlichkeit | Typ         | Beschreibung                                                                                                             |
| ---- | --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| 1    | Muss            | Funktional  | Als Benutzer möchte ich Leads erstellen können, um potenzielle Kunden zu erfassen.                                      |
| 2    | Muss            | Funktional  | Als Benutzer möchte ich eine Liste aller Leads einsehen, um den Überblick zu behalten.                                  |
| 3    | Muss            | Funktional  | Als Benutzer möchte ich einzelne Leads bearbeiten können, um fehlerhafte Daten anzupassen.                              |
| 4    | Muss            | Funktional  | Als Benutzer möchte ich Leads in Kunden umwandeln können, damit ich später zwischen Leads und Kunden unterscheiden kann.|
| 5    | Muss            | Funktional  | Als Benutzer möchte ich eine Kundenliste einsehen, damit ich den Status konvertierter Leads überprüfen kann.           |
| 6    | Kann            | Qualität    | Als Benutzer möchte ich eine intuitive UI, damit ich effizient arbeiten kann.                                           |
| 7    | Kann            | Qualität    | Als Benutzer möchte ich eine performante Datenbank-Anbindung (MongoDB), um bei größeren Datenmengen skalieren zu können.|

---

### 1.3 Testfälle

| TC-№ | Ausgangslage                                 | Eingabe                                                    | Erwartete Ausgabe                                                                                           |
| ---- | --------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 1.1  | Startseite geöffnet, Benutzer klickt auf Leads  | -                                                          | Leads-Liste wird geladen. Bei keinen Leads → “No leads yet”.                                                |
| 1.2  | In Leads-Liste, Benutzer klickt auf “Create”   | Neue Lead-Daten (Name, Sex, Gender, Address, Source etc.)  | Neuer Lead wird erzeugt und erscheint in der Leads-Liste.                                                   |
| 2.1  | Edit-Seite eines Leads, Benutzer ändert Felder | Klick auf Update                                          | Erfolgreiche Aktualisierung, Rückkehr zur /leads, veränderte Daten sichtbar.                                |
| 3.1  | Edit-Seite mit “Convert to Customer”-Button    | Klick auf Convert                                         | Lead wird aus Leads entfernt und erscheint in der Kundenliste.                                              |
| 4.1  | Kundenliste geöffnet                          | -                                                          | Alle konvertierten Leads (Kunden) werden aufgelistet.                                                        |
| 5.1  | Allgemeiner REST-Check                        | GET /api/leads oder /api/customers mit Browser/Postman    | JSON-Ausgabe oder passender Fehlercode, falls etwas nicht existiert.                                        |

---

## 2 Planen

### Arbeitspakete

| AP-№ | Zuständig | Beschreibung                                                                                         | geplante Zeit |
| ---- | --------- | ----------------------------------------------------------------------------------------------------- | ------------- |
| 1.A  | Bashiri   | Grundgerüst: Next.js Setup, Node/Express aufsetzen, erste CRUD-Routen (Mock/in-memory)               | 4 Stunden     |
| 1.B  | Bashiri   | Integration von MongoDB (Mongoose), Implementierung der endgültigen REST-Endpunkte (CRUD + Convert)  | 5 Stunden     |
| 2.A  | Bashiri   | Next.js-Seiten: Leads (Liste, Create, Edit), Kundenliste, UI-Design, State-Management (Axios)        | 6 Stunden     |
| 2.B  | Bashiri   | Testphase (CRUD, Convert), Bugfixing, Performance-, UI-Optimierung                                   | 4 Stunden     |
| 3.A  | Bashiri   | Deployment lokal oder via Render/Vercel (mit MongoDB Atlas), Umgebungsvariablen                      | 4 Stunden     |
| 3.B  | Bashiri   | Abschluss & Dokumentation (Projekt-Doku, ggf. Mahara-Portfolio)                                      | 3 Stunden     |

**Summe:** 26 Stunden (geschätzt)  

---

## 3 Entscheiden

**Technische Entscheidungen**  
- **Next.js** als Frontend für schnelles Routing, ggf. SSR.  
- **Node + Express** für schlanke REST-API.  
- **MongoDB** via Mongoose, um das Datenmodell effizient umzusetzen.  

**Annahmen**  
- Keine komplexe Authentifizierung (optional).  
- Minimale, intuitive UI als Hauptfokus.

---

## 4 Realisieren

| AP-№ | Zuständig | geplante Zeit | tatsächliche Zeit | Bemerkung                                               |
| ---- | --------- | ------------- | ----------------- | -------------------------------------------------------- |
| 1.A  | Bashiri   | 4 Std.        | 4 Std.           | Next.js + Express Grundgerüst erstellt                  |
| 1.B  | Bashiri   | 5 Std.        | 6 Std.           | Mongoose implementiert, DB-Schema für Leads/Kunden      |
| 2.A  | Bashiri   | 6 Std.        | 7 Std.           | Leads-Seiten fertig, State Handling (Axios), CSS-Styling|
| 2.B  | Bashiri   | 4 Std.        | 4 Std.           | Tests & Bugfixes, Convert-Flow geprüft, UI-Feinschliff  |
| 3.A  | Bashiri   | 4 Std.        | 5 Std.           | Deployment-Aufwand grösser als erwartet                  |
| 3.B  | Bashiri   | 3 Std.        | 3 Std.           | Doku finalisiert, Projekt-Reflexion                     |

---

## 5 Kontrollieren

### Testprotokoll

| TC-№ | Ergebnis | Tester  |
| ---- | -------- | ------- |
| 1.1  | OK       | Bashiri |
| 1.2  | OK       | Bashiri |
| 2.1  | OK       | Bashiri |
| 3.1  | OK       | Bashiri |
| 4.1  | OK       | Bashiri |
| 5.1  | OK       | Bashiri |

Alle definierten Testfälle sind erfolgreich verlaufen. Die Kernfunktionen (Leads hinzufügen, bearbeiten, löschen, konvertieren) arbeiten mit MongoDB wie vorgesehen.

---

## 6 Auswerten (Fazit)

**Ergebnis**  
- Ein funktionsfähiges Lead-Management-System wurde implementiert.  
- **Frontend** (Next.js) mit strukturierter UI für Leads/Kunden.  
- **Backend** (Express + Mongoose) liefert CRUD-Endpoints, reale DB-Persistenz anstelle von In-Memory-Arrays.  

**Erfahrungen**  
- Leichtes Refactoring nötig beim Umstieg auf Mongoose (z. B. ObjectId handling).  
- Next.js-Routing (index.js, create.js, [id].js) hat sich bewährt.  

**Ausblick**  
- Erweiterung um Authentifizierung (JWT etc.) wäre sinnvoll.  
- Cloud-Hosting (z. B. Render, Vercel + MongoDB Atlas) ermöglicht Online-Zugriff.  

