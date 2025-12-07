let extinguishedCandles = 0;
const totalCandles = 20;
const warningElement = document.querySelector('.Warning');

// ===============================
// ŞAMLARI SÖNDÜRMƏ
// ===============================
for (let i = 1; i <= totalCandles; i++) {
    const burnedCandle = document.querySelector(`.burned_candle${i}`);
    const candle = document.querySelector(`.candle${i}`);

    if (burnedCandle && candle) {
        const blowCandle = function(e) {
            e.preventDefault();
            e.stopPropagation();

            burnedCandle.classList.add('d-none');
            candle.classList.remove('d-none');
            extinguishedCandles++;

            if (extinguishedCandles === 1 && warningElement) {
                warningElement.classList.add('hide');
                setTimeout(() => warningElement.style.display = 'none', 500);
            }

            if (extinguishedCandles === totalCandles) {
                setTimeout(() => {
                    for (let j = 1; j <= totalCandles; j++) {
                        const s = document.querySelector(`.candle${j}`);
                        if (s) {
                            setTimeout(() => {
                                s.style.transition = 'opacity 0.3s ease-out';
                                s.style.opacity = '0';
                                setTimeout(() => s.classList.add('d-none'), 300);
                            }, j * 30);
                        }
                    }

                    setTimeout(() => {
                        const birthdayCard = document.querySelector('.birthday_card');
                        birthdayCard.classList.remove('d-none');
                        setTimeout(() => birthdayCard.classList.add('show'), 10);

                        showPeaceButtonAfterBirthday();
                    }, 1000);

                }, 500);
            }
        };

        burnedCandle.addEventListener('click', blowCandle);
        burnedCandle.addEventListener('touchend', blowCandle);
    }
}

// ===============================
// 3 SANİYƏ SONRA BARIŞAQ BUTTONU
// ===============================
function showPeaceButtonAfterBirthday() {
    setTimeout(() => {
        const sorryBtn = document.querySelector('.SorryBtn');
        sorryBtn.classList.remove('d-none');
        setTimeout(() => sorryBtn.classList.add('show'), 50);
    }, 3000);
}

// ===============================
// BARIŞAQ KARTINI AÇ
// ===============================
document.getElementById('openPeace').addEventListener('click', () => {
    document.querySelector('.birthday_card').classList.add('d-none');

    const peaceCard = document.querySelector('.peace_card');
    peaceCard.classList.remove('d-none');
    setTimeout(() => peaceCard.classList.add('show'), 10);
});

// ===============================
// YOX MƏTNLƏRİ
// ===============================
const noTexts = [
    "Qəlbimi qırırsan 💔",
    "Məni çox üzürsən 😢",
    "Bir az insaflı ol 😞",
    "Axı səni sevirəm 💕",
    "Bu çox ağrıdır 😔",
    "Ürəyimə toxunursan 💔",
    "Hələ də yox deyirsən? 🥺",
    "Bir şans belə yox? 😟",
    "Sənə çox dəyər verirəm 😢",
    "Bu son şansdır 😞",
    "Məni belə üzmə 😔"
];

let noClickCount = 0;
const maxNoClicks = noTexts.length;

document.getElementById('noBtn').addEventListener('click', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const peaceText = document.getElementById('peaceText');
    const peaceCard = document.querySelector('.peace_card');

    noClickCount++;
    peaceText.textContent = noTexts[noClickCount % maxNoClicks];

    // ✅ YES böyüyür və sola hərəkət edir
    let yesScale = 1 + (noClickCount / maxNoClicks) * 3.5;
    let yesMoveLeft = (noClickCount / maxNoClicks) * -20; // azca sola hər klikdə
    yesBtn.style.transform = `translateX(${yesMoveLeft}px) scale(${yesScale})`;

    // ✅ NO kiçilir və sağa hərəkət edir
    let noScale = 1 - (noClickCount / maxNoClicks) * 1.2;
    noScale = Math.max(0, noScale);
    let moveRight = (noClickCount / maxNoClicks) * 180;
    noBtn.style.transform = `translateX(${moveRight}px) scale(${noScale})`;

    // ✅ Peace card böyüyür (width, height artımı)
    let newWidth = 300 + (noClickCount / maxNoClicks) * 300;
    let newHeight = 200 + (noClickCount / maxNoClicks) * 200;
    let cardScale = 1 + (noClickCount / maxNoClicks) * 0.6;
    peaceCard.style.width = `${newWidth}px`;
    peaceCard.style.height = `${newHeight}px`;
    peaceCard.style.transform = `translate(-50%, -50%) scale(${cardScale})`;

    // ✅ Axırda NO yox olur
    if (noClickCount >= maxNoClicks - 1) {
        noBtn.style.opacity = '0';
        setTimeout(() => {
            noBtn.style.display = 'none';
        }, 300);
    }
});

// ===============================
// YES FINAL MESAJI + KONFETİ PARTLAYIŞI
// ===============================
document.getElementById('yesBtn').addEventListener('click', () => {
    const peaceText = document.getElementById('peaceText');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const peaceCard = document.querySelector('.peace_card');

    peaceText.textContent = "Yaşasın! 💖 Barışdıq!";
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';

    // =========================
    // KONFETİ PARTLAYIŞI
    // =========================
    const confettiColors = ['#ff0a54','#ff477e','#ff7096','#ff85a1','#fbb1b1','#f9bec7','#f9f7f7','#9be15d','#00d084','#69f0ae'];

    // 3 dəfə partlama effekti
    for (let round=0; round<3; round++){
        setTimeout(() => {
            for (let i = 0; i < 80; i++) {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.backgroundColor = confettiColors[Math.floor(Math.random()*confettiColors.length)];
                confetti.style.left = `${50 + Math.random()*60 - 30}%`;
                confetti.style.top = '50%';
                confetti.style.width = `${Math.random()*8 + 4}px`;
                confetti.style.height = `${Math.random()*8 + 4}px`;
                confetti.style.position = 'absolute';
                confetti.style.zIndex = '5000';
                confetti.style.borderRadius = '50%';
                confetti.style.opacity = 1;
                peaceCard.appendChild(confetti);

                const angle = Math.random()*2*Math.PI;
                const distance = Math.random()*150 + 50;
                const duration = Math.random()*1500 + 1000;

                confetti.animate([
                    { transform: 'translate(0,0) rotate(0deg)', opacity:1 },
                    { transform: `translate(${Math.cos(angle)*distance}px, ${Math.sin(angle)*distance}px) rotate(${Math.random()*720}deg)`, opacity:0 }
                ], {
                    duration: duration,
                    easing: 'ease-out',
                    fill: 'forwards'
                });

                setTimeout(() => confetti.remove(), duration);
            }
        }, round * 400); // hər 0.4s-də yeni partlayış
    }
});

// ===============================
// DEBUG
// ===============================
console.log('🎂 Birthday App Loaded!');
