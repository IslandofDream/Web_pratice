window.addEventListener('load',function (){
    var carousels = document.getElementsByClassName('carousel');

    for(var i = 0; i<carousels.length; i++){
        addEventToCarousel(carousels[i]);
    }

});

function addEventToCarousel(carouselElem){
    var ulElem = carouselElem.querySelector('ul');
    var liElems = ulElem.querySelectorAll('li');

    //너비값 조정
    var liWidth = liElems[0].clientWidth;
    var adjustedWidth = liElems.length * liWidth;
    ulElem.style.width = adjustedWidth + 'px';


    // 슬라이드 버튼 이벤트 등록
    var slideButtons = carouselElem.querySelectorAll('.slide')
    for( var i = 0; i< slideButtons.length; i++){
        slideButtons[i].addEventListener('click', createListenerSlide(carouselElem));
    }

}

function createListenerSlide(carouselElem){
    return function (event){
        var clickeButton = event.currentTarget;

        //값 가져오기
        var liElems = carouselElem.querySelectorAll('li');
        var licount = liElems.length;
        var currentIndex = carouselElem.attributes.data.value;

        if(clickeButton.className.includes('right') && currentIndex < licount -1 ){ // 어떤 클래스의 버튼인지 확인
            currentIndex ++;
            scrollDiv(carouselElem,currentIndex); // 실제로 스크롤을 움직이는 함수
        }
        else if(clickeButton.className.includes('left') && currentIndex > 0){
            currentIndex--;
            scrollDiv(carouselElem, currentIndex);
        }

        // 인디케이스 업데이트
        updataIndicator(carouselElem, currentIndex);
        // 슬라이드 버튼 보여줌 여부 업데이트
        updateSlideButtonVisible(carouselElem,currentIndex, licount);

        //새롭게 보여지는 이미지 인덱스 값을 현재 data 값으로 업데이트
        carouselElem.attributes.data.value = currentIndex;
    }

}

function scrollDiv(carouselElem, nextIndex){
    var scrollable = carouselElem.querySelector('div');
    var liwidth = scrollable.clientWidth;
    var newLeft = liwidth * nextIndex;

    scrollable.scrollTo({left: newLeft, behavior: 'smooth'});
}

function updataIndicator(carouselElem, currentIndex){
    var indicators = carouselElem.querySelectorAll('footer > div');
    for (var i = 0; i< indicators.length; i++){
        if(currentIndex == i){
            indicators[i].className = 'active';
        }else{
            indicators[i].className = '';
        }
    }
}

function updateSlideButtonVisible(carouselElem, curentIndex, licount){
    var left = carouselElem.querySelector('.slide-left');
    var right = carouselElem.querySelector('.slide-right');

    if(curentIndex > 0){
        left.style.display ='block';
    }
    else{
        left.style.display='none';
    }

    if(curentIndex < licount - 1) {
        right.style.display = 'block';
    }
    else{
        right.style.display = 'none';
    }


}
