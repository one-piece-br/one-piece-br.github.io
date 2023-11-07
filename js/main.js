/*  ---------------------------------------------------
    Theme Name: Anime
    Description: Anime video tamplate
    Author: Colorib
    Author URI: https://colorib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            FIlter
        --------------------*/
        $('.filter__controls li').on('click', function () {
            $('.filter__controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.filter__gallery').length > 0) {
            var containerEl = document.querySelector('.filter__gallery');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    // Search model
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
		Hero Slider
	--------------------*/
    var hero_s = $(".hero__slider");
    hero_s.owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        nav: true,
        navText: ["<span class='arrow_carrot-left'></span>", "<span class='arrow_carrot-right'></span>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        mouseDrag: false
    });

    /*------------------
        Video Player
    --------------------*/
    const player = new Plyr('#player', {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'captions', 'settings', 'fullscreen'],
        seekTime: 25
    });

    /*------------------
        Niceselect
    --------------------*/
    $('select').niceSelect();

    /*------------------
        Scroll To Top
    --------------------*/
    $("#scrollToTopButton").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
     });

})(jQuery);



const mangaImages = ["./cap/1096/Capitulo-1096-kumachi/0.webp", "./cap/1096/Capitulo-1096-kumachi/1.webp", "./cap/1096/Capitulo-1096-kumachi/2-3.webp",
"./cap/1096/Capitulo-1096-kumachi/4.webp", "./cap/1096/Capitulo-1096-kumachi/5.webp"]; // Adicione os URLs das páginas do seu mangá aqui
let currentPage = 0;
        let zoomedIn = false;
        const mangaImage = document.getElementById("mangaImage");
        const prevButton = document.getElementById("prevButton");
        const nextButton = document.getElementById("nextButton");

        // Função para mostrar a página atual
        function showPage(pageNumber) {
            mangaImage.src = mangaImages[pageNumber];
            currentPage = pageNumber;
            resetZoom();
            updateButtonStates();
        }

        // Função para aplicar zoom na imagem
        function toggleZoom() {
            if (zoomedIn) {
                resetZoom();
            } else {
                mangaImage.style.transform = "scale(2)";
                zoomedIn = true;
            }
        }

        // Função para redefinir o zoom
        function resetZoom() {
            mangaImage.style.transform = "scale(1)";
            zoomedIn = false;
        }

        // Event listener para abrir o modal e mostrar a primeira página
        $('#mangaModal').on('show.bs.modal', function () {
            showPage(0);
        });

        // Event listener para navegar para a página anterior
        prevButton.addEventListener("click", function () {
            if (currentPage > 0) {
                showPage(currentPage - 1);
            }
        });

        // Event listener para navegar para a próxima página
        nextButton.addEventListener("click", function () {
            if (currentPage < mangaImages.length - 1) {
                showPage(currentPage + 1);
            }
        });

        // Event listener para usar as setas do teclado
        document.addEventListener("keydown", function (e) {
            if (e.key === "ArrowLeft") {
                if (currentPage > 0) {
                    showPage(currentPage - 1);
                }
            } else if (e.key === "ArrowRight") {
                if (currentPage < mangaImages.length - 1) {
                    showPage(currentPage + 1);
                }
            }
        });

        // Função para atualizar o estado dos botões de navegação
        function updateButtonStates() {
            prevButton.disabled = (currentPage === 0);
            nextButton.disabled = (currentPage === mangaImages.length - 1);
        }