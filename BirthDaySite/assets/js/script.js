let extinguishedCandles = 0; // Sönmüş şamların sayı

// 1-dən 20-yə qədər bütün şamlar üçün
for (let i = 1; i <= 20; i++) {
    const burnedCandle = document.querySelector(`.burned_candle${i}`);
    const candle = document.querySelector(`.candle${i}`);
    
    if (burnedCandle && candle) {
        // Şamı söndürən funksiya
        const blowCandle = function(e) {
            e.preventDefault();
            burnedCandle.classList.add('d-none');
            candle.classList.remove('d-none');
            
            // Sönmüş şamları sayırıq
            extinguishedCandles++;
            
            // Əgər 20 şam da söndüsə, təbrik kartını göstər
            if (extinguishedCandles === 20) {
                setTimeout(() => {
                    // Bütün sönmüş şamları gizlət
                    for (let j = 1; j <= 20; j++) {
                        const sонenSham = document.querySelector(`.candle${j}`);
                        if (sонenSham) {
                            sонenSham.classList.add('d-none');
                        }
                    }
                    
                    // Təbrik kartını göstər
                    const birthdayCard = document.querySelector('.birthday_card');
                    birthdayCard.classList.remove('d-none');
                    setTimeout(() => {
                        birthdayCard.classList.add('show');
                    }, 10);
                }, 500);
            }
        };
        
        // Click event (kompüter üçün)
        burnedCandle.addEventListener('click', blowCandle);
        
        // Touch event (mobil üçün)
        burnedCandle.addEventListener('touchend', blowCandle);
    }
}