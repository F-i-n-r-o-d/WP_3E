# Gym Tracker – specifikace požadavků

**Typ aplikace:** fullstack webová aplikace (Laravel, Blade komponenty, SQLite)
**Cíl:** umožnit uživateli zaznamenávat tréninky v posilovně, sledovat svůj progres a spravovat vlastní profil.

## Funkční požadavky

### Uživatelé a profil
- **FP1** – Registrace a přihlášení uživatele (e-mail + heslo), odhlášení.
- **FP2** – Správa profilu: změna jména, e-mailu, hesla, volitelně tělesná hmotnost a výška.
- **FP3** – Smazání účtu včetně všech jeho dat.

### Cviky
- **FP4** – Aplikace obsahuje výchozí seznam cviků (naplněný přes seeder).
- **FP5** – Každý cvik má název, svalovou partii (např. hrudník, záda, nohy, ramena, ruce, břicho) a volitelný popis.
- **FP6** – Uživatel může cviky přidávat, upravovat a mazat (CRUD).
- **FP7** – Seznam cviků lze filtrovat podle svalové partie a vyhledávat podle názvu.

### Tréninky
- **FP8** – Uživatel může vytvořit trénink s datem, názvem a volitelnou poznámkou.
- **FP9** – Do tréninku lze přidat libovolný počet cviků výběrem ze seznamu cviků.
- **FP10** – Ke každému cviku v tréninku lze zapsat série; každá série má váhu (kg) a počet opakování.
- **FP11** – Tréninky, cviky v tréninku i jednotlivé série lze upravovat a mazat.
- **FP12** – Přehled historie tréninků seřazený podle data s detailem každého tréninku.

### Statistiky
- **FP13** – Celkový počet tréninků a počet tréninků za týden/měsíc.
- **FP14** – Celkový objem (váha × opakování) za trénink a za období.
- **FP15** – Osobní rekordy (maximální váha) pro jednotlivé cviky.
- **FP16** – Vývoj výkonu u vybraného cviku v čase (graf) a rozložení tréninků podle svalových partií.

## Nefunkční požadavky

- **NFP1 – Technologie:** PHP 8.2+, Laravel 11+, Blade komponenty, databáze SQLite, Eloquent ORM, migrace a seedery.
- **NFP2 – Bezpečnost:** hashování hesel, CSRF ochrana formulářů, autorizace (uživatel vidí a upravuje pouze svá data – Policies), validace všech vstupů na straně serveru.
- **NFP3 – Použitelnost:** intuitivní a přehledné rozhraní v češtině, zápis série během tréninku na pár kliknutí.
- **NFP4 – Responzivita:** aplikace je plně použitelná na mobilním telefonu (používání přímo v posilovně).
- **NFP5 – Výkon:** načtení stránky do 2 s, eliminace N+1 dotazů (eager loading).
- **NFP6 – Udržovatelnost:** dodržení MVC architektury a konvencí Laravelu, znovupoužitelné Blade komponenty, verzování v Gitu.
- **NFP7 – Integrita dat:** cizí klíče a kaskádové mazání (smazání tréninku smaže jeho série), validace kladných hodnot u váhy a opakování.
- **NFP8 – Kompatibilita:** funkčnost v aktuálních verzích prohlížečů Chrome, Firefox, Edge a Safari.
