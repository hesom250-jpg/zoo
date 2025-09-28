// Единый JavaScript файл для всех страниц сайта
// common.js - функционал модального окна и плавной прокрутки

document.addEventListener('DOMContentLoaded', function() {
    // ==================== ПЛАВНАЯ ПРОКРУТКА ====================
    
    // Функция плавной прокрутки к элементу
    function smoothScrollTo(target) {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (!element) return;
        
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - 80; // Отступ сверху
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    
    // Обработчик для всех ссылок с хэшем
    document.addEventListener('click', function(e) {
        // Проверяем, является ли элемент ссылкой с якорем
        if (e.target.matches('a[href^="#"]') && e.target.getAttribute('href') !== '#') {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            smoothScrollTo(targetId);
        }
    });
    
    // Плавная прокрутка к якорю при загрузке страницы
    if (window.location.hash) {
        setTimeout(() => {
            smoothScrollTo(window.location.hash);
        }, 100);
    }
    
    // ==================== МОДАЛЬНОЕ ОКНО ====================
    
    // Получаем элементы модального окна
    const modalOverlay = document.getElementById('contactModal');
    const modalTrigger = document.getElementById('modalTrigger');
    const closeModal = document.getElementById('closeModal');
    
    // Если модальное окно существует на странице
    if (modalOverlay && modalTrigger && closeModal) {
        
        // Функция открытия модального окна
        function openModal() {
            modalOverlay.classList.add('active');
            modalTrigger.classList.remove('active');
        }
        
        // Функция закрытия модального окна
        function closeModalFunc() {
            modalOverlay.classList.remove('active');
            // Показываем триггер через некоторое время после закрытия
            setTimeout(() => {
                modalTrigger.classList.add('active');
            }, 500);
        }
        
        // Показать модальное окно через 10 секунд
        setTimeout(() => {
            openModal();
        }, 10000);
        
        // Показать/скрыть модальное окно по клику на триггер
        modalTrigger.addEventListener('click', openModal);
        
        // Закрыть модальное окно
        closeModal.addEventListener('click', closeModalFunc);
        
        // Закрыть модальное окно при клике вне его
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModalFunc();
            }
        });
        
        // Закрыть по ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModalFunc();
            }
        });
        
        // Показать триггер при скролле
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                modalTrigger.classList.add('active');
            } else {
                modalTrigger.classList.remove('active');
            }
        });
        
        // Установить правильные ссылки для мессенджеров
        const telegramLink = document.getElementById('telegramLink');
        const whatsappLink = document.getElementById('whatsappLink');
        
        if (telegramLink) {
            telegramLink.href = "https://t.me/zoomirufa";
        }
        if (whatsappLink) {
            whatsappLink.href = "https://wa.me/79999999999";
        }
    }
    
    // ==================== ДОПОЛНИТЕЛЬНЫЙ ФУНКЦИОНАЛ ====================
    
    // Автоматическое обновление года в футере
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('.copyright').forEach(element => {
        if (element.textContent.includes('2023') || element.textContent.includes('2024')) {
            element.innerHTML = element.innerHTML.replace(/2023|2024/g, currentYear);
        }
    });
    
    // Добавляем класс активной страницы для навигации
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === 'index.html' && linkHref === 'index.html#about')) {
            link.style.color = '#e91e63';
            link.style.fontWeight = 'bold';
        }
    });
});