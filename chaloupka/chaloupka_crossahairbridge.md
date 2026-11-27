---
projekt: Crosshair Bridge
dokument: Požadavky na aplikaci
verze: 0.1
datum: 2026-11-27
stav: koncept
technologie: Laravel
tags:
  - crosshair-bridge
  - pozadavky
  - laravel
---

# Crosshair Bridge

> [!abstract] O projektu
> Webová aplikace v Laravelu, která převádí crosshairy z FPS her (CS2, Valorant, Overwatch 2) na průhledné PNG pro aim trenažéry **Kovaak's** a **Aim Lab**. U her se sdílecím kódem stačí vložit kód, u ostatních uživatel opíše hodnoty ze hry nebo si crosshair postaví ve vlastním editoru.

> [!info] Priority (MoSCoW)
> - **Must**: bez toho aplikace nemá smysl
> - **Should**: důležité, ale první verze se bez toho obejde
> - **Could**: rozšíření, pokud zbude čas

---

## Funkční požadavky

Popisují, **co** má aplikace umět.

### Převod crosshairu

#### FR-01 Výběr zdrojové hry
Uživatel si vybere, odkud crosshair převádí: CS2, Valorant, Overwatch 2 nebo vlastní editor.
- **Priorita:** Must
- **Kritérium přijetí:** Po přepnutí hry se zobrazí jen parametry, které daná hra opravdu má.

#### FR-02 Import kódu z CS2
Uživatel vloží sdílecí kód z CS2 a aplikace z něj vyplní všechny parametry crosshairu. Podporuje nový pixelový formát `CS…` i starší kódy `CSGO-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx`, které přepočítá na pixely.
- **Priorita:** Must
- **Kritérium přijetí:** Kód s chybným kontrolním součtem, neznámou verzí nebo cizími znaky skončí srozumitelnou chybou u pole, ne prázdným crosshairem.

#### FR-03 Import kódu z Valorantu
Uživatel vloží kód profilu z Valorantu (např. `0;P;c;5;h;0;…`) a aplikace načte primární crosshair: barvu, obrysy, středovou tečku, vnitřní a vnější čáry.
- **Priorita:** Must
- **Kritérium přijetí:** Hodnoty, které kód neobsahuje, dostanou výchozí hodnotu hry.

#### FR-04 Ruční zadání parametrů
U her bez sdílecího kódu (Overwatch 2) a ve vlastním editoru zadá uživatel hodnoty posuvníkem nebo číslem: tloušťku, délku, mezeru, barvu, krytí, obrys, tečku, kruh.
- **Priorita:** Must
- **Kritérium přijetí:** Hodnota mimo povolený rozsah se omezí na nejbližší platnou.

#### FR-05 Živý náhled
Každá změna parametru se hned projeví v náhledu. Uživatel může přepnout pozadí (scéna z Kovaak's, Aim Labu, venku, světlá zeď) a zvětšení (skutečná velikost, 4×, 10×). Pod náhledem vidí rozměry obrázku, čar a mezery v pixelech.
- **Priorita:** Must

#### FR-06 Přepočet na rozlišení
Uživatel zvolí rozlišení, ve kterém hraje trenažér (např. 1920 × 1080, 2560 × 1440, 1280 × 960), a crosshair se přepočítá na pixely tohoto rozlišení.
- **Priorita:** Must

#### FR-07 Doladění ve vlastním editoru
Crosshair načtený z kterékoli hry jde jedním tlačítkem převést do vlastního editoru a upravit po jednotlivých pixelech.
- **Priorita:** Should

### Export

#### FR-08 PNG pro Kovaak's
Aplikace vytvoří malé průhledné PNG s crosshairem přesně uprostřed, připravené do složky `FPSAimTrainer\crosshairs`.
- **Priorita:** Must
- **Kritérium přijetí:** Lichá tloušťka čáry dá lichou velikost obrázku, takže střed padne doprostřed pixelu a čáry nejsou rozmazané.

#### FR-09 PNG pro Aim Lab
Aplikace vytvoří průhledné PNG ve velikosti celé obrazovky zvoleného rozlišení s crosshairem uprostřed.
- **Priorita:** Must

#### FR-10 Návod k nahrání
U exportu je krátký návod, kam PNG v Kovaak's a Aim Labu nahrát a jak ho ve hře vybrat.
- **Priorita:** Should

### Účty a sdílení

#### FR-11 Uživatelské účty
Uživatel se může zaregistrovat a přihlásit e-mailem a heslem. Převod a export fungují i bez přihlášení.
- **Priorita:** Should

#### FR-12 Uložené crosshairy
Přihlášený uživatel si crosshair uloží pod vlastním názvem, později ho otevře, upraví nebo smaže.
- **Priorita:** Should

#### FR-13 Sdílení odkazem
Uživatel vygeneruje veřejný odkaz na svůj crosshair. Kdo odkaz otevře, uvidí náhled a může si PNG stáhnout bez přihlášení.
- **Priorita:** Could

#### FR-14 Export kódu zpět do CS2
Z crosshairu vytvořeného v aplikaci jde vygenerovat sdílecí kód CS2 a vložit ho do hry.
- **Priorita:** Could

---

## Nefunkční požadavky

Popisují, **jak dobře** a **za jakých podmínek** má aplikace fungovat.

#### NFR-01 Přesnost výstupu
Exportované PNG odpovídá náhledu pixel po pixelu. U nových kódů CS2 sedí rozměry přesně, u starých kódů `CSGO-…` se smí lišit nejvýš o 1 px.
- **Ověření:** Automatické testy porovnají vygenerované PNG s referenčními obrázky.

#### NFR-02 Výkon
- Úvodní stránka se načte do 2 s na běžném připojení.
- Náhled se po změně parametru překreslí do 100 ms.
- Export PNG trvá nejvýš 1 s, i u obrázku 3840 × 2160.

#### NFR-03 Kompatibilita a responzivita
Aplikace funguje v posledních dvou verzích Chrome, Edge, Firefoxu a Safari. Rozložení se přizpůsobí obrazovce od šířky 360 px a stránka nikdy neroluje do strany.

#### NFR-04 Přístupnost
Aplikace splňuje WCAG 2.1 na úrovni AA: všechna pole mají popisky, celá aplikace jde ovládat klávesnicí a fokus je viditelný.

#### NFR-05 Bezpečnost
- Kódy crosshairů i parametry se znovu validují na serveru (Laravel Form Requests), nejen v prohlížeči.
- Všechny formuláře chrání CSRF token.
- Import kódu a export PNG mají omezený počet požadavků (např. 60 za minutu na IP adresu).
- Hesla se ukládají jen jako hash (bcrypt nebo Argon2).

#### NFR-06 Ochrana osobních údajů
Aplikace ukládá jen e-mail, hash hesla a uložené crosshairy. Uživatel může smazat účet i se všemi daty (GDPR). Bez přihlášení se nic neukládá na server.

#### NFR-07 Udržovatelnost a rozšiřitelnost
- Každá hra je samostatná třída se společným rozhraním (parser kódu, výchozí hodnoty, převod na pixelový model). Přidání další hry nevyžaduje změny v ostatních hrách.
- Kód dodržuje PSR-12.
- Parsery kódů mají unit testy (PHPUnit nebo Pest) s pokrytím aspoň 90 %.

#### NFR-08 Lokalizace
Výchozí jazyk je čeština. Všechny texty jsou v jazykových souborech Laravelu, takže jde snadno doplnit angličtina.

#### NFR-09 Vzhled
Aplikace má světlý i tmavý motiv a řídí se nastavením systému.

#### NFR-10 Technologie a provoz
- Backend: aktuální stabilní verze Laravelu a PHP, kterou vyžaduje.
- Databáze: MySQL nebo PostgreSQL (účty, uložené crosshairy).
- Nasazení na běžný PHP hosting nebo do Dockeru, konfigurace přes `.env`.
