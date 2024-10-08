// טוען את התכנים מה-Local Storage כאשר העמוד נטען
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('#styled-table td.editable').forEach(cell => {
        let savedValue = localStorage.getItem(cell.dataset.id); // טוען את הערך השמור
        if (savedValue) {
            cell.innerText = savedValue; // מעדכן את תוכן התא מה-Local Storage
        }
    });
});

// הקוד להוספת עריכת התאים ושמירת הערכים ב-Local Storage
document.querySelectorAll('#styled-table td.editable').forEach(cell => {
    cell.addEventListener('click', function() {
        let currentText = cell.innerText;
        let input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        cell.innerHTML = currentText;
        cell.appendChild(input);
        input.focus();

        // כאשר יוצאים מהתא, נשמר הערך
        input.addEventListener('blur', function() {
            if (input.value !== '') {
                cell.innerText = input.value;
                localStorage.setItem(cell.dataset.id, input.value);
            }
            else {
                cell.innerText = ' ';
            localStorage.setItem(cell.dataset.id, ' '); // שמירה ב-Local Storage
            }
        });

        // שמירה גם בעת לחיצה על Enter
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                cell.innerText = input.value;
                localStorage.setItem(cell.dataset.id, input.value); // שמירה ב-Local Storage
            }
        });
    });
});

// כפתור reset לברירת מחדל
document.getElementById('reset-btn').addEventListener('click', function() {
    // ניקוי כל הנתונים מה-Local Storage
    localStorage.clear();
    
    // חזרה למצב ברירת המחדל של כל התאים
    document.querySelectorAll('#styled-table td.editable').forEach(cell => {
        cell.innerText = cell.dataset.default; // החזרת תוכן ברירת המחדל
        localStorage.setItem(cell.dataset.id, cell.dataset.default); // שמירה ב-Local Storage
    });
});

// כפתור clean לניקוי
document.getElementById('clean-btn').addEventListener('click', function() {
    // ניקוי כל הנתונים מה-Local Storage
    localStorage.clear();
    
    // מרוקן את כל התאים בלי החזרת ברירת מחדל
    document.querySelectorAll('#styled-table td.editable').forEach(cell => {
        cell.innerText = ''; // מרוקן את התאים
    });
});