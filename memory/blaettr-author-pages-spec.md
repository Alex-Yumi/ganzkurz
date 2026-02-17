# Blättr Autoren-Pages — Spezifikation

_Festgelegt: 2026-02-13, Alex + Tyto_

## URL-Schema
`blaettr.de/@username` (z.B. `blaettr.de/@henriklenz`)

## Einheitliche Struktur (alle Autoren gleich)

### 1. Hero (oben, sofort sichtbar)
- Autorenname (groß)
- Untertitel: "Autor für [Genre]"
- Foto/Avatar
- Kurz-Bio (2-3 Sätze)
- Genre-Tags als Badges
- Social-Links (optional)

### 2. Bücher
- Alle Bücher als Karten-Grid
- Pro Buch: Cover, Titel, Kurzbeschreibung, Genre, ISBN
- "Auf Blättr entdecken"-Button
- Neueste zuerst

### 3. Über den Autor (ausführlich)
- Längere Bio (300-500 Wörter)
- Schreibstil, Themen, Inspiration
- KEIN Lebenslauf — sondern was den Autor als Schriftsteller ausmacht

### 4. Leserstimmen / Social Proof
- Bewertungen, Zitate
- Blättr-Stats ("89% der Leser empfehlen diesen Autor")

### 5. CTA-Footer
- "Entdecke [Name] auf Blättr"
- App-Download Links (iOS/Android)

## SEO-Anforderungen
- Jede Page hat eigenen Titel: "[Autorname] — Autor | Blättr"
- Google-optimierte Beschreibung aus der Bio
- Bücher mit ISBN für Google Books Indexierung
- Strukturierte Daten (Person + Buch Schema)
- Google sieht den fertigen Inhalt OHNE JavaScript (Server-Side Rendering)

## GEO-Optimierung (DACH-Raum)
- Sprache: Deutsch
- Zielregionen: Deutschland, Österreich, Schweiz

## Design
- Sandstone Theme (wie Landing Page + Admin)
- Hell/Dunkel-Modus automatisch
- Fonts: Playfair Display (Überschriften) + Inter (Text)
- Mobile-first

## Unlock-Regeln (wer bekommt eine Page?)
- 2+ Bücher → sofort freigeschaltet
- 1 Buch + Swipe-Rate >60% → freigeschaltet
- 1 Buch + <60% → Warteliste
- Manuell kuratiert (Admin-Entscheidung) → Wildcard

## Erster Testkandidat
- **Henrik Lenz** (@henriklenz) — Alex' Pseudonym für Tierfabeln-Trilogie
