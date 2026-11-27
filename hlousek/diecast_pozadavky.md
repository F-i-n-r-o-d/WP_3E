## 1. Funkční požadavky

### 1.1 Nový uzivatel a účet

- Uživatel bez přihlášení je při otevření aplikace přesměrován na přihlášení
- Uživatel se může zaregistrovat zadáním jména, e-mailu a hesla 
- E-mail musí být unikátní, heslo musí mít alespoň 8 znaků
- Po úspěšné registraci je uživatel rovnou přihlášen a přesměrován na přehled
- Registrovaný uživatel se může přihlásit e-mailem a heslem, volitelně s volbou "Zapamatovat si mě“
- Při špatném e-mailu nebo heslu se zobrazí stejná obecná chyba (neprozrazuje, které e-maily existují)
- Přihlášený uživatel se může odhlásit
- Přihlášený uživatel nemá přístup na registraci a přihlášení

### 1.2 Dashboard

- Zobrazuje celkový počet modelů ve sbírce přihlášeného uživatele
- Zobrazuje celkovou pořizovací hodnotu sbírky v Kč
- Zobrazuje počet zabalených a rozbalených modelů, případně i poškozených
- Obsahuje rychlé tlačítko pro přidání modelu a odkaz na celou sbírku
- Každý uživatel vidí jen statistiky své vlastní sbírky

### 1.3 Správa modelů 

- **Výpis:** karty s názvem, výrobcem, měřítkem, značkou auta, rokem, stavem a náhledem fotky
- **Přidání:** formulář s výběrem výrobce, názvem, značkou auta, měřítkem, rokem, stavem, cenou, poznámkou a fotkou
- **Detail:** všechny údaje o modelu, velká fotka, tlačítka Upravit, Smazat a Zpět
- **Úprava:** předvyplněný formulář, možnost nahradit nebo odstranit fotku
- **Smazání:** s potvrzením v prohlížeči; smaže se i soubor s fotkou
- Po akcích se zobrazí potvrzující hláška (přidáno, upraveno, smazáno)
- Nový model se vždy přiřadí přihlášenému uživatelovi

### 1.4 Fotky

- Ke každému modelu lze nahrát jednu fotku (jpg, png, webp, max. 4 MB).
- Fotka se zobrazuje ve výpisu i v detailu.
- Při výměně, odstranění fotky nebo smazání modelu se starý soubor smaže z disku.
- Soubory se ukládají pod náhodným názvem, ne pod původním názvem od uživatele.

### 1.5 Filtrování a vyhledávání

- Vyhledávání podle části názvu modelu nebo značky auta
- Filtr podle výrobce
- Filtr podle stavu
- Filtry lze kombinovat; po zadání se zobrazí tlačítko "Zrušit filtry“
- Filtry zůstávají zachované při přechodu mezi stránkami výpisu
- Když nic neodpovídá, zobrazí se zpráva "Žádný model neodpovídá filtru“

### 1.6 Validace vstupů

- Výrobce musí existovat v databázi
- Název a značka auta jsou povinné (max. 255 znaků)
- Měřítko musí mít tvar 1:64 (zápis 1/64 se automaticky převede)
- Rok je nepovinný, musí být v rozsahu 1900 až příští rok
- Stav musí být jedna z hodnot boxed, loose, damaged
- Cena je nepovinná, nesmí být záporná
- Poznámky jsou nepovinné (max. 2000 znaků)
- Chyby validace se zobrazují česky u konkrétních polí, zadané hodnoty zůstávají ve formuláři

### 1.7 Autorizace a chybové stavy

- Uživatel nemůže zobrazit, upravit ani smazat cizí model (chyba 403)
- Neexistující záznam nebo stránka vrací vlastní stránku 404
- Vypršení platnosti formuláře vrací vlastní stránku 419
- Nepřihlášený uživatel je při pokusu o chráněnou stránku přesměrován na přihlášení


## 2. Nefunkční požadavky

### 2.1 Bezpečnost

- Hesla jsou ukládána jako hash, nikdy v čitelné podobě.
- Všechny formuláře jsou chráněné CSRF
- Po přihlášení se obnovuje session
- Odhlášení probíhá přes POST, ne přes odkaz
- Výstup v šablonách je escapovaný (ochrana proti XSS)
- Pole user_id nelze podstrčit z formuláře
- Dotazy používají parametry
- Nahrávané soubory jsou omezeny na vybrané obrázkové formáty a velikost
- Soubor .env a složka vendor nebudu v Gitu

### 2.2 Výkon

- Výrobci se k modelům načítají jedním dotazem
- Výpis je stránkovaný
- Statistiky počítá databáze, ne PHP

### 2.3 Použitelnost

- Minimalistický tmavý vzhled, responzivní rozložení
- České rozhraní a české chybové hlášky
- Potvrzení před smazáním modelu
- Přehledná navigace a zpětné odkazy na každé stránce

### 2.4 Spolehlivost a integrita dat

- Cizí klíče v databázi zajišťují konzistenci
- Smazáním uživatele se smažou i jeho modely
- Výrobce, ke kterému patří modely, nelze smazat
- Ceny jsou uloženy jako decimal, ne float

### 2.5 Udržovatelnost

- Čistá MVC struktura: modely, controllery, Blade šablony
- Validace oddělená ve Form Requestech, autorizace v policy, filtrování ve scope modelu
- Změny databáze verzované migracemi
- Společný formulář pro přidání i úpravu a společný layout

