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
let paginaAtual = 0;
$(document).ready(function() {
    // Carregar a lista de imagens do mangá
    var mangaImages = ["./cap/1096/Capitulo-1096-kumachi/0.webp", "./cap/1096/Capitulo-1096-kumachi/1.webp", "./cap/1096/Capitulo-1096-kumachi/2-3.webp",
    "./cap/1096/Capitulo-1096-kumachi/4.webp", "./cap/1096/Capitulo-1096-kumachi/5.webp"];
    
    var currentImageIndex = 0;

    function loadMangaImage() {
        $('#mangaImage').attr('src', mangaImages[currentImageIndex]);
    }

    $('#mangaModal').on('shown.bs.modal', function() {
        loadMangaImage();
    });

    $('#mangaModal').on('hidden.bs.modal', function() {
        // Limpar a imagem ao fechar o modal
        $('#mangaImage').attr('src', '');
    });

    $('#mangaModal').click(function() {
        // Fechar o modal ao clicar fora da imagem
        if (event.target === this) {
            // Fecha o modal se o usuário clicar fora da imagem
            $('#mangaModal').modal('hide');
        }
    });

    $(document).keydown(function(e) {
        // Verificar as teclas pressionadas (A e D para navegar, setas para navegar)
        if ($('#mangaModal').is(':visible')) {
            if (e.keyCode === 65) { // Tecla "A" para voltar
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                    loadMangaImage();
                }
            } else if (e.keyCode === 68) { // Tecla "D" para avançar
                if (currentImageIndex < mangaImages.length - 1) {
                    currentImageIndex++;
                    loadMangaImage();
                }
            } else if (e.keyCode === 37) { // Seta esquerda para voltar
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                    loadMangaImage();
                }
            } else if (e.keyCode === 39) { // Seta direita para avançar
                if (currentImageIndex < mangaImages.length - 1) {
                    currentImageIndex++;
                    loadMangaImage();
                }
            }
        }
    });

    $('#mangaImage').click(function(e) {
        var imageWidth = $('#mangaImage').width();
        var clickX = e.pageX - $(this).offset().left;

        if (clickX < imageWidth / 2) {
            // Clicou na parte esquerda da imagem (volta)
            if (currentImageIndex > 0) {
                currentImageIndex--;
                loadMangaImage();
            }
        } else {
            // Clicou na parte direita da imagem (avança)
            if (currentImageIndex < mangaImages.length - 1) {
                currentImageIndex++;
                loadMangaImage();
            }
        }
    });
});