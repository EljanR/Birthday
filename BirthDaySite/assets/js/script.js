let extinguishedCandles = 0; // Sönmüş şamların sayı
const totalCandles = 20; // Ümumi şam sayı
const warningElement = document.querySelector('.Warning'); // "Şamları Söndür" yazısı

// 1-dən 20-yə qədər bütün şamlar üçün
for (let i = 1; i <= totalCandles; i++) {
    const burnedCandle = document.querySelector(`.burned_candle${i}`);
    const candle = document.querySelector(`.candle${i}`);
    
    if (burnedCandle && candle) {
        // Şamı söndürən funksiya
        const blowCandle = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Yanan şamı gizlət
            burnedCandle.classList.add('d-none');
            
            // Sönmüş şamı göstər
            candle.classList.remove('d-none');
            
            // Sönmüş şamları sayırıq
            extinguishedCandles++;
            
            // BİRİNCİ ŞAM SÖNƏN KİMİ "Şamları Söndür" yazısını yox et
            if (extinguishedCandles === 1 && warningElement) {
                warningElement.classList.add('hide');
                setTimeout(() => {
                    warningElement.style.display = 'none';
                }, 500);
            }
            
            // Əgər 20 şam da söndüsə
            if (extinguishedCandles === totalCandles) {
                // 500ms gözlə, sonra sönmüş şamları gizlət
                setTimeout(() => {
                    // Bütün sönmüş şamları yavaş-yavaş yox et
                    for (let j = 1; j <= totalCandles; j++) {
                        const sönənŞam = document.querySelector(`.candle${j}`);
                        if (sönənŞam) {
                            setTimeout(() => {
                                sönənŞam.style.transition = 'opacity 0.3s ease-out';
                                sönənŞam.style.opacity = '0';
                                setTimeout(() => {
                                    sönənŞam.classList.add('d-none');
                                }, 300);
                            }, j * 30); // Hər şam 30ms ara ilə
                        }
                    }
                    
                    // Təbrik kartını göstər (1 saniyə sonra)
                    setTimeout(() => {
                        const birthdayCard = document.querySelector('.birthday_card');
                        if (birthdayCard) {
                            birthdayCard.classList.remove('d-none');
                            // 10ms gözlə ki, transition işləsin
                            setTimeout(() => {
                                birthdayCard.classList.add('show');
                            }, 10);
                        }
                    }, 1000);
                }, 500);
            }
        };
        
        // Click event (kompüter üçün)
        burnedCandle.addEventListener('click', blowCandle);
        
        // Touch event (mobil üçün)
        burnedCandle.addEventListener('touchend', blowCandle);
        
        // Hover effekti (kompüter üçün)
        burnedCandle.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.3)';
        });
        
        burnedCandle.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    }
}

// Ekran məlumatları (lazım olsa istifadə üçün)
const deviceInfo = {
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    pixelRatio: window.devicePixelRatio || 1,
    orientation: window.screen.orientation ? window.screen.orientation.type : 'unknown',
    isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0
};

console.log('🎂 Birthday App Loaded!');
console.log('📱 Device Info:', deviceInfo);
console.log('🎯 Total Candles:', totalCandles);