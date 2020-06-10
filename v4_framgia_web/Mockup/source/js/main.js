//=require jquery/dist/jquery.min.js
//=require bootstrap-sass/assets/javascripts/bootstrap.min.js
//=require nanoscroller/bin/javascripts/jquery.nanoscroller.js
//=require moment/moment.js
//=require eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js
//=require eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js
//=require bootstrap-tagsinput/dist/bootstrap-tagsinput.js
//=require masonry-layout/dist/masonry.pkgd.min.js
//=require slick-carousel/slick/slick.min.js
//=require flatpickr/dist/flatpickr.min.js
//=require flatpickr/dist/l10n/ja.js

/* global flatpickr */

function handleScrollingHeaderMenu() {
  'use strict';

  var breakpoint = 480;
  var animateDuration = 100;
  var NUMBER = 0.5;
  var TAB_INDEX = 2;
  var container = '.js-main-menu__list';
  var activedItem = 'main-menu__item-active';
  var widthItem = $('.js-main-menu__text').width();
  var halfWidthItem = NUMBER * widthItem;
  var widthWindow = $(window).width();

  var animateContainer = function(jump) {
    $(container).animate({
      scrollLeft: (widthItem * jump) - halfWidthItem
    }, animateDuration);
  };

  $('.js-main-menu__item').each(function() {
    var itemIndex = $(this).index();
    if ($(this).hasClass(activedItem) && itemIndex >= TAB_INDEX) {
      animateContainer(itemIndex - 1);
    }
  });

  if (widthWindow <= breakpoint) {
    $('.js-main-menu__text').on('click', function() {
      var current = $(container).scrollLeft();
      var left = $(this).position().left;

      $(container).animate({
        scrollLeft: current + left - $(this).width() - halfWidthItem
      }, animateDuration);
    });
  }
}

function handleTogglingUserConversation() {
  'use strict';

  var breakpointSecond = 767;
  var widthWindow = $(window).width();
  var $userConversationItem = '.js-user-conversation__item';
  var $chatHeadingIcon = '.js-chat-heading__icon';
  var $showChatContent = '.show-chat-content';
  var showChatContent = 'show-chat-content';
  var $hideChatContent = '.hide-chat-content';
  var hideChatContent = 'hide-chat-content';
  var $initialDashboardContent = '.js-dashboard-content';
  var visibleDashboardContent = 'dashboard-content--visible';

  if (widthWindow <= breakpointSecond) {
    $($userConversationItem).addClass(showChatContent);
    $($chatHeadingIcon).addClass(hideChatContent);
  }

  if ($($userConversationItem).hasClass(showChatContent)) {
    $($showChatContent).on(
      'click',
      function() {
        $($initialDashboardContent).addClass(visibleDashboardContent);
      }
    );
  }

  if ($($chatHeadingIcon).hasClass(hideChatContent)) {
    $($hideChatContent).on(
      'click',
      function() {
        $($initialDashboardContent).removeClass(visibleDashboardContent);
      }
    );
  }
}

$(function() {
  'use strict';

  if (window.navigator.platform !== 'MacIntel') {
    $('html').addClass('not-macos');
  }

  /* ---------------------------------------------------------------- *\
  |* Call nano scrollbar
  \* ---------------------------------------------------------------- */

  $('.nano').nanoScroller();

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
  |* Select Take over item
  \* ---------------------------------------------------------------- */

  var selectTakeoverItem = function(radioID, parentItem, iconItem, classAddParent, classAddIcon) {
    $(radioID).click(function() {
      var self = $(this);
      $(radioID).parents(parentItem).removeClass(classAddParent);
      $(radioID).parents(parentItem).find(iconItem).removeClass(classAddIcon);

      self.parents(parentItem).addClass(classAddParent);
      self.parents(parentItem).find(iconItem).addClass(classAddIcon);
    });
  };

  selectTakeoverItem('.select-takeover__select input[type="radio"]', '.select-takeover__item', '.select-takeover__icon', 'select-takeover-selected', 'select-takeover__icon-active');
  selectTakeoverItem('.selection-date__select input[type="radio"]', '.selection-date__item', '.selection-date__icon', '', 'selection-date__icon-active');

  var autoCloseModal = function() {
    $('.add-takeover').mouseup(function() {
      var num = 2000;
      setTimeout(function() {
        $('#modal-request-selection').modal('hide');
      }, num);
    });
  };

  autoCloseModal();

  var sidebarItemActive = function(Item, classActive) {
    $(Item).click(function() {
      var self = $(this);
      $(Item).removeClass(classActive);
      self.addClass(classActive);
    });
  };

  sidebarItemActive('.item-content__text', 'item-content__text--active');

  /* ---------------------------------------------------------------- *\
  |* Save product related from S25
  \* ---------------------------------------------------------------- */

  var saveProductRelated = function(parentObj, childrenObj, injectObj) {
    $(parentObj).on('click', function(e) {
      e.preventDefault();
      var self = $(this);
      self.children(childrenObj).toggleClass(injectObj);
    });
  };

  saveProductRelated('.js-favorite-product-related', '.user-favorite__ic--save', 'user-favorite__ic--saved');

  /* ---------------------------------------------------------------- *\
  |* Save product general from S25
  \* ---------------------------------------------------------------- */

  var saveProductGeneral = function(parentObj, childrenIconObj, childrenTxtObj, injectIconObj, injectTxtObj) {
    $(parentObj).on('click', function(e) {
      e.preventDefault();
      var self = $(this);
      self.children(childrenIconObj).toggleClass(injectIconObj);
      self.children(childrenTxtObj).toggleClass(injectTxtObj);
    });
  };

  saveProductGeneral('.js-favorite-product-general', '.user-interact__ic--save', '.user-interact__txt--save', 'user-interact__ic--saved', 'user-interact__txt--saved');

  /* ---------------------------------------------------------------- *\
  |* Show block of cancellation from S18
  \* ---------------------------------------------------------------- */

  var showCancellation = function(btnTriggerShow, divExecuted, divInjectedClass, btnExecuted, btnInjectedClass) {
    $(btnTriggerShow).on('click', function() {
      $(divExecuted).addClass(divInjectedClass);
      $(btnExecuted).addClass(btnInjectedClass).attr('disabled', 'disabled');
    });
  };

  showCancellation('.js-button-show-cancellation-reasons', '.transmission-completed-invisible', 'transmission-completed-visible', '.button-confirm-cancellation', 'button--primary-disabled');

  /* ---------------------------------------------------------------- *\
  |* Hide block of cancellation from S18
  \* ---------------------------------------------------------------- */

  var hideCancellation = function(btnTriggerHide, divExecuted, divRemovedClass, btnExecuted, btnRemovedClass) {
    $(btnTriggerHide).on('click', function() {
      $(divExecuted).removeClass(divRemovedClass);
      $(btnExecuted).removeClass(btnRemovedClass).removeAttr('disabled');
    });
  };

  hideCancellation('.js-button-undo-cancellation', '.transmission-completed-invisible', 'transmission-completed-visible', '.button-confirm-cancellation', 'button--primary-disabled');

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
  |* Time Picker
  \* ---------------------------------------------------------------- */

  $('.js-time-picker').datetimepicker({
    format: 'hh:mm A'
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
  |* Masonry, show list product
  \* ---------------------------------------------------------------- */

  $('#modal-request-suggest').on('hidden.bs.modal', function() {
    $('body').addClass('modal-open');
  });

  $('#modal-choose-card').on('hidden.bs.modal', function() {
    $('body').addClass('modal-open');
  });

  $('#modal-confirm-card').on('hidden.bs.modal', function() {
    $('body').addClass('modal-open');
  });

  $('#modal-shop-product').on( 'shown.bs.modal', function() {
    $('.product-list').masonry({
      itemSelector: '.product-item',
      columnWidth: 300,
      gutter: 30
    });
  });

  /* ---------------------------------------------------------------- *\
  |* Hide and Show Sidebar Categories
  \* ---------------------------------------------------------------- */

  $('.js-item-header').on('click', function() {
    $('.panel-collapse.in').collapse('hide');
    $('.js-item-header').removeClass('item-header__active');
    $(this).addClass('item-header__active');
  });

  /* ---------------------------------------------------------------- *\
  |* Hide and Show Option Top Page and Top Shop Page
  \* ---------------------------------------------------------------- */

  $('.js-toggle-cut-and-sewn').click(function() {
    var self = $(this);
    var activeIcon = 'cut-and-sewn-comment__active';
    var activeOption = 'cut-and-sewn-comment__box-option-active';
    var boxOption = '.cut-and-sewn-comment__box-option';
    if (self.hasClass(activeIcon)) {
      self.removeClass(activeIcon);
      self.parent().find(boxOption).removeClass(activeOption);
    } else {
      $('.cut-and-sewn-comment__total-icon').removeClass(activeIcon);
      $(boxOption).removeClass(activeOption);
      self.addClass(activeIcon);
      self.parent().find(boxOption).addClass(activeOption);
    }
  });

  /* ---------------------------------------------------------------- *\
  |* Remove ActiveIcon and ActiveOption Top Page when Click Open Modal
  \* ---------------------------------------------------------------- */

  $('.button-add-category').click(function() {
    var activeIcon = 'cut-and-sewn-comment__active';
    var activeOption = 'cut-and-sewn-comment__box-option-active';
    $('.cut-and-sewn-comment__total-icon').removeClass(activeIcon);
    $('.cut-and-sewn-comment__box-option').removeClass(activeOption);
  });

  /* ---------------------------------------------------------------- *\
  |* Add class active form upload
  \* ---------------------------------------------------------------- */

  $('.comment-upload-item__link').on('click', function() {
    if ( $(this).hasClass('comment-upload-item__active') ) {
      $(this).removeClass('comment-upload-item__active');
    } else {
      $('.comment-upload-item__link .comment-upload-item__active').removeClass('comment-upload-item__active');
      $(this).addClass('comment-upload-item__active');
    }
  });

  /* ---------------------------------------------------------------- *\
  |* Scroller on modal
  \* ---------------------------------------------------------------- */

  $('#modal-suggest-shop, #modal-shop-product, #modal-suggest-proposal, #top-page-modal, #top-shop-page-modal').on('shown.bs.modal', function() {
    $('.nano').nanoScroller();
  });

  /* ---------------------------------------------------------------- *\
  |* Toggle avatar and time of chat message
  \* ---------------------------------------------------------------- */

  var chatMessageContent = '.js-chat-message-content';
  var userChatRecord = '.user-chat-record';
  var userChatMessage = '.user-chat-message';
  var userChatInfoInvisible = 'user-chat-record--invisible';
  var userChatInfoVisible = 'user-chat-record--visible';
  $(chatMessageContent).find(userChatMessage).siblings(userChatRecord).addClass(userChatInfoInvisible);
  $(chatMessageContent).find(userChatMessage).last().siblings(userChatRecord).removeClass(userChatInfoInvisible);
  $('.js-chat-message-content .user-chat-message').on('click', function() {
    $(this).siblings(userChatRecord).toggleClass(userChatInfoVisible);
  });

  var adminChatRecord = '.admin-chat-record';
  var adminChatMessage = '.admin-chat-message';
  var adminChatInfoInvisible = 'admin-chat-record--invisible';
  var adminChatInfoVisible = 'admin-chat-record--visible';
  $(chatMessageContent).find(adminChatMessage).siblings(adminChatRecord).addClass(adminChatInfoInvisible);
  $(chatMessageContent).find(adminChatMessage).last().siblings(adminChatRecord).removeClass(adminChatInfoInvisible);
  $('.js-chat-message-content .admin-chat-message').on('click', function() {
    $(this).siblings(adminChatRecord).toggleClass(adminChatInfoVisible);
  });

  /* ---------------------------------------------------------------- *\
  |* Prevent contentEditable adding <div> element on ENTER
  \* ---------------------------------------------------------------- */

  var KEYCODE_ENTER = 13;
  $('div[contenteditable="true"]').keydown(function(e) {
    if (e.keyCode === KEYCODE_ENTER) {
      document.execCommand('insertHTML', false, '<br /><br />');
      return false;
    }
  });


  /* ---------------------------------------------------------------- *\
  |* Header: Add state when the link text is selected or not
  \* ---------------------------------------------------------------- */

  $('.js-main-menu__text').on('click', function() {
    var isItemActived = 'main-menu__item-active';
    $('.main-menu__item').removeClass(isItemActived);
    $(this).parent().addClass(isItemActived);
  });


  /* ---------------------------------------------------------------- *\
  |* Header: Center the horizontal scrollbar
  \* ---------------------------------------------------------------- */

  handleScrollingHeaderMenu();


  /* ---------------------------------------------------------------- *\
  |* Datetime picker
  \* ---------------------------------------------------------------- */
  flatpickr.localize(flatpickr.l10ns.ja);
  flatpickr.l10ns.default.firstDayOfWeek = 1;
  var getSelectedDate = ''; // eslint-disable-line no-unused-vars
  var getSelectedTime = ''; // eslint-disable-line no-unused-vars
  $('.flatpickr-select-date').flatpickr({
    inline: true,
    dateFormat: 'Y年 n月 j日（D）',
    onValueUpdate: function(selectedDates, dateStr) {
      $('.js-show-date').text(dateStr);
      getSelectedDate = dateStr;
    }
  });

  $('.flatpickr-select-time').flatpickr({
    inline: true,
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
    time_24hr: true, // eslint-disable-line camelcase
    minuteIncrement: 30,
    onValueUpdate: function(selectedDates, timeStr) {
      $('.js-show-time').text(timeStr);
      getSelectedTime = timeStr;
    }
  });

  $('.js-close-modal').click(function() {
    $('#modal-pickup-order').modal('hide');
    $('.js-display-date').text(getSelectedDate);
    $('.js-display-time').text(getSelectedTime);
  });


  /* ---------------------------------------------------------------- *\
  |* Modal Login & Register
  \* ---------------------------------------------------------------- */
  var DELAY_TIME_SHOW_MODAL = 500;
  function openMultiModal(clickFrom, modalCurrent, modalNext) {
    $(clickFrom).on('click', function() {
      $(modalCurrent).modal('hide');
      setTimeout(function() {
        $(modalNext).modal('show');
      }, DELAY_TIME_SHOW_MODAL);
    });
  }
  openMultiModal('.js-button-register', '#modal-register', '#modal-success');
  openMultiModal('.js-button-register-facebook', '#modal-register', '#modal-facebook');
  openMultiModal('.js-open-form-login', '#modal-register', '#modal-login');
  openMultiModal('.js-button-login', '#modal-login', '#modal-success');
  openMultiModal('.js-button-login-facebook', '#modal-login', '#modal-facebook');
  openMultiModal('.js-open-form-register', '#modal-login', '#modal-register');

  /* ---------------------------------------------------------------- *\
  |* Modal select
  \* ---------------------------------------------------------------- */
  $('#modal-select .js-button-select').prop('disabled', true);
  $('#modal-select input:radio').click(function() {
    if ($(this).is(':checked')) {
      $('.js-button-select').prop('disabled', false);
      $('#modal-select .js-button-select').removeClass('disable');
      $('#modal-select .js-button-select').addClass('button--primary-danger');
    } else {
      if ($('.checkbox-custom__input').filter(':checked').length < 1) {
        $('.js-button-select').attr('disabled', true);
        $('.js-button-select').addClass('disable');
      }
    }
  });
});

$(window).resize(function() {
  'use strict';

  /* ---------------------------------------------------------------- *\
  |* Header: Center the horizontal scrollbar
  \* ---------------------------------------------------------------- */
  handleScrollingHeaderMenu();

  /* ---------------------------------------------------------------- *\
  |* Content: Handle toggling Users conversation
  \* ---------------------------------------------------------------- */
  handleTogglingUserConversation();
});


$(window).load(function() {
  'use strict';

  /* ---------------------------------------------------------------- *\
  |* Header: Center the horizontal scrollbar
  \* ---------------------------------------------------------------- */
  handleScrollingHeaderMenu();

  /* ---------------------------------------------------------------- *\
  |* Content: Handle toggling Users conversation
  \* ---------------------------------------------------------------- */
  handleTogglingUserConversation();
});

/* ---------------------------------------------------------------- *\
  |* slick slider
\* ---------------------------------------------------------------- */

$(window).load(function() {
  'use strict';

  $('.js-slider-detail').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    adaptiveHeight: true,
    infinite: false,
    useTransform: true,
    speed: 400,
    cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)'
  });

  $('.js-slider-navigation')
    .on('init', function() {
      $('.js-slider-navigation .slick-slide.slick-current').addClass('is-active');
    })
  .slick({
    slidesToShow: 7,
    slidesToScroll: 7,
    dots: false,
    focusOnSelect: false,
    infinite: false,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5
      }
    }, {
      breakpoint: 640,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4
      }
    }, {
      breakpoint: 420,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    }]
  });

  $('.js-slider-detail').on('afterChange', function(event, slick, currentSlide) {
    $('.js-slider-navigation').slick('slickGoTo', currentSlide);
    var currrentNavSlideElem = '.js-slider-navigation .slick-slide[data-slick-index="' + currentSlide + '"]';
    $('.js-slider-navigation .slick-slide.is-active').removeClass('is-active');
    $(currrentNavSlideElem).addClass('is-active');
  });

  $('.js-slider-navigation').on('click', '.slick-slide', function(event) {
    event.preventDefault();
    var goToSingleSlide = $(this).data('slick-index');

    $('.js-slider-detail').slick('slickGoTo', goToSingleSlide);
  });

  $('#modal-select').modal('show');
});
