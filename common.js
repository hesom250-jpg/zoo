// Единый JavaScript файл для всех страниц сайта
// common.js - функционал модального окна и плавной прокрутки

document.addEventListener('DOMContentLoaded', function() {
    // Функция плавной прокрутки
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
    
    // Обработчик кликов для якорных ссылок
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]') && e.target.getAttribute('href') !== '#') {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            smoothScrollTo(targetId);
        }
    });
    
    // Прокрутка к якорю при загрузке страницы
    if (window.location.hash) {
        setTimeout(() => {
            smoothScrollTo(window.location.hash);
        }, 100);
    }
    
    // Создание и управление модальным окном
    function initializeModal() {
        // Создаем HTML для модального окна, если его нет на странице
        if (!document.getElementById('contactModal')) {
            const modalHTML = `
                <div id="contactModal" class="modal-overlay">
                    <div class="modal-content">
                        <button id="closeModal" class="modal-close">
                            <i class="fas fa-times"></i>
                        </button>
                        <h3>Уточните наличие товара</h3>
                        <p>Свяжитесь с нами для подтверждения наличия и получения подробной консультации по кормам AJO</p>
                        <div class="modal-buttons">
                            <a href="https://t.me/zoomirufa" class="modal-btn telegram-btn" target="_blank" id="telegramLink">
                                <i class="fab fa-telegram"></i> Telegram
                            </a>
                            <a href="https://wa.me/79872401491" class="modal-btn whatsapp-btn" target="_blank" id="whatsappLink">
                                <i class="fab fa-whatsapp"></i> WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
                <div id="modalTrigger" class="modal-trigger">
                    <i class="fas fa-comments"></i>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            // Добавляем стили для модального окна
            const modalStyles = `
                <style>
                    .modal-overlay {
                        position: fixed;
                        bottom: 90px;
                        right: 25px;
                        max-width: 320px;
                        width: calc(100vw - 50px);
                        background: white;
                        padding: 20px;
                        border-radius: 12px;
                        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                        z-index: 1001;
                        opacity: 0;
                        visibility: hidden;
                        transform: translateY(20px);
                        transition: all 0.3s ease;
                    }
                    
                    .modal-overlay.active {
                        opacity: 1;
                        visibility: visible;
                        transform: translateY(0);
                    }
                    
                    .modal-content {
                        position: relative;
                        text-align: center;
                    }
                    
                    .modal-close {
                        position: absolute;
                        top: -12px;
                        right: -12px;
                        width: 28px;
                        height: 28px;
                        background: #ff6b6b;
                        color: white;
                        border: none;
                        border-radius: 50%;
                        font-size: 0.9rem;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.3s ease;
                    }
                    
                    .modal-close:hover {
                        background: #e91e63;
                        transform: scale(1.1);
                    }
                    
                    .modal-content h3 {
                        color: #2743cb;
                        margin-bottom: 8px;
                        font-size: 1.2rem;
                        font-weight: 700;
                        line-height: 1.3;
                    }
                    
                    .modal-content p {
                        color: #666;
                        margin-bottom: 16px;
                        line-height: 1.4;
                        font-size: 0.9rem;
                    }
                    
                    .modal-buttons {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }
                    
                    .modal-btn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        padding: 10px 16px;
                        border-radius: 6px;
                        text-decoration: none;
                        font-weight: 600;
                        font-size: 0.9rem;
                        transition: all 0.3s ease;
                        border: 2px solid transparent;
                    }
                    
                    .telegram-btn {
                        background: #0088cc;
                        color: white;
                    }
                    
                    .whatsapp-btn {
                        background: #25D366;
                        color: white;
                    }
                    
                    .modal-btn:hover {
                        transform: translateY(-1px);
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    }
                    
                    .modal-trigger {
                        position: fixed;
                        bottom: 25px;
                        right: 25px;
                        width: 50px;
                        height: 50px;
                        background: #2743cb;
                        color: white;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        z-index: 1002;
                        box-shadow: 0 4px 12px rgba(39, 67, 203, 0.3);
                        transition: all 0.3s ease;
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    
                    .modal-trigger.active {
                        opacity: 1;
                        transform: scale(1);
                    }
                    
                    .modal-trigger:hover {
                        background: #feb6b7;
                        color: #333;
                        transform: scale(1.05);
                    }
                    
                    .modal-trigger i {
                        font-size: 1.3rem;
                    }
                    
                    /* Регулировка позиции кнопки "Наверх" чтобы не перекрывалась */
                    .back-to-top {
                        bottom: 85px !important;
                        right: 25px !important;
                    }
                    
                    @media (max-width: 480px) {
                        .modal-overlay {
                            bottom: 80px;
                            right: 15px;
                            left: 15px;
                            width: auto;
                            max-width: none;
                            padding: 18px;
                        }
                        
                        .modal-trigger {
                            bottom: 20px;
                            right: 20px;
                            width: 45px;
                            height: 45px;
                        }
                        
                        .modal-close {
                            top: -10px;
                            right: -10px;
                            width: 26px;
                            height: 26px;
                        }
                        
                        .modal-content h3 {
                            font-size: 1.1rem;
                        }
                        
                        .modal-content p {
                            font-size: 0.85rem;
                            margin-bottom: 14px;
                        }
                        
                        .modal-btn {
                            padding: 9px 14px;
                            font-size: 0.85rem;
                        }
                        
                        .back-to-top {
                            bottom: 75px !important;
                            right: 20px !important;
                        }
                    }
                    
                    @media (max-width: 360px) {
                        .modal-overlay {
                            bottom: 75px;
                            right: 10px;
                            left: 10px;
                            padding: 16px;
                        }
                        
                        .modal-trigger {
                            bottom: 15px;
                            right: 15px;
                        }
                        
                        .back-to-top {
                            bottom: 70px !important;
                            right: 15px !important;
                        }
                    }
                </style>
            `;
            
            document.head.insertAdjacentHTML('beforeend', modalStyles);
        }
        
        // Получаем элементы модального окна
        const modalOverlay = document.getElementById('contactModal');
        const modalTrigger = document.getElementById('modalTrigger');
        const closeModal = document.getElementById('closeModal');
        
        if (modalOverlay && modalTrigger && closeModal) {
            // Функции открытия/закрытия модального окна
            function openModal() {
                modalOverlay.classList.add('active');
                modalTrigger.classList.remove('active');
            }
            
            function closeModalFunc() {
                modalOverlay.classList.remove('active');
                // Показываем триггер через некоторое время
                setTimeout(() => {
                    modalTrigger.classList.add('active');
                }, 500);
            }
            
            // Автопоказ модального окна через 10 секунд
            setTimeout(() => {
                openModal();
            }, 10000);
            
            // Обработчики событий
            modalTrigger.addEventListener('click', openModal);
            closeModal.addEventListener('click', closeModalFunc);
            
            modalOverlay.addEventListener('click', function(e) {
                if (e.target === modalOverlay) {
                    closeModalFunc();
                }
            });
            
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                    closeModalFunc();
                }
            });
            
            // Показываем триггер при скролле
            window.addEventListener('scroll', function() {
                if (window.scrollY > 500) {
                    modalTrigger.classList.add('active');
                } else {
                    modalTrigger.classList.remove('active');
                }
            });
        }
    }
    
    // Инициализируем модальное окно
    initializeModal();
    
    // Обновление года в копирайте
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('.copyright').forEach(element => {
        if (element.textContent.includes('2023') || element.textContent.includes('2024')) {
            element.innerHTML = element.innerHTML.replace(/2023|2024/g, currentYear);
        }
    });
    
    // Подсветка активной страницы в навигации
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === 'index.html' && linkHref === 'index.html#about')) {
            link.style.color = '#2743cb';
            link.style.fontWeight = 'bold';
        }
    });
    
    // Мобильное меню (если используется на странице)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Кнопка "Наверх" (если используется на странице)
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
