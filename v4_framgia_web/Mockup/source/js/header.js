$(function() {
  'use strict';

  /* ---------------------------------------------------------------- *\
  |* Dopdown header user menu
  \* ---------------------------------------------------------------- */

  var dropdownHeaderMenu = function(selector, parentClassMenu, nameClassMenu, addClass) {
    $(selector).click(function() {
      var self = $(this);
      self.children('.user-profile__icon').toggleClass('user-profile__active');
      self.parent(parentClassMenu).find(nameClassMenu).toggle().addClass(addClass);
    });
  };

  dropdownHeaderMenu('.user-profile__text', '.user-profile', '.profile-menu', 'profile-menu--show');

  /* ---------------------------------------------------------------- *\
  |* Close header user menu
  \* ---------------------------------------------------------------- */

  var closeHeaderMenu = function(nameClassIcon, nameClassMenu, iconName, iconRemove) {
    $('.main-page').click(function(headerMenu) {
      if (!$(headerMenu.target).hasClass(nameClassIcon)) {
        $(nameClassMenu).hide();
        $(iconName).removeClass(iconRemove);
      }
    });
  };

  closeHeaderMenu('user-profile__link', '.profile-menu', '.user-profile__icon', 'user-profile__active');

  /* ---------------------------------------------------------------- *\
  |* Trigger sidebar
  \* ---------------------------------------------------------------- */

  $('.js-icon-sidebar').on('click', function() {
    var icon = $('.icon-sidebar');
    if (icon.hasClass('icon-sidebar-active')) {
      icon.removeClass('icon-sidebar-active');
    } else {
      icon.addClass('icon-sidebar-active');
    }

    var sidebar = $('.main-left-sidebar');
    if (sidebar.hasClass('main-left-active')) {
      sidebar.removeClass('main-left-active');
    } else {
      sidebar.addClass('main-left-active');
    }

    var userInfoInvisible = '.user-info-minimized';
    var userInfoVisible = 'user-info-minimized--visibled';
    if ($(userInfoInvisible).hasClass(userInfoVisible)) {
      $(userInfoInvisible).removeClass(userInfoVisible);
    }

    var menuRowInvisible = '.logo-flexible__menu_row';
    var menuRowVisible = 'logo-flexible__menu_row--visibled';
    if ($(menuRowInvisible).hasClass(menuRowVisible)) {
      $(menuRowInvisible).removeClass(menuRowVisible);
    }

    var backdropInvisible = '.js-backdrop-light--invisible';
    var backdropVisible = 'backdrop-light--visible';
    $(backdropInvisible).addClass(backdropVisible);
  });

  /* ---------------------------------------------------------------- *\
  |* Show user info from user avatar in header
  \* ---------------------------------------------------------------- */

  $('.js-user-avatar-trigger').on('click', function(event) {
    event.stopPropagation();
    var userInfoInvisible = '.user-info-minimized';
    var userInfoVisible = 'user-info-minimized--visibled';
    $(userInfoInvisible).addClass(userInfoVisible);

    var sidebarInvisible = '.main-left-sidebar';
    var sidebarVisible = 'main-left-active';
    if ($(sidebarInvisible).hasClass(sidebarVisible)) {
      $(sidebarInvisible).removeClass(sidebarVisible);
    }

    var menuRowInvisible = '.logo-flexible__menu_row';
    var menuRowVisible = 'logo-flexible__menu_row--visibled';
    if ($(menuRowInvisible).hasClass(menuRowVisible)) {
      $(menuRowInvisible).removeClass(menuRowVisible);
    }

    var backdropInvisible = '.js-backdrop-light--invisible';
    var backdropVisible = 'backdrop-light--visible';
    $(backdropInvisible).addClass(backdropVisible);
  });

  $('.js-icon-sidebar, .js-user-avatar-trigger').on('click', function() {
    var backdropInvisible = '.js-backdrop-light--invisible';
    var backdropVisible = 'backdrop-light--visible';
    var backdropAppear = 'backdrop-appear';

    if ($(backdropInvisible).hasClass(backdropVisible)) {
      $('body').addClass(backdropAppear);
    }
  });

  /* ---------------------------------------------------------------- *\
  |* Show gender categories from logo in header
  \* ---------------------------------------------------------------- */

  $('.js-logo-flexible').on('click', function(event) {
    event.stopPropagation();
    var logoIcon = '.logo-flexible__icon';
    var logoIconRotated = 'logo-flexible__icon--rotated';
    var menuRowInvisible = '.logo-flexible__menu_row';
    var menuRowVisible = 'logo-flexible__menu_row--visibled';

    $(logoIcon).toggleClass(logoIconRotated);
    $(menuRowInvisible).toggleClass(menuRowVisible);

    var sidebarInvisible = '.main-left-sidebar';
    var sidebarVisible = 'main-left-active';
    if ($(sidebarInvisible).hasClass(sidebarVisible)) {
      $(sidebarInvisible).removeClass(sidebarVisible);
    }

    var userInfoInvisible = '.user-info-minimized';
    var userInfoVisible = 'user-info-minimized--visibled';
    if ($(userInfoInvisible).hasClass(userInfoVisible)) {
      $(userInfoInvisible).removeClass(userInfoVisible);
    }

    var logoFacyman = 'logo-flexible__facyman';
    var logoFacylady = 'logo-flexible__facylady';
    if ($('.js-logo-facyman').hasClass('logo-flexible__menu_item--actived')) {
      $(this).find('.logo-flexible__img').addClass(logoFacyman).removeClass(logoFacylady);
    } else {
      $(this).find('.logo-flexible__img').removeClass(logoFacyman).addClass(logoFacylady);
    }
  });

  /* ---------------------------------------------------------------- *\
  |* Select gender from logo in header
  \* ---------------------------------------------------------------- */

  $('.js-logo-flexible__menu_item > .logo-flexible__menu_link').on('click', function(event) {
    event.preventDefault();
    var menuItem = '.js-logo-flexible__menu_item';
    var menuItemActived = 'logo-flexible__menu_item--actived';
    var menuIcon = '.logo-flexible__menu_icon';
    var menuIconActived = 'logo-flexible__menu_icon--actived';

    $(menuItem).removeClass(menuItemActived);
    $(this).parent().addClass(menuItemActived);
    $(menuIcon).removeClass(menuIconActived);
    $(this).children().addClass(menuIconActived);
  });

  /* ---------------------------------------------------------------- *\
  |* Stop propagation
  \* ---------------------------------------------------------------- */

  $('.js-user-avatar-trigger, .js-logo-flexible, .js-icon-sidebar').on('click', function(event) {
    event.stopPropagation();
  });

  /* ---------------------------------------------------------------- *\
  |* Hide elements when click to backdrop
  \* ---------------------------------------------------------------- */

  $(document).on('click', '.backdrop-light--visible', function() {
    var sidebarInvisible = '.main-left-sidebar';
    var sidebarVisible = 'main-left-active';
    $(sidebarInvisible).removeClass(sidebarVisible);

    var userInfoInvisible = '.user-info-minimized';
    var userInfoVisible = 'user-info-minimized--visibled';
    $(userInfoInvisible).removeClass(userInfoVisible);

    var backdropInvisible = '.js-backdrop-light--invisible';
    var backdropVisible = 'backdrop-light--visible';
    $(backdropInvisible).removeClass(backdropVisible);

    var backdropAppear = 'backdrop-appear';
    $('body').removeClass(backdropAppear);
  });

  /* ---------------------------------------------------------------- *\
  |* Hide elements when click outside
  \* ---------------------------------------------------------------- */

  $(document).on('click', function() {
    var logoFlexIcon = '.logo-flexible__icon';
    var logoFlexIconRotated = 'logo-flexible__icon--rotated';
    if ($(logoFlexIcon).hasClass(logoFlexIconRotated)) {
      $(logoFlexIcon).removeClass(logoFlexIconRotated);
    }

    var menuRowInvisible = '.logo-flexible__menu_row';
    var menuRowVisible = 'logo-flexible__menu_row--visibled';
    $(menuRowInvisible).removeClass(menuRowVisible);
  });


  /* ---------------------------------------------------------------- *\
  |* Hide and Show Sidebar Categories
  \* ---------------------------------------------------------------- */
  $('.js-item-header').on('click', function() {
    $('.panel-collapse.in').collapse('hide');
    $('.js-item-header').removeClass('item-header__active');
    $(this).addClass('item-header__active');
  });
});
