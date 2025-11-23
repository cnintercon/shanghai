// script.js - day switching + flight toggle + keyboard nav
let currentDay = 1;
const totalDays = 5;

const dayData = {
    1: { date: '13 ตุลาคม 2025', title: 'วันที่ 1' },
    2: { date: '14 ตุลาคม 2025', title: 'วันที่ 2' },
    3: { date: '15 ตุลาคม 2025', title: 'วันที่ 3' },
    4: { date: '16 ตุลาคม 2025', title: 'วันที่ 4' },
    5: { date: '17 ตุลาคม 2025', title: 'วันที่ 5' }
};

function updateDayDisplay() {
    // Hide all day cards
    document.querySelectorAll('.day-card').forEach(card => {
        card.classList.add('hidden');
        card.classList.remove('fade-in');
    });
    
    // Show current day card with animation
    const currentCard = document.querySelector(`[data-day="${currentDay}"]`);
    if (currentCard) {
        setTimeout(() => {
            currentCard.classList.remove('hidden');
            currentCard.classList.add('fade-in');
        }, 100);
    }
    
    // Update day indicator
    const indicator = document.getElementById('dayIndicator');
    indicator.innerHTML = `
        <div class="text-2xl font-bold text-gray-800">${dayData[currentDay].title}</div>
        <div class="text-sm text-gray-600">${dayData[currentDay].date}</div>
    `;
    
    // Update button states
    const prevBtn = document.getElementById('prevDay');
    const nextBtn = document.getElementById('nextDay');
    
    prevBtn.disabled = currentDay === 1;
    nextBtn.disabled = currentDay === totalDays;
    
    if (currentDay === 1) {
        prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
    
    if (currentDay === totalDays) {
        nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// Navigation event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('prevDay').addEventListener('click', () => {
        if (currentDay > 1) {
            currentDay--;
            updateDayDisplay();
        }
    });

    document.getElementById('nextDay').addEventListener('click', () => {
        if (currentDay < totalDays) {
            currentDay++;
            updateDayDisplay();
        }
    });

    // Flight info toggle
    document.getElementById('flightToggle').addEventListener('click', () => {
        const flightInfo = document.getElementById('flightInfo');
        const arrow = document.getElementById('flightArrow');
        
        if (flightInfo.classList.contains('hidden')) {
            flightInfo.classList.remove('hidden');
            arrow.style.transform = 'rotate(180deg)';
        } else {
            flightInfo.classList.add('hidden');
            arrow.style.transform = 'rotate(0deg)';
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentDay > 1) {
            currentDay--;
            updateDayDisplay();
        } else if (e.key === 'ArrowRight' && currentDay < totalDays) {
            currentDay++;
            updateDayDisplay();
        }
    });

    // Initialize display
    updateDayDisplay();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
