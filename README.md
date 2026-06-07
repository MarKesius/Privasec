# Privasec

Static quiz viewer για ερωτήσεις Ιδιωτικής Ασφάλειας με απαντήσεις.

Η εφαρμογή φορτώνει δύο ομάδες ερωτήσεων από JSON αρχεία, εμφανίζει τις ερωτήσεις σε accordion μορφή και δείχνει τη σωστή απάντηση όταν ο χρήστης επιλέξει μία επιλογή.

## Χαρακτηριστικά

- Καθαρό frontend με HTML, CSS και vanilla JavaScript.
- Δεν χρειάζεται backend ή βάση δεδομένων.
- Οι ερωτήσεις φορτώνονται από `quiz1.json` και `quiz2.json`.
- Υποστηρίζει δύο ομάδες ερωτήσεων: Ομάδα Α και Ομάδα Β.
- Responsive layout για desktop και κινητά.
- Έτοιμο για deploy ως static site στο Vercel.

## Δομή αρχείων

```text
privasec/
├── index.html
├── style.css
├── app.js
├── quiz1.json
├── quiz2.json
└── README.md
```

## Local χρήση

Επειδή η εφαρμογή κάνει `fetch()` στα JSON αρχεία, άνοιξέ τη μέσα από local server και όχι απευθείας ως `file://`.

Με XAMPP:

```text
http://localhost/privasec/
```

Εναλλακτικά, μπορείς να χρησιμοποιήσεις οποιονδήποτε static server ή το Live Server extension του VS Code.

## Deploy στο Vercel

Το project είναι static site, οπότε δεν χρειάζεται build command.

1. Ανέβασε το project σε GitHub.
2. Στο Vercel, κάνε import το GitHub repository.
3. Αν το repository περιέχει μόνο τα αρχεία του `privasec`, άφησε το root directory ως έχει.
4. Αν το `privasec` είναι υποφάκελος μέσα σε μεγαλύτερο repository, όρισε ως Root Directory το `privasec`.
5. Χρησιμοποίησε τις παρακάτω ρυθμίσεις:

```text
Framework Preset: Other
Build Command: άδειο
Output Directory: .
Install Command: άδειο
```

Με κάθε push στο GitHub, το Vercel θα δημιουργεί νέο deployment.

## Επεξεργασία ερωτήσεων

Οι ερωτήσεις βρίσκονται στα:

- `quiz1.json` για την Ομάδα Α
- `quiz2.json` για την Ομάδα Β

Κάθε ερώτηση πρέπει να έχει κείμενο, επιλογές και τη σωστή απάντηση. Παράδειγμα:

```json
{
  "question": "Κείμενο ερώτησης",
  "options": [
    "Α. Πρώτη επιλογή",
    "Β. Δεύτερη επιλογή",
    "Γ. Τρίτη επιλογή"
  ],
  "correct": "Α"
}
```

## Τεχνολογίες

- HTML
- CSS
- JavaScript
- JSON
- Vercel

## Άδεια

Πρόσθεσε εδώ την άδεια χρήσης που θέλεις για το repository.
